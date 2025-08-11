export async function getSingleProduct(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        descriptionHtml
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    handle: handle,
  };

  try {
    // const baseUrl =
    //   process.env.VERCEL_URL
    //     ? `https://${process.env.VERCEL_URL}`
    //     : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // const response = await fetch(`${baseUrl}/api/shopify`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ query, variables }),
    // });

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL : ''}/api/shopify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching single product:", error);
    throw error;
  }
}


// app/lib/shopify-admin.ts
export async function getVariantCost(variantGid: string) {
  const query = `
    query GetCost($id: ID!) {
      productVariant(id: $id) {
        id
        inventoryItem {
          unitCost { amount currencyCode }
        }
      }
    }`;

  const r = await fetch(
    `https://${process.env.SHOPIFY_SHOP}/admin/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_TOKEN!,
      },
      body: JSON.stringify({ query, variables: { id: variantGid } }),
      cache: 'no-store',
    }
  );
  const json = await r.json();
  return json.data?.productVariant?.inventoryItem?.unitCost ?? null;
}
