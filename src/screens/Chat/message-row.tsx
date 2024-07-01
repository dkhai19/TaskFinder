import {Image, StyleSheet, Text, View} from 'react-native';
import {typography} from '../../constants/typo';

interface IMessageRow {
  isMine: boolean;
  content: string;
}

const MessageRow: React.FC<IMessageRow> = ({isMine, content}) => {
  return (
    <View style={styles.container}>
      {isMine ? (
        <View style={styles.right}>
          <View style={{paddingHorizontal: 8}}>
            <Text style={[typography.f16_regular]}>{content}</Text>
          </View>
          <View>
            <Image
              source={require('../../assets/photos/image5.jpg')}
              style={styles.image}
            />
          </View>
        </View>
      ) : (
        <View style={styles.left}>
          <View>
            <Image
              source={require('../../assets/photos/image5.jpg')}
              style={styles.image}
            />
          </View>
          <View>
            <Text style={[typography.f16_regular]}>{content}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '80%',
  },
  left: {},
  right: {
    justifyContent: 'flex-end',
  },
  image: {
    width: 38,
    height: 38,
    borderRadius: 20,
  },
});

export default MessageRow;
