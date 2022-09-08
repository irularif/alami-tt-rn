import { moneyFormat } from "@app/helpers";
import colors from "@assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IProduct } from "types/product";

interface ItemProps {
  index: number;
  item: IProduct;
}

const Item = (props: ItemProps) => {
  const { item } = props;

  return (
    <TouchableOpacity style={Styles.button}>
      <Image
        source={{
          uri: item.thumbnail,
        }}
        style={Styles.image}
      />
      <View style={Styles.info}>
        <Text style={Styles.title}>{item.title}</Text>
        <View style={Styles.wrapper}>
          <Text style={Styles.price}>{moneyFormat(item.price)} USD</Text>
          <TouchableOpacity style={Styles.cartButton}>
            <Ionicons name="cart-outline" color="#fff" size={24} />
          </TouchableOpacity>
        </View>
      </View>
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
    flex: 1,
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
});

export default Item;
