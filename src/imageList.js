import { Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const width = Dimensions.get('screen').width;
const minColumnSize = width >= 500 ? 200 : 130;
const divisor = width / minColumnSize;
const numColumns = Math.floor(divisor);
const columnSize = width / numColumns;

const ImageList = ({
  onPressImage,
  onLongPressImage,
  imagesWithAddButton,
  onPressOpenGallery,
}) => {
  const renderItem = ({ item: image }) => {
    const { id, uri } = image;

    if (id === -1) {
      return (
        <ImageItem onPress={onPressOpenGallery}>
          <Plus>+</Plus>
        </ImageItem>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => onPressImage(image)}
        onLongPress={() => onLongPressImage(id)}
      >
        <Image
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={imagesWithAddButton}
      style={{ zIndex: -1 }}
      numColumns={numColumns}
      renderItem={renderItem}
      // FlatList 가로 사이즈를 고려한다면 onLayout
      //   onLayout={(e) => {
      //     console.log('layout.width', e.nativeEvent.layout.width);
      //   }}
    />
  );
};

export default ImageList;

const ImageItem = styled.TouchableOpacity`
  width: ${columnSize}px;
  height: ${columnSize}px;
  justify-content: center;
  align-items: center;
  background-color: lightgrey;
`;

const Plus = styled.Text`
  font-size: 48px;
  font-weight: 200;
  color: black;
`;
