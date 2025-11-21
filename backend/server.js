require('dotenv').config();
const app = require('./src/app');
const { createUsersTable } = require('./src/schema/userSchema');
const { createLinksTable } = require('./src/schema/linkSchema');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Create tables in order (users first, then links due to foreign key)
    await createUsersTable();
    await createLinksTable();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`\n📍 Health checks:`);
      console.log(`   - GET http://localhost:${PORT}/healthz`);
      console.log(`   - GET http://localhost:${PORT}/api/v1/health`);
      console.log(`\n🔐 Auth endpoints:`);
      console.log(`   - POST http://localhost:${PORT}/api/v1/auth/register`);
      console.log(`   - POST http://localhost:${PORT}/api/v1/auth/login`);
      console.log(`\n🔗 Link endpoints:`);
      console.log(`   - POST http://localhost:${PORT}/api/v1/links`);
      console.log(`   - GET  http://localhost:${PORT}/api/v1/links`);
      console.log(`   - GET  http://localhost:${PORT}/api/v1/links/:code`);
      console.log(`   - DELETE http://localhost:${PORT}/api/v1/links/:code`);
      console.log(`\n↪️  Redirect:`);
      console.log(`   - GET http://localhost:${PORT}/:code`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
