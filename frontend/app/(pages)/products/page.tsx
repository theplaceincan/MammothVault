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
  id: string;
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

  // function slugify(str: string) {
  //   return str.toLowerCase().replace(/\s+/g, '-');
  // }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchProduct();
        if (res.errors) throw new Error(res.errors.map((e: { message: string }) => e.message).join('\n'));
        setProducts(res.data.products.edges.map((e: { node: Product }) => e.node));
      } catch (e: unknown) {
        const err_msg = e instanceof Error ? e.message : String(e);
        setError(err_msg || 'Unknown error');
      }
    })();

  }, []);

  // *** Search functionality begins ***
  
  const [query, setQuery] = useState("");
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.handle.toLowerCase().includes(query.toLowerCase()) ||
    p.descriptionHtml.toLowerCase().includes(query.toLowerCase())
  );

  // *** Search functionality begins ***

  return (
    <>
      <Navbar />
      <div className={styles["page-container"]}>
        <p className={styles["page-title"]}>SHOP PRODUCTS</p>
        <div className={styles["search-container"]}>
          <div className={styles["search-wrap"]}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles["search-icon"]}>
              <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input placeholder="Search product here" className={styles["search-input"]} value={query} onChange={(e) => setQuery(e.target.value)}/>
          </div>
        </div>

        <div className={styles["products-container"]}>
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {filteredProducts.map((product) => {
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
