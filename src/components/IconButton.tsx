import {StyleSheet} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/color';

interface IIconButton {
  onPress: () => void;
  iconName: string;
}

const IconButton: React.FC<IIconButton> = ({onPress, iconName}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={iconName} size={24} color={colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconButton;