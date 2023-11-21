# my-gallery
AdMob을 곁들인 나의 갤러리

<br>

|이미지 추가|이미지 삭제|
|:-----:|:-----:|
|![screenshot](https://github.com/yeontan0826/my-gallery/blob/master/assets/screenshots/add_image.gif)|![screenshot](https://github.com/yeontan0826/my-gallery/blob/master/assets/screenshots/delete_image.gif)|

|앨범 추가|앨범 삭제|
|:-----:|:-----:|
|![screenshot](https://github.com/yeontan0826/my-gallery/blob/master/assets/screenshots/add_album.gif)|![screenshot](https://github.com/yeontan0826/my-gallery/blob/master/assets/screenshots/delete_album.gif)|

|이미지 크게 보기|광고 후 앨범 개수 제한 늘리기|
|:-----:|:-----:|
|![screenshot](https://github.com/yeontan0826/my-gallery/blob/master/assets/screenshots/image_preview.gif)|![screenshot](https://github.com/yeontan0826/my-gallery/blob/master/assets/screenshots/add_album_with_admob.gif)|

<br>

**본인의 Admob 계정으로 테스트를 해보고 싶으시다면 아래의 과정을 따라해 주세요.**

<hr>

# Usage

#### `app.json` 파일 안에 아래의 코드를 추가해 주세요.

```
{
  "expo": {
    ... ,
    "ios": {
      ... ,
      "config": {
        "googleMobileAdsAppId": "your iOS Admob googleMobileAdsAppId"
      }
    },
    "android": {
      ... ,
      "config": {
        "googleMobileAdsAppId": "your AOS Admob googleMobileAdsAppId"
      }
    },
    ... 
  }
}
```

#### `.env` 파일을 생서 후, 아래의 코드를 추가해 주세요.

```
ADMOB_UNIT_ID_IOS=본인의_Admob_ios_unit_id
ADMOB_UNIT_ID_AOS=본인의_Admob_aos_unit_id
```

#### expo를 실행시켜 확인해 주세요.
