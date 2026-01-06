/**
 * Custom color palette for the school site
 * These colors can be used across components
 */
export const colors = {
  brown: '#674949',
  bgPink: '#FFFAF8',
  lightPink: '#FFEEE8',
  lightYellow: '#FFFDF4',
  grey: '#D0CECE',
  darkGrey: '#6C6C6C',
  rose: '#C64444',
  green: '#227A71',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorName = keyof typeof colors;

