// App.js
import React from 'react';
import { StyleSheet } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from "react-navigation";
import Tapsell from "react-native-tapsell";

import { APP_KEY } from "./src/Constants";

import HomeScreen from './src/screen/HomeScreen ';
import InterstitialScreen from './src/screen/InterstitialsScreen';
import StandardBannerScreen from './src/screen/StandardBannerScreen';
import NativeBannerScreen from './src/screen/NativeBannerScreen';
import NativeVideoScreen from './src/screen/NativeVideoScreen';


export default class App extends React.Component {
  constructor() {
    super();
    Tapsell.initialize(APP_KEY);
    console.log('Initializing tapsell.')

    global.showAdDisabled = true
    global.mAdID = ''

  }

  render() {
    console.log('__________________________________APP__________________________________')
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Interstitial: {
    screen: InterstitialScreen
  },
  StandardBanner: {
      screen: StandardBannerScreen
  },
  NativeBanner:{
      screen: NativeBannerScreen
  },
  NativeVideo:{
      screen: NativeVideoScreen
  }
  },{
  initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});