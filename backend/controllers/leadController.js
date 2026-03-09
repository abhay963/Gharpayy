import pool from "../config/db.js";

/* CREATE LEAD */
export const createLead = async (req, res) => {
  try {
    const { name, phone, source, assigned_agent } = req.body;

    const result = await pool.query(
      `INSERT INTO leads (name, phone, source, assigned_agent)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [name, phone, source, assigned_agent]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create lead" });
  }
};


/* GET ALL LEADS */
export const getLeads = async (req, res) => {
  try {

    const result = await pool.query(
      `SELECT * FROM leads ORDER BY created_at DESC`
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
};


/* GET RECENT LEADS (FOR DASHBOARD) */
export const getRecentLeads = async (req, res) => {
  try {

    const result = await pool.query(
      `SELECT * FROM leads
       ORDER BY created_at DESC
       LIMIT 8`
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recent leads" });
  }
};


/* UPDATE STATUS */
export const updateLeadStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE leads
       SET status=$1
       WHERE id=$2
       RETURNING *`,
      [status, id]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update status" });
  }
};