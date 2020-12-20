/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

export const WIDTH_DEVICE = deviceWidth;

export const HEIGHT_DEVICE = deviceHeight;

export const IS_PHONE_X =
  Platform.OS === 'ios' &&
  (WIDTH_DEVICE === 812 ||
    HEIGHT_DEVICE === 812 ||
    WIDTH_DEVICE === 896 ||
    HEIGHT_DEVICE === 896);

// scale font size
const pixelRatio = PixelRatio.get();

export function normalize(size) {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (deviceWidth < 360) {
      return size * 0.95;
    }
    // iphone 5
    if (deviceHeight < 667) {
      return size;
      // iphone 6-6s
    } else if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  } else if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
    }
    // Catch other weird android width sizings
    if (deviceHeight < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  } else if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
      // Catch other smaller android height sizings
    }
    if (deviceHeight < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.4;
  }
  // if older device ie pixelRatio !== 2 || 3 || 3.5

  return size;
}
const Today = new Date();
export const MIN_DATE_VALUE = `${Today.getFullYear() - 10}-01-01`;
export const MAX_DATE_VALUE = `${Today.getFullYear() + 10}-12-31`;
//  Scale size
export default class Screen {
  static width(width) {
    return (width / 100) * deviceWidth;
  }

  static height(height) {
    return (height / 100) * deviceHeight;
  }

  static isIphoneX = () => {
    return (
      // This has to be iOS duh
      Platform.OS === 'ios' && (deviceHeight === 812 || deviceWidth === 812)
    );
  };
}

export class Integer {
  static IS_PHONE_X = IS_PHONE_X;

  static PADDING_TOP = Platform.OS === 'android' ? 0 : IS_PHONE_X ? 40 : 20;

  static PADDING_BOTTOM = IS_PHONE_X ? 40 : 0;

  static NAVIGATION_BAR_HEIGHT =
    Platform.OS === 'android' ? 56 : IS_PHONE_X ? 72 : 60;
}

export const FONT_TEXT_INPUT =
  Platform.OS === 'android' ? 'NotoSans-Regular' : 'NotoSans';

// color app
export const COLOR_BG_WHITE = '#ffff';

export const COLOR_BG_RED = '#ff0000';

export const COLOR_BG_BLUE = '#3fa1db';

export const COLOR_BG_GREY = '#a0a0a0';

export const COLOR_BG_GREEN = '#34c65b';

export const COLOR_BG_ORANGE = '#fbad86';

export const COLOR_BG_WHITE_GRAY = '#f5ffff';

export const COLOR_BG_DARK_GREY = '#2f3c48';

export const COLOR_BG_BLACK = '#000000';

export const COLOR_BG_GRB03 = 'rgba(0, 0, 0, 0.3)';

export const COLOR_BG_GRB01 = 'rgba(0, 0, 0, 0.1)';

export const COLOR_BG_GRB07 = 'rgba(0, 0, 0, 0.7)';

export const COLOR_BG_GRB10 = 'rgba(0, 0, 0, 1)';

export const COLOR_BORDER_PACKAGE = '#e5e5e5';

export const COLOR_BACKGROUND_APP = '#f2f5fa';

export const COLOR_BACKGROUND_EDIT_TEXT = '#f2f6f9';

export const COLOR_BACKGROUND_EDIT_TEXT_DISABLE = '#E7E7EA';

export const COLOR_TXT_GRAY = '#959595';

export const primaryColor = '#68A463';

export const BACKDROP = '#0e030380';

export const ORANGE = '#f2761d';

// Size Icon
export const SIZE_ICON_VECTOR_LABEL = Platform.OS === 'android' ? 15 : 20;

export const SIZE_ICON_VECTOR = 20;

export const SIZE_ICON_VECTOR_MENU = 25;

export const SIZE_ICON_VECTOR_BIG = 30;

export const SIZE_TEXT_BTN = 13;

export const SIZE_TEXT = 16;

export const SIZE_TEXT_EDIT_TEXT = 16;

export const BORDER_RADIUS = 2;

export const BORDER_RADIUS_10PX = 10;

export const BORDER_RADIUS_5PX = 5;

// border 1px
export const BORDER_1PX = 0.5;

// FONT SIZE

export const SIZE_EDIT_TEXT =
  Platform.OS === 'android' ? normalize(12) : normalize(13);

export const SIZE_TEXT_PRIMARY =
  Platform.OS === 'android' ? normalize(12) : normalize(11);

export const SIZE_TEXT_LABEL_SMALLER =
  Platform.OS === 'android' ? normalize(10) : normalize(11);

export const SIZE_TEXT_LABEL =
  Platform.OS === 'android' ? normalize(12) : normalize(13);

export const SIZE_TEXT_SMALLER =
  Platform.OS === 'android' ? normalize(14) : normalize(15);

export const SIZE_TEXT_SMALL = normalize(15);

export const SIZE_TEXT_MEDIUM = normalize(17);

export const SIZE_TEXT_LARGE =
  Platform.OS === 'android' ? normalize(22) : normalize(25);
