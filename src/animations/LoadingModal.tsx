import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';

interface LoadingModalProps {
  visible: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({visible}) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <Animated.View style={[styles.modalContainer, {opacity}]}>
          <ActivityIndicator size="large" color="#ffffff" />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingModal;
