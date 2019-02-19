/* globals print */
/* globals context */
var faultName = context.getVariable ("fault.name");

var code;
var description;
var responseCode;
var reasonPhrase;

switch(faultName) {
    case "InvalidAccessToken" :
    case "invalid_access_token" :
    case "FailedToResolveAPIKey" :
        responseCode = "401";
        reasonPhrase = "Unauthorized";
        code = "401.001";
        description = "Invalid Access Token";
        break;
    
    case "access_token_expired" :
        responseCode = "401";
        reasonPhrase = "Unauthorized";
        code = "401.002";
        description = "Access Token Expired";
        break;
    
    case "InvalidAPICallAsNoApiProductMatchFound" :
        responseCode = "401";
        reasonPhrase = "Unauthorized";
        code = "401.003";
        description = "API Product mismatch for token";
        break;

    case "InvalidApiKey" :
        responseCode = "401";
        reasonPhrase = "Unauthorized";
        code = "401.004";
        description = "Invalid API Key";
        break;
    case "FailedToResolveAPIKey" :
        responseCode = "401";
        reasonPhrase = "Unauthorized";
        code = "401.005";
        description = "Missing API Key";
        break;

    case "InvalidApiKeyForGivenResource" :
        responseCode = "401";
        reasonPhrase = "Unauthorized";
        code = "401.005";
        description = "Invalid API Key for given resource";
        break;
    
    case "InsufficientScope" :
        responseCode = "401";
        reasonPhrase = "Unauthorized";
        code = "401.004";
        description = "Insufficient scope for Application";
        break;
    
    case "SpikeArrestViolation" :
        responseCode = "429";
        reasonPhrase = "Too Many Requests";
        code = "429.001";
        description = "Rate limit exceeded";
        break;
    
    case "RaiseFault" :
        if ( context.getVariable("raisefault.RF-path-suffix-not-found.failed") === true ) {
            var uri = context.getVariable("proxy.pathsuffix");
            var verb = context.getVariable("request.verb");
            responseCode = "404";
            reasonPhrase = "Not Found";
            code = "404.001";
            description = "No resource for " + verb + " " + uri;
        } else {
            // Do something for unrecgognized RaiseFault
            responseCode = context.getVariable("error.status.code");
            reasonPhrase = context.getVariable("error.reason.phrase");
            code = "400.000";
            description = reasonPhrase + " Unrecognized raise fault";
        }
        break;
        
    case "ScriptExecutionFailed":
        var javascriptErrorMessage = context.getVariable ("javascript.errorMessage");
        responseCode = "500";
        reasonPhrase = "Internal Server Error";
        code = "500.003";
        description = "Script execution failed: " + javascriptErrorMessage;
        break;
    
    case "SharedFlowNotFound":
        responseCode = "500";
        reasonPhrase = "Internal Error";
        code = "500.002";
        description = "Shared Flow Not Found";
        break;

    default:
        responseCode = "500";
        reasonPhrase = "Internal Error";
        code = "500.001";
        description = "Uncaught server error";
}

context.setVariable( "flow.error.status", responseCode );
context.setVariable( "flow.error.reason", reasonPhrase );
context.setVariable( "flow.error.code", code );
context.setVariable( "flow.error.description", description );

print( "responseCode: "+responseCode + "reasonPhrase: "+reasonPhrase + " code: "+code + "userMessage: "+description);
