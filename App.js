// import React, {useState, useEffect} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/stack';
// import Profile from './screens/Profile';
// import Onboarding from './screens/Onboarding';

// const Stack = createNativeStackNavigator();

// function App() {
//   const [completedOnboarding, setCompletedOnboarding] = useState(false);

//   useEffect(() => {
//     // Check if the user has completed onboarding (e.g. by checking a local storage value)
//     const hasCompletedOnboarding = true; // Replace with actual logic

//     setCompletedOnboarding(hasCompletedOnboarding);
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {!completedOnboarding ? (
//           <Stack.Screen name="Onboarding" component={Onboarding} />
//         ) : (
//           <>
//             <Stack.Screen name="Profile" component={Profile} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

import * as React from 'react';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';

const Stack = createNativeStackNavigator();

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn == true ? (
          <>
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
