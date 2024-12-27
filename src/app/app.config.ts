import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Este instrucción nos ayuda a trabajar con ZoneJs
    // provideZoneChangeDetection({ eventCoalescing: true }),

    // Abilitar Zoneless en nuestra aplciación
    provideExperimentalZonelessChangeDetection(),

    provideRouter(routes),
  ],
};
