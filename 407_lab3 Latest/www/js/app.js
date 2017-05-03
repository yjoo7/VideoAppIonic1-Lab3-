// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  console.log('trying to request authorizaion')
    		cordova.plugins.photoLibrary.requestAuthorization(
          function () {
            console.log('success')
            // User gave us permission to his library, retry reading it!
          },
          function (err) {
          console.log('error')
            // User denied the access
          }, // if options not provided, defaults to {read: true}.
          {
            read: true,
            write: true
          }
        );

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

//  .state('tab.accelerometer', {
//      url: '/accelerometer',
//      views: {
//        'tab-accelerometer': {
//          templateUrl: 'templates/tab-accelerometer.html',
//          controller: 'AccelerometerCtrl'
//        }
//      }
//    })
    .state('tab.camera', {
      url: '/camera',
      views: {
        'tab-camera': {
          templateUrl: 'templates/tab-camera.html',
          controller: 'CameraCtrl'
        }
      }
    })

//    .state('tab.compass', {
//      url: '/compass',
//      views: {
//        'tab-compass': {
//          templateUrl: 'templates/tab-compass.html',
//          controller: 'CompassCtrl'
//        }
//      }
//    })
//
//  .state('tab.gps', {
//    url: '/gps',
//    views: {
//      'tab-gps': {
//        templateUrl: 'templates/tab-gps.html',
//        controller: 'GPSCtrl'
//      }
//    }
//  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');


})
  .config([
    '$compileProvider',
    function ($compileProvider) {
		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|cdvphotolibrary):/);
		console.log('in config')
		console.log($compileProvider)

		//Angular 1.2 and above has two sanitization methods, one for links (aHrefSanitizationWhitelist) and
		//one for images (imgSrcSanitizationWhitelist). Versions prior to 1.2 use $compileProvider.urlSanitizationWhitelist(...)
    }
  ])
  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['**']);
  })
.run(function($ionicPlatform, $rootScope, $ionicHistory) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    $ionicHistory.clearCache();
  });
});
