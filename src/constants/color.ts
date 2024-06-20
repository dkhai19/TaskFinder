export const colors = {
  white: '#FFFFFF',
  red: '#FA6650',
  blue: '#2F80ED',
  black: '#000000',
  opacityBlack: (opacity: number) => {
    return `rgba(0,0,0,${opacity})`;
  },
  opacityWhite: (opacity: number) => {
    return `rgba(255,255,255,${opacity})`;
  },
};
