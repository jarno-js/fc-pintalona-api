import pool from '../config/database.js';

// FC Pintalona spelers
const players = [
  {
    name: 'Jarno Janssens',
    jersey_number: 6,
    position: 'Middenvelder',
    birth_date: '2000-03-15'
  },
  {
    name: 'Jorik Van den Eeden',
    jersey_number: 5,
    position: 'Verdediger',
    birth_date: '1999-07-22'
  },
  {
    name: 'Senne Stiens',
    jersey_number: 10,
    position: 'Aanvaller',
    birth_date: '2001-01-10'
  },
  {
    name: 'Brent Van Nyverseel',
    jersey_number: 99,
    position: 'Aanvaller',
    birth_date: '2000-11-05'
  },
  {
    name: 'Mathias De Buyst',
    jersey_number: 9,
    position: 'Aanvaller',
    birth_date: '2000-05-18'
  },
  {
    name: 'Lars Faignaert',
    jersey_number: 11,
    position: 'Middenvelder',
    birth_date: '1999-09-30'
  },
  {
    name: 'Drizzt Charot',
    jersey_number: 15,
    position: 'Verdediger',
    birth_date: '2001-04-12'
  },
  {
    name: 'Ilias Mesror',
    jersey_number: 17,
    position: 'Middenvelder',
    birth_date: '2000-08-25'
  },
  {
    name: 'Kiandro Lademacher',
    jersey_number: 69,
    position: 'Middenvelder',
    birth_date: '2001-02-14'
  },
  {
    name: 'David Kowalewski',
    jersey_number: 21,
    position: 'Verdediger',
    birth_date: '1999-12-03'
  },
  {
    name: 'Thomas Vankeirsbilck',
    jersey_number: 13,
    position: 'Keeper',
    birth_date: '2000-06-20'
  },
  {
    name: 'Brende Baeck',
    jersey_number: 7,
    position: 'Verdediger',
    birth_date: '2001-03-08'
  },
  {
    name: 'Elias Heijndrickx',
    jersey_number: 24,
    position: 'Keeper',
    birth_date: '2000-10-17'
  }
];

async function seedPlayers() {
  const connection = await pool.getConnection();

  try {
    console.log('🌱 Starting player seeding...\n');

    let addedCount = 0;
    let skippedCount = 0;

    // Insert each player
    for (const player of players) {
      // Check if player with this jersey number already exists
      const [existing] = await connection.execute(
        'SELECT id FROM players WHERE jersey_number = ?',
        [player.jersey_number]
      );

      if (existing.length > 0) {
        console.log(`⏭️  Skipped: #${player.jersey_number} ${player.name} (already exists)`);
        skippedCount++;
        continue;
      }

      const query = `
        INSERT INTO players (name, jersey_number, position, birth_date, active)
        VALUES (?, ?, ?, ?, true)
      `;

      await connection.execute(query, [
        player.name,
        player.jersey_number,
        player.position,
        player.birth_date
      ]);

      console.log(`✅ Added: #${player.jersey_number} ${player.name} - ${player.position}`);
      addedCount++;
    }

    console.log(`\n🎉 Processing complete!`);
    console.log(`   ✅ Added: ${addedCount} players`);
    console.log(`   ⏭️  Skipped: ${skippedCount} players (already exist)`);

    if (addedCount > 0) {
      // Show summary by position for added players only
      const positions = {
        Keeper: players.filter(p => p.position === 'Keeper').length,
        Verdediger: players.filter(p => p.position === 'Verdediger').length,
        Middenvelder: players.filter(p => p.position === 'Middenvelder').length,
        Aanvaller: players.filter(p => p.position === 'Aanvaller').length
      };

      console.log('\n📊 Team Samenstelling (totaal in lijst):');
      console.log(`   🧤 Keepers: ${positions.Keeper}`);
      console.log(`   🛡️  Verdedigers: ${positions.Verdediger}`);
      console.log(`   ⚙️  Middenvelders: ${positions.Middenvelder}`);
      console.log(`   ⚽ Aanvallers: ${positions.Aanvaller}`);
    }

  } catch (error) {
    console.error('❌ Error seeding players:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Run the seeder
seedPlayers()
  .then(() => {
    console.log('\n✨ Seeding complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });
