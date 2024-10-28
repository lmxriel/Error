const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());

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
  const { first_name, middle_name, last_name, username, password, user_id } =
    req.body;

  const sql =
    "INSERT INTO faculty (first_name, middle_name, last_name, username, password) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [first_name, middle_name, last_name, username, password, user_id],
    (err, result) => {
      if (err) {
        console.error("Error inserting into faculty table:", err);
        return res
          .status(500)
          .json({ error: "Failed to add user", details: err });
      }
      return res
        .status(201)
        .json({ message: "User added successfully", result });
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
      faculty_subject ON faculty.user_id = faculty_subject.faculty_id
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

  // Ensure that the user_id is passed correctly as faculty_id
  const sql = `
    INSERT INTO faculty_subject (subject_code, subject_description, subject_timeIn, subject_timeOut, faculty_id) 
    VALUES (?, ?, ?, ?, ?)
  `;

  // Execute the query, using user_id as faculty_id
  db.query(
    sql,
    [
      subject_code,
      subject_description,
      subject_timeIn,
      subject_timeOut,
      user_id,
    ],
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
  const deleteSubjects = "DELETE FROM faculty_subject WHERE faculty_id = ?";

  const deleteFaculty = "DELETE FROM faculty WHERE user_id = ?";

  // Start with deleting from related tables, then faculty
  db.query(deleteSubjects, [user_id], (err, result) => {
    if (err) {
      console.error("Error deleting from subjects table:", err);
      return res
        .status(500)
        .json({ error: "Failed to delete subjects", details: err });
    }
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

// Start the server on port 8081
app.listen(8081, "0.0.0.0", () => {
  console.log("Server is listening on port 8081");
});
