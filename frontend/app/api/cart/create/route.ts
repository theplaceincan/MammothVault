import { NextResponse } from "next/server";
import { CART_CREATE } from "../../../services/useCart";

export async function POST(req: Request) {
  const { variantId, quantity } = await req.json();

  try {
    if (!process.env.SHOPIFY_STORE_DOMAIN) throw new Error("Missing SHOPIFY_STORE_DOMAIN");
    if (!process.env.SHOPIFY_API_VERSION) throw new Error("Missing SHOPIFY_API_VERSION");
    if (!process.env.SHOPIFY_STOREFRONT_TOKEN) throw new Error("Missing SHOPIFY_STOREFRONT_TOKEN");

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
          query: CART_CREATE,
          variables: { lines: [{ merchandiseId: variantId, quantity: Math.max(0, Number(quantity) || 0) }] },
        }),
      }
    );

    const text = await res.text();
    if (!res.ok) {
      console.error("Shopify cartCreate failed:", res.status, text);
      return NextResponse.json({ error: text || "Shopify error" }, { status: res.status });
    }

    const json = JSON.parse(text);
    if (json.errors?.length) {
      console.error("GraphQL errors:", json.errors);
      return NextResponse.json({ error: json.errors }, { status: 500 });
    }
    const ue = json.data?.cartCreate?.userErrors;
    if (ue?.length) {
      console.error("User errors:", ue);
      return NextResponse.json({ error: ue }, { status: 400 });
    }

    return NextResponse.json(json.data.cartCreate.cart);
  } catch (e: unknown) {
    const err_msg = e instanceof Error ? e.message : String(e);
    console.log(err_msg || 'Unknown error');
    return NextResponse.json({ error: err_msg ?? "Cart create failed" }, { status: 500 });
  }
}
