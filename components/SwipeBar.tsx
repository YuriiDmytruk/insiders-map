import React from 'react';
import { Text, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

interface SwipeBarProps {
  onSwipeUp: () => void;
  onSwipeDown: () => void;
}

const SwipeBar: React.FC<SwipeBarProps> = ({ onSwipeUp, onSwipeDown }) => {
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      onSwipeUp={onSwipeUp}
      onSwipeDown={onSwipeDown}
      config={config}
      style={styles.swipeBar}
    >
      <Text style={styles.swipeText}>Swipe Up</Text>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  swipeBar: {
    width: '100%',
    height: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default SwipeBar;
