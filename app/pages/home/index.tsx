import Page from "@app/components/Page";
import TopBar, { topBarStyles } from "@app/components/TopBar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useFetch from "@app/hooks/fetch/useFetch";
import { IProduct } from "types/product";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import Item from "./Item";
import { debounce } from "lodash";
import colors from "@assets/colors";
import useCart from "@app/hooks/cart/useCart";
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
  const searchState = useState("");
  const [search] = searchState;
  // fetch data from api with custom hook
  const { isLoading, data, fetch } = useFetch<Array<IProduct>>([], {
    url: "products",
  });

  const fetchData = useCallback(() => {
    fetch((_, newData, error) => {
      if (!!error) {
        console.warn(error);
        return;
      }
      return newData.products;
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const dataSource = useMemo(() => {
    let _data = [...data];
    if (!!search) {
      const keyword = search.toLowerCase();
      _data = _data.filter((x) => {
        return (
          x.brand?.toLowerCase().includes(keyword) ||
          x.title?.toLowerCase().includes(keyword)
        );
      });
    }
    return _data;
  }, [isLoading, data, search]);

  return (
    <Page>
      <Header searchState={searchState} />
      <FlashList
        data={dataSource}
        estimatedItemSize={100}
        renderItem={(item) => <Item {...item} />}
        keyExtractor={(item) => String(item.id)}
      />
    </Page>
  );
};

interface HeaderProps {
  searchState: [string, React.Dispatch<React.SetStateAction<string>>];
}

const Header = (props: HeaderProps) => {
  const { navigate } = useNavigation();
  const { searchState } = props;
  const { cart } = useCart();
  const [_, setSearch] = searchState;
  const [keyword, setKeyword] = useState("");

  const onSetSearch = useCallback(
    debounce((value: string) => setSearch(value), 300),
    []
  );

  const onChange = useCallback((value: string) => {
    setKeyword(value);
    onSetSearch(value);
  }, []);

  const totalCart = useMemo(() => {
    return cart.data.length;
  }, [cart]);

  const openCart = () => {
    navigate("Cart" as never);
  };

  return (
    <>
      <TopBar>
        <Text style={topBarStyles.title}>ALAMI</Text>
        <TouchableOpacity onPress={openCart}>
          <Ionicons name="cart-outline" color="#fff" size={32} />
          {!!totalCart && (
            <View style={Styles.badge}>
              <Text style={Styles.badgeText}>{totalCart}</Text>
            </View>
          )}
        </TouchableOpacity>
      </TopBar>
      <View style={Styles.wrapper}>
        <TextInput
          value={keyword}
          onChangeText={onChange}
          style={Styles.input}
          placeholder="Search product"
          clearButtonMode="always"
        />
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: 8,
    paddingVertical: 12,
  },
  badge: {
    borderRadius: 99,
    backgroundColor: colors.pending,
    position: "absolute",
    bottom: -5,
    right: 0,
    padding: 2,
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
});

export default HomePage;
