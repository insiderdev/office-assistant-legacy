import { Typography, Colors, Assets } from 'react-native-ui-lib';
import { Dimensions } from 'react-native';

import colors from './colors';
import fonts from './fonts';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

Colors.loadColors(colors);

Typography.loadTypographies({
  h1: {
    fontSize: 20,
    fontFamily: 'Muli',
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'Muli-SemiBold',
  },
  h3: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Muli',
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Muli',
  },
  p: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: 'Muli',
    fontWeight: '300',
  },
});

Assets.loadAssetsGroup('illustrations', {
  person: require('../../assets/images/person-illustration.png'),
});

Assets.loadAssetsGroup('icons', {
  plus: require('../../assets/icons/plus.png'),
  arrowBack: require('../../assets/icons/arrow-back.png'),
  chevronDown: require('../../assets/icons/chevron-down.png'),
});

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export {
  colors,
  fonts,
  scale,
  verticalScale,
  moderateScale,
};
