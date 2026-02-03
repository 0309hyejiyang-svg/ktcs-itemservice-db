import { neon } from "@netlify/neon";

export const handler = async () => {
  const sql = neon();

  const tables = await sql`
    select schemaname, tablename
    from pg_tables
    where schemaname in ('public')
    order by tablename;
  `;

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(tables)
  };
};
