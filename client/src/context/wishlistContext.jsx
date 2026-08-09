import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const localData = localStorage.getItem("freshmart_wishlist");
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("freshmart_wishlist", JSON.stringify(wishlistItems));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlistItems]);

  const toggleWishlist = useCallback((product) => {
    let isAdded = false;
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        isAdded = false;
        return prev.filter((item) => item.id !== product.id);
      } else {
        isAdded = true;
        return [...prev, product];
      }
    });
    return isAdded;
  }, []);

  const isInWishlist = useCallback(
    (productId) => {
      return wishlistItems.some((item) => item.id === productId);
    },
    [wishlistItems]
  );

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const value = useMemo(
    () => ({
      wishlistItems,
      toggleWishlist,
      isInWishlist,
      removeFromWishlist,
      clearWishlist,
      wishlistCount: wishlistItems.length,
    }),
    [wishlistItems, toggleWishlist, isInWishlist, removeFromWishlist, clearWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
