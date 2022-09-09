import Page from "@app/components/Page";
import ProgressBar from "@app/components/ProgressBar";
import TopBar, { topBarStyles } from "@app/components/TopBar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CheckoutPage = () => {
  const { goBack } = useNavigation();
  return (
    <Page>
      <TopBar>
        <TouchableOpacity onPress={goBack} style={Styles.back}>
          <Ionicons name="chevron-back" color="#fff" size={32} />
        </TouchableOpacity>
        <Text style={topBarStyles.title}>Checkout</Text>
      </TopBar>
      <View style={Styles.content}>
        <View style={Styles.wrapper}>
          <Text style={Styles.label}>Device ID</Text>
          <Text style={Styles.bold}>asdasdasd</Text>
        </View>
        <View style={Styles.wrapper}>
          <Text style={Styles.label}>Progress Bar</Text>
          <ProgressBar />
        </View>
      </View>
    </Page>
  );
};

const Styles = StyleSheet.create({
  back: {
    marginRight: 8,
  },
  content: {
    padding: 16,
  },
  wrapper: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  bold: {
    fontWeight: "600",
  },
});

export default CheckoutPage;
