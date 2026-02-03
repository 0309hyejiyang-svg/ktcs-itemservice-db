import { neon } from "@netlify/neon";

export const handler = async (event) => {
  const sql = neon();
  const p = JSON.parse(event.body || "{}");

  await sql`
    insert into products
    (id, name, category, price, status, description, created_at)
    values
    (${p.id}, ${p.name}, ${p.category}, ${p.price}, ${p.status}, ${p.description ?? null}, ${p.createdAt})
  `;

  return { statusCode: 200 };
};
