import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { PaletteColor } from '@material-ui/core/styles/createPalette';
import { createStyles } from '@material-ui/core';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    blue: PaletteColor,
    pink: PaletteColor,
    yellow: PaletteColor,
  }

  interface PaletteOptions {
    blue: SimplePaletteColorOptions,
    pink: SimplePaletteColorOptions,
    yellow: SimplePaletteColorOptions,
  }
}

const blue: PaletteColor = {
  main: '#35A2EA',
  light: '#89C0E5',
  dark: '#0378C6',
  contrastText: '#fff',
};

const pink: PaletteColor = {
  main: '#FF6385',
  light: '#FCBDCB',
  dark: '#CC1E44',
  contrastText: '#fff',
}

const yellow: PaletteColor = {
  main: '#FFCC56',
  light: '#FCE4AB',
  dark: '#E09D00',
  contrastText: '#fff',
}

export const theme = createMuiTheme({
    palette: {
        blue,
        pink,
        yellow,
    },
    spacing: 8,
    typography: {
        fontFamily: '"Roboto", "Arial", sans-serif',
        htmlFontSize: 10,
    },
    shape: {
        borderRadius: 4,
    },
    // Add more properties here as necessary
});

export const globalStyles = createStyles({
    '@global': {
        html: {
            backgroundColor: '#fafafa',
            boxSizing: 'border-box',
            height: '100%',
            width: '100%',
            fontSize: '62.5%',
            '&.large-font': {
                fontSize: '68.75%',
            },
        },
        body: {
            margin: 0,
            padding: 0,
            height: '100%',
            width: '100%',
            '#root': {
                height: '100%',
                width: '100%',
            },
        },
    },
});

export default theme;
