import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { AdMobRewarded } from 'expo-ads-admob';
import { ADMOB_UNIT_ID_IOS, ADMOB_UNIT_ID_AOS } from '@env';

const UNIT_ID = Platform.select({
  ios: __DEV__
    ? 'ca-app-pub-3940256099942544/1712485313' // test
    : ADMOB_UNIT_ID_IOS,
  android: __DEV__
    ? 'ca-app-pub-3940256099942544/5224354917' // test
    : ADMOB_UNIT_ID_AOS,
});

export const useRewardAd = () => {
  const [isLoaded, setIsLoaded] = useState(false); // 광고가 로딩이 됐는지
  const [isRewarded, setIsRewarded] = useState(false); // 보상을 받을 수 있는 상태까지 광고를 봤는지
  const [isClosed, setIsClosed] = useState(false); // 광고가 닫혔느지

  const loadRewardAd = async () => {
    await AdMobRewarded.setAdUnitID(UNIT_ID);
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  };

  const resetAdValue = () => {
    setIsRewarded(false);
    setIsClosed(false);
  };

  useEffect(() => {
    AdMobRewarded.addEventListener('rewardedVideoDidLoad', () => {
      setIsLoaded(true);
    });
    AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward', () => {
      setIsRewarded(true);
    });
    AdMobRewarded.addEventListener('rewardedVideoDidDismiss', () => {
      setIsClosed(true);
    });

    return () => {
      AdMobRewarded.removeAllListeners();
    };
  }, []);

  return {
    loadRewardAd,
    isLoaded,
    isRewarded,
    isClosed,
    resetAdValue,
  };
};
