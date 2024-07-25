export const lightColors = {
  white: '#FFFFFF',
  red: '#fa6650',
  blue: '#2f81ed',
  black: '#000000',
}

export const darkColors = {
  black: '#FFFFFF',
  blue: '#fa6650',
  red: '#2f81ed',
  white: '#000000',
}

export const getOpacityColor = (color: string, opacity: number) => {
  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return [r, g, b]
  }

  const [r, g, b] = hexToRgb(color)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
