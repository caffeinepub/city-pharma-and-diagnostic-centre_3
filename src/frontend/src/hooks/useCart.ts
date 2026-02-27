import { useState, useEffect, useCallback } from "react";

export interface CartItem {
  id: number;
  brand: string;
  generic: string;
  strength: string;
  manufacturer: string;
  prescriptionRequired: boolean;
  inStock: boolean;
}

const CART_KEY = "cityPharmaCart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  const saveItems = useCallback((newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem(CART_KEY, JSON.stringify(newItems));
  }, []);

  const addItem = useCallback(
    (item: CartItem) => {
      setItems((prev) => {
        if (prev.some((i) => i.id === item.id)) return prev;
        const updated = [...prev, item];
        localStorage.setItem(CART_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const removeItem = useCallback(
    (id: number) => {
      setItems((prev) => {
        const updated = prev.filter((i) => i.id !== id);
        localStorage.setItem(CART_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    saveItems([]);
  }, [saveItems]);

  const isInCart = useCallback(
    (id: number) => items.some((i) => i.id === id),
    [items]
  );

  return { items, addItem, removeItem, clearCart, isInCart, count: items.length };
}
