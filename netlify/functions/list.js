import { neon } from "@netlify/neon";

export const handler = async () => {
  const sql = neon();

  const rows = await sql`
    select
      id, name, category, price, status,
      description,
      created_at as "createdAt"
    from products
    order by created_at desc
  `;

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(rows)
  };
};
