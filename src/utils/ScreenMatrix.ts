import {Alert, Dimensions, Platform, PixelRatio} from 'react-native';
//@ts-ignore
import _ from 'lodash';

export function getOS(): string {
  return Platform.OS;
}

/**
 * SCALING - SAME VIEW FOR TABLET AND IPHONE ADDED THIS SCALE IN HEIGHT, WIDTH, MARGIN, PADDING
 */
const {width, height} = Dimensions.get('window');
const baseWidth = 360;
const baseHeight = 700;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const scaledSize = (size: any) => Math.ceil(size * scale);
export const widthFromPercentage = (per: number) => (width * per) / 100;
export const heightFromPercentage = (per: number) => (height * per) / 100;
const fontScale = PixelRatio.getFontScale();
export const getFontSize = (size: number) => size / fontScale;

//Artboard Dimension
let artBoardHeightOrg = 640;
let artBoardWidthOrg = 360;
//Re calculated Artboard Dimension
let artBoardWidth = isSameRatio() ? artBoardWidthOrg : width;
let artBoardHeight = isSameRatio() ? artBoardHeightOrg : height;
// To check if Artboard and Device screen has same ratio
function isSameRatio(): boolean {
  return artBoardWidthOrg / artBoardHeightOrg < 1 && width / height < 1;
}
//Top or Bottom nav spaces or any extra space occupied by os e.g Status bar, Notch
let extraSpace = 0;
export function deviceBasedDynamicDimension(
  originalDimen: number,
  compareWithWidth: boolean,
  resizeFactor: number,
): number {
  if (originalDimen != null) {
    if (resizeFactor != null) {
      originalDimen *= resizeFactor;
    }
    const compareArtBoardDimenValue = compareWithWidth
      ? artBoardWidth
      : artBoardHeight;
    const artBoardScreenDimenRatio =
      (originalDimen * 100) / compareArtBoardDimenValue;
    let compareCurrentScreenDimenValue = compareWithWidth
      ? width
      : height - extraSpace;

    return PixelRatio.roundToNearestPixel(
      (artBoardScreenDimenRatio * compareCurrentScreenDimenValue) / 100,
    );
  }
  return 0;
}
