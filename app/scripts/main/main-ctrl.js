'use strict';

angular.module('booking')
  .controller('MainCtrl', function ($scope) {
    $scope.uiConfig = {
        calendar:{
          height: 450,
          editable: true,
          header:{
            left: 'title',
            center: '',
            right: 'today prev,next'
          },
          defaultView: 'agendaWeek',
          eventClick: $scope.alertOnEventClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize
        }
      };

      $scope.eventSources = [];
  });
