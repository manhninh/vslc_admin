import {StyleSheet, Platform} from 'react-native';
import Screen, * as AppValues from '../../AppValues';

export default StyleSheet.create({
  btn_left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Screen.width(1),
  },
  title: {
    color: AppValues.primaryColor,
    fontSize: AppValues.normalize(17),
    marginRight: Screen.width(1),
  },
  container: {
    paddingTop: Platform.OS === 'android' ? 12 : AppValues.IS_PHONE_X ? 40 : 23,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'android' ? 7 : 13,
  },
  view_title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
