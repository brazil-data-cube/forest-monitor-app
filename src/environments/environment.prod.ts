/**
 * Variables selected for the production environment
 */
declare var require: any;
export const environment = {
  /** environment */
  production: true,
  version: require('../../package.json').version,
  NODE_ENV: 'production',
  ENV: 'production',
  BUILD_TYPE: 'production'
};
