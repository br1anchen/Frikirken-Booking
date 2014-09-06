'use strict';

angular.module('booking')
  .controller('MainCtrl', function ($scope,moment) {
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

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.timeChanged = function (which,time) {
      console.log(which + 'Time changed to: ' + time);
    };

    $scope.changeBookingArea = function(area){

      var removeEventSource = area === 'FirstFloor'? $scope.secondFloorEvents : $scope.firstFloorEvents;
      var targetEventSource = area === 'FirstFloor'? $scope.firstFloorEvents : $scope.secondFloorEvents;

      angular.forEach($scope.eventSources,function(value, key){
        if($scope.eventSources[key] === removeEventSource){
          $scope.eventSources.splice(key,1);
        }
      });

      if($scope.eventSources.length === 0){
        $scope.eventSources.push(targetEventSource);
      }
    };

    $scope.submitBooking = function(area){
      var newEvent = factoryBookingEvent(
        $scope.bookingPerson + ' Booking for ' + $scope.bookingReason,
        moment($scope.bookingDate).set('hour', $scope.bookingStartTime.getHours()).set('minute', $scope.bookingStartTime.getMinutes()).toDate(),
        moment($scope.bookingDate).set('hour', $scope.bookingEndTime.getHours()).set('minute', $scope.bookingEndTime.getMinutes()).toDate(),
        []
      );

      if(area === 'FirstFloor'){
        $scope.firstFloorEvents.push(newEvent);
      }else if(area === 'SecondFloor'){
        $scope.secondFloorEvents.push(newEvent);
      }
    };

    function factoryBookingEvent(title,startDateTime,endDateTime,cssClasses){
      return {
        title: title,
        start: startDateTime,
        end: endDateTime,
        className: cssClasses,
        allDay: false
      };
    }

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.dateFormat = 'dd-MM-yyyy';

    $scope.hstep = 1;
    $scope.mstep = 5;
    $scope.ismeridian = false;
    $scope.bookingStartTime = new Date();
    $scope.bookingEndTime = new Date();

    $scope.firstFloorEvents = [{
        title: 'Demo',
        start: new Date(2014, 8, 6, 16, 0),
        end: new Date(2014, 8, 6, 19, 0),
        className: [],
        allDay: false
    }];
    $scope.secondFloorEvents = [];
    $scope.bookingArea = 'FirstFloor';
    $scope.eventSources = [$scope.firstFloorEvents,$scope.secondFloorEvents];

    $scope.today();
    $scope.toggleMin();
  });
