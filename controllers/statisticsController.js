import pool from '../config/database.js';

// GET /api/stats/topscorers - Top 10 doelpuntenmakers
export const getTopScorers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const [scorers] = await pool.query(
      `SELECT
        p.id,
        p.name,
        p.jersey_number,
        p.position,
        SUM(ms.goals) as total_goals,
        COUNT(DISTINCT ms.match_id) as matches_played,
        ROUND(SUM(ms.goals) / COUNT(DISTINCT ms.match_id), 2) as goals_per_match
      FROM players p
      JOIN match_stats ms ON p.id = ms.player_id
      GROUP BY p.id, p.name, p.jersey_number, p.position
      HAVING total_goals > 0
      ORDER BY total_goals DESC, goals_per_match DESC
      LIMIT ?`,
      [limit]
    );

    res.json(scorers);
  } catch (error) {
    console.error('Error fetching top scorers:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van topscorers' });
  }
};

// GET /api/stats/assists - Top 10 assists
export const getTopAssists = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const [assisters] = await pool.query(
      `SELECT
        p.id,
        p.name,
        p.jersey_number,
        p.position,
        SUM(ms.assists) as total_assists,
        COUNT(DISTINCT ms.match_id) as matches_played,
        ROUND(SUM(ms.assists) / COUNT(DISTINCT ms.match_id), 2) as assists_per_match
      FROM players p
      JOIN match_stats ms ON p.id = ms.player_id
      GROUP BY p.id, p.name, p.jersey_number, p.position
      HAVING total_assists > 0
      ORDER BY total_assists DESC, assists_per_match DESC
      LIMIT ?`,
      [limit]
    );

    res.json(assisters);
  } catch (error) {
    console.error('Error fetching top assists:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van assist-gevers' });
  }
};

// GET /api/stats/cards - Spelers met meeste kaarten
export const getCardStatistics = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const [cards] = await pool.query(
      `SELECT
        p.id,
        p.name,
        p.jersey_number,
        p.position,
        SUM(ms.yellow_cards) as total_yellow_cards,
        SUM(ms.red_cards) as total_red_cards,
        (SUM(ms.yellow_cards) + SUM(ms.red_cards) * 2) as total_card_points,
        COUNT(DISTINCT ms.match_id) as matches_played
      FROM players p
      JOIN match_stats ms ON p.id = ms.player_id
      GROUP BY p.id, p.name, p.jersey_number, p.position
      HAVING (total_yellow_cards > 0 OR total_red_cards > 0)
      ORDER BY total_card_points DESC, total_red_cards DESC
      LIMIT ?`,
      [limit]
    );

    res.json(cards);
  } catch (error) {
    console.error('Error fetching card statistics:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van kaarten statistieken' });
  }
};

// GET /api/stats/team - Algemene team statistieken
export const getTeamStatistics = async (req, res) => {
  try {
    // Algemene match statistieken
    const [matchStats] = await pool.query(
      `SELECT
        COUNT(*) as total_matches,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_matches,
        SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled_matches,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_matches,
        SUM(CASE
          WHEN status = 'completed' AND pintalona_score > opponent_score THEN 1
          ELSE 0
        END) as wins,
        SUM(CASE
          WHEN status = 'completed' AND pintalona_score = opponent_score THEN 1
          ELSE 0
        END) as draws,
        SUM(CASE
          WHEN status = 'completed' AND pintalona_score < opponent_score THEN 1
          ELSE 0
        END) as losses,
        SUM(CASE WHEN status = 'completed' THEN pintalona_score ELSE 0 END) as total_goals_scored,
        SUM(CASE WHEN status = 'completed' THEN opponent_score ELSE 0 END) as total_goals_conceded
      FROM matches`
    );

    const stats = matchStats[0];
    const completedMatches = stats.completed_matches || 1; // Voorkom delen door 0

    // Bereken gemiddelden
    const averageGoalsScored = (stats.total_goals_scored / completedMatches).toFixed(2);
    const averageGoalsConceded = (stats.total_goals_conceded / completedMatches).toFixed(2);
    const goalDifference = stats.total_goals_scored - stats.total_goals_conceded;
    const winPercentage = ((stats.wins / completedMatches) * 100).toFixed(1);

    // Home/Away statistieken
    const [homeAwayStats] = await pool.query(
      `SELECT
        home_away,
        COUNT(*) as matches,
        SUM(CASE WHEN pintalona_score > opponent_score THEN 1 ELSE 0 END) as wins,
        SUM(CASE WHEN pintalona_score = opponent_score THEN 1 ELSE 0 END) as draws,
        SUM(CASE WHEN pintalona_score < opponent_score THEN 1 ELSE 0 END) as losses,
        SUM(pintalona_score) as goals_scored,
        SUM(opponent_score) as goals_conceded
      FROM matches
      WHERE status = 'completed'
      GROUP BY home_away`
    );

    // Speler statistieken
    const [playerStats] = await pool.query(
      `SELECT
        COUNT(DISTINCT p.id) as total_players,
        SUM(CASE WHEN p.active = true THEN 1 ELSE 0 END) as active_players
      FROM players p`
    );

    // Man of the match awards
    const [motmAwards] = await pool.query(
      `SELECT
        p.name,
        p.jersey_number,
        COUNT(*) as awards
      FROM match_stats ms
      JOIN players p ON ms.player_id = p.id
      WHERE ms.man_of_the_match = true
      GROUP BY p.id, p.name, p.jersey_number
      ORDER BY awards DESC
      LIMIT 5`
    );

    // Current form (laatste 5 wedstrijden)
    const [recentMatches] = await pool.query(
      `SELECT
        match_date,
        opponent,
        pintalona_score,
        opponent_score,
        CASE
          WHEN pintalona_score > opponent_score THEN 'W'
          WHEN pintalona_score = opponent_score THEN 'D'
          ELSE 'L'
        END as result
      FROM matches
      WHERE status = 'completed'
      ORDER BY match_date DESC
      LIMIT 5`
    );

    const currentForm = recentMatches.map(m => m.result).join('');

    res.json({
      overview: {
        total_matches: stats.total_matches,
        completed_matches: stats.completed_matches,
        scheduled_matches: stats.scheduled_matches,
        cancelled_matches: stats.cancelled_matches
      },
      record: {
        wins: stats.wins,
        draws: stats.draws,
        losses: stats.losses,
        win_percentage: `${winPercentage}%`
      },
      goals: {
        total_scored: stats.total_goals_scored,
        total_conceded: stats.total_goals_conceded,
        goal_difference: goalDifference,
        average_scored: parseFloat(averageGoalsScored),
        average_conceded: parseFloat(averageGoalsConceded)
      },
      home_away: homeAwayStats,
      players: playerStats[0],
      man_of_the_match_leaders: motmAwards,
      current_form: currentForm,
      recent_matches: recentMatches
    });
  } catch (error) {
    console.error('Error fetching team statistics:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van team statistieken' });
  }
};
