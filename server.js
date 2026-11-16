const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Lumikha o magbukas ng SQLite Database file
const db = new sqlite3.Database('./restaurant.db', (err) => {
    if (err) console.error("Database Connection Error:", err.message);
    else console.log("Connected to SQLite Database.");
});

// 1. Talahanayan para sa Reservations
db.run(`CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    date TEXT,
    time TEXT
)`);

// 2. Talahanayan para sa Orders at Delivery Details
db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    phone TEXT,
    address TEXT,
    items TEXT,
    total_price REAL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// API Endpoint para sa Reservation
app.post('/api/reserve', (req, res) => {
    const { name, email, date, time } = req.body;
    const sql = `INSERT INTO reservations (name, email, date, time) VALUES (?, ?, ?, ?)`;
    
    db.run(sql, [name, email, date, time], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Reservation saved successfully!", id: this.lastID });
    });
});

// API Endpoint para sa Pagkuha at Pag-deliver ng Order
app.post('/api/orders', (req, res) => {
    const { customer_name, phone, address, items, total_price } = req.body;
    
    // I-convert ang items array papuntang Text/JSON string para ma-store sa database
    const itemsJson = JSON.stringify(items);

    const sql = `INSERT INTO orders (customer_name, phone, address, items, total_price) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(sql, [customer_name, phone, address, itemsJson, total_price], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Order placed successfully for delivery!", orderId: this.lastID });
    });
});

// API Endpoint para makita ang lahat ng Orders (para sa Admin / Kitchen View)
app.get('/api/orders', (req, res) => {
    db.all(`SELECT * FROM orders ORDER BY order_date DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});