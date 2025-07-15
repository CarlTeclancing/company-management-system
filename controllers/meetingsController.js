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
  if (!title || !date || !startTime || !endTime || !meetingType || !platform || !meetingLink || !user_id || !company_id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO meetings (title, date, start_time, end_time, type, platform, meeting_link, scheduled_by, date_time, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, date, startTime, endTime, meetingType, platform, meetingLink, user_id, new Date(), company_id]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller: Update project
exports.updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;
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
    await db.query(
      'UPDATE meetings SET title = ?, date = ?, start_time = ?, end_time = ?, type = ?, platform = ?, meeting_link = ?, scheduled_by = ?, date_time = ?, company_id = ? WHERE id = ?',
      [title, date, startTime, endTime, meetingType, platform, meetingLink, user_id, new Date(), company_id]
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
