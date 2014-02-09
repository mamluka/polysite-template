'use strict';

angular.module('landingPage',[])
    .config(function () {

    })
    .run(function () {

    });

angular.module('landingPage')
    .controller('FormCtrl', function ($scope) {
        $scope.submit = function () {
            alert('david');
        }
    });