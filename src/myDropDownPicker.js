import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const headerHeight = 50;

const MyDropDownPicker = ({
  selectedAlbum,
  onPressAddAlbum,
  onPressHeader,
  isDropdownOpen,
  albums,
  onPressAlbum,
  onLongPressAlbum,
}) => {
  return (
    <View>
      <HeaderContainer onPress={onPressHeader}>
        <Text style={{ fontWeight: 'bold' }}>{selectedAlbum.title}</Text>
        <SimpleLineIcons
          name={isDropdownOpen ? 'arrow-up' : 'arrow-down'}
          size={12}
          color={'black'}
          style={{ marginLeft: 8 }}
        />
        <AddAlbumButton onPress={onPressAddAlbum}>
          <Text style={{ fontSize: 12 }}>앨범 추가</Text>
        </AddAlbumButton>

        {isDropdownOpen && (
          <DropdownContainer>
            {albums.map((album, index) => {
              const isSelectedAlbum = album.id === selectedAlbum.id;
              return (
                <DropdownItem
                  key={`album-${index}`}
                  activeOpacity={1}
                  onPress={() => onPressAlbum(album)}
                  onLongPress={() => onLongPressAlbum(album.id)}
                >
                  <Text
                    style={{ fontWeight: isSelectedAlbum ? 'bold' : undefined }}
                  >
                    {album.title}
                  </Text>
                </DropdownItem>
              );
            })}
          </DropdownContainer>
        )}
      </HeaderContainer>
    </View>
  );
};

export default MyDropDownPicker;

const HeaderContainer = styled.TouchableOpacity`
  position: relative;
  height: ${headerHeight}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AddAlbumButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  height: ${headerHeight}px;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const DropdownContainer = styled.View`
  position: absolute;
  top: ${headerHeight}px;
  width: 100%;
  border-bottom-color: lightgrey;
  border-bottom-width: 0.5px;
`;

const DropdownItem = styled.TouchableOpacity`
  width: 100%;
  padding-top: 14px;
  padding-bottom: 14px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
