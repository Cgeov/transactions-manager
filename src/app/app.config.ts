import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

const UnicomerPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f5f0f4',
      100: '#ebe1e9',
      200: '#d6c3d2',
      300: '#b89ab2',
      400: '#9a7190',
      500: '#7d5573',
      600: '#6a4561',
      700: '#5a3a52',
      800: '#4b3b47',
      900: '#3d2f3a',
      950: '#2a1f28',
    },
    colorScheme: {
      light: {
        primary: {
          color: '#4b3b47',
          contrastColor: '#f5f0f4',
          hoverColor: '#5a3a52',
          activeColor: '#3d2f3a',
        },
        highlight: {
          background: '#cfd2b2',
          focusBackground: '#e1e4c9',
          color: '#4b3b47',
          focusColor: '#3d2f3a',
        },
        surface: {
          0: '#ffffff',
          50: '#f9f7f9',
          100: '#f2eff1',
          200: '#e8e3e7',
          300: '#e0d8de',
          400: '#c4b8c1',
          500: '#a89da5',
          600: '#8f8289',
          700: '#766a71',
          800: '#63595f',
          900: '#534b50',
          950: '#302a2e',
        },
      },
      dark: {
        primary: {
          color: '#b89ab2',
          contrastColor: '#2a1f28',
          hoverColor: '#d6c3d2',
          activeColor: '#9a7190',
        },
        highlight: {
          background: 'rgba(207, 210, 178, 0.16)',
          focusBackground: 'rgba(207, 210, 178, 0.24)',
          color: 'rgba(255, 255, 255, 0.87)',
          focusColor: 'rgba(255, 255, 255, 0.87)',
        },
        surface: {
          0: '#ffffff',
          50: '#302a2e',
          100: '#3d2f3a',
          200: '#4b3b47',
          300: '#534b50',
          400: '#63595f',
          500: '#766a71',
          600: '#8f8289',
          700: '#a89da5',
          800: '#c4b8c1',
          900: '#e0d8de',
          950: '#f2eff1',
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: UnicomerPreset,
        options: {
          darkModeSelector: '.dark-mode',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
  ],
};
