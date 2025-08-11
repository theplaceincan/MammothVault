'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Handle.module.css';

export default function ProductActions({ variantId }: { variantId: string }) {
  const [qty, setQty] = useState(1);
  const [cartId, setCartId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false); // <-- new

  type CartEdge = { node: { merchandise?: { id: string } | null } };
  type CartGet = { lines?: { edges?: CartEdge[] } };

  useEffect(() => {
    const id = localStorage.getItem('cartId');
    setCartId(id);
    if (!id) return;
    (async () => {
      const res = await fetch(`/api/cart/get?id=${encodeURIComponent(id)}`, { cache: 'no-store' });
      if (!res.ok) return;
      const cart: CartGet = await res.json();
      const hasThisVariant = cart?.lines?.edges?.some(
        (edge) => edge?.node?.merchandise?.id === variantId
      );
      setAdded(!!hasThisVariant);
    })();
  }, [variantId]);

  async function ensureCart() {
    if (cartId) return cartId;
    const res = await fetch('/api/cart/create', {
      method: 'POST',
      body: JSON.stringify({ variantId, quantity: 0 }),
    });
    if (!res.ok) throw new Error(await res.text());
    const cart = await res.json();
    localStorage.setItem('cartId', cart.id);
    setCartId(cart.id);
    return cart.id;
  }

  async function onAddToCart() {
    setLoading(true);
    try {
      const id = await ensureCart();
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        body: JSON.stringify({ cartId: id, variantId, quantity: qty }),
      });
      if (!res.ok) throw new Error(await res.text());
      setAdded(true);
    } finally {
      setLoading(false);
    }
  }

  async function onBuyNow() {
    setLoading(true);
    try {
      const res = await fetch('/api/cart/create', {
        method: 'POST',
        body: JSON.stringify({ variantId, quantity: qty }),
      });
      if (!res.ok) throw new Error(await res.text());
      const cart = await res.json();
      window.location.href = cart.checkoutUrl;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles['actions-container']}>
      <input
        type="number"
        min={1}
        value={qty}
        onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
        className={styles['quantity-input']}
      />
      <div className={styles['btn-container']}>
        {added ? (
          <Link href="/cart" className={styles['btn-cart-added']}>
            Added To Cart
          </Link>
        ) : (
          <button
            onClick={onAddToCart}
            disabled={loading}
            className={styles['btn-cart']}
          >
            Add to Cart
          </button>
        )}

        <button onClick={onBuyNow} disabled={loading} className={styles['btn-buy']}>
          Buy Now
        </button>
      </div>
    </div>
  );
}
