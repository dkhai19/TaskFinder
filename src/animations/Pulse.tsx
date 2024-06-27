import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

interface IPulse {
  isRinging: boolean;
  children: React.ReactNode;
}

const Pulse: React.FC<IPulse> = ({isRinging, children}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (isRinging) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      scaleAnim.setValue(1);
    }
  }, [isRinging]);
  return (
    <Animated.View style={{transform: [{scale: scaleAnim}]}}>
      {children}
    </Animated.View>
  );
};

export default Pulse;
