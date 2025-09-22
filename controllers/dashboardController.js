const db = require('../config/db');

// Projects per company
exports.getProjects = (req, res) => {
  const { companyId } = req.params;
  const sql = `
    SELECT name, status, progress 
    FROM projects 
    WHERE company_id = ?`;
    
  db.query(sql, [companyId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ companyId, projects: results });
  });
};

// Tasks per company
exports.getTasks = (req, res) => {
  const { companyId } = req.params;
  const sql = `
    SELECT COUNT(*) AS total,
           SUM(status='completed') AS completed,
           SUM(status='pending') AS pending,
           SUM(status='overdue') AS overdue
    FROM tasks
    WHERE company_id = ?`;
    
  db.query(sql, [companyId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ companyId, tasks: results[0] });
  });
};

// Meetings per company
exports.getMeetings = (req, res) => {
  const { companyId } = req.params;
  const sql = `
    SELECT title, date, status 
    FROM meetings
    WHERE company_id = ?`;
    
  db.query(sql, [companyId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ companyId, meetings: results });
  });
};

// Finances per company
exports.getFinances = (req, res) => {
  const { companyId } = req.params;
  const sql = `
    SELECT SUM(revenue) AS totalRevenue,
           SUM(expenses) AS totalExpenses,
           SUM(revenue - expenses) AS netProfit
    FROM finances
    WHERE company_id = ?`;
    
  db.query(sql, [companyId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ companyId, finances: results[0] });
  });
};

// Clients per company
exports.getClients = (req, res) => {
  const { companyId } = req.params;
  const sql = `
    SELECT name, status 
    FROM clients
    WHERE company_id = ?`;
    
  db.query(sql, [companyId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ companyId, clients: results });
  });
};

// Combined dashboard endpoint
exports.getCompanyDashboard = async (req, res) => {
  const { companyId } = req.params;

  try {
    const [projects] = await db.promise().query(
      "SELECT name, status, progress FROM projects WHERE company_id = ?", 
      [companyId]
    );
    const [tasks] = await db.promise().query(
      "SELECT COUNT(*) AS total, SUM(status='completed') AS completed, SUM(status='pending') AS pending, SUM(status='overdue') AS overdue FROM tasks WHERE company_id = ?", 
      [companyId]
    );
    const [meetings] = await db.promise().query(
      "SELECT title, date, status FROM meetings WHERE company_id = ?", 
      [companyId]
    );
    const [finances] = await db.promise().query(
      "SELECT SUM(revenue) AS totalRevenue, SUM(expenses) AS totalExpenses, SUM(revenue - expenses) AS netProfit FROM finances WHERE company_id = ?", 
      [companyId]
    );
    const [clients] = await db.promise().query(
      "SELECT name, status FROM clients WHERE company_id = ?", 
      [companyId]
    );

    res.json({
      companyId,
      projects,
      tasks: tasks[0],
      meetings,
      finances: finances[0],
      clients
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
