import { neon } from "@netlify/neon";

export const handler = async (event) => {
  const sql = neon();
  const data = JSON.parse(event.body || "{}");

  const {
    id,
    name,
    category,
    price,
    status,
    description,
    createdAt
  } = data;

  await sql`
    insert into public.products (
      id, name, category, price, status, description, created_at
    ) values (
      ${id}, ${name}, ${category}, ${price}, ${status}, ${description}, ${createdAt}
    )
  `;

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};
