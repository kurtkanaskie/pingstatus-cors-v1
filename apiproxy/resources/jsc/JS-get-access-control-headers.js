/* globals context, request */
/**
 * This script reads all values of the multi-valued request header Access-Control-Request-Headers
 * and sets them as a CSV in the flow variable accessControlRequestHeaders.
 *      
 * We are having to use this custom script because there seems to be no direct way to get the
 * values of a multi-valued header directly in out-of-the-box policies like RaiseFault.
 */ 

// Variable to hold value of flow variable accessControlRequestHeaders.
var accessControlRequestHeadersAsCsv = "";

// Copy all values of the header Access-Control-Request-Headers.
var valueCount = request.headers["Access-Control-Request-Headers"].length();
for(var i = 0; i < valueCount; i++) {
    accessControlRequestHeadersAsCsv += request.headers["Access-Control-Request-Headers"][i];
    if( i+1 !== valueCount ) {
        accessControlRequestHeadersAsCsv += ",";
    }
}

// Set as flow variable.
context.setVariable("accessControlRequestHeaders", accessControlRequestHeadersAsCsv);