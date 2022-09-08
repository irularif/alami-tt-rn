import Page from "@app/components/Page";
import TopBar, { topBarStyles } from "@app/components/TopBar";
import useCart from "@app/hooks/cart/useCart";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
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
      />
    </Page>
  );
};

const Styles = StyleSheet.create({
  back: {
    marginRight: 8,
  },
});

export default CartPage;
