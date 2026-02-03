import { neon } from "@netlify/neon";

export const handler = async (event) => {
  const sql = neon();
  const data = JSON.parse(event.body);

  await sql`
    insert into public.products (
      id, name, category, price, status, description, created_at
    ) values (
      ${crypto.randomUUID()},
      ${data.name},
      ${data.category},
      ${data.price},
      ${data.status},
      ${data.description},
      ${Date.now()}
    )
  `;

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};
