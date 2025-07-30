const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const moment = require("moment");

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

  const sql =
    "SELECT user_id, username, role, dept_name FROM faculty WHERE username = ? AND password = ?";

  db.query(sql, [username, password], (err, data) => {
    if (err) {
      console.error("Database query failed:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (data.length > 0) {
      const user = data[0]; // Get the first user (assuming unique usernames)
      return res.status(200).json({
        message: "Login successful",
        user_id: user.user_id,
        username: user.username,
        role: user.role,
        dept_name: user.dept_name, // Now includes department name
      });
    } else {
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
  const sql = "SELECT * FROM faculty WHERE role ='user'";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error querying user_accounts table:", err);
      return res.json(err);
    }

    // Convert all string values to lowercase
    const formattedData = data.map((row) => {
      return Object.fromEntries(
        Object.entries(row).map(([key, value]) => [
          key,
          typeof value === "string" ? value.toLowerCase() : value,
        ])
      );
    });

    return res.json(formattedData);
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

app.get("/subject_api", (req, res) => {
  // const sql = `
  //   SELECT
  //     faculty_subject.subject_id,
  //     faculty_subject.subject_code,
  //     faculty_subject.subject_description,
  //     faculty_subject.subject_timeIn,
  //     faculty_subject.subject_timeOut,
  //     faculty.user_id,
  //     faculty.first_name,
  //     faculty.middle_name,
  //     faculty.last_name
  //   FROM
  //     faculty
  //   LEFT JOIN
  //     faculty_subject ON faculty.user_id = faculty_subject.user_id
  //   WHERE
  //     faculty.username != 'admin'
  // `;
  const sql = `
  SELECT 
    fs.subject_id,
    fm.subject_code, 
    fm.subject_description, 
    fs.subject_timeIn, 
    fs.subject_timeOut, 
    f.user_id,
    f.first_name,
    f.middle_name,
    f.last_name
  FROM 
    faculty f
  LEFT JOIN 
    faculty_subject fs ON f.user_id = fs.user_id
  LEFT JOIN 
    faculty_module fm ON fs.module_id = fm.module_id
  WHERE 
    f.username != 'admin';
`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching subjects:", err);
      return res.status(500).json({ error: "Failed to fetch subjects" });
    }

    res.json(results);
  });
});

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

app.get("/api/faculty", (req, res) => {
  const { dept_name } = req.query; // Get department name from query params

  let sql = `SELECT user_id, first_name, middle_name, last_name, username, dept_name FROM faculty WHERE role != 'admin'`;
  let params = [];

  if (dept_name && dept_name !== "ALL DEPT") {
    sql += ` AND dept_name = ?`;
    params.push(dept_name);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error fetching faculty records:", err);
      return res.status(500).json({ error: "Error fetching faculty records" });
    }
    res.status(200).json(results);
  });
});

app.get("/faculty/subjects/:user_id", (req, res) => {
  const { user_id } = req.params;
  const { filter } = req.query; // Get filter type (daily/monthly)
  let sql = `
    SELECT 
      fs.subject_id,
      fm.subject_code, 
      fm.subject_description, 
      fs.subject_timeIn, 
      fs.subject_timeOut,
      f.user_id,
      f.first_name,
      f.middle_name,
      f.last_name,
      f.dept_name,  -- Ensure dept_name exists in faculty table
      al.time_in,
      al.time_out,
      al.time_start_remarks,
      al.time_end_remarks
    FROM 
      faculty_subject fs
    JOIN 
      faculty f ON fs.user_id = f.user_id
    JOIN 
      faculty_module fm ON fs.module_id = fm.module_id
    JOIN 
      attendance_log al ON fs.subject_id = al.subject_id
    WHERE 
      f.user_id = ?;
  `;

  let params = [user_id];

  if (filter === "daily") {
    sql += ` AND DATE(al.time_in) = CURDATE()`;
  } else if (filter === "monthly") {
    sql += ` AND MONTH(al.time_in) = MONTH(CURDATE()) AND YEAR(al.time_in) = YEAR(CURDATE())`;
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error fetching faculty subject details:", err);
      return res
        .status(500)
        .json({ error: "Error fetching faculty subject details" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No attendance records found" });
    }

    return res.status(200).json(results);
  });
});

app.get("/teacher/attendance/:user_id", (req, res) => {
  const { user_id } = req.params;
  const { filter } = req.query; // Get filter type (daily/monthly)

  let sql = `
  SELECT 
    fm.subject_code, 
    fm.subject_description, 
    fs.subject_timeIn, 
    fs.subject_timeOut,
    f.user_id,
    f.first_name,
    f.middle_name,
    f.last_name,
    al.time_in,
    al.time_out,
    al.time_start_remarks,
    al.time_end_remarks
  FROM 
    faculty_subject fs
  JOIN 
    faculty f ON fs.user_id = f.user_id
  JOIN 
    faculty_module fm ON fs.module_id = fm.module_id
  JOIN 
    attendance_log al ON fs.subject_id = al.subject_id
  WHERE 
    f.user_id = ?
`;

  let params = [user_id];

  if (filter === "daily") {
    sql += ` AND DATE(al.time_in) = CURDATE()`;
  } else if (filter === "monthly") {
    sql += ` AND MONTH(al.time_in) = MONTH(CURDATE()) AND YEAR(al.time_in) = YEAR(CURDATE())`;
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error fetching faculty subject details:", err);
      return res
        .status(500)
        .json({ error: "Error fetching faculty subject details" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No attendance records found" });
    }

    return res.status(200).json(results);
  });
});

// Start the server on port 8081
app.listen(8081, "0.0.0.0", () => {
  console.log("Server is listening on port 8081");
});
