const db = require('../config/db');
const { v4: uuidv4 } = require("uuid");

exports.createmessage = async (req, res) => {
    const { category_id, message_text } = req.body;

    if (!category_id) {
        return res.status(400).json({ error: "Category ID is required" });
    }
    if (!message_text || message_text.trim() === "") {
        return res.status(400).json({ error: "Message text is required" });
    }

    const sanitizedMessage = message_text.replace(/\n/g, " ").trim();

    const id = uuidv4();

    try {
        await db.db1.execute(
            "INSERT INTO messages (id, category_id, message_text) VALUES (?, ?, ?)",
            [id, category_id, sanitizedMessage]
        );
        res.status(201).json({ message: "Message created successfully!", id });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Server is not responding" });
    }
};


exports.getMessages = async (req, res) => {
    try {
        const { category_id } = req.query; // Get category_id from query params

        let query = 'SELECT * FROM messages';
        let values = [];

        if (category_id) {
            query += ' WHERE category_id = ?';
            values.push(category_id);
        }

        const [messages] = await db.db1.execute(query, values);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Server is not responding" });
    }
};


exports.updateMessages = async (req, res) => {
    const { id, name, category_id, message_text } = req.body;

   
    if (!id) {
        return res.status(400).json({ error: "Message ID is required" });
    }
    if (!name) {
        return res.status(400).json({ error: "Title is required" });
    }
    if (!category_id) {
        return res.status(400).json({ error: "Category ID is required" });
    }
    if (!message_text) {
        return res.status(400).json({ error: "Message text is required" });
    }

    try {
        const [result] = await db1.execute(
            `UPDATE messages 
             SET name = ?, category_id = ?, message_text = ? 
             WHERE id = ?`,
            [name, category_id, message_text, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Message not found" });
        }

        res.status(200).json({ message: "Message updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server is not responding" });
    }
};

exports.deleteMessage = async (req, res) => {
    const { id } = req.body;
  
    if (!id) {
        return res.status(400).json({ error: "Message ID is required" });
    }
  
    try {
        const [result] = await db1.execute('DELETE FROM messages WHERE id = ?', [id]);
  
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Message not found" });
        }
  
        res.status(200).json({ message: "Message deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server is not responding" });
    }
  };
