import { neon } from "@netlify/neon";

export const handler = async (event) => {
  try {
    const sql = neon();

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: "Missing body" }),
      };
    }

    const {
      id,
      name,
      category,
      price,
      status,
      description = null,
      createdAt,
    } = JSON.parse(event.body);

    await sql`
      insert into public.products
      (id, name, category, price, status, description, created_at)
      values
      (${id}, ${name}, ${category}, ${price}, ${status}, ${description}, ${createdAt})
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: String(e.message) }),
    };
  }
};
