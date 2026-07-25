import { createContext, useState } from "react";

// Create a Context
export const CartContext = createContext();

// Create Provider
function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;