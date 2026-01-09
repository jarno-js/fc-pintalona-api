import pool from '../config/database.js';

// GET /api/players - Get all players met paginatie en sortering
export const getAllPlayers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;
    const sortBy = req.query.sortBy || 'id';
    const order = req.query.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const position = req.query.position;
    const active = req.query.active;

    // Valideer sortBy om SQL injection te voorkomen
    const validSortFields = ['id', 'name', 'jersey_number', 'position', 'birth_date', 'created_at'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'id';

    let query = 'SELECT * FROM players WHERE 1=1';
    const params = [];

    // Filter op positie
    if (position) {
      query += ' AND position = ?';
      params.push(position);
    }

    // Filter op actief/inactief
    if (active !== undefined) {
      query += ' AND active = ?';
      params.push(active === 'true' || active === '1');
    }

    // Sorteer en pagineer
    query += ` ORDER BY ${sortField} ${order} LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [players] = await pool.query(query, params);

    // Tel totaal aantal voor paginatie info
    let countQuery = 'SELECT COUNT(*) as total FROM players WHERE 1=1';
    const countParams = [];
    if (position) {
      countQuery += ' AND position = ?';
      countParams.push(position);
    }
    if (active !== undefined) {
      countQuery += ' AND active = ?';
      countParams.push(active === 'true' || active === '1');
    }

    const [countResult] = await pool.query(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      data: players,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van spelers' });
  }
};

// GET /api/players/search - Zoek spelers op naam
export const searchPlayers = async (req, res) => {
  try {
    const { name, position } = req.query;

    if (!name && !position) {
      return res.status(400).json({ error: 'Geef minimaal een zoekterm op (name of position)' });
    }

    let query = 'SELECT * FROM players WHERE 1=1';
    const params = [];

    if (name) {
      query += ' AND name LIKE ?';
      params.push(`%${name}%`);
    }

    if (position) {
      query += ' AND position = ?';
      params.push(position);
    }

    query += ' ORDER BY name ASC';

    const [players] = await pool.query(query, params);
    res.json(players);
  } catch (error) {
    console.error('Error searching players:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het zoeken' });
  }
};

// GET /api/players/:id - Get een specifieke speler
export const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    const [players] = await pool.query('SELECT * FROM players WHERE id = ?', [id]);

    if (players.length === 0) {
      return res.status(404).json({ error: 'Speler niet gevonden' });
    }

    res.json(players[0]);
  } catch (error) {
    console.error('Error fetching player:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van de speler' });
  }
};

// GET /api/players/:id/stats - Get alle statistieken van een speler
export const getPlayerStats = async (req, res) => {
  try {
    const { id } = req.params;

    // Check of speler bestaat
    const [players] = await pool.query('SELECT * FROM players WHERE id = ?', [id]);
    if (players.length === 0) {
      return res.status(404).json({ error: 'Speler niet gevonden' });
    }

    // Haal alle match stats op voor deze speler
    const [stats] = await pool.query(`
      SELECT
        ms.*,
        m.match_date,
        m.opponent,
        m.pintalona_score,
        m.opponent_score
      FROM match_stats ms
      JOIN matches m ON ms.match_id = m.id
      WHERE ms.player_id = ?
      ORDER BY m.match_date DESC
    `, [id]);

    // Bereken totale statistieken
    const totalStats = stats.reduce((acc, stat) => {
      acc.total_goals += stat.goals;
      acc.total_assists += stat.assists;
      acc.total_yellow_cards += stat.yellow_cards;
      acc.total_red_cards += stat.red_cards;
      acc.total_minutes_played += stat.minutes_played;
      acc.man_of_the_match_awards += stat.man_of_the_match ? 1 : 0;
      return acc;
    }, {
      total_goals: 0,
      total_assists: 0,
      total_yellow_cards: 0,
      total_red_cards: 0,
      total_minutes_played: 0,
      man_of_the_match_awards: 0,
      matches_played: stats.length
    });

    res.json({
      player: players[0],
      total_stats: totalStats,
      match_history: stats
    });
  } catch (error) {
    console.error('Error fetching player stats:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van statistieken' });
  }
};

// GET /api/players/:id/injuries - Get blessures van een speler
export const getPlayerInjuries = async (req, res) => {
  try {
    const { id } = req.params;

    // Check of speler bestaat
    const [players] = await pool.query('SELECT * FROM players WHERE id = ?', [id]);
    if (players.length === 0) {
      return res.status(404).json({ error: 'Speler niet gevonden' });
    }

    const [injuries] = await pool.query(
      'SELECT * FROM injuries WHERE player_id = ? ORDER BY injury_date DESC',
      [id]
    );

    res.json({
      player: players[0],
      injuries
    });
  } catch (error) {
    console.error('Error fetching player injuries:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van blessures' });
  }
};

// POST /api/players - Nieuwe speler aanmaken
export const createPlayer = async (req, res) => {
  try {
    const { name, jersey_number, position, birth_date, active } = req.body;

    // Check of rugnummer al bestaat (indien opgegeven)
    if (jersey_number) {
      const [existing] = await pool.query(
        'SELECT id FROM players WHERE jersey_number = ?',
        [jersey_number]
      );
      if (existing.length > 0) {
        return res.status(400).json({ error: 'Dit rugnummer is al in gebruik' });
      }
    }

    const [result] = await pool.query(
      'INSERT INTO players (name, jersey_number, position, birth_date, active) VALUES (?, ?, ?, ?, ?)',
      [name, jersey_number || null, position || null, birth_date || null, active !== undefined ? active : true]
    );

    const [newPlayer] = await pool.query('SELECT * FROM players WHERE id = ?', [result.insertId]);

    res.status(201).json(newPlayer[0]);
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het aanmaken van de speler' });
  }
};

// PUT /api/players/:id - Speler updaten
export const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, jersey_number, position, birth_date, active } = req.body;

    // Check of speler bestaat
    const [players] = await pool.query('SELECT * FROM players WHERE id = ?', [id]);
    if (players.length === 0) {
      return res.status(404).json({ error: 'Speler niet gevonden' });
    }

    // Check of rugnummer al in gebruik is (door een andere speler)
    if (jersey_number) {
      const [existing] = await pool.query(
        'SELECT id FROM players WHERE jersey_number = ? AND id != ?',
        [jersey_number, id]
      );
      if (existing.length > 0) {
        return res.status(400).json({ error: 'Dit rugnummer is al in gebruik' });
      }
    }

    await pool.query(
      'UPDATE players SET name = ?, jersey_number = ?, position = ?, birth_date = ?, active = ? WHERE id = ?',
      [name, jersey_number || null, position || null, birth_date || null, active !== undefined ? active : true, id]
    );

    const [updatedPlayer] = await pool.query('SELECT * FROM players WHERE id = ?', [id]);
    res.json(updatedPlayer[0]);
  } catch (error) {
    console.error('Error updating player:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het updaten van de speler' });
  }
};

// DELETE /api/players/:id - Speler verwijderen
export const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    // Check of speler bestaat
    const [players] = await pool.query('SELECT * FROM players WHERE id = ?', [id]);
    if (players.length === 0) {
      return res.status(404).json({ error: 'Speler niet gevonden' });
    }

    // DELETE CASCADE zorgt ervoor dat gerelateerde records ook verwijderd worden
    await pool.query('DELETE FROM players WHERE id = ?', [id]);

    res.json({ message: 'Speler succesvol verwijderd' });
  } catch (error) {
    console.error('Error deleting player:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het verwijderen van de speler' });
  }
};
