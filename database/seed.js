import pool from '../config/database.js';

// FC Pintalona spelers - Echte ploegsamenstelling
const players = [
  { name: 'Jarno Janssens', jersey_number: 6, position: 'Middenvelder', birth_date: '2000-03-15' },
  { name: 'Jorik Van den Eeden', jersey_number: 5, position: 'Verdediger', birth_date: '1999-07-22' },
  { name: 'Senne Stiens', jersey_number: 10, position: 'Aanvaller', birth_date: '2001-01-10' },
  { name: 'Brent Van Nyverseel', jersey_number: 99, position: 'Aanvaller', birth_date: '2000-11-05' },
  { name: 'Mathias De Buyst', jersey_number: 9, position: 'Aanvaller', birth_date: '2000-05-18' },
  { name: 'Lars Faignaert', jersey_number: 11, position: 'Middenvelder', birth_date: '1999-09-30' },
  { name: 'Drizzt Charot', jersey_number: 15, position: 'Verdediger', birth_date: '2001-04-12' },
  { name: 'Ilias Mesror', jersey_number: 17, position: 'Middenvelder', birth_date: '2000-08-25' },
  { name: 'Kiandro Lademacher', jersey_number: 69, position: 'Middenvelder', birth_date: '2001-02-14' },
  { name: 'David Kowalewski', jersey_number: 21, position: 'Verdediger', birth_date: '1999-12-03' },
  { name: 'Thomas Vankeirsbilck', jersey_number: 13, position: 'Keeper', birth_date: '2000-06-20' },
  { name: 'Brende Baeck', jersey_number: 7, position: 'Verdediger', birth_date: '2001-03-08' },
  { name: 'Elias Heijndrickx', jersey_number: 24, position: 'Keeper', birth_date: '2000-10-17' }
];

// Gespeelde SuperLeague wedstrijden
const playedSuperLeagueMatches = [
  { date: '2025-09-01', time: '21:00:00', opponent: 'FC Baldikwaanst', location: 'Dilbeek', home_away: 'away', pintalona_score: 6, opponent_score: 14, status: 'completed', competition: 'SuperLeague', speeldag: 1 },
  { date: '2025-09-09', time: '21:00:00', opponent: 'Azzuri', location: 'Schepdaal', home_away: 'home', pintalona_score: 4, opponent_score: 5, status: 'completed', competition: 'SuperLeague', speeldag: 2 },
  { date: '2025-09-16', time: '22:00:00', opponent: 'Bizon Boys', location: 'Dilbeek', home_away: 'away', pintalona_score: 3, opponent_score: 4, status: 'completed', competition: 'SuperLeague', speeldag: 3 },
  { date: '2025-09-29', time: '20:00:00', opponent: 'De Diltons', location: 'Dilbeek', home_away: 'away', pintalona_score: 1, opponent_score: 2, status: 'completed', competition: 'SuperLeague', speeldag: 4 },
  { date: '2025-10-13', time: '21:00:00', opponent: 'Tik & Binnen', location: 'Dilbeek', home_away: 'away', pintalona_score: 4, opponent_score: 9, status: 'completed', competition: 'SuperLeague', speeldag: 5 },
  { date: '2025-10-20', time: '22:00:00', opponent: 'Black Wolves', location: 'Schepdaal', home_away: 'home', pintalona_score: 5, opponent_score: 5, status: 'completed', competition: 'SuperLeague', speeldag: 6 },
  { date: '2025-11-25', time: '20:00:00', opponent: 'Freedomfighters', location: 'Schepdaal', home_away: 'home', pintalona_score: 5, opponent_score: 3, status: 'completed', competition: 'SuperLeague', speeldag: 7 },
  { date: '2025-12-09', time: '21:00:00', opponent: 'FC Baldikwaanst', location: 'Schepdaal', home_away: 'home', pintalona_score: 5, opponent_score: 0, status: 'completed', competition: 'SuperLeague', speeldag: 8, notes: 'Forfait overwinning' },
  { date: '2025-12-16', time: '22:00:00', opponent: 'Azzuri', location: 'Dilbeek', home_away: 'away', pintalona_score: 12, opponent_score: 6, status: 'completed', competition: 'SuperLeague', speeldag: 9 }
];

// Toekomstige SuperLeague wedstrijden
const upcomingSuperLeagueMatches = [
  { date: '2026-01-06', time: '22:00:00', opponent: 'Bizon Boys', location: 'Schepdaal', home_away: 'home', competition: 'SuperLeague', speeldag: 12 },
  { date: '2026-01-20', time: '21:00:00', opponent: 'De Diltons', location: 'Schepdaal', home_away: 'home', competition: 'SuperLeague', speeldag: 13 },
  { date: '2026-01-27', time: '20:00:00', opponent: 'Tik & Binnen', location: 'Schepdaal', home_away: 'home', competition: 'SuperLeague', speeldag: 14 },
  { date: '2026-02-10', time: '22:00:00', opponent: 'Black Wolves', location: 'Dilbeek', home_away: 'away', competition: 'SuperLeague', speeldag: 15 },
  { date: '2026-03-03', time: '22:00:00', opponent: 'JK Oosthoek Futures', location: 'Dilbeek', home_away: 'away', competition: 'SuperLeague', speeldag: 16 },
  { date: '2026-03-10', time: '20:00:00', opponent: 'MVC Kasteeltje', location: 'Schepdaal', home_away: 'home', competition: 'SuperLeague', speeldag: 17 },
  { date: '2026-03-16', time: '21:00:00', opponent: 'Freedomfighters', location: 'Dilbeek', home_away: 'away', competition: 'SuperLeague', speeldag: 18 }
];

// Gespeelde Copa wedstrijden
const playedCopaMatches = [
  { date: '2025-09-23', time: '20:00:00', opponent: 'Tik & Binnen', location: 'Dilbeek', home_away: 'away', pintalona_score: 2, opponent_score: 9, status: 'completed', competition: 'Copa', speeldag: 1 },
  { date: '2025-12-01', time: '21:00:00', opponent: 'MVC Kasteeltje', location: 'Schepdaal', home_away: 'home', pintalona_score: 2, opponent_score: 9, status: 'completed', competition: 'Copa', speeldag: 3 }
];

// Toekomstige Copa wedstrijden
const upcomingCopaMatches = [
  { date: '2026-01-12', time: '21:00:00', opponent: 'Freedomfighters', location: 'Schepdaal', home_away: 'home', competition: 'Copa', speeldag: 4 },
  { date: '2026-02-24', time: '21:00:00', opponent: 'Azzuri', location: 'Dilbeek', home_away: 'away', competition: 'Copa', speeldag: 5 }
];

async function seedDatabase() {
  const connection = await pool.getConnection();

  try {
    console.log('🌱 Starting FC Pintalona database seeding...\n');

    // ============== SEED PLAYERS ==============
    console.log('👥 Seeding players...');
    let playersAdded = 0;
    let playersSkipped = 0;

    for (const player of players) {
      const [existing] = await connection.execute(
        'SELECT id FROM players WHERE jersey_number = ?',
        [player.jersey_number]
      );

      if (existing.length > 0) {
        console.log(`   ⏭️  Skipped: #${player.jersey_number} ${player.name} (already exists)`);
        playersSkipped++;
        continue;
      }

      await connection.execute(
        'INSERT INTO players (name, jersey_number, position, birth_date, active) VALUES (?, ?, ?, ?, true)',
        [player.name, player.jersey_number, player.position, player.birth_date]
      );

      console.log(`   ✅ Added: #${player.jersey_number} ${player.name} - ${player.position}`);
      playersAdded++;
    }

    console.log(`\n   📊 Players Summary: ${playersAdded} added, ${playersSkipped} skipped\n`);

    // ============== SEED MATCHES ==============
    console.log('⚽ Seeding matches...');

    // Clear existing matches
    await connection.execute('DELETE FROM matches');
    console.log('   🗑️  Cleared existing matches');

    const allMatches = [
      ...playedSuperLeagueMatches,
      ...upcomingSuperLeagueMatches,
      ...playedCopaMatches,
      ...upcomingCopaMatches
    ];

    let completedCount = 0;
    let scheduledCount = 0;

    for (const match of allMatches) {
      const status = match.status || 'scheduled';
      const notes = match.notes || `${match.competition} - Speeldag ${match.speeldag}`;

      await connection.execute(
        `INSERT INTO matches (
          match_date, match_time, opponent, location, home_away,
          pintalona_score, opponent_score, status, competition, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
      );

      if (status === 'completed') {
        console.log(`   ✅ [${match.competition}] ${match.date} - FC Pintalona ${match.pintalona_score}-${match.opponent_score} ${match.opponent}`);
        completedCount++;
      } else {
        console.log(`   📅 [${match.competition}] ${match.date} - FC Pintalona vs ${match.opponent}`);
        scheduledCount++;
      }
    }

    console.log(`\n   📊 Matches Summary: ${completedCount} completed, ${scheduledCount} scheduled\n`);

    // ============== SEED MATCH STATISTICS ==============
    console.log('📊 Seeding match statistics...');

    const matchStats = [
      // Match 1: FC Baldikwaanst (6-14)
      { player_id: 1, match_id: 1, goals: 3, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: true },
      { player_id: 11, match_id: 1, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 3, match_id: 1, goals: 2, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 4, match_id: 1, goals: 1, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 6, match_id: 1, goals: 0, assists: 2, yellow_cards: 1, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 9, match_id: 1, goals: 0, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 2, match_id: 1, goals: 0, assists: 0, yellow_cards: 1, red_cards: 0, minutes_played: 60, man_of_the_match: false },

      // Match 2: Azzuri (4-5)
      { player_id: 1, match_id: 2, goals: 2, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: true },
      { player_id: 13, match_id: 2, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 3, match_id: 2, goals: 1, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 5, match_id: 2, goals: 1, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 8, match_id: 2, goals: 0, assists: 2, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 7, match_id: 2, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 12, match_id: 2, goals: 0, assists: 0, yellow_cards: 1, red_cards: 0, minutes_played: 60, man_of_the_match: false },

      // Match 3: Bizon Boys (3-4)
      { player_id: 1, match_id: 3, goals: 1, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 11, match_id: 3, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 4, match_id: 3, goals: 1, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 5, match_id: 3, goals: 1, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: true },
      { player_id: 6, match_id: 3, goals: 0, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 10, match_id: 3, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 2, match_id: 3, goals: 0, assists: 0, yellow_cards: 1, red_cards: 0, minutes_played: 60, man_of_the_match: false },

      // Match 4: De Diltons (1-2)
      { player_id: 1, match_id: 4, goals: 1, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: true },
      { player_id: 13, match_id: 4, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 3, match_id: 4, goals: 0, assists: 0, yellow_cards: 1, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 9, match_id: 4, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 7, match_id: 4, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 12, match_id: 4, goals: 0, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 2, match_id: 4, goals: 0, assists: 0, yellow_cards: 2, red_cards: 0, minutes_played: 60, man_of_the_match: false },

      // Match 5: Tik & Binnen (4-9)
      { player_id: 1, match_id: 5, goals: 2, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: true },
      { player_id: 11, match_id: 5, goals: 0, assists: 0, yellow_cards: 1, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 3, match_id: 5, goals: 1, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 4, match_id: 5, goals: 1, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 5, match_id: 5, goals: 0, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 6, match_id: 5, goals: 0, assists: 1, yellow_cards: 1, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 10, match_id: 5, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },

      // Match 6: Black Wolves (5-5)
      { player_id: 1, match_id: 6, goals: 3, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: true },
      { player_id: 13, match_id: 6, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 3, match_id: 6, goals: 1, assists: 2, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 5, match_id: 6, goals: 1, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 8, match_id: 6, goals: 0, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 9, match_id: 6, goals: 0, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 7, match_id: 6, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },

      // Match 7: Freedomfighters (5-3)
      { player_id: 1, match_id: 7, goals: 2, assists: 2, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: true },
      { player_id: 11, match_id: 7, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 3, match_id: 7, goals: 2, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 4, match_id: 7, goals: 1, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 6, match_id: 7, goals: 0, assists: 2, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 12, match_id: 7, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 9, match_id: 7, goals: 0, assists: 0, yellow_cards: 1, red_cards: 0, minutes_played: 60, man_of_the_match: false },

      // Match 9: Azzuri (12-6) - Match 8 was forfait
      { player_id: 1, match_id: 9, goals: 5, assists: 2, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: true },
      { player_id: 13, match_id: 9, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 3, match_id: 9, goals: 3, assists: 3, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 4, match_id: 9, goals: 2, assists: 2, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 5, match_id: 9, goals: 1, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 6, match_id: 9, goals: 1, assists: 3, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 9, match_id: 9, goals: 0, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },

      // Match 10: Copa - Tik & Binnen (2-9)
      { player_id: 1, match_id: 10, goals: 1, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 11, match_id: 10, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 3, match_id: 10, goals: 1, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: true },
      { player_id: 5, match_id: 10, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 7, match_id: 10, goals: 0, assists: 0, yellow_cards: 1, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 10, match_id: 10, goals: 0, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 12, match_id: 10, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },

      // Match 11: Copa - MVC Kasteeltje (2-9)
      { player_id: 1, match_id: 11, goals: 1, assists: 1, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: true },
      { player_id: 13, match_id: 11, goals: 0, assists: 0, yellow_cards: 1, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 3, match_id: 11, goals: 1, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 4, match_id: 11, goals: 0, assists: 1, yellow_cards: 1, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 6, match_id: 11, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 9, match_id: 11, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false },
      { player_id: 2, match_id: 11, goals: 0, assists: 0, yellow_cards: 0, red_cards: 0, minutes_played: 60, man_of_the_match: false }
    ];

    let statsAdded = 0;
    for (const stat of matchStats) {
      await connection.execute(
        `INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [stat.player_id, stat.match_id, stat.goals, stat.assists, stat.yellow_cards, stat.red_cards, stat.minutes_played, stat.man_of_the_match]
      );
      statsAdded++;
    }
    console.log(`   ✅ Added ${statsAdded} match statistics entries\n`);

    // ============== SEED INJURIES ==============
    console.log('🏥 Seeding injuries...');

    await connection.execute(
      `INSERT INTO injuries (player_id, injury_type, description, injury_date, expected_return_date, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [8, 'Enkelblessure', 'Verzwikte enkel tijdens wedstrijd tegen Black Wolves', '2025-10-21', '2026-02-01', 'active']
    );
    console.log('   ✅ Added injury: Ilias Mesror - Enkelblessure (actief)\n');

    // ============== FINAL SUMMARY ==============
    console.log('🎉 Database seeding complete!\n');
    console.log('📊 Final Statistics:');
    console.log(`   👥 Players: ${playersAdded} added (${players.length} total in squad)`);
    console.log(`   ⚽ Matches: ${allMatches.length} total`);
    console.log(`      • SuperLeague: ${playedSuperLeagueMatches.length + upcomingSuperLeagueMatches.length} matches`);
    console.log(`      • Copa: ${playedCopaMatches.length + upcomingCopaMatches.length} matches`);
    console.log(`      • Completed: ${completedCount}`);
    console.log(`      • Scheduled: ${scheduledCount}`);
    console.log(`   📊 Match Stats: ${statsAdded} entries`);
    console.log(`   🏥 Injuries: 1 active (Ilias Mesror - Enkelblessure)`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Run the seeder
seedDatabase()
  .then(() => {
    console.log('\n✨ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });
