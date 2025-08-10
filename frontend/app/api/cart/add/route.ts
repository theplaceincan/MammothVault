import { NextResponse } from "next/server";
import { CART_LINES_ADD } from "../../../services/useCart";

export async function POST(req: Request) {
  const { cartId, variantId, quantity } = await req.json();
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({
        query: CART_LINES_ADD,
        variables: { cartId, lines: [{ merchandiseId: variantId, quantity: quantity ?? 1 }] },
      }),
    }
  );
  const json = await res.json();
  if (json.errors?.length || json.data?.cartLinesAdd?.userErrors?.length) {
    return NextResponse.json({ error: json }, { status: 400 });
  }
  return NextResponse.json(json.data.cartLinesAdd.cart);
}
