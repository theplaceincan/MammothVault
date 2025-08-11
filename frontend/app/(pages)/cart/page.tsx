'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from './Cart.module.css';

type Money = { amount: string; currencyCode: string };
type Variant = {
  id: string;
  title: string;
  product: { title: string; handle: string };
  price: Money;
  image?: { url: string; altText: string | null };
};
type Line = {
  id: string;
  quantity: number;
  cost: { totalAmount: Money };
  merchandise: Variant;
};
type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: Money; totalAmount: Money };
  lines: { edges: { node: Line }[] };
};

const fmt = (m: Money) => `$${Number(m.amount).toFixed(2)} ${m.currencyCode}`;

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyLine, setBusyLine] = useState<string | null>(null);

  const cartId =
    typeof window !== 'undefined' ? localStorage.getItem('cartId') : null;

  const loadCart = useCallback(async () => {
    if (!cartId) {
      setCart(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/cart/get?id=${encodeURIComponent(cartId)}`, {
      cache: 'no-store',
    });
    const data = res.ok ? await res.json() : null;
    setCart(data);
    setLoading(false);
  }, [cartId]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  async function updateQuantity(lineId: string, quantity: number) {
    if (!cartId) return;
    if (quantity <= 0) return removeLine(lineId);
    setBusyLine(lineId);
    const res = await fetch('/api/cart/update', {
      method: 'POST',
      body: JSON.stringify({ cartId, lines: [{ id: lineId, quantity }] }),
    });
    const data = res.ok ? await res.json() : null;
    if (data) setCart(data);
    setBusyLine(null);
  }

  async function removeLine(lineId: string) {
    if (!cartId) return;
    setBusyLine(lineId);
    const res = await fetch('/api/cart/remove', {
      method: 'POST',
      body: JSON.stringify({ cartId, lineIds: [lineId] }),
    });
    const data = res.ok ? await res.json() : null;
    if (data) setCart(data);
    setBusyLine(null);
  }

  async function clearCart() {
    if (!cartId || !cart) return;
    const lineIds = cart.lines.edges.map((e) => e.node.id);
    if (!lineIds.length) return;
    const res = await fetch('/api/cart/remove', {
      method: 'POST',
      body: JSON.stringify({ cartId, lineIds }),
    });
    const data = res.ok ? await res.json() : null;
    if (data) setCart(data);
  }

  return (
    <>
      <Navbar />
      <div className={styles['page-container']}>
        <h1>Your Cart</h1>

        {loading && <p>Loading…</p>}

        {!loading && (!cart || cart.totalQuantity === 0) && (
          <div className={styles['empty']}>
            <p>Your cart is empty.</p>
            <Link href="/products" className={styles['link']}>
              Continue shopping →
            </Link>
          </div>
        )}

        {!loading && cart && cart.totalQuantity > 0 && (
          <>
            <ul className={styles['lines']}>
              {cart.lines.edges.map(({ node }) => (
                <li key={node.id} className={styles['line']}>
                  <div className={styles['thumb']}>
                    <Image
                      src={node.merchandise.image?.url ?? '/logos/standard.jpg'}
                      alt={node.merchandise.image?.altText ?? node.merchandise.product.title}
                      fill
                      sizes="96px"
                    />
                  </div>

                  <div className={styles["info-container"]}>
                    <Link href={`/products/${node.merchandise.product.handle}`} className={styles['title']} >
                      {node.merchandise.product.title}
                    </Link>
                    {/* <div className={styles['variant']}> {node.merchandise.title}</div> */}
                    <div className={styles['price']}>{fmt(node.merchandise.price)}</div>
                  </div>

                  <div className={styles["quantity-container"]}>
                    <button className={styles["btn-input-decrease"]} aria-label="Decrease" onClick={() => updateQuantity(node.id, node.quantity - 1)} disabled={busyLine === node.id}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                      </svg>
                    </button>
                    <input className={styles["quantity-input"]} type="number" min={1} value={node.quantity} onChange={(e) => updateQuantity(node.id, Math.max(1, Number(e.target.value)))} disabled={busyLine === node.id} />
                    <button className={styles["btn-input-increase"]} aria-label="Increase" onClick={() => updateQuantity(node.id, node.quantity + 1)} disabled={busyLine === node.id}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>

                  <div className={styles['lineTotal']}> {fmt(node.cost.totalAmount)}</div>
                  <button className={styles['btn-remove']} onClick={() => removeLine(node.id)} disabled={busyLine === node.id}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles['summary']}>
              <div className={styles['row']}>
                <span>Subtotal</span>
                <span>{fmt(cart.cost.subtotalAmount)}</span>
              </div>
              <div className={styles['actions']}>
                <button onClick={clearCart} className={styles['btn-clear-cart']}>
                  Clear cart
                </button>
                <a href={cart.checkoutUrl} className={styles['btn-checkout']}>
                  Checkout
                </a>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
