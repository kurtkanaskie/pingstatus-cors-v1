# Ping and Status API with Embedded CORS support
Demonstrates support for CORS in proxy.

## Disclaimer

This example is not an official Google product, nor is it part of an official Google product.

## License

This material is copyright 2019, Google LLC.and is licensed under the Apache 2.0 license.
See the [LICENSE](LICENSE) file.

This code is open source.

## Overview
Demonstrates how to add support for CORS so that calls from SmartDocs work. Key points:

1. Get all the header values for: "Access-Control-Request-Headers"
2. Add CORS headers on all responses, both successful (Proxy Post Flow) and errors (Default Fault Rule)
3. Skip requests in conditional flows with verb "OPTIONS"
4. Use no-route RouteRule when verb is "OPTIONS"

## All at once using resources
Install with mvn. Replacer copies and replaces the resources dir into the target. Note use of -Dapigee.config.dir option.

* mvn -X -Ptraining-test install -Ddeployment.suffix= -Dapigee.config.options=update -Dapigee.config.dir=target/resources/edge -Dapigee.config.exportDir=target/test/integration -Dapi.testtag=@health

## Other commands for iterations

### Skip clean and export - just install, deploy and test
* mvn -P test install -Ddeployment.suffix= -Dskip.clean=true -Dskip.export=true -Dapigee.config.options=none -Dapigee.config.dir=target/resources/edge -Dapigee.config.exportDir=target/test/integration -Dapi.testtag=@health

### Export Apps and run the tests (after skip.clen)
* mvn -P test process-resources apigee-config:exportAppKeys exec:exec@integration -Ddeployment.suffix= -Dskip.clean=true -Dapigee.config.dir=target/resources/edge -Dapigee.config.exportDir=target/test/integration -Dapi.testtag=@get-ping

### Just run the tests (after skip.clen) - for test iterations
* mvn -P test process-resources -Ddeployment.suffix= -Dskip.clean=true exec:exec@integration -Dapi.testtag=@health

### Skip Creating Apps and Overwrite latest revision
* mvn -P test install -Ddeployment.suffix= -Dapigee.options=update -Dapigee.config.options=update -Dskip.apps=true -Dapigee.config.dir=target/resources/edge -Dapigee.config.exportDir=target/test/integration -Dapi.testtag=@health