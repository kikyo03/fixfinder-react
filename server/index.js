// import express from "express";
// import mysql from "mysql";
// import cors from "cors";
// import multer from "multer";
// import path from "path";
// import bcrypt from "bcryptjs"; // Import bcryptjs for password hashing
// import jwt from "jsonwebtoken";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Set up Multer storage to save uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// // MySQL connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "booktest",
// });

// // Register new user
// app.post("/register", async (req, res) => {
//   const { fname, lname, email, password } = req.body;

//   // Generate unique UID
//   const customUid = Math.floor(10000000 + Math.random() * 90000000);

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const q = "INSERT INTO users (fname, lname, email, password, role, customUid) VALUES (?)";
//   const values = [fname, lname, email, hashedPassword, "student", customUid];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json({ message: "User registered successfully!" });
//   });
// });

// // Login user route
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   // Check if the user exists in the database
//   const query = "SELECT * FROM users WHERE email = ?";
//   db.query(query, [email], async (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ message: "Database error" });
//     }
//     if (result.length === 0) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Compare the password with the hashed password stored in the database
//     const user = result[0];
//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return res.status(400).json({ message: "Incorrect password" });
//     }

//     // Generate a JWT token for the user
//     const token = jwt.sign({ id: user.id, email: user.email }, "your-secret-key", {
//       expiresIn: "1h",
//     });

//     res.status(200).json({ message: "Login successful", token });
//   });
// });

// // Middleware to verify JWT token
// // const verifyToken = (req, res, next) => {
// //   const token = req.headers.authorization?.split(" ")[1]; // Extract token after "Bearer"

// //   if (!token) {
// //     return res.status(403).json({ message: "No token provided" });
// //   }

// //   jwt.verify(token, "your-secret-key", (err, decoded) => {
// //     if (err) {
// //       return res.status(401).json({ message: "Invalid or expired token" });
// //     }

// //     req.user = decoded; // Store the decoded user data in the request object
// //     next();
// //   });
// // };

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Extract token after "Bearer"

//   if (!token) {
//     return res.status(403).json({ message: "No token provided" });
//   }

//   jwt.verify(token, "your-secret-key", (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }

//     console.log("Decoded Token:", decoded); // Debug to check decoded token data
//     req.user = decoded; // Store the decoded user data in the request object
//     next();
//   });
// };



// // Route to fetch user data
// app.get("/user", verifyToken, (req, res) => {
//   const userId = req.user.id;

//   // Query to get user data from the database
//   const query = "SELECT * FROM users WHERE id = ?";
//   db.query(query, [userId], (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: "Database error" });
//     }

//     if (result.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Return user data excluding the password
//     const user = result[0];
//     delete user.password;
//     res.status(200).json(user);
//   });
// });

// // Update user data
// app.put("/user", verifyToken, (req, res) => {
//   const userId = req.user.id;
//   const { fname, lname } = req.body;

//   const query = "UPDATE users SET fname = ?, lname = ? WHERE id = ?";
//   db.query(query, [fname, lname, userId], (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: "Database error" });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "Profile updated successfully!" });
//   });
// });

// app.post("/report", upload.single("image"), (req, res) => {
//   // Get data from the request body and uploaded file
//   const { title, details, type, coordinates, floor, pinId, user_uid, name } = req.body;
//   const status = "Pending"; // Status is fixed as "Pending" by default
//   const image = req.file ? req.file.filename : "default-image.png"; // Get the filename of the uploaded image

//   // Insert new report data into the database
//   const q = `
//     INSERT INTO reports
//     (title, details, type, status, coordinates, floor, pinId, user_uid, name, image) 
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;
//   const values = [title, details, type, status, coordinates, floor, pinId, user_uid, name, image]; // Include the filename of the uploaded image

//   db.query(q, values, (err, data) => {
//     if (err) return res.status(500).send(err);
//     return res.status(201).json({ message: "Report submitted successfully!", data });
//   });
// });

// // Fetch reports route
// // app.get("/reports", (req, res) => {
// //   const query = "SELECT image, title, details, type, status, name FROM reports";

// //   db.query(query, (err, results) => {
// //     if (err) {
// //       return res.status(500).json({ message: "Database error" });
// //     }

// //     // Send the reports data to the client
// //     res.status(200).json(results);
// //   });
// // });

// app.get('/reports', verifyToken, async (req, res) => {
//   const userId = req.query.uid;

//   if (!userId || userId !== req.user.uid) {
//     return res.status(403).json({ error: "Access denied" });
//   }

//   try {
//     const reports = await getReportsForUser(userId);
//     res.json(reports);
//   } catch (error) {
//     console.error("Error fetching reports:", error);
//     res.status(500).json({ error: "An error occurred while fetching reports" });
//   }
// });


// app.use("/uploads", express.static("uploads"));


// // Start the server
// app.listen(8800, () => {
//   console.log("Connected to backend.");
// });


import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";
import bcrypt from "bcryptjs"; // For password hashing
import jwt from "jsonwebtoken"; // For JWT generation and validation

const app = express();
app.use(cors());
app.use(express.json());

// Set up Multer storage to save uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "booktest",
});

// Utility function to fetch reports for a specific user
const getReportsForUser = (userId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT image, title, details, type, status, name FROM reports WHERE user_uid = ?";
    db.query(query, [userId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Register new user
app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  // Generate unique UID
  const customUid = Math.floor(10000000 + Math.random() * 90000000);

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const q = "INSERT INTO users (fname, lname, email, password, role, customUid) VALUES (?)";
  const values = [fname, lname, email, hashedPassword, "student", customUid];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "User registered successfully!" });
  });
});

// Login user route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate a JWT token for the user
    const token = jwt.sign(
      { id: user.customUid, email: user.email },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decoded; // Store decoded user data in the request object
    next();
  });
};

// Route to fetch user data
app.get("/user", verifyToken, (req, res) => {
  const userId = req.user.id;

  const query = "SELECT * FROM users WHERE customUid = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result[0];
    delete user.password;
    res.status(200).json(user);
  });
});

// Route to update user data
app.put("/user", verifyToken, (req, res) => {
  const userId = req.user.id;
  const { fname, lname } = req.body;

  const query = "UPDATE users SET fname = ?, lname = ? WHERE customUid = ?";
  db.query(query, [fname, lname, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully!" });
  });
});

// Route to submit a new report
app.post("/report", upload.single("image"), (req, res) => {
  const { title, details, type, coordinates, floor, pinId, user_uid, name } = req.body;
  const status = "Pending";
  const image = req.file ? req.file.filename : "default-image.png";

  const q = `
    INSERT INTO reports
    (title, details, type, status, coordinates, floor, pinId, user_uid, name, image) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [title, details, type, status, coordinates, floor, pinId, user_uid, name, image];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(201).json({ message: "Report submitted successfully!", data });
  });
});

// Route to fetch reports for the logged-in user
app.get("/reports", verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const reports = await getReportsForUser(userId);
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "An error occurred while fetching reports" });
  }
});

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Start the server
app.listen(8800, () => {
  console.log("Connected to backend.");
});
