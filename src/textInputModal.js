import { useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
} from 'react-native';
import styled from 'styled-components/native';

const Content = ({
  textInputFocusRef,
  albumTitle,
  setAlbumTitle,
  onSubmitEditing,
  onPressBackdrop,
}) => {
  return (
    <Pressable onPress={onPressBackdrop} style={{ flex: 1 }}>
      <SafeAreaContainer>
        <AlbumTextInput
          ref={textInputFocusRef}
          placeholder="앨범명을 입력해 주세요"
          value={albumTitle}
          onChangeText={setAlbumTitle}
          onSubmitEditing={onSubmitEditing}
          autoFocus={true}
        />
      </SafeAreaContainer>
    </Pressable>
  );
};

const TextInputModal = ({
  modalVisible,
  albumTitle,
  setAlbumTitle,
  onSubmitEditing,
  onPressBackdrop,
}) => {
  const textInputFocusRef = useRef(null);

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        textInputFocusRef.current?.focus();
      }, 100);
    }
  }, [modalVisible]);

  if (Platform.OS === 'ios') {
    return (
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
          <Content
            textInputFocusRef={textInputFocusRef}
            albumTitle={albumTitle}
            setAlbumTitle={setAlbumTitle}
            onSubmitEditing={onSubmitEditing}
            onPressBackdrop={onPressBackdrop}
          />
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  return (
    <KeyboardAvoidingView behavior={'height'}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <Content
          textInputFocusRef={textInputFocusRef}
          albumTitle={albumTitle}
          setAlbumTitle={setAlbumTitle}
          onSubmitEditing={onSubmitEditing}
          onPressBackdrop={onPressBackdrop}
        />
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default TextInputModal;

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const AlbumTextInput = styled.TextInput`
  width: 100%;
  padding: 10px;
  border-top-width: 0.5px;
  border-top-color: lightgrey;
  background-color: white;
`;
