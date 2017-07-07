import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  customStack: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  linkContainer: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  link: {
    alignItems: 'center',
  },
});

export default styles;
