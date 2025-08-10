import { NextResponse } from "next/server";
import { CART_LINES_REMOVE } from "../../../services/useCart";

export async function POST(req: Request) {
  const { cartId, lineIds } = await req.json();
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({ query: CART_LINES_REMOVE, variables: { cartId, lineIds } }),
    }
  );
  const json = await res.json();
  if (json.errors?.length || json.data?.cartLinesRemove?.userErrors?.length) {
    return NextResponse.json({ error: json }, { status: 400 });
  }
  return NextResponse.json(json.data.cartLinesRemove.cart);
}
