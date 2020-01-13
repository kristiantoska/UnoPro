import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { COLORS } from '../../constants';
import styles from './styles';

const COLOR_BLOCKS = ['red', 'blue', 'green', 'yellow'];

const ModalContent = React.memo(({ onColorClick }) => (
  <View style={styles.container}>
    <View style={styles.colorBlockRow}>
      {COLOR_BLOCKS.map((color, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={1}
          style={[styles.colorBlock, { backgroundColor: COLORS[color] }]}
          onPress={() => onColorClick(color)}
        />
      ))}
    </View>
  </View>
));

const ColorPicker = React.memo(({ visible, onColorClick }) => (
  <Modal
    animationIn="fadeIn"
    animationOut="fadeOut"
    isVisible={visible}
    useNativeDriver
  >
    <ModalContent onColorClick={onColorClick} />
  </Modal>
));

export default ColorPicker;
