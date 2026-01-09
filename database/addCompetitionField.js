import pool from '../config/database.js';

async function addCompetitionField() {
  const connection = await pool.getConnection();

  try {
    console.log('🔧 Adding competition field to matches table...\n');

    // Add competition column
    await connection.execute(`
      ALTER TABLE matches
      ADD COLUMN competition ENUM('SuperLeague', 'Copa') DEFAULT 'SuperLeague'
      AFTER status
    `);

    console.log('✅ Competition field added successfully!');

  } catch (error) {
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log('⏭️  Competition field already exists, skipping...');
    } else {
      console.error('❌ Error adding competition field:', error);
      throw error;
    }
  } finally {
    connection.release();
  }
}

// Run the migration
addCompetitionField()
  .then(() => {
    console.log('\n✨ Migration complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  });
