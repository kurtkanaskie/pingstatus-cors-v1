# Ping and Status API with Embedded CORS support
Demonstrates support for CORS in proxy.

## Disclaimer

This example is not an official Google product, nor is it part of an official Google product.

## License

This material is copyright 2019, Google LLC.and is licensed under the Apache 2.0 license.
See the [LICENSE](LICENSE) file.

This code is open source.

## Overview
Demonstrates how to add support CORS so that calls from SmartDocs in Spec Dditor and Integrated Portal work. Key points:

1. Get all the header values for: "Access-Control-Request-Headers"
2. Add CORS headers on all responses, both successful (Proxy Post Flow) and errors (Default Fault Rule)
3. Skip requests in conditional flows with verb "OPTIONS"
4. Use no-route RouteRule when verb is "OPTIONS"

## All at once using resources
Install with mvn. Replacer copies and replaces the resources dir into the target. Note use of -Dapigee.config.dir option.

* mvn -P test install -Dapigee.config.options=update -Dapigee.config.dir=target/resources/edge -Dapigee.config.exportDir=target/test/integration -Ddeployment.suffix= -Dapi.testtag=@health

### Shared Flow cors-v1 
Optionally (its enabled=false in proxy), install the cors-v1 shared flow for consideration, see README in cors-v1 folder.

## Other commands for iterations
First deploy the proxy as above but with skip-clean=true, this leaves the target directory with all of the "replaced" values in place. Once done you can iterate on various aspects of the design and test, without generating and exporting newly created App credentials.

Options:
* -Dapigee.config.options (update = create/update, none = no action (default))
* -Dskip.clean=true (preserves the target directory that contains replaced values)
* -Dskip.apps=true (does not create/update app which avoids creating additional credentials)
* -Dskip.export=true (does not export apps, uses those in target, more efficient)
* -Ddeployment.suffix= (used for parallel development, leave blank for env deploys, set to create unique proxy)
* -Dapigee.options=update (used to either overwrite (update) or create new revision (if ommitted))

### 1 - Deploy the proxy, skip apps, skip cleaning the target directory (assumes Apps already created)
* mvn -P test install -Dskip.clean=true -Dskip.apps=true -Dapigee.config.options=update -Dapigee.config.dir=target/resources/edge -Dapigee.config.exportDir=target/test/integration -Ddeployment.suffix= -Dapi.testtag=@health

### 2 - Iterate on changes to API proxy - install, deploy and test
* mvn -P test install -Dskip.clean=true -Dskip.export=true -Dapigee.config.options=none -Dapigee.config.dir=target/resources/edge -Dapigee.config.exportDir=target/test/integration -Ddeployment.suffix= -Dapi.testtag=@health

### 3 - Iterate on integration tests
* mvn -P test process-resources -Dskip.clean=true exec:exec@integration -Ddeployment.suffix= -Dapi.testtag=@health,@errorHandling,@cors

## Other useful commands

### Export Apps and run the tests (if Apps credentials are deleted in UI)
* mvn -P test process-resources apigee-config:exportAppKeys exec:exec@integration -Ddeployment.suffix= -Dskip.clean=true -Dapigee.config.dir=target/resources/edge -Dapigee.config.exportDir=target/test/integration -Dapi.testtag=@health

### Skip Creating Apps and Overwrite latest revision
* mvn -P test install -Dapigee.options=update -Dapigee.config.options=update -Dskip.apps=true -Dapigee.config.dir=target/resources/edge -Dapigee.config.exportDir=target/test/integration -Ddeployment.suffix= -Dapi.testtag=@health

## Other discrete commands
* mvn jshint:lint
* mvn -Ptest exec:exec@unit

* mvn -Ptest apigee-config:targetservers -Dapigee.config.options=update
* mvn -Ptest apigee-config:developerapps -Dapigee.config.options=update
* mvn -Ptest apigee-config:apiproducts -Dapigee.config.options=update
* mvn -Ptest apigee-config:kvms -Dapigee.config.options=update
* mvn -P test apigee-config:exportAppKeys -Dapigee.config.exportDir=appkeys
