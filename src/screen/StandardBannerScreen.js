import React, { Component } from 'react';
import { View } from 'react-native';
import { ZONE_IDS } from "../Constants";
import Tapsell, { BannerAd } from "react-native-tapsell";

export default class StandardBanner extends Component {
  static navigationOptions = {
    title: "Standard Banner"
  };

  render() {
    return (
      <View style={{alignItems: "center", marginTop: 50 }}>
        <BannerAd
          zoneId={ZONE_IDS.STANDARD_BANNER}
          // only one banner type must be uncommented
          bannerType={Tapsell.BANNER_320x50}
          //bannerType={Tapsell.BANNER_320x100}
          //bannerType={Tapsell.BANNER_250x250}
          //bannerType={Tapsell.BANNER_300x250}
        />
      </View>
    );
  }
}