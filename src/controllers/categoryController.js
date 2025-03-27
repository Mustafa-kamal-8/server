const db = require('../config/db');
const { v4: uuidv4 } = require("uuid");

exports.createCategory = async (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }
  
    const id = uuidv4(); 
  
    try {
      await db.execute("INSERT INTO category (id, name) VALUES (?, ?)", [id, name]);
      res.status(201).json({ message: "Category created successfully!", id });
    } catch (error) {
      res.status(500).json({ error: "Server is not responding" });
    }
  };

exports.getCategory = async (req, res) => {
    try {
        const [messages] = await db.execute('SELECT * FROM category');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error:"Server is not responding"   });
    }
};


exports.updateCategory = async (req, res) => {
  const { id, name } = req.body;

  if (!id) {
      return res.status(400).json({ error: "Category ID and is required" });
  }

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
}

  try {
      const [result] = await db.execute('UPDATE category SET name = ? WHERE id = ?', [name, id]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json({ message: "Category updated successfully!" });
  } catch (error) {
      res.status(500).json({ error: "Server is not responding"  });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.body;

  if (!id) {
      return res.status(400).json({ error: "Category ID is required" });
  }

  try {
      const [result] = await db.execute('DELETE FROM category WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
      res.status(500).json({ error: "Server is not responding" });
  }
};