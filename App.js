import { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useGallery } from './src/hooks/useGallery';
import { useRewardAd } from './src/hooks/useRewardAd';
import MyDropDownPicker from './src/myDropDownPicker';
import TextInputModal from './src/textInputModal';
import BigImageModal from './src/bigImageModal';
import ImageList from './src/imageList';

export default function App() {
  const {
    pickImage,
    deleteImage,
    imagesWithAddButton,
    selectedAlbum,
    textInputModalVisible,
    openTextInputModal,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropdownOpen,
    openDropdown,
    closeDropdown,
    albums,
    selectAlbum,
    deleteAlbum,
    bigImageModalVisible,
    openBigImageModal,
    closeBigImageModal,
    selectImage,
    selectedImage,
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  } = useGallery();

  const { loadRewardAd, isRewarded, isClosed, resetAdValue } = useRewardAd();

  const onPressOpenGallery = () => {
    pickImage();
  };

  const onPressWatchAd = () => {
    loadRewardAd();
  };

  const onPressAddAlbum = () => {
    if (albums.length >= 2) {
      Alert.alert('광고를 시청해야 앨범을 추가할 수 있습니다.', '', [
        {
          style: 'cancel',
          text: '닫기',
        },
        {
          text: '광고 시청',
          onPress: onPressWatchAd,
        },
      ]);
    } else {
      openTextInputModal();
    }
  };

  const onSubmitEditing = () => {
    if (!albumTitle) return;
    // 1. 앨범에 타이틀 추가
    addAlbum();
    // 2. close modal & TextInput의 value 초기화
    closeTextInputModal();
    resetAlbumTitle();
  };

  const onPressTextInputBackdrop = () => {
    closeTextInputModal();
  };

  const onPressHeader = () => {
    if (isDropdownOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const onPressAlbum = (album) => {
    selectAlbum(album);
    closeDropdown();
  };

  const onLongPressAlbum = (albumId) => {
    deleteAlbum(albumId);
  };

  const onPressImage = (image) => {
    selectImage(image);
    openBigImageModal();
  };

  const onLongPressImage = (imageId) => {
    deleteImage(imageId);
  };

  const onPressBigModalBackdrop = () => {
    closeBigImageModal();
  };

  const onPressLeftArrow = () => {
    moveToPreviousImage();
  };

  const onPressRightArrow = () => {
    moveToNextImage();
  };

  useEffect(() => {
    if (isRewarded && isClosed) {
      openTextInputModal();
      resetAdValue();
    }
  }, [isRewarded, isClosed]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* 앨범 dropdown, 앨범 추가 버튼 */}
          <MyDropDownPicker
            onPressHeader={onPressHeader}
            isDropdownOpen={isDropdownOpen}
            selectedAlbum={selectedAlbum}
            onPressAddAlbum={onPressAddAlbum}
            albums={albums}
            onPressAlbum={onPressAlbum}
            onLongPressAlbum={onLongPressAlbum}
          />

          {/* 이미지 리스트 */}
          <ImageList
            onPressImage={onPressImage}
            onLongPressImage={onLongPressImage}
            imagesWithAddButton={imagesWithAddButton}
            onPressOpenGallery={onPressOpenGallery}
          />

          {/* 앨범을 추가하는 TextInputModal */}
          <TextInputModal
            modalVisible={textInputModalVisible}
            albumTitle={albumTitle}
            setAlbumTitle={setAlbumTitle}
            onSubmitEditing={onSubmitEditing}
            onPressBackdrop={onPressTextInputBackdrop}
          />

          {/* 이미지를 미리보기 */}
          <BigImageModal
            modalVisible={bigImageModalVisible}
            onPressBackdrop={onPressBigModalBackdrop}
            selectedImage={selectedImage}
            onPressLeftArrow={onPressLeftArrow}
            onPressRightArrow={onPressRightArrow}
            showPreviousArrow={showPreviousArrow}
            showNextArrow={showNextArrow}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
