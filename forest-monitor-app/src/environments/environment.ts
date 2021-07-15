/**
 * Variables selected for the production environment
 */
declare var require: any;
export const environment = {
  /** environment */
  production: false,
  version: require('../../package.json').version
};
