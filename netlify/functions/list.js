import { neon } from "@netlify/neon";

export const handler = async () => {
  const sql = neon();

  const info = await sql`
    select
      current_database() as db,
      current_schema() as schema,
      current_user as user
  `;

  return {
    statusCode: 200,
    body: JSON.stringify(info)
  };
};
