import { neon } from "@netlify/neon";

export const handler = async (event) => {
  const sql = neon();
  const { id } = JSON.parse(event.body || "{}");

  await sql`
    delete from public.products
    where id = ${id}
  `;

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};
