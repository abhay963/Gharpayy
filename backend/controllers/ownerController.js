import pool from "../config/db.js";

/* GET OWNERS FROM INVENTORY */

export const getOwners = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT DISTINCT owner_name
      FROM inventory
      ORDER BY owner_name
    `);

    res.json(result.rows);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Failed to fetch owners" });

  }

};


/* GET OWNER PROPERTIES */

export const getOwnerProperties = async (req, res) => {

  try {

    const { owner } = req.params;

    const result = await pool.query(
      "SELECT * FROM inventory WHERE owner_name=$1",
      [owner]
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Failed to fetch properties" });

  }

};