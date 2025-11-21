const pool = require('../config/database');

const createLinksTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS links (
      id SERIAL PRIMARY KEY,
      short_code VARCHAR(10) UNIQUE NOT NULL,
      url TEXT NOT NULL,
      total_clicks INT DEFAULT 0,
      last_clicked TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW(),
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT short_code_format CHECK (short_code ~ '^[A-Za-z0-9]{6,8}$')
    );
    
    CREATE INDEX IF NOT EXISTS idx_short_code ON links(short_code);
    CREATE INDEX IF NOT EXISTS idx_user_id ON links(user_id);
  `;

  try {
    await pool.query(query);
    console.log('✅ Links table created or already exists');
  } catch (error) {
    console.error('❌ Error creating links table:', error.message);
    throw error;
  }
};

module.exports = { createLinksTable };
