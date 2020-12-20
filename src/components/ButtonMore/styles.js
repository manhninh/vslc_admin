import {StyleSheet, Platform} from 'react-native';
import Screen, * as AppValues from '../../AppValues';

export default StyleSheet.create({
  textButton: {
    color: AppValues.COLOR_BG_WHITE,
  },
  view_btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: AppValues.BORDER_RADIUS_5PX,
    minHeight: Platform.OS === 'android' ? Screen.width(12) : Screen.width(14),
  },
});
