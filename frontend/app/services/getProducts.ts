import { request, gql } from 'graphql-request';

const query = `
  query GetProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          descriptionHtml # <-- Get the product description as HTML
          
          # Get the first product image
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }

          # Get the first product variant for price and cart ID
          variants(first: 1) {
            edges {
              node {
                id # <-- This is the ID needed to add this item to the cart
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default async function fetchProduct() {
  try {
    const response = await fetch('/api/shopify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GraphQL request failed: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
