import { neon } from "@netlify/neon";

export const handler = async (event) => {
  const sql = neon();
  const id = event.queryStringParameters?.id;

  await sql`delete from products where id = ${id}`;

  return { statusCode: 200 };
};
