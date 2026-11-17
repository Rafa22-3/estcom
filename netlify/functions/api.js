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
        return json(200, { status: 'error', message: e.message || String(e) });
      }
    }

    // 2. LOGIN USER / ADMIN
    if (action === 'login') {
      if (data.email === 'admin@estcom.com' && data.password === 'admin123') {
        return json(200, { status: 'success', role: 'staff', name: 'ADMIN' });
      }

      const rows = await sql`SELECT * FROM users WHERE email = ${data.email} LIMIT 1`;
      if (rows.length > 0) {
        const user = rows[0];
        const match = await bcrypt.compare(data.password, user.password);
        if (match) {
          return json(200, {
            status: 'success',
            role: user.role,
            name: user.name,
            phone: user.phone,
            user_code: user.user_code
          });
        }
      }
      return json(200, { status: 'error', message: 'Invalid email or password.' });
    }

    return json(200, { status: 'error', message: 'Unknown action' });
  } catch (err) {
    return json(500, { status: 'error', message: err.message });
  }
};
