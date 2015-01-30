'use strict';

/**
 * @ngdoc function
 * @name simpleRegressionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the simpleRegressionApp
 */
angular.module('simpleRegressionApp')
    .controller('MainCtrl', function($scope) {    	
        var pid, // project-id
            create = true; // first create a project

        $scope.url = '';
        $scope.items = [];        
        $scope.axis = null;
        $scope.cleanup = false;

        //
        // Run Regression on select-list onChange
        //
        $scope.$watch('axis', function() {
        	if (!$scope.axis) { return; }

            deployr.script('/testuser/root/DeployR - Simple Regression.R', pid)
                .character('input_x', $scope.axis.x)
                .character('input_y', $scope.axis.y)
                .end(function(res) {
                	$scope.$apply(function() { 
                		$scope.url = res.get('results')[0].url;
                	});
                });
        }, true);

        //
        // Close Project
        //
        $scope.close = function() {
        	deployr.io('/r/project/close').data({ project: pid }).end();
        	$scope.cleanup = true;
        };

        // 
        // Kick-off the example
        // --------------------
        // 1. Point to a DeployR server endpoint (host)
        // 2. Login testuser/changeme
        // 3. Create a project (R Session) and save pid
        // 4. Execute 'DeployR - ReadCSV.R' to populate the select lists
        // 5. Wait for the regression button to be clicked
        //
        deployr.configure({ host: 'http://localhost:7300', cors: true })        
            .auth('testuser', 'changeme')
            .script('/testuser/root/DeployR - ReadCSV.R', create)
               .routput('output_vars')
               .end(function(res) {
                  pid = res.get('project').project; // save project-id

                  $scope.$apply(function() {
                     $scope.items = res.workspace('output_vars').value;
                     $scope.axis = {
                        x: $scope.items[0],
                        y: $scope.items[1]
                     };
                  });
              });
           });
