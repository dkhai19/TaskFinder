import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import {colors} from '../../constants/color';
import Icon from 'react-native-vector-icons/Ionicons';
import {typography} from '../../constants/typo';

interface IChatHeader {
  onBack: () => void;
  onCallHander: () => void;
  receiver_id: string;
}

const ChatHeader: React.FC<IChatHeader> = ({
  receiver_id,
  onBack,
  onCallHander,
}) => {
  console.log('Chat header', receiver_id);
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity style={{paddingLeft: 12}} onPress={onBack}>
          <Icon name="chevron-back-outline" size={24} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/photos/image9.jpg')}
          />
        </View>
        <View>
          <Text style={[typography.f17_medium, {color: colors.black}]}>
            Kain Lawrance
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={onCallHander}>
          <Icon name="call-outline" size={26} color={colors.red} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'row',
  },
  left: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    paddingHorizontal: 16,
  },
  image: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
});

export default ChatHeader;
