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
        var ruser,         // the authenticated user
            pid,           // project-id
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

            ruser.script('/testuser/root/DeployR - Simple Regression.R', pid)
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
            ruser.release([pid]);
            $scope.cleanup = true;
        };

        // 
        // Kick-off the example...        
        //

        // Point to a DeployR server endpoint (host)                
        deployr.configure({ host: 'http://localhost:7300', cors: true });

        // Login to DeployR testuser/changeme
        ruser = deployr.auth('testuser', 'changeme');

        // Create a project (R Session) [and]
        // Execute 'DeployR - ReadCSV.R' on that project 
        ruser.script('/testuser/root/DeployR - ReadCSV.R', create)
            .routput('output_vars')
            .end(function(res) {
                pid = res.get('project').project; // save project-id

                // populate select lists axis (view)
                $scope.$apply(function() {
                    $scope.items = res.workspace('output_vars').value;
                    $scope.axis = {
                        x: $scope.items[0],
                        y: $scope.items[1]
                    };
                });
            });
    });
