@cors
Feature: API proxy CORS
	As API developer
	I want to ensure proxy responds correctly to CORS requests
	So I know it will work in SmartDocs
    
	@options
    Scenario: Verify CORS response with custom headers
        Given I set X-CORS-Request1 header to value1
        Given I set X-CORS-Request2 header to value2
		When I request OPTIONS for /ping
        Then response code should be 200
        And response header X-CORS-Request1 should be value1
        And response header X-CORS-Request2 should be value2
