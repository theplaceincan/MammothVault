import { NextResponse } from "next/server";
import { CART_QUERY } from "../../../services/useCart";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing cart id" }, { status: 400 });

  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({ query: CART_QUERY, variables: { id } }),
    }
  );

  const text = await res.text();
  if (!res.ok) return NextResponse.json({ error: text }, { status: res.status });

  const json = JSON.parse(text);
  if (json.errors?.length) return NextResponse.json({ error: json.errors }, { status: 500 });

  return NextResponse.json(json.data.cart); 
}