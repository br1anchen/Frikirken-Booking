"use strict";angular.module("booking",["ngRoute","ui.bootstrap","ui.calendar"]).config(["$routeProvider",function(e){e.when("/",{templateUrl:"partials/main.html",controller:"MainCtrl"})}]),angular.module("booking").controller("MainCtrl",["$scope",function(e){e.uiConfig={calendar:{height:450,editable:!0,header:{left:"title",center:"",right:"today prev,next"},defaultView:"agendaWeek",eventClick:e.alertOnEventClick,eventDrop:e.alertOnDrop,eventResize:e.alertOnResize}},e.eventSources=[],e.today=function(){e.bookingDate=new Date,e.bookingTime=new Date},e.clear=function(){e.bookingDate=null},e.disabled=function(e,o){return"day"===o&&(0===e.getDay()||6===e.getDay())},e.toggleMin=function(){e.minDate=e.minDate?null:new Date},e.open=function(o){o.preventDefault(),o.stopPropagation(),e.opened=!0},e.toggleMode=function(){e.ismeridian=!e.ismeridian},e.update=function(){var o=new Date;o.setHours(14),o.setMinutes(0),e.mytime=o},e.timeChanged=function(){console.log("Time changed to: "+e.bookingTime)},e.submitBooking=function(){},e.dateOptions={formatYear:"yy",startingDay:1},e.dateFormat="dd-MM-yyyy",e.hstep=1,e.mstep=5,e.ismeridian=!0,e.today(),e.toggleMin()}]),function(e){try{e=angular.module("booking")}catch(o){e=angular.module("booking",[])}e.run(["$templateCache",function(e){e.put("partials/main.html",'<div class="row" id="booking_calendar"><div class="col-md-12"><div ui-calendar="uiConfig.calendar" ng-model="eventSources" calendar="currentCalendar"></div></div></div><div class="row" id="booking_Form"><div class="col-md-12"><form role="form" ng-submit="submitBooking()"><div class="form-group col-md-6"><label for="booking_date">Booking Date</label><p class="input-group"><input type="text" class="form-control" datepicker-popup="{{dateFormat}}" ng-model="bookingDate" is-open="opened" min-date="minDate" max-date="maxDate" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close"><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button></span></p><label for="booking_time">Booking Time</label><timepicker ng-model="bookingTime" ng-change="timeChanged()" hour-step="hstep" minute-step="mstep" show-meridian="ismeridian"></timepicker></div><div class="form-group col-md-6"><label for="booking_reason">Booking Reason</label><textarea class="form-control" rows="3" ng-modle="bookingReason"></textarea><label for="booking_person">Booking Organization</label><input type="text" class="form-control" ng-modle="bookingPerson" placeholder="Enter Organization Name"></div><button type="submit" id="bookingBtn" class="btn btn-default">Submit</button></form></div></div><div class="row col-md-4">Booking Church At: {{bookingTime | date:\'shortTime\'}} {{bookingDate | date: \'dd-MM-yyyy\'}}</div>')}])}();