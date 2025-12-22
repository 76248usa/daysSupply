// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import HomeScreen from "./HomeScreen";
// import DetailsScreen from "./DetailsScreen";
// import UpgradeScreen from "./UpgradeScreen";
// import { ProProvider } from "./context/ProContext";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <ProProvider>
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Home" component={HomeScreen} />
//           <Stack.Screen name="Details" component={DetailsScreen} />
//           <Stack.Screen name="Upgrade" component={UpgradeScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </ProProvider>
//   );
// }

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DisclaimerScreen from "./DisclaimerScreen";
import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";
import UpgradeScreen from "./UpgradeScreen";
import { ProProvider } from "./context/ProContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ProProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Upgrade" component={UpgradeScreen} />
          <Stack.Screen name="Disclaimer" component={DisclaimerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProProvider>
  );
}
