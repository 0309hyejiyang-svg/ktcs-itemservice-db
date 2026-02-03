import { neon } from "@netlify/neon";

export const handler = async () => {
  try {
    // ✅ env를 명시적으로 사용 (자동 neon()보다 확실)
    const sql = neon(process.env.NETLIFY_DATABASE_URL);

    const info = await sql`
      select
        current_database() as db,
        current_schema() as schema,
        current_user as "user",
        inet_server_addr()::text as server_addr
    `;

    const reg = await sql`select to_regclass('public.products') as products_regclass`;

    // public schema의 table 목록(참고)
    const tables = await sql`
      select tablename
      from pg_tables
      where schemaname='public'
      order by tablename
    `;

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ info, reg, tables }, null, 2),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: String(e) }, null, 2),
    };
  }
};
