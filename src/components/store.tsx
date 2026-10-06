"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/lib/catalog";

export type CartItem = {
  key: string;
  slug: string;
  fabric?: string;
  finish?: string;
  qty: number;
};

type Toast = { id: number; title: string; slug: string } | null;

type StoreValue = {
  hydrated: boolean;
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  cartTotal: number;
  addToCart: (item: Omit<CartItem, "key" | "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  inWishlist: (slug: string) => boolean;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  toast: Toast;
  dismissToast: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const CART_KEY = "vergeles.cart.v1";
const WISH_KEY = "vergeles.wishlist.v1";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — state stays in memory */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const storedCart = read<CartItem[]>(CART_KEY, []).filter((i) => getProduct(i.slug));
    const storedWish = read<string[]>(WISH_KEY, []).filter((s) => getProduct(s));
    setCart(storedCart);
    setWishlist(storedWish);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) write(CART_KEY, cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) write(WISH_KEY, wishlist);
  }, [wishlist, hydrated]);

  const showToast = useCallback((slug: string) => {
    const product = getProduct(slug);
    if (!product) return;
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), title: product.name, slug });
    toastTimer.current = setTimeout(() => setToast(null), 4200);
  }, []);

  const addToCart = useCallback<StoreValue["addToCart"]>(
    (item, qty = 1) => {
      const key = [item.slug, item.fabric ?? "-", item.finish ?? "-"].join("|");
      setCart((prev) => {
        const existing = prev.find((i) => i.key === key);
        if (existing) {
          return prev.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + qty, 20) } : i));
        }
        return [...prev, { ...item, key, qty }];
      });
      showToast(item.slug);
    },
    [showToast],
  );

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(qty, 20)) } : i)),
    );
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const inWishlist = useCallback((slug: string) => wishlist.includes(slug), [wishlist]);

  const dismissToast = useCallback(() => setToast(null), []);

  const value = useMemo<StoreValue>(() => {
    const cartCount = cart.reduce((n, i) => n + i.qty, 0);
    const cartTotal = cart.reduce((sum, i) => sum + (getProduct(i.slug)?.price ?? 0) * i.qty, 0);
    return {
      hydrated,
      cart,
      wishlist,
      cartCount,
      cartTotal,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      inWishlist,
      searchOpen,
      setSearchOpen,
      toast,
      dismissToast,
    };
  }, [
    hydrated,
    cart,
    wishlist,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    inWishlist,
    searchOpen,
    toast,
    dismissToast,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
