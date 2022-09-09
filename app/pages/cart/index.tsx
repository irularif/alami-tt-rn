import Page from "@app/components/Page";
import TopBar, { topBarStyles } from "@app/components/TopBar";
import { moneyFormat } from "@app/helpers";
import useCart from "@app/hooks/cart/useCart";
import colors from "@assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Item from "./Item";

const CartPage = () => {
  const { goBack } = useNavigation();
  const { cart } = useCart();
  const dataSource = useMemo(() => {
    return cart.data;
  }, [cart]);

  return (
    <Page>
      <TopBar>
        <TouchableOpacity onPress={goBack} style={Styles.back}>
          <Ionicons name="chevron-back" color="#fff" size={32} />
        </TouchableOpacity>
        <Text style={topBarStyles.title}>My Cart</Text>
      </TopBar>
      <FlashList
        data={dataSource}
        estimatedItemSize={100}
        renderItem={(item) => <Item {...item} />}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <View style={Styles.empty}>
            <Text>The cart is empty.</Text>
          </View>
        }
      />
      <RenderFooter />
    </Page>
  );
};

const RenderFooter = () => {
  const { navigate } = useNavigation();
  const inset = useSafeAreaInsets();
  const { cart } = useCart();

  const total = useMemo(() => {
    let _total = 0;
    cart.data.forEach((x) => {
      _total += x.price * x.qty;
    });
    return _total;
  }, [cart]);

  const style = StyleSheet.flatten([
    Styles.footer,
    {
      paddingBottom: inset.bottom + 16,
    },
  ]);

  const checkout = () => {
    navigate("Checkout" as never);
  };

  return (
    <View style={style}>
      <Text style={Styles.title}>Summary</Text>
      <View style={Styles.field}>
        <Text style={Styles.label}>Total ({cart.data.length} items) :</Text>
        <Text style={Styles.value}>{moneyFormat(total)}</Text>
      </View>
      <TouchableOpacity style={Styles.button} onPress={checkout}>
        <Text style={Styles.buttonLabel}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  back: {
    marginRight: 8,
  },
  empty: {
    padding: 30,
    alignItems: "center",
  },
  footer: {
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: colors.background,
  },
  field: {
    flexDirection: "row",
    marginVertical: 4,
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
  },
  label: {
    flex: 1,
  },
  value: {
    fontWeight: "600",
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default CartPage;
