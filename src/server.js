import "dotenv/config";
import express from 'express';
import { prisma, pool } from './utils/prisma.js';
import authRoute from './routes/auth.route.js'
import blogRoute from './routes/blog.route.js'

const app = express();
const PORT = process.env.PORT || 5050;

// Help in the translation to json
app.use(express.json())

// Importing the routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/blog', blogRoute)

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  try { await pool.end(); } catch (e) { /* ignore */ }
  process.exit(0);
});

