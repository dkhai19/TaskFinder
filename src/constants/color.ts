export const colors = {
  white: '#FFFFFF',
  red: '#fa6650',
  blue: '#2f81ed',
  black: '#000000',
  opacityBlack: (opacity: number) => {
    return `rgba(0,0,0,${opacity})`
  },
  opacityWhite: (opacity: number) => {
    return `rgba(255,255,255,${opacity})`
  },
  opacityRed: (opacity: number) => {
    return `rgba(250, 102, 80,${opacity})`
  },
  opacityBlue: (opacity: number) => {
    return `rgba(47, 128, 237,${opacity})`
  },
}
