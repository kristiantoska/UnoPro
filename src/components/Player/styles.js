import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  playerContainer: {
    position: 'absolute',
  },

  playerIcon: {
    height: 36,
    width: 36,
    borderRadius: 10,
    marginLeft: 20,
    marginTop: -40,
    backgroundColor: 'white',
    position: 'absolute',
  },

  backgroundSvg: {
    position: 'absolute',
    bottom: 0,
  },

  cardHandContainer: {
    // backgroundColor: '#202020a0',
    flex: 1,
    marginHorizontal: 30,
  },

  unoButton: {
    position: 'absolute',
    right: -20,
    top: -40,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  unoButtonDisabled: {
    opacity: 0.6,
  },
  unoButtonPressed: {
    backgroundColor: 'green',
  },
  unoButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
