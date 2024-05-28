// server.js
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
    host: 'localhost',
    database: 'IOT',
    password: 'shiv868',
    port: '5432',
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/gas', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM gas');
    res.send(rows);
  } catch (error) {
    console.error('Error fetching gas data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/patient', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM patient');
    res.send(rows);
  } catch (error) {
    console.error('Error fetching patient data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/electrical', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM electrical');
    res.send(rows);
  } catch (error) {
    console.error('Error fetching electrical data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
