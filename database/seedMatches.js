import pool from '../config/database.js';

// SuperLeague wedstrijden waar FC Pintalona in speelt
const superLeagueMatches = [
  {
    date: '2026-01-06',
    time: '22:00:00',
    opponent: 'Bizon Boys',
    location: 'Schepdaal',
    home_away: 'home',
    competition: 'SuperLeague',
    speeldag: 12
  },
  {
    date: '2026-01-20',
    time: '21:00:00',
    opponent: 'De Diltons',
    location: 'Schepdaal',
    home_away: 'home',
    competition: 'SuperLeague',
    speeldag: 13
  },
  {
    date: '2026-01-27',
    time: '20:00:00',
    opponent: 'Tik & Binnen',
    location: 'Schepdaal',
    home_away: 'home',
    competition: 'SuperLeague',
    speeldag: 14
  },
  {
    date: '2026-02-10',
    time: '22:00:00',
    opponent: 'Black Wolves',
    location: 'Dilbeek',
    home_away: 'away',
    competition: 'SuperLeague',
    speeldag: 15
  },
  {
    date: '2026-03-03',
    time: '22:00:00',
    opponent: 'JK Oosthoek Futures',
    location: 'Dilbeek',
    home_away: 'away',
    competition: 'SuperLeague',
    speeldag: 16
  },
  {
    date: '2026-03-10',
    time: '20:00:00',
    opponent: 'MVC Kasteeltje',
    location: 'Schepdaal',
    home_away: 'home',
    competition: 'SuperLeague',
    speeldag: 17
  },
  {
    date: '2026-03-16',
    time: '21:00:00',
    opponent: 'Freedomfighters',
    location: 'Dilbeek',
    home_away: 'away',
    competition: 'SuperLeague',
    speeldag: 18
  }
];

// Copa Dilbeccha wedstrijden (Groep B)
const copaMatches = [
  {
    date: '2026-01-12',
    time: '21:00:00',
    opponent: 'Freedomfighters',
    location: 'Schepdaal',
    home_away: 'home',
    competition: 'Copa Dilbeccha - Groep B',
    speeldag: 4
  },
  {
    date: '2026-02-24',
    time: '21:00:00',
    opponent: 'Azzuri',
    location: 'Dilbeek',
    home_away: 'away',
    competition: 'Copa Dilbeccha - Groep B',
    speeldag: 5
  }
];

async function seedMatches() {
  const connection = await pool.getConnection();

  try {
    console.log('🌱 Starting match seeding...\n');

    // Combine all matches
    const allMatches = [...superLeagueMatches, ...copaMatches];

    // Insert each match
    for (const match of allMatches) {
      const query = `
        INSERT INTO matches (match_date, match_time, opponent, location, home_away, status, notes)
        VALUES (?, ?, ?, ?, ?, 'scheduled', ?)
      `;

      const notes = `${match.competition} - Speeldag ${match.speeldag}`;

      await connection.execute(query, [
        match.date,
        match.time,
        match.opponent,
        match.location,
        match.home_away,
        notes
      ]);

      console.log(`✅ Added: ${match.date} - FC Pintalona vs ${match.opponent} (${match.competition})`);
    }

    console.log(`\n🎉 Successfully seeded ${allMatches.length} matches!`);
    console.log(`   📊 SuperLeague: ${superLeagueMatches.length} matches`);
    console.log(`   🏆 Copa Dilbeccha: ${copaMatches.length} matches`);

  } catch (error) {
    console.error('❌ Error seeding matches:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Run the seeder
seedMatches()
  .then(() => {
    console.log('\n✨ Seeding complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });
