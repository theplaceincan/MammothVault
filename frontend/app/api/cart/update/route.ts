import { NextResponse } from "next/server";
import { CART_LINES_UPDATE } from "../../../services/useCart";

export async function POST(req: Request) {
  const { cartId, lines } = await req.json(); // [{ id, quantity }]
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({ query: CART_LINES_UPDATE, variables: { cartId, lines } }),
    }
  );
  const json = await res.json();
  if (json.errors?.length || json.data?.cartLinesUpdate?.userErrors?.length) {
    return NextResponse.json({ error: json }, { status: 400 });
  }
  return NextResponse.json(json.data.cartLinesUpdate.cart);
}
