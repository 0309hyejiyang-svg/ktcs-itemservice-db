import { neon } from "@netlify/neon";

export const handler = async () => {
  const sql = neon();

  // ✅ 지금 "함수가 붙어있는 DB"에 테이블을 강제로 생성
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

  // 확인용: 실제로 생성됐는지 체크
  const [chk] = await sql`
    select to_regclass('public.products') as reg;
  `;

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ok: true, reg: chk?.reg ?? null })
  };
};
