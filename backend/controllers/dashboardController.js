import pool from "../config/db.js";

export const getDashboardStats = async (req, res) => {
  try {

    const totalLeads = await pool.query(
      "SELECT COUNT(*) FROM leads"
    );

    const pipelineStats = await pool.query(
      "SELECT status, COUNT(*) FROM leads GROUP BY status"
    );

    const totalVisits = await pool.query(
      "SELECT COUNT(*) FROM visits"
    );

    const bookings = await pool.query(
      "SELECT COUNT(*) FROM leads WHERE status='Booked'"
    );

    res.json({
      total_leads: totalLeads.rows[0].count,
      pipeline: pipelineStats.rows,
      visits_scheduled: totalVisits.rows[0].count,
      bookings_confirmed: bookings.rows[0].count
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};