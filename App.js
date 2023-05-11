import * as React from 'react';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

function App() {
  const [loading, setLoading] = useState(true);
  const [completedOnboarding, setCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Read from AsyncStorage to determine if onboarding is completed
    console.log(completedOnboarding);
    AsyncStorage.getItem('completedOnboarding').then(value => {
      if (value === 'true') {
        setCompletedOnboarding(true);
        setLoading(false);
      }
    });
  }, []);

  const handleOnboardingComplete = () => {
    // Update local state and store in AsyncStorage
    setCompletedOnboarding(true);
    AsyncStorage.setItem('completedOnboarding', 'true');
  };

  // if (loading) {
  //   // return <Splash />;
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!completedOnboarding ? (
          <>
            {/* <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              // initialParams={userDetails}
              options={{headerShown: false}}
            /> */}
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{headerShown: false}}
              // Pass a function to be called when onboarding is completed
              initialParams={{onComplete: handleOnboardingComplete}}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{headerShown: false}}

              // initialParams={userDetails}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
