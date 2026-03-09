import pool from "../config/db.js";

/* GET ALL INVENTORY */

export const getInventory = async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT * FROM inventory ORDER BY created_at DESC"
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Failed to fetch inventory" });

  }

};


/* ADD PROPERTY */

export const addInventory = async (req, res) => {

  try {

    const {
      owner_name,
      property_name,
      location,
      property_type,
      price
    } = req.body;

    const result = await pool.query(
      `INSERT INTO inventory
      (owner_name, property_name, location, property_type, price)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [owner_name, property_name, location, property_type, price]
    );

    res.json(result.rows[0]);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Failed to add property" });

  }

};


/* DELETE PROPERTY */

export const deleteInventory = async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM inventory WHERE id=$1",
      [id]
    );

    res.json({ message: "Property deleted" });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Failed to delete property" });

  }

};