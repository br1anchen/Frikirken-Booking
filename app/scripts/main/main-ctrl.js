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

    $scope.today = function() {
      $scope.bookingDate = new Date();
      $scope.bookingTime = new Date();
    };

    $scope.clear = function () {
      $scope.bookingDate = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.timeChanged = function () {
      console.log('Time changed to: ' + $scope.bookingTime);
    };

    $scope.submitBooking = function(){
      
    }

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.dateFormat = 'dd-MM-yyyy';

    $scope.hstep = 1;
    $scope.mstep = 5;
    $scope.ismeridian = true;

    $scope.today();
    $scope.toggleMin();
  });
