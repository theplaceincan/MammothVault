export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/2024-04/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  // return NextResponse.json(data);
  return NextResponse.json(data);
  // return new Response(JSON.stringify(data), { status: res.status });
}
