import pool from '../config/database.js';

// Gespeelde SuperLeague wedstrijden (met scores)
const playedSuperLeagueMatches = [
  {
    date: '2025-09-01',
    time: '21:00:00',
    opponent: 'FC Baldikwaanst',
    location: 'Dilbeek',
    home_away: 'away',
    pintalona_score: 6,
    opponent_score: 14,
    status: 'completed',
    competition: 'SuperLeague',
    speeldag: 1
  },
  {
    date: '2025-09-09',
    time: '21:00:00',
    opponent: 'Azzuri',
    location: 'Schepdaal',
    home_away: 'home',
    pintalona_score: 4,
    opponent_score: 5,
    status: 'completed',
    competition: 'SuperLeague',
    speeldag: 2
  },
  {
    date: '2025-09-16',
    time: '22:00:00',
    opponent: 'Bizon Boys',
    location: 'Dilbeek',
    home_away: 'away',
    pintalona_score: 3,
    opponent_score: 4,
    status: 'completed',
    competition: 'SuperLeague',
    speeldag: 3
  },
  {
    date: '2025-09-29',
    time: '20:00:00',
    opponent: 'De Diltons',
    location: 'Dilbeek',
    home_away: 'away',
    pintalona_score: 1,
    opponent_score: 2,
    status: 'completed',
    competition: 'SuperLeague',
    speeldag: 4
  },
  {
    date: '2025-10-13',
    time: '21:00:00',
    opponent: 'Tik & Binnen',
    location: 'Dilbeek',
    home_away: 'away',
    pintalona_score: 4,
    opponent_score: 9,
    status: 'completed',
    competition: 'SuperLeague',
    speeldag: 5
  },
  {
    date: '2025-10-20',
    time: '22:00:00',
    opponent: 'Black Wolves',
    location: 'Schepdaal',
    home_away: 'home',
    pintalona_score: 5,
    opponent_score: 5,
    status: 'completed',
    competition: 'SuperLeague',
    speeldag: 6
  },
  {
    date: '2025-11-25',
    time: '20:00:00',
    opponent: 'Freedomfighters',
    location: 'Schepdaal',
    home_away: 'home',
    pintalona_score: 5,
    opponent_score: 3,
    status: 'completed',
    competition: 'SuperLeague',
    speeldag: 7
  },
  {
    date: '2025-12-09',
    time: '21:00:00',
    opponent: 'FC Baldikwaanst',
    location: 'Schepdaal',
    home_away: 'home',
    pintalona_score: 5,
    opponent_score: 0,
    status: 'completed',
    competition: 'SuperLeague',
    speeldag: 8,
    notes: 'Forfait overwinning'
  },
  {
    date: '2025-12-16',
    time: '22:00:00',
    opponent: 'Azzuri',
    location: 'Dilbeek',
    home_away: 'away',
    pintalona_score: 12,
    opponent_score: 6,
    status: 'completed',
    competition: 'SuperLeague',
    speeldag: 9
  }
];

// Toekomstige SuperLeague wedstrijden
const upcomingSuperLeagueMatches = [
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

// Gespeelde Copa wedstrijden
const playedCopaMatches = [
  {
    date: '2025-09-23',
    time: '20:00:00',
    opponent: 'Tik & Binnen',
    location: 'Dilbeek',
    home_away: 'away',
    pintalona_score: 2,
    opponent_score: 9,
    status: 'completed',
    competition: 'Copa',
    speeldag: 1
  },
  {
    date: '2025-12-01',
    time: '21:00:00',
    opponent: 'MVC Kasteeltje',
    location: 'Schepdaal',
    home_away: 'home',
    pintalona_score: 2,
    opponent_score: 9,
    status: 'completed',
    competition: 'Copa',
    speeldag: 3
  }
];

// Toekomstige Copa wedstrijden (Groep B)
const upcomingCopaMatches = [
  {
    date: '2026-01-12',
    time: '21:00:00',
    opponent: 'Freedomfighters',
    location: 'Schepdaal',
    home_away: 'home',
    competition: 'Copa',
    speeldag: 4
  },
  {
    date: '2026-02-24',
    time: '21:00:00',
    opponent: 'Azzuri',
    location: 'Dilbeek',
    home_away: 'away',
    competition: 'Copa',
    speeldag: 5
  }
];

async function seedMatchesComplete() {
  const connection = await pool.getConnection();

  try {
    console.log('🌱 Starting complete match seeding...\n');

    // Delete existing matches
    await connection.execute('DELETE FROM matches');
    console.log('🗑️  Cleared existing matches\n');

    // Combine all matches
    const allMatches = [
      ...playedSuperLeagueMatches,
      ...upcomingSuperLeagueMatches,
      ...playedCopaMatches,
      ...upcomingCopaMatches
    ];

    let completedCount = 0;
    let scheduledCount = 0;

    // Insert each match
    for (const match of allMatches) {
      const query = `
        INSERT INTO matches (
          match_date, match_time, opponent, location, home_away,
          pintalona_score, opponent_score, status, competition, notes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const status = match.status || 'scheduled';
      const notes = match.notes || `${match.competition} - Speeldag ${match.speeldag}`;

      await connection.execute(query, [
        match.date,
        match.time,
        match.opponent,
        match.location,
        match.home_away,
        match.pintalona_score || null,
        match.opponent_score || null,
        status,
        match.competition,
        notes
      ]);

      if (status === 'completed') {
        console.log(`✅ [${match.competition}] ${match.date} - FC Pintalona ${match.pintalona_score}-${match.opponent_score} ${match.opponent}`);
        completedCount++;
      } else {
        console.log(`📅 [${match.competition}] ${match.date} - FC Pintalona vs ${match.opponent} (${match.home_away})`);
        scheduledCount++;
      }
    }

    console.log(`\n🎉 Successfully seeded ${allMatches.length} matches!`);
    console.log(`\n📊 Breakdown:`);
    console.log(`   ✅ Completed: ${completedCount} matches`);
    console.log(`   📅 Scheduled: ${scheduledCount} matches`);
    console.log(`\n🏆 By Competition:`);
    console.log(`   ⚽ SuperLeague: ${playedSuperLeagueMatches.length + upcomingSuperLeagueMatches.length} matches (${playedSuperLeagueMatches.length} played, ${upcomingSuperLeagueMatches.length} upcoming)`);
    console.log(`   🏆 Copa: ${playedCopaMatches.length + upcomingCopaMatches.length} matches (${playedCopaMatches.length} played, ${upcomingCopaMatches.length} upcoming)`);

  } catch (error) {
    console.error('❌ Error seeding matches:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Run the seeder
seedMatchesComplete()
  .then(() => {
    console.log('\n✨ Seeding complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });
