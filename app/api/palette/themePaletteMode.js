import lightPalette from './lightPalette';
import darkPalette from './darkPalette';

const themePalette = (color, mode) => {
  if (mode === 'dark') {
    return darkPalette[color];
  }
  return lightPalette[color];
};

export default themePalette;
