import Page from "@app/components/Page";
import ProgressBar from "@app/components/ProgressBar";
import TopBar, { topBarStyles } from "@app/components/TopBar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DeviceInfo from "react-native-device-info";

const CheckoutPage = () => {
  const [uniqueId, setUniqueId] = useState("");
  const { goBack } = useNavigation();
  const deviceId = useMemo(() => {
    return DeviceInfo.getDeviceId();
  }, []);
  const brand = useMemo(() => {
    return DeviceInfo.getBrand();
  }, []);

  const getAsync = () => {
    DeviceInfo.getUniqueId().then((res) => {
      setUniqueId(res);
    });
  };

  useEffect(() => {
    getAsync();
  }, []);

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
          <Text style={Styles.label}>Brand</Text>
          <Text style={Styles.bold}>{brand}</Text>
        </View>
        <View style={Styles.wrapper}>
          <Text style={Styles.label}>Device ID</Text>
          <Text style={Styles.bold}>{deviceId}</Text>
        </View>
        <View style={Styles.wrapper}>
          <Text style={Styles.label}>Unique ID</Text>
          <Text style={Styles.bold}>{uniqueId}</Text>
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
