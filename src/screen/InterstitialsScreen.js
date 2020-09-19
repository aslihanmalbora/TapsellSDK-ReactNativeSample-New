import React from "react";
import { ZONE_IDS } from "../Constants";
import Tapsell from "react-native-tapsell";
import {
  ToastAndroid,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from "react-native";

export default class Interstitial extends React.Component {
  static navigationOptions = {
    title: "Interstitial and Rewarded"
  };

  constructor() {
    super();

    Tapsell.setRewardListener((zoneId, adId, completed, rewarded) => {
      console.log("onAdShowFinished");
    });
  }

  onShowAdClicked() {
    Tapsell.showAd(
      {
        ad_id: global.mAdID,
        zone_id: global.mZoneID,
        back_disabled: false,
        immersive_mode: false,
        rotation_mode: Tapsell.ROTATION_UNLOCKED,
        show_exit_dialog: true
      },
      (zoneId, adId) => {
        if (Platform.OS === "android")
          ToastAndroid.show("ad opened", ToastAndroid.SHORT);
      },
      (zoneId, adId) => {
        global.mAdID = ''
        global.mZoneID = ''
        if (Platform.OS === "android")
          ToastAndroid.show("ad closed", ToastAndroid.SHORT);
      }
    );
  }

  requestRewardedVideo = () => {
    this.onRequestAdClicked(ZONE_IDS.REWARDED_VIDEO);
  };

  requestInterstitialBanner = () => {
    this.onRequestAdClicked(ZONE_IDS.INTERSTITIAL_BANNER);
  };

  requestInterstitialVideo = () => {
    this.onRequestAdClicked(ZONE_IDS.INTERSTITIAL_VIDEO);
  };

  onRequestAdClicked(zoneId) {
    Tapsell.requestAd(
      zoneId,
      true,
      (zoneId, adId) => {
        if (Platform.OS === "android")
          ToastAndroid.show("ad available", ToastAndroid.SHORT);
        global.mAdID = adId
        global.mZoneID = zoneId
      },
      (zoneId) => {
        if (Platform.OS === "android")
          ToastAndroid.show("no ad available", ToastAndroid.SHORT);
      },
      (zoneId) => {
        if (Platform.OS === "android")
          ToastAndroid.show("no network", ToastAndroid.SHORT);
      },
      (zoneId, error) => {
        if (Platform.OS === "android")
          ToastAndroid.show("ERROR\n" + error, ToastAndroid.SHORT);
      },
      (zoneId, adId) => {
        if (Platform.OS === "android")
          ToastAndroid.show("on expiring", ToastAndroid.SHORT);
      }
    );
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.requestInterstitialBanner.bind(this)}
        >
          <Text style={styles.buttonText}>Request Interstitial ‌Banner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.requestInterstitialVideo.bind(this)}
        >
          <Text style={styles.buttonText}>Request Interstitial Video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.requestRewardedVideo.bind(this)}
        >
          <Text style={styles.buttonText}>Request Rewarded Video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.onShowAdClicked.bind(this)}
          style={
            styles.button
          }
        >
          <Text style={styles.buttonText}>Show Ad</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#33AAFF",
    padding: 10,
    margin: 10
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF"
  },

  buttonDisabled: {
    alignItems: "center",
    backgroundColor: "#888888",
    padding: 10,
    margin: 10
  }
});
