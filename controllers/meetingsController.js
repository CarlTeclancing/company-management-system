const db = require('../config/db');

// Controller: Get all meetings
exports.getAllMeetings = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM meetings');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller: Get project by company ID
exports.getMeetingById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching meetings for company ID:', id);

    const [results] = await db.query('SELECT * FROM meetings WHERE company_id = ?', [id]);

    console.log('Query Results:', results);

    if (results.length === 0) {
      console.log('No meetings found.');
      return res.status(404).json({ message: 'No meetings found for this company.' });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error('Error during DB query:', err);
    res.status(500).json({ error: err.message });
  }
};

// Controller: Create a new project
exports.createMeeting = async (req, res) => {
  try {
    const {
        title,
        date,
        startTime,
        endTime,
        meetingType,
        platform,
        meetingLink,
        user_id,
        company_id,
    } = req.body;

    const sql = `
      INSERT INTO meetings 
      (name, description, start_date, end_date, team, budget, created_by, company_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, description, sdate, edate, team, budget, user_id, company_id];

    const [result] = await db.query(sql, values);

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project: {
        id: result.insertId,
        name,
        description,
        start_date: sdate,
        end_date: edate,
        team,
        budget,
        created_by: user_id,
        company_id,
      },
    });
  } catch (error) {
    console.error("Unexpected error in createProject:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: error.message,
    });
  }
};

// Controller: Update project
exports.updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, startDate, endDate, status, createdBy } = req.body;

    await db.query(
      'UPDATE meetings SET name = ?, description = ?, start_date = ?, end_date = ?, status = ?, created_by = ? WHERE id = ?',
      [name, description, startDate, endDate, status, createdBy, id]
    );

    res.status(200).json({ message: 'Project updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller: Delete project
exports.deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM meetings WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
