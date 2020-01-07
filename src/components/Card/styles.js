import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },

  cardContainer: {
    marginLeft: -4,
  },

  invalidCard: {
    bottom: -7,
  },

  invalidCardOverlay: {
    borderRadius: 5,
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
});
