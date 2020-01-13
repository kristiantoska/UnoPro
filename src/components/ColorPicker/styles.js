import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  colorBlockRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 120,
  },

  colorBlock: {
    height: 50,
    width: 50,
    borderRadius: 5,
    margin: 5,
  },
});
