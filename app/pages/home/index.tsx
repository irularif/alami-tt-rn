import Page from "@app/components/Page";
import TopBar, { topBarStyles } from "@app/components/TopBar";
import { Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomePage = () => {
  return (
    <Page>
      <TopBar>
        <Text style={topBarStyles.title}>Alami Cart</Text>
        <TouchableOpacity>
          <Ionicons name="cart-outline" color="#fff" size={32} />
        </TouchableOpacity>
      </TopBar>
      <Text>Home Page</Text>
    </Page>
  );
};

export default HomePage;
