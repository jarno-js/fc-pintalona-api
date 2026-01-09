// Validation middleware voor FC Pintalona API

// Helper functie om te checken of een string alleen letters en spaties bevat
const isValidName = (name) => {
  return /^[a-zA-Z\s]+$/.test(name);
};

// Helper functie om datum validatie te doen
const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

// Player validation
export const validatePlayer = (req, res, next) => {
  const { name, jersey_number, position, birth_date } = req.body;

  // Name validatie
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Naam mag niet leeg zijn' });
  }

  if (!isValidName(name)) {
    return res.status(400).json({ error: 'Naam mag alleen letters en spaties bevatten' });
  }

  // Jersey number validatie
  if (jersey_number !== undefined && jersey_number !== null) {
    if (typeof jersey_number !== 'number' || isNaN(jersey_number)) {
      return res.status(400).json({ error: 'Rugnummer moet een nummer zijn' });
    }
    if (jersey_number < 1 || jersey_number > 99) {
      return res.status(400).json({ error: 'Rugnummer moet tussen 1 en 99 zijn' });
    }
  }

  // Position validatie
  const validPositions = ['Keeper', 'Verdediger', 'Middenvelder', 'Aanvaller'];
  if (position && !validPositions.includes(position)) {
    return res.status(400).json({
      error: `Positie moet een van de volgende zijn: ${validPositions.join(', ')}`
    });
  }

  // Birth date validatie
  if (birth_date && !isValidDate(birth_date)) {
    return res.status(400).json({ error: 'Ongeldige geboortedatum' });
  }

  next();
};

// Match validation
export const validateMatch = (req, res, next) => {
  const {
    match_date,
    opponent,
    pintalona_score,
    opponent_score,
    home_away,
    status
  } = req.body;

  // Match date validatie
  if (!match_date || match_date.trim() === '') {
    return res.status(400).json({ error: 'Wedstrijddatum mag niet leeg zijn' });
  }

  if (!isValidDate(match_date)) {
    return res.status(400).json({ error: 'Ongeldige wedstrijddatum' });
  }

  // Opponent validatie
  if (!opponent || opponent.trim() === '') {
    return res.status(400).json({ error: 'Tegenstander mag niet leeg zijn' });
  }

  // Score validatie
  if (pintalona_score !== undefined && pintalona_score !== null) {
    if (typeof pintalona_score !== 'number' || isNaN(pintalona_score)) {
      return res.status(400).json({ error: 'FC Pintalona score moet een nummer zijn' });
    }
    if (pintalona_score < 0) {
      return res.status(400).json({ error: 'Score mag niet negatief zijn' });
    }
  }

  if (opponent_score !== undefined && opponent_score !== null) {
    if (typeof opponent_score !== 'number' || isNaN(opponent_score)) {
      return res.status(400).json({ error: 'Tegenstander score moet een nummer zijn' });
    }
    if (opponent_score < 0) {
      return res.status(400).json({ error: 'Score mag niet negatief zijn' });
    }
  }

  // Home/Away validatie
  const validHomeAway = ['home', 'away'];
  if (home_away && !validHomeAway.includes(home_away)) {
    return res.status(400).json({
      error: `home_away moet 'home' of 'away' zijn`
    });
  }

  // Status validatie
  const validStatuses = ['scheduled', 'completed', 'cancelled'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      error: `Status moet een van de volgende zijn: ${validStatuses.join(', ')}`
    });
  }

  next();
};

// Match stats validation
export const validateMatchStats = (req, res, next) => {
  const {
    player_id,
    match_id,
    goals,
    assists,
    yellow_cards,
    red_cards,
    minutes_played
  } = req.body;

  // Player en Match ID validatie
  if (!player_id || typeof player_id !== 'number') {
    return res.status(400).json({ error: 'Speler ID moet een nummer zijn' });
  }

  if (!match_id || typeof match_id !== 'number') {
    return res.status(400).json({ error: 'Wedstrijd ID moet een nummer zijn' });
  }

  // Goals validatie
  if (goals !== undefined && goals !== null) {
    if (typeof goals !== 'number' || isNaN(goals) || goals < 0) {
      return res.status(400).json({ error: 'Goals moet een positief nummer zijn' });
    }
  }

  // Assists validatie
  if (assists !== undefined && assists !== null) {
    if (typeof assists !== 'number' || isNaN(assists) || assists < 0) {
      return res.status(400).json({ error: 'Assists moet een positief nummer zijn' });
    }
  }

  // Yellow cards validatie
  if (yellow_cards !== undefined && yellow_cards !== null) {
    if (typeof yellow_cards !== 'number' || isNaN(yellow_cards) || yellow_cards < 0) {
      return res.status(400).json({ error: 'Gele kaarten moet een positief nummer zijn' });
    }
  }

  // Red cards validatie
  if (red_cards !== undefined && red_cards !== null) {
    if (typeof red_cards !== 'number' || isNaN(red_cards) || red_cards < 0) {
      return res.status(400).json({ error: 'Rode kaarten moet een positief nummer zijn' });
    }
  }

  // Minutes played validatie (zaalvoetbal = max 60 minuten)
  if (minutes_played !== undefined && minutes_played !== null) {
    if (typeof minutes_played !== 'number' || isNaN(minutes_played)) {
      return res.status(400).json({ error: 'Gespeelde minuten moet een nummer zijn' });
    }
    if (minutes_played < 0 || minutes_played > 60) {
      return res.status(400).json({ error: 'Gespeelde minuten moet tussen 0 en 60 zijn (zaalvoetbal)' });
    }
  }

  next();
};

// Injury validation
export const validateInjury = (req, res, next) => {
  const {
    player_id,
    injury_type,
    injury_date,
    expected_return_date,
    actual_return_date,
    status
  } = req.body;

  // Player ID validatie
  if (!player_id || typeof player_id !== 'number') {
    return res.status(400).json({ error: 'Speler ID moet een nummer zijn' });
  }

  // Injury type validatie
  if (!injury_type || injury_type.trim() === '') {
    return res.status(400).json({ error: 'Blessure type mag niet leeg zijn' });
  }

  // Injury date validatie
  if (!injury_date || injury_date.trim() === '') {
    return res.status(400).json({ error: 'Blessure datum mag niet leeg zijn' });
  }

  if (!isValidDate(injury_date)) {
    return res.status(400).json({ error: 'Ongeldige blessure datum' });
  }

  // Expected return date validatie
  if (expected_return_date) {
    if (!isValidDate(expected_return_date)) {
      return res.status(400).json({ error: 'Ongeldige verwachte terugkeer datum' });
    }

    const injuryDateObj = new Date(injury_date);
    const expectedReturnDateObj = new Date(expected_return_date);

    if (expectedReturnDateObj < injuryDateObj) {
      return res.status(400).json({
        error: 'Verwachte terugkeer datum moet na de blessure datum zijn'
      });
    }
  }

  // Actual return date validatie
  if (actual_return_date) {
    if (!isValidDate(actual_return_date)) {
      return res.status(400).json({ error: 'Ongeldige daadwerkelijke terugkeer datum' });
    }

    const injuryDateObj = new Date(injury_date);
    const actualReturnDateObj = new Date(actual_return_date);

    if (actualReturnDateObj < injuryDateObj) {
      return res.status(400).json({
        error: 'Daadwerkelijke terugkeer datum moet na de blessure datum zijn'
      });
    }
  }

  // Status validatie
  const validStatuses = ['active', 'recovering', 'recovered'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      error: `Status moet een van de volgende zijn: ${validStatuses.join(', ')}`
    });
  }

  next();
};
