'use strict';

angular.module('booking', [
                'ngRoute',
								'ui.bootstrap',
								'ui.calendar',])
    .config(function ($routeProvider) {
	    $routeProvider
	      .when('/', {
          templateUrl: 'partials/main.html',
          controller: 'MainCtrl'
        });
	  });
