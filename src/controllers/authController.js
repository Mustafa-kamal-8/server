const db = require('../config/db');
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

   
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const id = uuidv4();
    const role = "STAFF"; 
    const hashedPassword = await bcrypt.hash(password, 10); 

    try {
        await db.execute(
            "INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)",
            [id, name, email, hashedPassword, role]
        );

        res.status(201).json({ message: "User created successfully!", id });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Email already exists" });
        }
        res.status(500).json({ error: "Server is not responding" });
    }
};


exports.signInUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
    
        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = rows[0];

      
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

      
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                created_at: user.created_at
            },
            process.env.JWT_SECRET, 
            { expiresIn: "7d" } 
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};