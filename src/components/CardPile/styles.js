import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pileCardContainer: { position: 'absolute' },

  invalidCardOverlay: {
    borderRadius: 5,
    position: 'absolute',
    left: 0,
    right: -1,
    bottom: -1,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
