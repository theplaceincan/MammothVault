'use client';

import { useEffect, useState } from 'react';
import fetchProduct from '@/app/services/getProducts';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from "./Products.module.css"
import Image from 'next/image';
import Link from 'next/link';

interface ProductImage {
  url: string;
  altText: string | null;
}

interface Price {
  amount: string;
  currencyCode: string;
}

interface ProductVariant {
  id: string; // this is the variant id for the cart
  price: Price;
}

interface Product {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  images: {
    edges: { node: ProductImage }[];
  };
  variants: {
    edges: { node: ProductVariant }[];
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  function slugify(str: string) {
    return str.toLowerCase().replace(/\s+/g, '-');
  }

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetchProduct();
        if (res.errors) {
          console.error("GraphQL Errors:", res.errors);
          throw new Error(res.errors.map((e: { message: string }) => e.message).join("\n"));
        }
        const edges = res.data.products.edges;
        const productList = edges.map((edge: { node: Product }) => edge.node);
        setProducts(productList);

      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }

    loadProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles["page-container"]}>
        <p className={styles["page-title"]}>SHOP PRODUCTS</p>
        <div className={styles["products-container"]}>
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {products.map((product) => {
            const firstImage = product.images.edges[0]?.node;
            const firstVariant = product.variants.edges[0]?.node;
            return (
              <Link href={`/products/${product.handle}`} key={product.id} className={styles["product-card"]}>
                <div className={styles["img-cover"]}>
                  {firstImage && (
                    <Image
                      className={styles["bottom-left-cut"]}
                      width={170}
                      height={170}
                      src={firstImage.url}
                      alt={firstImage.altText || product.title}
                    />
                  )}
                </div>
                <div className={styles["text-cover"]}>
                  <p className={styles["card-title"]}>{product.title}</p>
                  <p className={styles["card-price"]}>
                    {firstVariant ? `$${parseFloat(firstVariant.price.amount).toFixed(2)} ${firstVariant.price.currencyCode}` : "N/A"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
