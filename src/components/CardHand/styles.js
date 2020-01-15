import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

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
