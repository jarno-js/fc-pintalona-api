import pool from '../config/database.js';

// GET /api/matches/:id/stats - Get alle stats van een wedstrijd
export const getMatchStats = async (req, res) => {
  try {
    const { id } = req.params;

    // Check of wedstrijd bestaat
    const [matches] = await pool.query('SELECT * FROM matches WHERE id = ?', [id]);
    if (matches.length === 0) {
      return res.status(404).json({ error: 'Wedstrijd niet gevonden' });
    }

    // Haal alle stats op met spelersinformatie
    const [stats] = await pool.query(
      `SELECT
        ms.*,
        p.name as player_name,
        p.jersey_number,
        p.position
      FROM match_stats ms
      JOIN players p ON ms.player_id = p.id
      WHERE ms.match_id = ?
      ORDER BY ms.goals DESC, ms.assists DESC`,
      [id]
    );

    res.json({
      match: matches[0],
      stats
    });
  } catch (error) {
    console.error('Error fetching match stats:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van wedstrijdstatistieken' });
  }
};

// POST /api/matches/:id/stats - Statistieken toevoegen voor een speler in deze wedstrijd
export const createMatchStats = async (req, res) => {
  try {
    const matchId = req.params.id;
    const {
      player_id,
      goals,
      assists,
      yellow_cards,
      red_cards,
      minutes_played,
      man_of_the_match
    } = req.body;

    // Check of wedstrijd bestaat
    const [matches] = await pool.query('SELECT * FROM matches WHERE id = ?', [matchId]);
    if (matches.length === 0) {
      return res.status(404).json({ error: 'Wedstrijd niet gevonden' });
    }

    // Check of speler bestaat
    const [players] = await pool.query('SELECT * FROM players WHERE id = ?', [player_id]);
    if (players.length === 0) {
      return res.status(404).json({ error: 'Speler niet gevonden' });
    }

    // Check of deze speler al stats heeft voor deze wedstrijd
    const [existing] = await pool.query(
      'SELECT id FROM match_stats WHERE player_id = ? AND match_id = ?',
      [player_id, matchId]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        error: 'Deze speler heeft al statistieken voor deze wedstrijd. Gebruik PUT om te updaten.'
      });
    }

    // Als man_of_the_match true is, zet alle andere man_of_the_match voor deze match op false
    if (man_of_the_match) {
      await pool.query(
        'UPDATE match_stats SET man_of_the_match = false WHERE match_id = ?',
        [matchId]
      );
    }

    const [result] = await pool.query(
      `INSERT INTO match_stats
       (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        player_id,
        matchId,
        goals || 0,
        assists || 0,
        yellow_cards || 0,
        red_cards || 0,
        minutes_played || 0,
        man_of_the_match || false
      ]
    );

    const [newStats] = await pool.query(
      `SELECT ms.*, p.name as player_name, p.jersey_number, p.position
       FROM match_stats ms
       JOIN players p ON ms.player_id = p.id
       WHERE ms.id = ?`,
      [result.insertId]
    );

    res.status(201).json(newStats[0]);
  } catch (error) {
    console.error('Error creating match stats:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het aanmaken van statistieken' });
  }
};

// PUT /api/stats/:id - Statistieken updaten
export const updateMatchStats = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      goals,
      assists,
      yellow_cards,
      red_cards,
      minutes_played,
      man_of_the_match
    } = req.body;

    // Check of stats bestaan
    const [stats] = await pool.query('SELECT * FROM match_stats WHERE id = ?', [id]);
    if (stats.length === 0) {
      return res.status(404).json({ error: 'Statistieken niet gevonden' });
    }

    const matchId = stats[0].match_id;

    // Als man_of_the_match true is, zet alle andere man_of_the_match voor deze match op false
    if (man_of_the_match) {
      await pool.query(
        'UPDATE match_stats SET man_of_the_match = false WHERE match_id = ? AND id != ?',
        [matchId, id]
      );
    }

    await pool.query(
      `UPDATE match_stats
       SET goals = ?, assists = ?, yellow_cards = ?, red_cards = ?,
           minutes_played = ?, man_of_the_match = ?
       WHERE id = ?`,
      [
        goals !== undefined ? goals : stats[0].goals,
        assists !== undefined ? assists : stats[0].assists,
        yellow_cards !== undefined ? yellow_cards : stats[0].yellow_cards,
        red_cards !== undefined ? red_cards : stats[0].red_cards,
        minutes_played !== undefined ? minutes_played : stats[0].minutes_played,
        man_of_the_match !== undefined ? man_of_the_match : stats[0].man_of_the_match,
        id
      ]
    );

    const [updatedStats] = await pool.query(
      `SELECT ms.*, p.name as player_name, p.jersey_number, p.position
       FROM match_stats ms
       JOIN players p ON ms.player_id = p.id
       WHERE ms.id = ?`,
      [id]
    );

    res.json(updatedStats[0]);
  } catch (error) {
    console.error('Error updating match stats:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het updaten van statistieken' });
  }
};

// DELETE /api/stats/:id - Statistieken verwijderen
export const deleteMatchStats = async (req, res) => {
  try {
    const { id } = req.params;

    // Check of stats bestaan
    const [stats] = await pool.query('SELECT * FROM match_stats WHERE id = ?', [id]);
    if (stats.length === 0) {
      return res.status(404).json({ error: 'Statistieken niet gevonden' });
    }

    await pool.query('DELETE FROM match_stats WHERE id = ?', [id]);
    res.json({ message: 'Statistieken succesvol verwijderd' });
  } catch (error) {
    console.error('Error deleting match stats:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het verwijderen van statistieken' });
  }
};
