import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

export const handler = async (event) => {
  const sql = neon(process.env.DATABASE_URL);
  const action = event.queryStringParameters?.action || '';
  const data = event.body ? JSON.parse(event.body) : {};

  const json = (statusCode, payload) => ({
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  try {
    // 1. REGISTER USER
    if (action === 'register') {
      const code = 'CUST-' + Math.floor(1000 + Math.random() * 9000);
      const hashed = await bcrypt.hash(data.password, 10);
      try {
        await sql`
          INSERT INTO users (user_code, name, email, phone, password, role)
          VALUES (${code}, ${data.name}, ${data.email}, ${data.phone}, ${hashed}, 'customer')
        `;
        return json(200, { status: 'success', name: data.name, phone: data.phone });
      } catch (e) {
        return json(200, { status: 'error', message: 'Email already exists or invalid data.' });
      }
    }

    // 2. LOGIN USER / ADMIN
    if (action === 'login') {
      if (data.email === 'admin@estcom.com' && data.password === 'admin123') {
        return json(200, { status: 'success', role: 'staff', name: 'ADMIN' });
      }
      const rows = await sql`SELECT * FROM users WHERE email = ${data.email} LIMIT 1`;
      if (rows.length === 0) {
        return json(200, { status: 'error', message: 'No account found with that email.' });
      }
      const user = rows[0];
      const match = await bcrypt.compare(data.password, user.password);
      if (!match) {
        return json(200, { status: 'error', message: 'Incorrect password.' });
      }
      return json(200, {
        status: 'success',
        role: user.role,
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
    }

    // 3. USERS (ADMIN)
    if (action === 'get_users') {
      const rows = await sql`SELECT id, user_code, name, email, phone, date_joined FROM users WHERE role = 'customer' ORDER BY id DESC`;
      return json(200, rows);
    }
    if (action === 'delete_user') {
      await sql`DELETE FROM users WHERE id = ${Number(data.id)}`;
      return json(200, { status: 'success' });
    }

    // 4. ORDERS
    if (action === 'place_order') {
      const code = 'EST-' + Math.floor(1000 + Math.random() * 9000);
      const itemsStr = Array.isArray(data.items) ? data.items.join(' || ') : '';
      await sql`
        INSERT INTO orders (order_code, customer_name, phone, address, order_type, payment_method, items, total)
        VALUES (${code}, ${data.name}, ${data.phone}, ${data.address}, ${data.type}, ${data.pay}, ${itemsStr}, ${Number(data.total)})
      `;
      return json(200, { status: 'success', order_code: code });
    }
    if (action === 'get_orders') {
      const rows = await sql`SELECT * FROM orders ORDER BY id DESC`;
      return json(200, rows.map(r => ({
        db_id: r.id,
        id: r.order_code,
        name: r.customer_name,
        phone: r.phone,
        address: r.address,
        type: r.order_type,
        pay: r.payment_method,
        items: r.items ? r.items.split(' || ') : [],
        total: r.total,
        status: r.status,
        date: r.created_at,
      })));
    }
    if (action === 'update_order_status') {
      await sql`UPDATE orders SET status = ${data.status} WHERE id = ${Number(data.db_id)}`;
      return json(200, { status: 'success' });
    }
    if (action === 'delete_order') {
      await sql`DELETE FROM orders WHERE id = ${Number(data.db_id)}`;
      return json(200, { status: 'success' });
    }

    // 5. RESERVATIONS
    if (action === 'place_reservation') {
      const code = 'RES-' + Math.floor(1000 + Math.random() * 9000);
      await sql`
        INSERT INTO reservations (res_code, customer_name, phone, res_type, guests, res_date, res_time, notes)
        VALUES (${code}, ${data.name}, ${data.phone}, ${data.type}, ${data.guests}, ${data.date}, ${data.time}, ${data.notes})
      `;
      return json(200, { status: 'success', res_code: code });
    }
    if (action === 'get_reservations') {
      const rows = await sql`SELECT * FROM reservations ORDER BY id DESC`;
      return json(200, rows.map(r => ({
        db_id: r.id,
        id: r.res_code,
        name: r.customer_name,
        phone: r.phone,
        type: r.res_type,
        guests: r.guests,
        date: r.res_date,
        time: r.res_time,
        notes: r.notes,
        status: r.status,
      })));
    }
    if (action === 'update_res_status') {
      await sql`UPDATE reservations SET status = ${data.status} WHERE id = ${Number(data.db_id)}`;
      return json(200, { status: 'success' });
    }
    if (action === 'delete_res' || action === 'delete_reservation') {
      await sql`DELETE FROM reservations WHERE id = ${Number(data.db_id)}`;
      return json(200, { status: 'success' });
    }

    // 6. REVIEWS
    if (action === 'add_review') {
      await sql`INSERT INTO reviews (author, role, stars, quote) VALUES (${data.author}, ${data.role}, ${Number(data.stars)}, ${data.quote})`;
      return json(200, { status: 'success' });
    }
    if (action === 'get_reviews') {
      const rows = await sql`SELECT * FROM reviews ORDER BY id DESC`;
      return json(200, rows.map(r => ({
        db_id: r.id,
        author: r.author,
        role: r.role,
        stars: r.stars,
        quote: r.quote,
        created_at: r.created_at,
      })));
    }
    if (action === 'delete_review') {
      await sql`DELETE FROM reviews WHERE id = ${Number(data.db_id)}`;
      return json(200, { status: 'success' });
    }

    return json(400, { status: 'error', message: 'Unknown action' });
  } catch (err) {
    return json(500, { status: 'error', message: err.message });
  }
};