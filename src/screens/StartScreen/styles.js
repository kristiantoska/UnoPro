import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nameInputContainer: {
    position: 'absolute',
    top: 30,
    padding: 5,
    alignItems: 'center',
  },

  nameInputLabel: {
    color: 'white',
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  nameInput: {
    height: 50,
    width: 200,
    color: '#000D27',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '500',
  },

  nameInputDisabled: {
    color: 'white',
    backgroundColor: 'transparent',
    width: 200,
    textAlign: 'center',
    fontSize: 30,
  },

  inputRow: {
    flexDirection: 'row',
  },

  submitButton: {
    marginLeft: 15,
    height: 50,
    width: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitButtonText: {
    color: 'white',
    fontSize: 20,
  },

  gameButtonContainer: {
    flexDirection: 'row',
  },

  gameButton: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'white',
    backgroundColor: '#000D27',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },

  gameButtonDisabled: {
    opacity: 0,
    marginTop: 200,
  },

  gameButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },

  loading: {
    position: 'absolute',
    flex: 1,
  },
});
