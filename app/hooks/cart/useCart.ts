import {
  CartAction,
  CartContext,
  CartDispatchContext,
  ICart,
} from "@app/store/cart";
import { useCallback, useContext } from "react";
import { IProduct } from "types/product";

const useCart = () => {
  const cart = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);

  if (!cart || !dispatch) {
    throw new Error(
      "useCart must be used within a CartProvider and CartDispatchProvider"
    );
  }

  const addToCart = useCallback((product: IProduct) => {
    dispatch({
      type: CartAction.AddOrUpdate,
      payload: {
        id: new Date().getTime(),
        price: product.price,
        qty: 1,
        product: product,
      },
    });
  }, []);

  const updateCart = useCallback((cart: ICart) => {
    dispatch({
      type: CartAction.AddOrUpdate,
      payload: cart,
    });
  }, []);

  const findCartByProductId = useCallback(
    (product_id: number) => {
      return cart.data.find((x) => x.product.id === product_id);
    },
    [cart]
  );

  return {
    cart,
    addToCart,
    updateCart,
    findCartByProductId,
  };
};

export default useCart;
