/**
 * 
 * date-time-picker 简单封装 ngCordova DatePicker 控件，连续选择时间和日期
 * 并绑定到date-time-value。
 * 
 */
'use strict';
appDirecitves.directive('dateTimePicker', ['$filter', '$cordovaDatePicker',
  function ($filter, $cordovaDatePicker) {
    return {
      restrict: 'EA',
      scope: {
        dateTimeValue: '='
      },
      replace: true,
      
      template: '<input type="text" ng-model="dateTimeValue">',
      link: function (scope, iElement, iAttrs) {
        var getOptions = function (date, mode) {
          return {
            date: date,
            mode: mode, // or 'time'
            allowOldDates: true,
            allowFutureDates: false,
            androidTheme: 3,
            // todayText :'现在'
          }
        }
        var setDateTime = function () {
          var datetime;
          console.info(scope.dateTimeValue);
          if (scope.dateTimeValue != null && scope.dateTimeValue !=
            undefined && scope.dateTimeValue != '') {
            datetime = new Date(scope.dateTimeValue);
          } else {
            datetime = new Date();
          }
          var optionsDate = getOptions(datetime, 'date'),
            optionsTime = getOptions(datetime, 'time'),
            selectedDate = '',
            selectedTime = '';
          document.addEventListener("deviceready", function () {
            $cordovaDatePicker.show(optionsDate).then(function (
              setDate) {
              selectedDate = $filter('date')(setDate,
                'yyyy-MM-dd');
              $cordovaDatePicker.show(optionsTime).then(
                function (setTime) {
                  selectedTime = $filter('date')(setTime,
                    'HH:mm');
                  scope.dateTimeValue = selectedDate + ' ' +
                    selectedTime;
                });
            });
          }, false);
        }
        return iElement.on('click', function (event) {
          setDateTime();
        });
      }
    };
  }
])