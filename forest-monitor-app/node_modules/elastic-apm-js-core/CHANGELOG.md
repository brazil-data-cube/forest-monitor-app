<a name="3.0.1"></a>
## [3.0.1](https://github.com/elastic/apm-agent-js-core/compare/v3.0.0...v3.0.1) (2019-01-29)



<a name="3.0.0"></a>
# [3.0.0](https://github.com/elastic/apm-agent-js-core/compare/v2.5.0...v3.0.0) (2019-01-29)

### BREAKING CHANGE

* remove setTags in favor of addTags API (#28)


### Bug Fixes

* propagate transaction ID for unsampled transactions ([#30](https://github.com/elastic/apm-agent-js-core/issues/30)) ([3884806](https://github.com/elastic/apm-agent-js-core/commit/3884806))
* remove invalid chars in span tags and marks ([#34](https://github.com/elastic/apm-agent-js-core/issues/34)) ([9bdc575](https://github.com/elastic/apm-agent-js-core/commit/9bdc575))


### Features

* include transaction flags on error ([#29](https://github.com/elastic/apm-agent-js-core/issues/29)) ([36c13f3](https://github.com/elastic/apm-agent-js-core/commit/36c13f3))


### Performance Improvements

* introduce minimal url parser to reduce bundle size ([#32](https://github.com/elastic/apm-agent-js-core/issues/32)) ([2000ee2](https://github.com/elastic/apm-agent-js-core/commit/2000ee2))



<a name="2.5.0"></a>
# [2.5.0](https://github.com/elastic/apm-agent-js-core/compare/v2.4.0...v2.5.0) (2019-01-21)

Added product notice.

<a name="2.4.0"></a>
# [2.4.0](https://github.com/elastic/apm-agent-js-core/compare/v2.3.0...v2.4.0) (2019-01-15)


### Bug Fixes

* remove query strings from xhr and fetch span name ([#24](https://github.com/elastic/apm-agent-js-core/issues/24)) ([cc82e92](https://github.com/elastic/apm-agent-js-core/commit/cc82e92))
* set pageLoadTransactionName when transaction ends from configs ([#25](https://github.com/elastic/apm-agent-js-core/issues/25)) ([afdacee](https://github.com/elastic/apm-agent-js-core/commit/afdacee))


### Features

* add parsing distributed tracing header, and time origin to utils ([#21](https://github.com/elastic/apm-agent-js-core/issues/21)) ([b3601c2](https://github.com/elastic/apm-agent-js-core/commit/b3601c2))
* implement OpenTracing Tracer ([#23](https://github.com/elastic/apm-agent-js-core/issues/23)) ([2a3c411](https://github.com/elastic/apm-agent-js-core/commit/2a3c411))
* send span sync field to apm server ([#17](https://github.com/elastic/apm-agent-js-core/issues/17)) ([abad58b](https://github.com/elastic/apm-agent-js-core/commit/abad58b))
* use parentId in Spans ([#19](https://github.com/elastic/apm-agent-js-core/issues/19)) ([4aa5773](https://github.com/elastic/apm-agent-js-core/commit/4aa5773))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/elastic/apm-agent-js-core/compare/v2.2.0...v2.3.0) (2018-12-17)


### Features

* add addContext and addTags to Spans and Transactions ([#16](https://github.com/elastic/apm-agent-js-core/issues/16)) ([de0d72b](https://github.com/elastic/apm-agent-js-core/commit/de0d72b))
* add paint timing mark to page-load transaction ([#14](https://github.com/elastic/apm-agent-js-core/issues/14)) ([544530a](https://github.com/elastic/apm-agent-js-core/commit/544530a))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/elastic/apm-agent-js-core/compare/v2.1.1...v2.2.0) (2018-12-05)


### Features

* introduce subtype and action in Spans ([#9](https://github.com/elastic/apm-agent-js-core/issues/9)) ([5fd4af7](https://github.com/elastic/apm-agent-js-core/commit/5fd4af7))


<a name="2.1.1"></a>
## [2.1.1](https://github.com/elastic/apm-agent-js-core/compare/v2.1.0...v2.1.1) (2018-12-05)


### Bug Fixes

* use dist package for url-parse to avoid packaging issues ([#10](https://github.com/elastic/apm-agent-js-core/issues/10)) ([9018a8d](https://github.com/elastic/apm-agent-js-core/commit/9018a8d))


### Features

* introduce subtype and action in Spans ([#9](https://github.com/elastic/apm-agent-js-core/issues/9)) ([5fd4af7](https://github.com/elastic/apm-agent-js-core/commit/5fd4af7))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/elastic/apm-agent-js-core/compare/v2.0.0...v2.1.0) (2018-11-23)


### Features

* instrument fetch API ([2375a60](https://github.com/elastic/apm-agent-js-core/commit/2375a60))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/elastic/apm-agent-js-core/compare/v1.0.0...v2.0.0) (2018-11-14)


### BREAKING CHANGES
* use apm-server intake/v2 (APM Server v6.5+)


### Bug Fixes

* adopt the w3c dt header flag proposal ([ff0fdfc](https://github.com/elastic/apm-agent-js-core/commit/ff0fdfc))
* don't startSpan after transaction has ended ([137bd63](https://github.com/elastic/apm-agent-js-core/commit/137bd63))
* filter out invalid spans ([c9fb0e1](https://github.com/elastic/apm-agent-js-core/commit/c9fb0e1))
* ignore apm-server xhrs ([5527cca](https://github.com/elastic/apm-agent-js-core/commit/5527cca))
* merging two spans related to fetching the initial document ([6ee4108](https://github.com/elastic/apm-agent-js-core/commit/6ee4108))
* set pageLoadTraceId on page load transacton start ([c6510ca](https://github.com/elastic/apm-agent-js-core/commit/c6510ca))
* set the sync property on xhr spans ([4283e85](https://github.com/elastic/apm-agent-js-core/commit/4283e85))
* shorten page load config options ([2550c24](https://github.com/elastic/apm-agent-js-core/commit/2550c24))
* truncate active spans on transaction end ([a28759c](https://github.com/elastic/apm-agent-js-core/commit/a28759c))
* validate DT header ([5aa1cc1](https://github.com/elastic/apm-agent-js-core/commit/5aa1cc1))


### Features

* add allowed origins for distributed tracing ([0812ff7](https://github.com/elastic/apm-agent-js-core/commit/0812ff7))
* add DT header to same origin http requests ([a60d6d9](https://github.com/elastic/apm-agent-js-core/commit/a60d6d9))
* add DT page load trace id config option ([149ebaa](https://github.com/elastic/apm-agent-js-core/commit/149ebaa))
* add pageLoadTransactionName config option ([a2644df](https://github.com/elastic/apm-agent-js-core/commit/a2644df))
* add parent_id to spans ([21934b3](https://github.com/elastic/apm-agent-js-core/commit/21934b3))
* add sampling for transactions ([8105e0c](https://github.com/elastic/apm-agent-js-core/commit/8105e0c))
* generate random ids based on DT guidelines ([8fd2581](https://github.com/elastic/apm-agent-js-core/commit/8fd2581))
* provide span_count.started ([f3effcf](https://github.com/elastic/apm-agent-js-core/commit/f3effcf))
* use correct id format for transactions and spans ([d44592e](https://github.com/elastic/apm-agent-js-core/commit/d44592e))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/elastic/apm-agent-js-core/compare/v0.8.2...v1.0.0) (2018-08-23)


### BREAKING CHANGES

* use /v1/rum endpoint (APM Server v6.4+)


<a name="0.8.2"></a>
## [0.8.2](https://github.com/elastic/apm-agent-js-core/compare/v0.8.1...v0.8.2) (2018-08-17)


### Bug Fixes

* check marks are greater than fetchStart ([6d35eaa](https://github.com/elastic/apm-agent-js-core/commit/6d35eaa))


### Features

* add transactionDurationThreshold config option ([67f5c5d](https://github.com/elastic/apm-agent-js-core/commit/67f5c5d))



<a name="0.8.1"></a>
## [0.8.1](https://github.com/elastic/apm-agent-js-core/compare/v0.8.0...v0.8.1) (2018-08-14)


### Bug Fixes

* filter out transactions with zero spans ([2311a53](https://github.com/elastic/apm-agent-js-core/commit/2311a53))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/elastic/apm-agent-js-core/compare/v0.7.1...v0.8.0) (2018-07-02)


### BREAKING CHANGES

* remove patch-common


### Bug Fixes

* minor fixes in Span and Transaction ([718cc19](https://github.com/elastic/apm-agent-js-core/commit/718cc19))
* simplify patchMethod ([204f1c0](https://github.com/elastic/apm-agent-js-core/commit/204f1c0))


### Features

* add xhr-patch ([f61be32](https://github.com/elastic/apm-agent-js-core/commit/f61be32))
* support timing sync xhr ([9005b7f](https://github.com/elastic/apm-agent-js-core/commit/9005b7f))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/elastic/apm-agent-js-core/compare/v0.7.0...v0.7.1) (2018-06-22)


### Bug Fixes

* consolidate Transaction and Error contexts ([f34aabd](https://github.com/elastic/apm-agent-js-core/commit/f34aabd))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/elastic/apm-agent-js-core/compare/v0.6.2...v0.7.0) (2018-06-15)


### BREAKING CHANGES

* remove timestamp on error and transaction payload


### Bug Fixes

* update span.context.http.url structure ([40d6bb2](https://github.com/elastic/apm-agent-js-core/commit/40d6bb2))



<a name="0.6.2"></a>
## [0.6.2](https://github.com/elastic/apm-agent-js-core/compare/v0.6.1...v0.6.2) (2018-06-12)


### Bug Fixes

* remove marks before fetchStart to align with resource spans ([824af14](https://github.com/elastic/apm-agent-js-core/commit/824af14))
* spans generated from navigation and resource timing apis ([912cf02](https://github.com/elastic/apm-agent-js-core/commit/912cf02)), closes [#25](https://github.com/elastic/apm-agent-js-core/issues/25)



<a name="0.6.1"></a>
## [0.6.1](https://github.com/elastic/apm-agent-js-core/compare/v0.6.0...v0.6.1) (2018-05-28)


### Features

* add transaction.mark ([3de6b10](https://github.com/elastic/apm-agent-js-core/commit/3de6b10))
* improve agent marks ([97ea337](https://github.com/elastic/apm-agent-js-core/commit/97ea337))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/elastic/apm-agent-js-core/compare/v0.5.1...v0.6.0) (2018-05-22)

### BREAKING CHANGES

* rename hasRouterLibrary to sendPageLoadTransaction


<a name="0.5.1"></a>
## [0.5.1](https://github.com/elastic/apm-agent-js-core/compare/v0.5.0...v0.5.1) (2018-05-01)



<a name="0.5.0"></a>
# [0.5.0](https://github.com/elastic/apm-agent-js-core/compare/v0.4.3...v0.5.0) (2018-04-23)


### Bug Fixes

* default custom for transaction type ([997c747](https://github.com/elastic/apm-agent-js-core/commit/997c747))


### Features

* ability to add navigation timing marks to any transaction ([e8c934c](https://github.com/elastic/apm-agent-js-core/commit/e8c934c))



<a name="0.4.3"></a>
## [0.4.3](https://github.com/elastic/apm-agent-js-core/compare/v0.4.2...v0.4.3) (2018-04-10)


### Bug Fixes

* **error-logging:** parsing error stack fails if error object is string ([6365b15](https://github.com/elastic/apm-agent-js-core/commit/6365b15))



<a name="0.4.2"></a>
## [0.4.2](https://github.com/elastic/apm-agent-js-core/compare/v0.4.1...v0.4.2) (2018-04-03)



<a name="0.4.1"></a>
## [0.4.1](https://github.com/elastic/apm-agent-js-core/compare/v0.4.0...v0.4.1) (2018-04-03)


### Bug Fixes

* **apm-server:** ignore falsy payload after filtering ([0bef5b6](https://github.com/elastic/apm-agent-js-core/commit/0bef5b6))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/elastic/apm-agent-js-core/compare/v0.3.1...v0.4.0) (2018-03-27)


### Bug Fixes

* remove _debug from transaction context ([d2fc1b9](https://github.com/elastic/apm-agent-js-core/commit/d2fc1b9))
* remove query string from resource entries ([7507a5c](https://github.com/elastic/apm-agent-js-core/commit/7507a5c))


### Features

* add http.raw.url to span context ([45aaa5b](https://github.com/elastic/apm-agent-js-core/commit/45aaa5b))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/elastic/apm-agent-js-core/compare/v0.3.0...v0.3.1) (2018-03-08)


### Bug Fixes

* payload span start time ([e30724f](https://github.com/elastic/apm-agent-js-core/commit/e30724f))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/elastic/apm-agent-js-core/compare/v0.2.2...v0.3.0) (2018-03-06)


### Bug Fixes

* apply serverStringLimit to user context ([b24b038](https://github.com/elastic/apm-agent-js-core/commit/b24b038))
* minor improvements in navigation timing spans ([d1008d5](https://github.com/elastic/apm-agent-js-core/commit/d1008d5))
* review log levels and update logLevel lib ([b68db82](https://github.com/elastic/apm-agent-js-core/commit/b68db82))


### Features

* add LoggingService ([6f190ac](https://github.com/elastic/apm-agent-js-core/commit/6f190ac))
* add setTags to ConfigService ([5c65967](https://github.com/elastic/apm-agent-js-core/commit/5c65967))
* check isActive before adding items to the queue ([b372b35](https://github.com/elastic/apm-agent-js-core/commit/b372b35))



<a name="0.2.2"></a>
## [0.2.2](https://github.com/elastic/apm-agent-js-core/compare/v0.2.1...v0.2.2) (2018-02-16)


### Bug Fixes

* set descriptive names for navigation timing spans ([d270c78](https://github.com/elastic/apm-agent-js-core/commit/d270c78))


### Features

* enforce server string limit ([09ca8c6](https://github.com/elastic/apm-agent-js-core/commit/09ca8c6))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/elastic/apm-agent-js-core/compare/v0.2.0...v0.2.1) (2018-02-07)



<a name="0.2.0"></a>
# [0.2.0](https://github.com/elastic/apm-agent-js-core/compare/v0.1.8...v0.2.0) (2018-02-06)


### BREAKING CHANGES

* ServiceFactory now requires init to be called


### Bug Fixes

* minor improvements to queue and throttle ([e2aae2c](https://github.com/elastic/apm-agent-js-core/commit/e2aae2c))
* remove transaction.unknownName ([b760c87](https://github.com/elastic/apm-agent-js-core/commit/b760c87))


### Features

* add Queue and throttle ([f987f41](https://github.com/elastic/apm-agent-js-core/commit/f987f41))
* throttle adding to both errorQueue and transactionQueue ([f1590f5](https://github.com/elastic/apm-agent-js-core/commit/f1590f5))



<a name="0.1.8"></a>
## [0.1.8](https://github.com/elastic/apm-agent-js-core/compare/v0.1.7...v0.1.8) (2018-01-10)



<a name="0.1.7"></a>
## [0.1.7](https://github.com/elastic/apm-agent-js-core/compare/v0.1.6...v0.1.7) (2018-01-10)


### Bug Fixes

* add language name to the payload ([ac39335](https://github.com/elastic/apm-agent-js-core/commit/ac39335))
* check config validity before sending the payload ([1486fd6](https://github.com/elastic/apm-agent-js-core/commit/1486fd6))



<a name="0.1.6"></a>
## [0.1.6](https://github.com/elastic/apm-agent-js-core/compare/v0.1.5...v0.1.6) (2018-01-09)



<a name="0.1.5"></a>
## [0.1.5](https://github.com/elastic/apm-agent-js-core/compare/v0.1.4...v0.1.5) (2018-01-08)



<a name="0.1.4"></a>
## [0.1.4](https://github.com/elastic/apm-agent-js-core/compare/v0.1.3...v0.1.4) (2018-01-05)


### Bug Fixes

* set default agentName to js-base ([3bfeb55](https://github.com/elastic/apm-agent-js-core/commit/3bfeb55))


### Features

* add marks data to the payload ([ec17bc7](https://github.com/elastic/apm-agent-js-core/commit/ec17bc7))
* add user context and custom context ([319e131](https://github.com/elastic/apm-agent-js-core/commit/319e131))



<a name="0.1.3"></a>
## [0.1.3](https://github.com/elastic/apm-agent-js-core/compare/v0.1.2...v0.1.3) (2018-01-05)


### Bug Fixes

* remove in_app field from stacktraces ([610cc6e](https://github.com/elastic/apm-agent-js-core/commit/610cc6e))


### Features

* add serviceVersion configuration ([c468338](https://github.com/elastic/apm-agent-js-core/commit/c468338))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/jahtalab/apm-agent-js-core/compare/v0.1.1...v0.1.2) (2017-12-20)


### Bug Fixes

* **ApmServer:** don't send empty payload ([78c58ad](https://github.com/jahtalab/apm-agent-js-core/commit/78c58ad))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/jahtalab/apm-agent-js-core/compare/v0.1.0...v0.1.1) (2017-12-13)



<a name="0.1.0"></a>
# [0.1.0](https://github.com/jahtalab/apm-agent-js-core/compare/v0.0.4...v0.1.0) (2017-12-13)


### BREAKING CHANGES

* rename apiOrigin to serverUrl
* rename app to service
* rename trace to span



<a name="0.0.4"></a>
## [0.0.4](https://github.com/jahtalab/apm-agent-js-core/compare/v0.0.3...v0.0.4) (2017-11-21)



<a name="0.0.3"></a>
## [0.0.3](https://github.com/jahtalab/apm-agent-js-core/compare/v0.0.2...v0.0.3) (2017-11-20)



<a name="0.0.2"></a>
## 0.0.2 (2017-11-14)



