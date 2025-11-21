require('dotenv').config();
const app = require('./src/app');
const { createUsersTable } = require('./src/schema/userSchema');
const { createLinksTable } = require('./src/schema/linkSchema');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await createUsersTable();
    await createLinksTable();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
