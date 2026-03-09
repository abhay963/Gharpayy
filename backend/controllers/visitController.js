import pool from "../config/db.js";

export const scheduleVisit = async (req, res) => {
  try {

    const { lead_id, property_name, visit_date, visit_time } = req.body;

    const result = await pool.query(
      "INSERT INTO visits (lead_id, property_name, visit_date, visit_time) VALUES ($1,$2,$3,$4) RETURNING *",
      [lead_id, property_name, visit_date, visit_time]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error scheduling visit" });
  }
};


export const getVisitsByLead = async (req, res) => {

  try {

    const leadId = req.params.leadId;

    const result = await pool.query(
      "SELECT * FROM visits WHERE lead_id=$1",
      [leadId]
    );

    res.json(result.rows);

  } catch (error) {

    res.status(500).json({ message: "Error fetching visits" });

  }

};


export const updateVisitOutcome = async (req, res) => {

  try {

    const visitId = req.params.id;
    const { outcome } = req.body;

    const result = await pool.query(
      "UPDATE visits SET outcome=$1 WHERE id=$2 RETURNING *",
      [outcome, visitId]
    );

    res.json(result.rows[0]);

  } catch (error) {

    res.status(500).json({ message: "Error updating outcome" });

  }

};