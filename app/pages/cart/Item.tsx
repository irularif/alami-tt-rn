import CounterInput from "@app/components/CounterInput";
import { moneyFormat } from "@app/helpers";
import useCart from "@app/hooks/cart/useCart";
import { ICart } from "@app/store/cart";
import colors from "@assets/colors";
import { get } from "lodash";
import { useCallback, useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ItemProps {
  index: number;
  item: ICart;
}

const Item = (props: ItemProps) => {
  const { item } = props;
  const product = useMemo(() => {
    return item.product;
  }, [item]);

  return (
    <TouchableOpacity style={Styles.button}>
      <Image
        source={{
          uri: product.thumbnail,
        }}
        style={Styles.image}
      />
      <View style={Styles.info}>
        <Text style={Styles.title}>{product.title}</Text>
        <View style={Styles.wrapper}>
          <View style={Styles.wrapperInfo}>
            <Text style={Styles.price}>{moneyFormat(item.price)} USD</Text>
            <Text style={Styles.price}>Stock: {product.stock}</Text>
          </View>
          <ActionItem {...props} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ActionItem = (props: ItemProps) => {
  const { item } = props;
  const product = useMemo(() => {
    return item.product;
  }, [item]);
  const { updateCart } = useCart();

  const updateQty = useCallback(
    (value: number) => {
      updateCart({
        ...item,
        qty: value,
      });
    },
    [item]
  );

  return (
    <CounterInput
      value={get(item, "qty", 0)}
      onChange={updateQty}
      maxValue={product.stock}
    />
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
