import { neon } from "@netlify/neon";

export const handler = async () => {
  try {
    const sql = neon();

    const info = await sql`
      select current_database() as db,
             current_schema() as schema,
             current_user as user,
             inet_server_addr() as server_addr
    `;

    const cnt = await sql`select count(*)::int as cnt from public.products`;

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ info: info[0], cnt: cnt[0].cnt })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: String(e) })
    };
  }
};
