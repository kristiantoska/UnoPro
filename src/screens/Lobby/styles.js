import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000D27',
    borderRadius: 20,
    borderWidth: 10,
    borderColor: '#ffffffa0',
    alignItems: 'center',
  },

  playersRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
  },

  playerCard: {
    height: '50%',
    width: '20%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffffa0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  playerName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

  noPlayer: {
    color: 'white',
    fontSize: 50,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },

  codeView: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffffffa0',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  codeText: {
    color: 'white',
    fontSize: 20,
  },

  startButton: {
    marginLeft: 20,
    backgroundColor: '#52c41a',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  cancelButton: {
    marginLeft: 20,
    backgroundColor: '#f5222d',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  cancelButtonText: {
    color: 'white',
    fontSize: 20,
  },
});
