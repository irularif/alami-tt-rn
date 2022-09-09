import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "@app/pages/home";
import CartPage from "./cart";
import CheckoutPage from "./checkout";

const Stack = createNativeStackNavigator();

const Pages = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Pages;
