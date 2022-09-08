import Pages from "@app/pages";
import cartReducer, { CartContext, CartDispatchContext } from "@app/store/cart";
import { NavigationContainer } from "@react-navigation/native";
import { useReducer } from "react";

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, {
    data: [],
    isLoading: false,
  });

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartContext.Provider value={cart}>
        <NavigationContainer>
          <Pages />
        </NavigationContainer>
      </CartContext.Provider>
    </CartDispatchContext.Provider>
  );
}
