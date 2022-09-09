import CounterInput from "@app/components/CounterInput";
import { moneyFormat } from "@app/helpers";
import useCart from "@app/hooks/cart/useCart";
import colors from "@assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { get } from "lodash";
import { useCallback, useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IProduct } from "types/product";

interface ItemProps {
  index: number;
  item: IProduct;
}

const Item = (props: ItemProps) => {
  const { item } = props;

  return (
    <View style={Styles.button}>
      <Image
        source={{
          uri: item.thumbnail,
        }}
        style={Styles.image}
      />
      <View style={Styles.info}>
        <Text style={Styles.title}>{item.title}</Text>
        <View style={Styles.wrapper}>
          <View style={Styles.wrapperInfo}>
            <Text style={Styles.price}>{moneyFormat(item.price)} USD</Text>
            <Text style={Styles.price}>Stock: {item.stock}</Text>
          </View>
          <ActionItem {...props} />
        </View>
      </View>
    </View>
  );
};

const ActionItem = (props: ItemProps) => {
  const { item } = props;
  const { cart, findCartByProductId, updateCart, addToCart } = useCart();

  const cartItem = useMemo(() => {
    return findCartByProductId(item.id);
  }, [item, cart]);

  const inCart = useMemo(() => {
    return !!cartItem;
  }, [cartItem]);

  const updateQty = useCallback(
    (value: number) => {
      if (!cartItem) return;
      updateCart({
        ...cartItem,
        qty: value,
      });
    },
    [cartItem]
  );

  const add = useCallback(() => {
    addToCart(item);
  }, [item]);

  if (inCart) {
    return (
      <CounterInput
        value={get(cartItem, "qty", 0)}
        onChange={updateQty}
        maxValue={item.stock}
      />
    );
  }

  return (
    <TouchableOpacity
      style={Styles.cartButton}
      onPress={add}
      disabled={!item.stock}
    >
      <Ionicons name="cart-outline" color="#fff" size={24} />
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  image: {
    borderRadius: 4,
    height: 64,
    width: 64,
    marginRight: 16,
  },
  button: {
    padding: 8,
    marginHorizontal: 8,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: colors.divider,
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
    color: colors.primary,
  },
  price: {
    fontWeight: "600",
    fontSize: 14,
  },
  stock: {
    fontSize: 14,
  },
  cartButton: {
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapperInfo: {
    flex: 1,
  },
});

export default Item;
