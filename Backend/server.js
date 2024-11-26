const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const moment = require("moment");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "10mb" })); // Adjust as needed

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Enable cookies and credentials in requests
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

let db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dayon1999", // Make sure to secure this in production
    database: "fams_db",
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

handleDisconnect();

// Fetch a specific faculty's first and last name by user ID
app.get("/user/:user_id", (req, res) => {
  const { user_id } = req.params;
  const sql = "SELECT first_name, last_name FROM faculty WHERE user_id = ?";

  db.query(sql, [user_id], (err, data) => {
    if (err) {
      console.error("Error fetching user details:", err);
      return res.status(500).json({ error: "Error fetching user details" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(data[0]);
  });
});

app.get("/user/info/:user_id", (req, res) => {
  const { user_id } = req.params;
  const sql = "SELECT * FROM faculty WHERE user_id = ?";

  db.query(sql, [user_id], (err, data) => {
    if (err) {
      console.error("Error fetching user details:", err);
      return res.status(500).json({ error: "Error fetching user details" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(data[0]);
  });
});

app.post("/admin_login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM faculty WHERE username = ? AND password = ?";

  db.query(sql, [username, password], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    if (data.length > 0) {
      // If user is found, get their role
      const userRole = data[0].role; // Assuming 'role' is a column in the 'faculty' table
      return res.status(200).json({
        message: "Login successful",
        role: userRole,
      });
    } else {
      // If user is not found, send failure response
      return res.status(401).json({ message: "Invalid username or password" });
    }
  });
});

app.get("/admin_login/:user_id", (req, res) => {
  const { user_id } = req.params;
  const sql = "SELECT role FROM faculty WHERE user_id = ?";

  db.query(sql, [user_id], (err, data) => {
    if (err) {
      console.error("Error fetching user details:", err);
      return res.status(500).json({ error: "Error fetching user details" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.setHeader("Content-Type", "application/json"); // Explicitly set Content-Type
    return res.status(200).json({ role: data[0].role });
  });
});
// Fetch all facultys from 'faculty' table
app.get("/user_accounts", (req, res) => {
  const sql = "SELECT * FROM faculty WHERE role !='admin'";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error querying user_accounts table:", err);
      return res.json(err);
    }
    return res.json(data);
  });
});
// Update user password
app.put("/user_accounts/change_password/:user_id", (req, res) => {
  const { user_id } = req.params;
  const { oldpassword, newpassword } = req.body;

  const checkpasswordSql = "SELECT password FROM faculty WHERE user_id = ?";

  db.query(checkpasswordSql, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error checking old password" });
    }

    if (results.length === 0) {
      console.log("No user found"); // Debugging
      return res.status(404).json({ error: "User not found" });
    }

    const currentpassword = results[0].password;

    if (currentpassword !== oldpassword) {
      return res.status(400).json({ error: "Old password is incorrect" });
    }

    const updatepasswordSql =
      "UPDATE faculty SET password = ? WHERE user_id = ?";
    db.query(updatepasswordSql, [newpassword, user_id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error updating password" });
      }
      return res.status(200).json({ message: "password updated successfully" });
    });
  });
});
// Add a new faculty to 'faculty' table
app.post("/add_user", (req, res) => {
  const { first_name, middle_name, last_name, username, password } = req.body;
  const role = "user"; // Static role

  const sql =
    "INSERT INTO faculty (first_name, middle_name, last_name, username, password, role) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [first_name, middle_name, last_name, username, password, role],
    (err, result) => {
      if (err) {
        console.error("Error inserting into faculty table:", err);
        return res
          .status(500)
          .json({ error: "Failed to add user", details: err });
      }

      // Send back the `user_id` of the newly inserted record
      const userId = result.insertId;
      return res.status(201).json({
        message: "User added successfully",
        user_id: userId,
      });
    }
  );
});

app.get("/subject_api", (req, res) => {
  const sql = `
    SELECT 
      faculty_subject.subject_id,
      faculty_subject.subject_code, 
      faculty_subject.subject_description, 
      faculty_subject.subject_timeIn, 
      faculty_subject.subject_timeOut, 
      faculty.user_id,
      faculty.first_name,
      faculty.middle_name,
      faculty.last_name
    FROM 
      faculty
    LEFT JOIN 
      faculty_subject ON faculty.user_id = faculty_subject.user_id
    WHERE 
      faculty.username != 'admin'
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching subjects:", err);
      return res.status(500).json({ error: "Failed to fetch subjects" });
    }

    res.json(results);
  });
});

app.post("/subject_add", (req, res) => {
  const {
    subject_code,
    subject_description,
    subject_timeIn,
    subject_timeOut,
    user_id,
  } = req.body;

  // Get the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split("T")[0];

  // Convert timeIn and timeOut to proper TIMESTAMP format (YYYY-MM-DD HH:MM:SS)
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour24 = parseInt(hours, 10); // Convert to 24-hour format
    const formattedHours = hour24.toString().padStart(2, "0"); // Ensure 2 digits
    return `${currentDate} ${formattedHours}:${minutes}:00`; // Append seconds
  };

  const timeIn = formatTime(subject_timeIn);
  const timeOut = formatTime(subject_timeOut);

  const sql = `
    INSERT INTO faculty_subject (subject_code, subject_description, subject_timeIn, subject_timeOut, user_id) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [subject_code, subject_description, timeIn, timeOut, user_id],
    (err, result) => {
      if (err) {
        console.error("Error adding subject:", err);
        return res.status(500).json({ error: "Failed to add subject" });
      }

      res.status(200).json({ message: "Subject added successfully" });
    }
  );
});

// Update an existing faculty in 'TZeacher' table
app.put("/user_accounts_update/:user_id", (req, res) => {
  const { user_id } = req.params;
  const { username, first_name, middle_name, last_name } = req.body;

  const sql =
    "UPDATE faculty SET username = ?, first_name = ?, middle_name = ?, last_name = ? WHERE user_id = ?";
  db.query(
    sql,
    [username, first_name, middle_name, last_name, user_id], // <-- Likely error here
    (err, result) => {
      if (err) {
        console.error("Error updating faculty table:", err);
        return res
          .status(500)
          .json({ error: "Failed to update user", details: err });
      }
      return res
        .status(200)
        .json({ message: "User updated successfully", result });
    }
  );
});
// Route to reset user password to '1234'
app.put("/user_accounts_reset_password/:user_id", (req, res) => {
  const { user_id } = req.params;
  const defaultPassword = "1234"; // Default password

  const sql = "UPDATE faculty SET password = ? WHERE user_id = ?";

  db.query(sql, [defaultPassword, user_id], (err, result) => {
    if (err) {
      console.error("Error resetting user password:", err);
      return res
        .status(500)
        .json({ error: "Failed to reset password", details: err });
    }
    return res
      .status(200)
      .json({ message: "Password reset successfully", result });
  });
});
// Delete a faculty from 'faculty' table
app.delete("/subject_delete/:subject_id", (req, res) => {
  const { subject_id } = req.params; // Use subject_id
  const sql = "DELETE FROM faculty_subject WHERE subject_id = ?";

  db.query(sql, [subject_id], (err, result) => {
    if (err) {
      console.error("Error deleting subject:", err);
      return res
        .status(500)
        .json({ error: "Failed to delete subject", details: err });
    }
    return res
      .status(200)
      .json({ message: "Subject deleted successfully", result });
  });
});
// Delete a faculty from 'faculty' table
app.delete("/user_accounts_delete/:user_id", (req, res) => {
  const { user_id } = req.params;

  // SQL queries to delete from all related tables
  const deleteSubjects = "DELETE FROM faculty_subject WHERE user_id = ?";
  const deleteBiometric = "DELETE FROM faculty_biometric WHERE user_id = ?";
  const deleteFaculty = "DELETE FROM faculty WHERE user_id = ?";

  // Start with deleting from related tables, then faculty
  db.query(deleteSubjects, [user_id], (err, result) => {
    if (err) {
      console.error("Error deleting from subjects table:", err);
      return res
        .status(500)
        .json({ error: "Failed to delete subjects", details: err });
    }

    // Delete from faculty_biometric table
    db.query(deleteBiometric, [user_id], (err, result) => {
      if (err) {
        console.error("Error deleting from faculty_biometric table:", err);
        return res
          .status(500)
          .json({ error: "Failed to delete biometric data", details: err });
      }

      // Delete from faculty table
      db.query(deleteFaculty, [user_id], (err, result) => {
        if (err) {
          console.error("Error deleting from faculty table:", err);
          return res
            .status(500)
            .json({ error: "Failed to delete user", details: err });
        }

        return res.status(200).json({
          message: "User and related data deleted successfully",
          result,
        });
      });
    });
  });
});

app.post("/store-fingerprint", (req, res) => {
  console.log("Raw Request Data:", req.body);

  const fingerprint = parseInt(req.body.fingerprint, 10); // Parse fingerprint as an integer
  if (isNaN(fingerprint)) {
    return res.status(400).send("Fingerprint data is missing or invalid!");
  }

  db.beginTransaction((err) => {
    if (err) {
      console.error("Transaction start failed:", err);
      return res.status(500).send("Transaction start failed.");
    }

    const getLastUserIdQuery =
      "SELECT user_id FROM faculty ORDER BY user_id DESC LIMIT 1";
    db.query(getLastUserIdQuery, (err, results) => {
      if (err) {
        console.error("Error retrieving latest user_id:", err);
        return db.rollback(() =>
          res.status(500).send("Error retrieving user information.")
        );
      }

      if (results.length === 0) {
        console.warn("No users found in the faculty table.");
        return db.rollback(() =>
          res.status(400).send("No users found in the faculty table.")
        );
      }

      const userId = results[0].user_id;
      console.log("Latest user_id retrieved:", userId);

      const countFingerprintsQuery =
        "SELECT COUNT(*) AS fingerprintCount FROM faculty_biometric WHERE user_id = ?";
      db.query(countFingerprintsQuery, [userId], (err, countResults) => {
        if (err) {
          console.error("Error counting fingerprints:", err);
          return db.rollback(() =>
            res.status(500).send("Error counting fingerprints.")
          );
        }

        const fingerprintCount = countResults[0].fingerprintCount;
        console.log(
          "Current fingerprint count for user_id",
          userId,
          ":",
          fingerprintCount
        );

        if (fingerprintCount >= 5) {
          console.warn("Fingerprint limit reached for user_id", userId);
          return db.rollback(() =>
            res.status(400).send("Fingerprint limit reached for this user.")
          );
        }

        const insertFingerprintQuery =
          "INSERT INTO faculty_biometric (user_id, fingerprint) VALUES (?, ?)";
        db.query(
          insertFingerprintQuery,
          [userId, fingerprint], // Save fingerprint as an integer
          (err) => {
            if (err) {
              console.error("Error saving fingerprint:", err);
              return db.rollback(() =>
                res.status(500).send("Error saving fingerprint data.")
              );
            }

            db.commit((err) => {
              if (err) {
                console.error("Transaction commit failed:", err);
                return db.rollback(() =>
                  res.status(500).send("Transaction commit failed.")
                );
              }

              console.log("Fingerprint saved successfully for user_id", userId);
              res.status(200).send("Fingerprint saved successfully.");
            });
          }
        );
      });
    });
  });
});

let scanCount = 0; // Initialize scan count
let thresholdReached = false; // Initialize threshold flag

app.post("/receive-fingerprint", (req, res) => {
  const { fingerprint } = req.body;
  if (!fingerprint) {
    return res.status(400).send("Fingerprint data missing");
  }

  console.log("Received fingerprint in JSON format:", fingerprint);

  // Increment the scan count if threshold hasn't been reached
  if (!thresholdReached) {
    scanCount += 1;
    console.log(`Scan count incremented. Current count: ${scanCount}`);
  }

  // Check if scan count has reached the threshold
  if (scanCount >= 5) {
    thresholdReached = true;
    console.log("Scan count threshold reached.");

    res.status(200).json({
      success: true,
      message: "Scan count threshold reached!",
    });

    // Reset scan count and threshold flag after reaching the threshold
    setTimeout(() => {
      scanCount = 0;
      thresholdReached = false;
      console.log("Scan count and threshold flag reset.");
    }, 5000); // Reset after 5 seconds (adjust as needed)
  } else {
    res.status(200).json({
      success: true,
      message: `Scan ${scanCount} of 5 completed.`,
    });
  }
});
// Endpoint for React app to fetch the current scan status
app.get("/scan-status", (req, res) => {
  res.status(200).json({
    success: true,
    scanCount: scanCount,
    thresholdReached: thresholdReached, // Send flag to client
    message: thresholdReached
      ? "Threshold reached!"
      : `Scan ${scanCount} of 5 completed.`,
  });

  // Reset scan count and threshold after sending the threshold reached message
  if (thresholdReached) {
    scanCount = 0;
    thresholdReached = false;
  }
});

app.post("/check-fingerprint", (req, res) => {
  let { fingerprint } = req.body;

  // Ensure the fingerprint is provided and convert it to an integer
  if (!fingerprint || fingerprint.length === 0) {
    console.error("Fingerprint data missing!");
    return res.status(400).json({ error: "Fingerprint data is required" });
  }

  // Attempt to parse the fingerprint into an integer
  fingerprint = parseInt(fingerprint, 10);

  if (isNaN(fingerprint)) {
    console.error("Invalid fingerprint data: not an integer.");
    return res
      .status(400)
      .json({ error: "Fingerprint must be a valid integer" });
  }

  // Query to get fingerprint, user_id, and first_name from the database
  const query = `
    SELECT fb.fingerprint, f.user_id, f.first_name 
    FROM faculty_biometric fb
    INNER JOIN faculty f ON fb.user_id = f.user_id
    WHERE fb.fingerprint = ?`;

  db.query(query, [fingerprint], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Database query error" });
    }

    if (!results || results.length === 0) {
      console.warn("No fingerprints found matching the provided data.");
      return res.status(404).json({ match: false, message: "No match found" });
    }

    // Extract matched user data
    const matchedUser = results[0]; // Only one match is expected for a unique fingerprint
    const { first_name } = matchedUser;

    // Log the matched first name
    console.log("Matched first name:", first_name);

    // Return the response
    return res.json({
      match: true,
      first_name: first_name,
    });
  });
});

app.get("/last-fingerprint-id", (req, res) => {
  const query =
    "SELECT COALESCE(MAX(fingerprint), 0) AS lastId FROM faculty_biometric";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving last fingerprint ID:", err);
      return res.status(500).send("Error retrieving last fingerprint ID.");
    }
    const lastId = results[0].lastId;
    res.send(lastId.toString()); // Send as plain text
  });
});

app.post("/log-id", (req, res) => {
  const { fingerprint } = req.body;

  if (fingerprint === undefined) {
    return res.status(400).json({ error: "Fingerprint ID is required." });
  }

  // Get current date and time in the format 'YYYY-MM-DD HH:mm:ss' (24-hour format)
  const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");

  // Log the fingerprint and the current time
  console.log(
    `Received fingerprint ID: ${fingerprint}, Time: ${currentDateTime}`
  );

  // Respond with a success message and the received fingerprint and time
  res.status(200).json({
    message: "Fingerprint ID logged successfully",
    fingerprint,
    time: currentDateTime,
  });
});

// Start the server on port 8081
app.listen(8081, "0.0.0.0", () => {
  console.log("Server is listening on port 8081");
});
