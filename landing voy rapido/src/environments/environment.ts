// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /*   API: 'http://localhost:3001/voyrapido/api/v1/', */
  API: 'https://hellomundolab.cl:3001/voyrapido/api/v1/',
  BACKEND_BASE_URL: 'http://localhost:3001',
  /*   BACKEND_BASE_URL: 'https://hellomundolab.cl:3001', */
  WHATSAPP: 'https://api.whatsapp.com/send?phone=56952038612&text=¡Hola!%20Deseo%20comunicarme%20con%20ustedes.',
  FACEBOOK:
    'https://www.facebook.com/voyrapidocl-112632197082556/?__tn__=%2Cd%2CP-R&eid=ARARO3sJvh7CMzJFtiptE1-mKe7IhHVWZjjTlkTKQDT-kzWVrvGvkiLrr2pBB94GPPbzzUjAomtUz-Xs"',
  INSTAGRAM: 'https://instagram.com/voyrapido.cl?igshid=1ibonj86kjh9w',
  SIMPLIROUTE: 'https://livetracking.simpliroute.com/widget/account/36080/tracking/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
