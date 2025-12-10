// // App.js
// import React, { useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "./HomeScreen";
// import DetailsScreen from "./DetailsScreen";
// import UpgradeScreen from "./UpgradeScreen"; // if you have it
// //import { ProProvider } from "./context/ProContext";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   useEffect(() => {
//     // Initialize AdMob SDK once
//     mobileAds()
//       .initialize()
//       .then(() => {
//         console.log("✅ AdMob initialized");
//       });
//   }, []);

//   return (
//     <ProProvider>
//       <NavigationContainer>
//         <Stack.Navigator>
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

import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerShown: true,
            title: "Days' Supply",
            headerStyle: { backgroundColor: "#020617" },
            headerTintColor: "#e5e7eb", // back arrow + title color
            headerTitleStyle: { fontWeight: "600" },
          }}
        />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
