import pool from '../config/database.js';

async function resetDatabase() {
  const connection = await pool.getConnection();

  try {
    console.log('🔄 Starting database reset...\n');

    // Delete all data from tables (in correct order due to foreign keys)
    console.log('🗑️  Removing old data...');

    await connection.execute('DELETE FROM match_stats');
    console.log('   ✅ Cleared match_stats');

    await connection.execute('DELETE FROM injuries');
    console.log('   ✅ Cleared injuries');

    await connection.execute('DELETE FROM matches');
    console.log('   ✅ Cleared matches');

    await connection.execute('DELETE FROM players');
    console.log('   ✅ Cleared players');

    // Reset auto-increment counters
    await connection.execute('ALTER TABLE match_stats AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE injuries AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE matches AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE players AUTO_INCREMENT = 1');

    console.log('\n✨ Database reset complete!');
    console.log('   All old data has been removed.');
    console.log('   Ready for fresh seeding.\n');

  } catch (error) {
    console.error('❌ Error resetting database:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Run the reset
resetDatabase()
  .then(() => {
    console.log('✅ Reset successful!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Reset failed:', error);
    process.exit(1);
  });
