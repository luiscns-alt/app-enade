import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignUp } from '../page/Login/SignUp';
import { SignIn } from '../page/Login/SignIn';
// import { SignIn } from '../screens/SignIn';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name={'SignIn'} component={SignIn} />
      <Screen name={'Register'} component={SignUp} />
    </Navigator>
  );
}
