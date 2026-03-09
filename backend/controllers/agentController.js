import pool from "../config/db.js";

/* ADD AGENT */
export const addAgent = async (req, res) => {
  try {
    const { name, email } = req.body;

    const result = await pool.query(
      "INSERT INTO agents (name, email) VALUES ($1,$2) RETURNING *",
      [name, email]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add agent" });
  }
};

/* GET ALL AGENTS */
export const getAgents = async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM agents ORDER BY created_at DESC"
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch agents" });
  }
};

/* DELETE AGENT */
export const deleteAgent = async (req, res) => {
  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM agents WHERE id=$1",
      [id]
    );

    res.json({ message: "Agent deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete agent" });
  }
};