const db = require('../config/db');
const { v4: uuidv4 } = require("uuid");

exports.createmessge = async (req, res) => {
    const { name , category_id , message_text} = req.body;
  
    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    if (!category_id) {
        return res.status(400).json({ error: "Category ID is required" });
    }
    if (!message_text || message_text.trim() === "") {
        return res.status(400).json({ error: "Message text is required" });
    }
  
    const id = uuidv4(); 
  
    try {
      await db.execute("INSERT INTO messages (id, name) VALUES (?, ?)", [id, name ,category_id ,message_text]);
      res.status(201).json({ message: "Message created successfully!", id });
    } catch (error) {
      res.status(500).json({ error: "Server is not responding" });
    }
  };

  exports.getMessages = async (req, res) => {
    try {
        const [messages] = await db.execute('SELECT * FROM messages');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error:"Server is not responding"  });
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
        const [result] = await db.execute(
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
        const [result] = await db.execute('DELETE FROM messages WHERE id = ?', [id]);
  
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Message not found" });
        }
  
        res.status(200).json({ message: "Message deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server is not responding" });
    }
  };
