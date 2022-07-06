# Elastic APM JavaScript core (for development)

[![Build status](https://travis-ci.org/elastic/apm-agent-js-core.svg?branch=master)](https://travis-ci.org/elastic/apm-agent-js-core)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/elastic-apm.svg)](https://saucelabs.com/u/elastic-apm)
<br><sup>Cross Browser testing is provided by [Sauce Labs](https://saucelabs.com/)</sup>


This is the core JavaScript module for Elastic APM. 

**Only use this repo if you want to implement an integration for a framework Elastic APM does not support yet.**

Use [our base agent](https://github.com/elastic/apm-agent-js-base) for error logging and performance monitoring.

## Development

Use `npm run karma` to continuously run unit tests during development.

Use `npm test` to run both unit tests and e2e tests.

## Making a release

Use `npm run prepare-patch` or `npm run prepare-minor` to prepare and publish a release.
Note that you should NOT make a new commit for the release it will be done in the preparation process.

## License
MIT

<br>Made with ♥️ and ☕️ by Elastic and our community.
