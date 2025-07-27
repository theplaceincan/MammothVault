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

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetchProduct();
        if (res.errors) {
          console.error("GraphQL Errors:", res.errors);
          throw new Error(res.errors.map((e: any) => e.message).join("\n"));
        }
        const edges = res.data.products.edges;
        const productList = edges.map((edge: any) => edge.node);
        setProducts(productList);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      }
    }

    loadProducts();
  }, []);

  // {error && <p style={{ color: 'red' }}>Error: {error}</p>}
  return (
    <>
      <Navbar />
      <div className={styles["page-container"]}>
        <p className={styles["page-title"]}>SHOP PRODUCTS</p>
        <div className={styles["products-container"]}>
          <Link href={"/"} className={styles["product-card"]}>
            <div className={styles["img-cover"]}>
              <Image className={styles["bottom-left-cut"]} width={170} height={10} src="/hero-imgs/1.JPEG" alt='1'></Image>
            </div>
            <div className={styles["text-cover"]}>
              <p className={styles["card-title"]}>Title</p>
              <p className={styles["card-price"]}>$99.22</p>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
