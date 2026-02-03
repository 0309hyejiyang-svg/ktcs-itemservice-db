const { neon } = require("@neondatabase/serverless");

exports.handler = async () => {
  try {
    const sql = neon(process.env.DATABASE_URL);

    const [where] = await sql`
      select
        current_database() as db,
        current_schema() as schema,
        current_user as usr,
        inet_server_addr() as server_addr
    `;

    const [{ cnt }] = await sql`
      select count(*)::int as cnt from public.products
    `;

    const latest = await sql`
      select id, name, category, price, status, description, created_at
      from public.products
      order by created_at desc
      limit 5
    `;

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok: true, where, cnt, latest }, null, 2),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok: false, error: String(e?.message || e) }),
    };
  }
};
