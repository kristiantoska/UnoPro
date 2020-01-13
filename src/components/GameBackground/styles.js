import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000D27',
    alignItems: 'center',
    justifyContent: 'center',
  },

  absoluteView: {
    position: 'absolute',
  },

  backgroundImage: {
    height: '60%',
    width: '60%',
    resizeMode: 'contain',
  },

  deckOverlay: {
    position: 'absolute',
    backgroundColor: 'gray',
    width: '100%',
    height: '100%',
  },
});
