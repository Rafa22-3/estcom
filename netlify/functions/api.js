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
      const email = String(data.email || '').trim().toLowerCase();
      const hashed = await bcrypt.hash(data.password, 10);

      try {
        await sql`
          INSERT INTO users (user_code, name, email, phone, password, role)
          VALUES (${code}, ${data.name}, ${email}, ${data.phone}, ${hashed}, 'customer')
        `;
        return json(200, { status: 'success', name: data.name, phone: data.phone });
      } catch (e) {
        const msg = String(e.message || e).toLowerCase().includes('unique')
          ? 'Email already exists.'
          : 'Database error: ' + (e.message || String(e));
        return json(200, { status: 'error', message: msg });
      }
    }

    // 2. LOGIN USER / ADMIN
    if (action === 'login') {
      const email = String(data.email || '').trim().toLowerCase();

      if (email === 'admin@estcom.com' && data.password === 'admin123') {
        return json(200, { status: 'success', role: 'staff', name: 'ADMIN' });
      }

      const rows = await sql`SELECT * FROM users WHERE LOWER(email) = ${email} LIMIT 1`;
      if (rows.length > 0) {
        const user = rows[0];
        const match = await bcrypt.compare(data.password, user.password);
        if (match) {
          return json(200, {
            status: 'success',
            role: user.role,
            name: user.name,
            phone: user.phone,
            email: user.email,
          });
        }
        return json(200, { status: 'error', message: 'Incorrect password.' });
      }
      return json(200, { status: 'error', message: 'No account found with that email.' });
    }

    // 3. GET USERS (Admin Tab)
    if (action === 'get_users') {
      const rows = await sql`
        SELECT id, user_code, name, email, phone, date_joined
        FROM users
        WHERE role = 'customer'
        ORDER BY id DESC
      `;
      return json(200, rows);
    }

    // 4. DELETE USER
    if (action === 'delete_user') {
      const id = Number(data.id);
      await sql`DELETE FROM users WHERE id = ${id}`;
      return json(200, { status: 'success' });
    }

    // 5. PLACE ORDER
    if (action === 'place_order') {
      const code = 'EST-' + Math.floor(1000 + Math.random() * 9000);
      const itemsStr = Array.isArray(data.items) ? data.items.join(' || ') : String(data.items || '');
      const total = parseFloat(data.total) || 0;

      try {
        await sql`
          INSERT INTO orders (order_code, customer_name, phone, address, order_type, payment_method, items, total)
          VALUES (${code}, ${data.name}, ${data.phone}, ${data.address}, ${data.type}, ${data.pay}, ${itemsStr}, ${total})
        `;
        return json(200, { status: 'success', order_code: code });
      } catch (e) {
        return json(200, { status: 'error', message: e.message || String(e) });
      }
    }

    // 6. GET ORDERS
    if (action === 'get_orders') {
      const rows = await sql`SELECT * FROM orders ORDER BY id DESC`;
      const list = rows.map((row) => ({
        db_id: row.id,
        id: row.order_code,
        name: row.customer_name,
        phone: row.phone,
        address: row.address,
        type: row.order_type,
        pay: row.payment_method,
        items: row.items ? row.items.split(' || ') : [],
        total: row.total,
        status: row.status,
        date: row.created_at,
      }));
      return json(200, list);
    }

    // 7. UPDATE ORDER STATUS
    if (action === 'update_order_status') {
      const id = Number(data.db_id);
      await sql`UPDATE orders SET status = ${data.status} WHERE id = ${id}`;
      return json(200, { status: 'success' });
    }

    // 8. DELETE ORDER
    if (action === 'delete_order') {
      const id = Number(data.db_id);
      await sql`DELETE FROM orders WHERE id = ${id}`;
      return json(200, { status: 'success' });
    }

    // 9. PLACE RESERVATION
    if (action === 'place_reservation') {
      const code = 'RES-' + Math.floor(1000 + Math.random() * 9000);
      try {
        await sql`
          INSERT INTO reservations (res_code, customer_name, phone, res_type, guests, res_date, res_time, notes)
          VALUES (${code}, ${data.name}, ${data.phone}, ${data.type}, ${data.guests}, ${data.date}, ${data.time}, ${data.notes || ''})
        `;
        return json(200, { status: 'success', res_code: code });
      } catch (e) {
        return json(200, { status: 'error', message: e.message || String(e) });
      }
    }

    // 10. GET RESERVATIONS
    if (action === 'get_reservations') {
      const rows = await sql`SELECT * FROM reservations ORDER BY id DESC`;
      const list = rows.map((row) => ({
        db_id: row.id,
        id: row.res_code,
        name: row.customer_name,
        phone: row.phone,
        type: row.res_type,
        guests: row.guests,
        date: row.res_date,
        time: row.res_time,
        notes: row.notes,
        status: row.status,
      }));
      return json(200, list);
    }

    // 11. UPDATE RESERVATION STATUS
    if (action === 'update_res_status') {
      const id = Number(data.db_id);
      await sql`UPDATE reservations SET status = ${data.status} WHERE id = ${id}`;
      return json(200, { status: 'success' });
    }

    // 12. DELETE RESERVATION
    if (action === 'delete_res' || action === 'delete_reservation') {
      const id = Number(data.db_id);
      await sql`DELETE FROM reservations WHERE id = ${id}`;
      return json(200, { status: 'success' });
    }

    // 13. ADD, GET & DELETE REVIEWS
    if (action === 'add_review') {
      const stars = Number(data.stars) || 5;
      await sql`
        INSERT INTO reviews (author, role, stars, quote)
        VALUES (${data.author}, ${data.role}, ${stars}, ${data.quote})
      `;
      return json(200, { status: 'success' });
    }

    if (action === 'get_reviews') {
      const rows = await sql`SELECT * FROM reviews ORDER BY id DESC`;
      const list = rows.map((row) => ({
        db_id: row.id,
        author: row.author,
        role: row.role,
        stars: row.stars,
        quote: row.quote,
        created_at: row.created_at || '',
      }));
      return json(200, list);
    }

    if (action === 'delete_review') {
      const id = Number(data.db_id);
      await sql`DELETE FROM reviews WHERE id = ${id}`;
      return json(200, { status: 'success' });
    }

    return json(200, { status: 'error', message: 'Unknown action: ' + action });
  } catch (err) {
    return json(500, { status: 'error', message: err.message });
  }
};
