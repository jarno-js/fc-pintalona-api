import pool from '../config/database.js';

// GET /api/matches - Get alle wedstrijden met paginatie en filters
export const getAllMatches = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;
    const sortBy = req.query.sortBy || 'match_date';
    const order = req.query.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const status = req.query.status;

    // Valideer sortBy om SQL injection te voorkomen
    const validSortFields = ['id', 'match_date', 'opponent', 'status', 'created_at'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'match_date';

    let query = 'SELECT * FROM matches WHERE 1=1';
    const params = [];

    // Filter op status
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    // Sorteer en pagineer
    query += ` ORDER BY ${sortField} ${order} LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [matches] = await pool.query(query, params);

    // Tel totaal aantal
    let countQuery = 'SELECT COUNT(*) as total FROM matches WHERE 1=1';
    const countParams = [];
    if (status) {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }

    const [countResult] = await pool.query(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      data: matches,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van wedstrijden' });
  }
};

// GET /api/matches/search - Zoek wedstrijden
export const searchMatches = async (req, res) => {
  try {
    const { opponent, date, status } = req.query;

    if (!opponent && !date && !status) {
      return res.status(400).json({ error: 'Geef minimaal een zoekterm op (opponent, date, of status)' });
    }

    let query = 'SELECT * FROM matches WHERE 1=1';
    const params = [];

    if (opponent) {
      query += ' AND opponent LIKE ?';
      params.push(`%${opponent}%`);
    }

    if (date) {
      query += ' AND match_date = ?';
      params.push(date);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY match_date DESC';

    const [matches] = await pool.query(query, params);
    res.json(matches);
  } catch (error) {
    console.error('Error searching matches:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het zoeken' });
  }
};

// GET /api/matches/upcoming - Get aankomende wedstrijden
export const getUpcomingMatches = async (req, res) => {
  try {
    const [matches] = await pool.query(
      `SELECT * FROM matches
       WHERE status = 'scheduled' AND match_date >= CURDATE()
       ORDER BY match_date ASC`
    );
    res.json(matches);
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van aankomende wedstrijden' });
  }
};

// GET /api/matches/completed - Get afgeronde wedstrijden
export const getCompletedMatches = async (req, res) => {
  try {
    const [matches] = await pool.query(
      `SELECT * FROM matches
       WHERE status = 'completed'
       ORDER BY match_date DESC`
    );
    res.json(matches);
  } catch (error) {
    console.error('Error fetching completed matches:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van afgeronde wedstrijden' });
  }
};

// GET /api/matches/:id - Get een specifieke wedstrijd
export const getMatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const [matches] = await pool.query('SELECT * FROM matches WHERE id = ?', [id]);

    if (matches.length === 0) {
      return res.status(404).json({ error: 'Wedstrijd niet gevonden' });
    }

    res.json(matches[0]);
  } catch (error) {
    console.error('Error fetching match:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van de wedstrijd' });
  }
};

// POST /api/matches - Nieuwe wedstrijd aanmaken
export const createMatch = async (req, res) => {
  try {
    const {
      match_date,
      match_time,
      opponent,
      location,
      home_away,
      competition,
      pintalona_score,
      opponent_score,
      status,
      notes
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO matches
       (match_date, match_time, opponent, location, home_away, pintalona_score, opponent_score, status, competition, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        match_date,
        match_time || null,
        opponent,
        location || 'Schepdaal',
        home_away || 'home',
        pintalona_score !== undefined ? pintalona_score : null,
        opponent_score !== undefined ? opponent_score : null,
        status || 'scheduled',
        competition || 'SuperLeague',
        notes || null
      ]
    );

    const [newMatch] = await pool.query('SELECT * FROM matches WHERE id = ?', [result.insertId]);
    res.status(201).json(newMatch[0]);
  } catch (error) {
    console.error('Error creating match:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het aanmaken van de wedstrijd' });
  }
};

// PUT /api/matches/:id - Wedstrijd updaten
export const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      match_date,
      match_time,
      opponent,
      location,
      home_away,
      competition,
      pintalona_score,
      opponent_score,
      status,
      notes
    } = req.body;

    // Check of wedstrijd bestaat
    const [matches] = await pool.query('SELECT * FROM matches WHERE id = ?', [id]);
    if (matches.length === 0) {
      return res.status(404).json({ error: 'Wedstrijd niet gevonden' });
    }

    await pool.query(
      `UPDATE matches
       SET match_date = ?, match_time = ?, opponent = ?, location = ?,
           home_away = ?, competition = ?, pintalona_score = ?, opponent_score = ?, status = ?, notes = ?
       WHERE id = ?`,
      [
        match_date,
        match_time || null,
        opponent,
        location || 'Schepdaal',
        home_away || 'home',
        competition || 'SuperLeague',
        pintalona_score !== undefined ? pintalona_score : null,
        opponent_score !== undefined ? opponent_score : null,
        status || 'scheduled',
        notes || null,
        id
      ]
    );

    const [updatedMatch] = await pool.query('SELECT * FROM matches WHERE id = ?', [id]);
    res.json(updatedMatch[0]);
  } catch (error) {
    console.error('Error updating match:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het updaten van de wedstrijd' });
  }
};

// DELETE /api/matches/:id - Wedstrijd verwijderen
export const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;

    // Check of wedstrijd bestaat
    const [matches] = await pool.query('SELECT * FROM matches WHERE id = ?', [id]);
    if (matches.length === 0) {
      return res.status(404).json({ error: 'Wedstrijd niet gevonden' });
    }

    await pool.query('DELETE FROM matches WHERE id = ?', [id]);
    res.json({ message: 'Wedstrijd succesvol verwijderd' });
  } catch (error) {
    console.error('Error deleting match:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het verwijderen van de wedstrijd' });
  }
};
