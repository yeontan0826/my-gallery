import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ASYNC_KEY = {
  IMAGES: 'images',
  ALBUMS: 'albums',
};

const defaultAlbum = {
  id: 1,
  title: '기본',
};

export const useGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
  const [albums, setAlbums] = useState([defaultAlbum]);
  const [textInputModalVisible, setTextInputModalVisible] = useState(false);
  const [bigImageModalVisible, setBigImageModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const _setImages = (newImages) => {
    setImages(newImages);
    AsyncStorage.setItem(ASYNC_KEY.IMAGES, JSON.stringify(newImages));
  };

  const _setAlbums = (newAlbums) => {
    setAlbums(newAlbums);
    AsyncStorage.setItem(ASYNC_KEY.ALBUMS, JSON.stringify(newAlbums));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
      const newImage = {
        id: lastId + 1,
        uri: result.uri,
        albumId: selectedAlbum.id,
      };
      _setImages([...images, newImage]);
    }
  };

  const deleteImage = (imageId) => {
    Alert.alert('이미지를 삭제하시겠습니까?', '', [
      {
        style: 'cancel',
        text: '취소',
      },
      {
        text: '삭제',
        onPress: () => {
          const newImages = images.filter((image) => image.id !== imageId);
          _setImages(newImages);
        },
      },
    ]);
  };

  const openTextInputModal = () => setTextInputModalVisible(true);
  const closeTextInputModal = () => setTextInputModalVisible(false);

  const openBigImageModal = () => setBigImageModalVisible(true);
  const closeBigImageModal = () => setBigImageModalVisible(false);

  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  const addAlbum = () => {
    const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;
    const newAlbum = {
      id: lastId + 1,
      title: albumTitle,
    };

    _setAlbums([...albums, newAlbum]);
    setSelectedAlbum(newAlbum);
  };

  const selectAlbum = (album) => {
    setSelectedAlbum(album);
  };

  const deleteAlbum = (albumId) => {
    if (albumId === defaultAlbum.id) {
      Alert.alert('기본 앨범은 삭제할 수 엇습니다');
      return;
    }

    Alert.alert('앨범을 삭제하시겠습니까?', '', [
      {
        style: 'cancel',
        text: '취소',
      },
      {
        text: '삭제',
        onPress: () => {
          const newAlbums = albums.filter((album) => album.id !== albumId);
          _setAlbums(newAlbums);
          setSelectedAlbum(defaultAlbum);
        },
      },
    ]);
  };

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  const moveToPreviousImage = () => {
    const selectedImageIndex = filteredImages.findIndex(
      (image) => image.id === selectedImage.id
    );
    const previousImageIndex = selectedImageIndex - 1;

    if (previousImageIndex < 0) return;

    const previousImage = filteredImages[previousImageIndex];
    setSelectedImage(previousImage);
  };

  const moveToNextImage = () => {
    const selectedImageIndex = filteredImages.findIndex(
      (image) => image.id === selectedImage.id
    );
    const nextImageIndex = selectedImageIndex + 1;

    if (nextImageIndex > filteredImages.length - 1 || nextImageIndex === -1)
      return;

    const nextImage = filteredImages[nextImageIndex];
    setSelectedImage(nextImage);
  };

  const filteredImages = images.filter(
    (image) => image.albumId === selectedAlbum.id
  );

  const showPreviousArrow =
    filteredImages.findIndex((image) => image.id === selectedImage?.id) !== 0;
  const showNextArrow =
    filteredImages.findIndex((image) => image.id === selectedImage?.id) !==
    filteredImages.length - 1;

  const resetAlbumTitle = () => setAlbumTitle('');

  const imagesWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: '',
    },
  ];

  const initValue = async () => {
    // 이미지
    const imagesFromStorage = await AsyncStorage.getItem(ASYNC_KEY.IMAGES);
    if (imagesFromStorage !== null) {
      const parsed = JSON.parse(imagesFromStorage);
      setImages(parsed);
    }

    // 앨범
    const albumsFromStorage = await AsyncStorage.getItem(ASYNC_KEY.ALBUMS);
    if (albumsFromStorage !== null) {
      const parsed = JSON.parse(albumsFromStorage);
      setAlbums(parsed);
    }
  };

  useEffect(() => {
    initValue();
  }, []);

  return {
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
    selectedImage,
    selectImage,
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  };
};
