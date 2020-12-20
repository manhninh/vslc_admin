import {StyleSheet, Dimensions} from 'react-native';
import Screen, * as AppValues from '../../AppValues';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    width: screen.width,
    height: screen.height,
    backgroundColor: AppValues.COLOR_BG_GRB07,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  text_pay: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  content_paid: {
    width: '100%',
    backgroundColor: AppValues.COLOR_BG_WHITE,
    marginHorizontal: Screen.width(2),
    marginBottom: Screen.width(2),
    paddingHorizontal: Screen.width(1),
  },
  view_content: {
    width: screen.width - Screen.width(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppValues.COLOR_BG_WHITE,
    borderRadius: Screen.width(2),
    overflow: 'hidden',
    marginHorizontal: Screen.width(4),
    position: 'absolute',
  },
  View_btn: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: AppValues.BORDER_RADIUS,
  },
  btn_cancel: {
    justifyContent: 'center',
    paddingHorizontal: Screen.width(4),
    backgroundColor: AppValues.COLOR_BORDER_PACKAGE,
    borderRadius: Screen.width(1),
  },
  btn_view_confirm: {
    flexDirection: 'row',
    backgroundColor: AppValues.primaryColor,
    borderRadius: Screen.width(2),
    paddingHorizontal: Screen.width(2),
  },
  btn_confirm: {
    borderRadius: Screen.width(1),
    paddingHorizontal: Screen.width(2),
    justifyContent: 'center',
  },
});
