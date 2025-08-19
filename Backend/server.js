const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Adjust as needed

const corsOptions = {
  origin: ["http://localhost:5173", "http://192.168.68.125:5173"],
  credentials: true, // Enable cookies and credentials
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

let db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dayon1999", // Make sure to secure this in production
    database: "pet_adoption",
    port: 3306,
  });

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("Connected to the database");
    }
  });

  db.on("error", (err) => {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Connection lost, reconnecting...");
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed"));
    }
  },
});

handleDisconnect();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use('/uploads', express.static('uploads'));
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT * FROM administrator WHERE email = ? AND password = ?"; 
  // NOTE: In production, never store plain passwords — use bcrypt hashing

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      res.json({ success: true, user: results[0] });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  });
});

// ===================== DASHBOARD COUNTS =====================
app.get("/users/count", (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM pet_owner) + (SELECT COUNT(*) FROM pet_adopter) AS count
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching users" });
    res.json({ count: results[0].count });
  });
});

app.get("/adoptions/pending/count", (req, res) => {
  // assuming "pending" means NOT adopted yet, so adjust if you have a status column
  const sql = `SELECT COUNT(*) AS count FROM adoption`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching adoptions" });
    res.json({ count: results[0].count });
  });
});

app.get("/appointments/scheduled/count", (req, res) => {
  const sql = `SELECT COUNT(*) AS count FROM appointment`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching appointments" });
    res.json({ count: results[0].count });
  });
});

// ===================== FULL LISTS =====================
app.get("/pets", (req, res) => {
  db.query("SELECT * FROM pet", (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching pets" });
    res.json(results);
  });
});

app.get("/adoptions/pending", (req, res) => {
  const sql = `
    SELECT a.*, p.breed, pa.first_name AS adopter_first, pa.last_name AS adopter_last
    FROM adoption a
    JOIN pet p ON a.pet_id = p.pet_id
    JOIN pet_adopter pa ON a.petAdopter_id = pa.petAdopter_id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching adoptions" });
    res.json(results);
  });
});

app.get("/appointments", (req, res) => {
  const sql = `
    SELECT ap.*, po.first_name AS owner_first, po.last_name AS owner_last
    FROM appointment ap
    JOIN pet_owner po ON ap.petOwner_id = po.petOwner_id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching appointments" });
    res.json(results);
  });
});

app.get("/messages", (req, res) => {
  // Placeholder until messages table exists
  res.json([
    { id: 1, sender: "System", content: "Welcome to the dashboard!" }
  ]);
});

// ==================== PET CRUD============================
// Get all pets (convert LONGBLOB to Base64 for frontend display)
app.get("/api/pets", (req, res) => {
  db.query("SELECT * FROM pet", (err, rows) => {
    if (err) return res.status(500).json({ error: err });

    const pets = rows.map((pet) => ({
      ...pet,
      imageUrl: pet.image
        ? `data:image/jpeg;base64,${pet.image.toString("base64")}`
        : null,
    }));

    res.json(pets);
  });
});

// Add pet
app.post("/api/pets", (req, res) => {
  const { name,breed, size, gender, weight, medical, color, status, image } = req.body;

  const imageBuffer = imageUrl ? Buffer.from(image, "base64") : null;

  db.query(
    "INSERT INTO pet (name, breed, size, gender, weight, medical, color, status, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [name, breed, size, gender, weight, medical, color, status, imageBuffer],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Pet added successfully", id: result.insertId });
    }
  );
});

app.put("/update/pets/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { breed, size, gender, weight, color, status } = req.body;
  const imageBuffer = req.file ? req.file.buffer : null;

  const sql = `
    UPDATE pet 
    SET breed=?, size=?, gender=?, weight=?, color=?, status=?
    ${imageBuffer ? ", image=?" : ""}
    WHERE pet_id=?
  `;

  const params = imageBuffer
    ? [breed, size, gender, weight, color, status, imageBuffer, id]
    : [breed, size, gender, weight, color, status, id];

  db.query(sql, params, (err) => {
    if (err) {
      console.error("Error updating pet:", err);
      return res.status(500).json({ error: "Database update failed" });
    }
    res.json({ message: "Pet updated successfully" });
  });
});

app.delete("/delete/pets/:id", (req, res) => {
  const { id } = req.params;

  // Delete adoptions first
  db.query("DELETE FROM adoption WHERE pet_id = ?", [id], (err) => {
    if (err) {
      console.error("MySQL Delete Adoption Error:", err.sqlMessage || err);
      return res.status(500).json({ error: err.sqlMessage || "Database error" });
    }

    // Then delete pet
    db.query("DELETE FROM pet WHERE pet_id = ?", [id], (err, result) => {
      if (err) {
        console.error("MySQL Delete Pet Error:", err.sqlMessage || err);
        return res.status(500).json({ error: err.sqlMessage || "Database error" });
      }
      res.json({ message: "Pet deleted successfully" });
    });
  });
});

app.listen(8081, "0.0.0.0", () => {
  console.log("Server is listening on port 8081");
});
