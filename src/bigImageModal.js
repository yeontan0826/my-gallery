import { Modal, Pressable } from 'react-native';
import styled from 'styled-components/native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const ArrowButton = ({ iconName, onPress, disabled }) => {
  return (
    <ArrowBox disabled={disabled} onPress={onPress}>
      <SimpleLineIcons
        name={iconName}
        size={20}
        color={disabled ? 'transparent' : 'white'}
      />
    </ArrowBox>
  );
};

const BigImageModal = ({
  modalVisible,
  onPressBackdrop,
  selectedImage,
  onPressLeftArrow,
  onPressRightArrow,
  showPreviousArrow,
  showNextArrow,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <BackdropContainer onPress={onPressBackdrop}>
        <Container>
          {/* < 화살표 */}
          <ArrowButton
            iconName={'arrow-left'}
            onPress={onPressLeftArrow}
            disabled={!showPreviousArrow}
          />
          {/* 이미지 */}
          <Pressable>
            <BigImage
              source={{ uri: selectedImage?.uri }}
              resizeMode="contain"
            />
          </Pressable>
          {/* > 화살표 */}
          <ArrowButton
            iconName={'arrow-right'}
            onPress={onPressRightArrow}
            disabled={!showNextArrow}
          />
        </Container>
      </BackdropContainer>
    </Modal>
  );
};

export default BigImageModal;

const ArrowBox = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const BackdropContainer = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BigImage = styled.Image`
  width: 280px;
  aspect-ratio: 1;
  background-color: white;
`;
