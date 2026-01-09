import pool from '../config/database.js';

// GET /api/injuries - Get alle blessures
export const getAllInjuries = async (req, res) => {
  try {
    const [injuries] = await pool.query(
      `SELECT
        i.*,
        p.name as player_name,
        p.jersey_number,
        p.position
      FROM injuries i
      JOIN players p ON i.player_id = p.id
      ORDER BY i.injury_date DESC`
    );

    res.json(injuries);
  } catch (error) {
    console.error('Error fetching injuries:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van blessures' });
  }
};

// GET /api/injuries/active - Get alleen actieve blessures
export const getActiveInjuries = async (req, res) => {
  try {
    const [injuries] = await pool.query(
      `SELECT
        i.*,
        p.name as player_name,
        p.jersey_number,
        p.position
      FROM injuries i
      JOIN players p ON i.player_id = p.id
      WHERE i.status IN ('active', 'recovering')
      ORDER BY i.injury_date DESC`
    );

    res.json(injuries);
  } catch (error) {
    console.error('Error fetching active injuries:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van actieve blessures' });
  }
};

// POST /api/injuries - Nieuwe blessure aanmaken
export const createInjury = async (req, res) => {
  try {
    const {
      player_id,
      injury_type,
      description,
      injury_date,
      expected_return_date,
      actual_return_date,
      status
    } = req.body;

    // Check of speler bestaat
    const [players] = await pool.query('SELECT * FROM players WHERE id = ?', [player_id]);
    if (players.length === 0) {
      return res.status(404).json({ error: 'Speler niet gevonden' });
    }

    const [result] = await pool.query(
      `INSERT INTO injuries
       (player_id, injury_type, description, injury_date, expected_return_date, actual_return_date, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        player_id,
        injury_type,
        description || null,
        injury_date,
        expected_return_date || null,
        actual_return_date || null,
        status || 'active'
      ]
    );

    const [newInjury] = await pool.query(
      `SELECT i.*, p.name as player_name, p.jersey_number, p.position
       FROM injuries i
       JOIN players p ON i.player_id = p.id
       WHERE i.id = ?`,
      [result.insertId]
    );

    res.status(201).json(newInjury[0]);
  } catch (error) {
    console.error('Error creating injury:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het aanmaken van de blessure' });
  }
};

// PUT /api/injuries/:id - Blessure updaten
export const updateInjury = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      injury_type,
      description,
      injury_date,
      expected_return_date,
      actual_return_date,
      status
    } = req.body;

    // Check of blessure bestaat
    const [injuries] = await pool.query('SELECT * FROM injuries WHERE id = ?', [id]);
    if (injuries.length === 0) {
      return res.status(404).json({ error: 'Blessure niet gevonden' });
    }

    const current = injuries[0];

    await pool.query(
      `UPDATE injuries
       SET injury_type = ?, description = ?, injury_date = ?,
           expected_return_date = ?, actual_return_date = ?, status = ?
       WHERE id = ?`,
      [
        injury_type !== undefined ? injury_type : current.injury_type,
        description !== undefined ? description : current.description,
        injury_date !== undefined ? injury_date : current.injury_date,
        expected_return_date !== undefined ? expected_return_date : current.expected_return_date,
        actual_return_date !== undefined ? actual_return_date : current.actual_return_date,
        status !== undefined ? status : current.status,
        id
      ]
    );

    const [updatedInjury] = await pool.query(
      `SELECT i.*, p.name as player_name, p.jersey_number, p.position
       FROM injuries i
       JOIN players p ON i.player_id = p.id
       WHERE i.id = ?`,
      [id]
    );

    res.json(updatedInjury[0]);
  } catch (error) {
    console.error('Error updating injury:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het updaten van de blessure' });
  }
};

// DELETE /api/injuries/:id - Blessure verwijderen
export const deleteInjury = async (req, res) => {
  try {
    const { id } = req.params;

    // Check of blessure bestaat
    const [injuries] = await pool.query('SELECT * FROM injuries WHERE id = ?', [id]);
    if (injuries.length === 0) {
      return res.status(404).json({ error: 'Blessure niet gevonden' });
    }

    await pool.query('DELETE FROM injuries WHERE id = ?', [id]);
    res.json({ message: 'Blessure succesvol verwijderd' });
  } catch (error) {
    console.error('Error deleting injury:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het verwijderen van de blessure' });
  }
};
