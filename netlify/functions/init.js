import { neon } from "@netlify/neon";

export const handler = async () => {
  const sql = neon();

  await sql`
    create table if not exists public.products (
      id text primary key,
      name text not null,
      category text not null,
      price integer not null,
      status text not null,
      description text,
      created_at bigint not null
    );
  `;

  return {
    statusCode: 200,
    body: "OK: products table ready"
  };
};
