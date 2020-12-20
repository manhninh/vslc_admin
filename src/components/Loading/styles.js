import {StyleSheet, Dimensions} from 'react-native';
import Screen, * as AppValues from '../../AppValues';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    width: screen.width,
    height: screen.height,
    backgroundColor: AppValues.COLOR_BG_GRB03,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppValues.COLOR_BG_GRB07,
    borderRadius: Screen.width(2),
    overflow: 'hidden',
    padding: Screen.width(3),
  },
  textContent: {
    fontSize: AppValues.normalize(13),
    color: AppValues.COLOR_BG_WHITE,
    textAlign: 'center',
    marginTop: Screen.width(2),
  },
  loadingIcon: {
    width: Screen.width(6),
    height: Screen.width(5),
    marginHorizontal: Screen.width(1),
  },
});
