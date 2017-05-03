angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicLoading) {
  if (!window.cordova)
  {
    $ionicLoading.show({ template: 'Not running natively!', noBackdrop: true, duration: 1000 });
  }
})
//
//.controller('AccelerometerCtrl', function($scope, $ionicLoading, sensors) {
//  if (window.cordova)
//  {
//    sensors.accelerometer($scope);
//    $scope.startWatchingAccel();
//  } else {
//    $scope.measurements = {
//      x : "N/A",
//      y : "N/A",
//      z : "N/A",
//      timestamp : null
//    };
//  }
//})

.controller('CameraCtrl', function($scope, sensors) {
  $scope.imageSrc = "";
  $scope.videoSrc = "";
  $scope.trimTimes = {
    startInput: 0,
    endInput: 1
  }
  if (window.cordova) {
    sensors.camera($scope);
  }
})
//
//.controller('CompassCtrl', function($scope, sensors) {
//  if (window.cordova)
//  {
//    sensors.compass($scope);
//    $scope.startWatchingCompass();
//  } else {
//    $scope.measurements = {
//      magneticHeading : "N/A",
//      trueHeading : "N/A",
//      headingAccuracy: "N/A",
//      timestamp: null
//    };
//  }
//})
//
//.controller('GPSCtrl', function($scope, sensors, $q) {
//  if (window.cordova)
//  {
//    sensors.gps($scope);
//    //$scope.startWatchingGPS();
//    $scope.pollGPSLocation();
//  } else {
//    $scope.measurements = {
//      lat : "N/A",
//      long : "N/A"
//    };
//  }
//
//});
