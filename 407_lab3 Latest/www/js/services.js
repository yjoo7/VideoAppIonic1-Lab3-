angular.module('starter.services', ['ngCordova'])

  .factory('sensors', function($cordovaFile, $cordovaDeviceMotion, $cordovaGeolocation, $cordovaDeviceOrientation, $cordovaCamera, $ionicLoading) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data

    return {
//      accelerometer: function($scope) {
//        // watch Acceleration options
//        $scope.options = {
//          frequency: 100, // Measure every 100ms
//          deviation : 25  // We'll use deviation to determine the shake event, best values in the range between 25 and 30
//        };
//
//        // Current measurements
//        $scope.measurements = {
//          x : null,
//          y : null,
//          z : null,
//          timestamp : null
//        };
//
//        // Previous measurements
//        $scope.previousMeasurements = {
//          x : null,
//          y : null,
//          z : null,
//          timestamp : null
//        };
//        $scope.startWatchingAccel = function() {
//
//          // Device motion configuration
//          $scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.options);
//
//          // Device motion initilaization
//          $scope.watch.then(null, function(error) {
//            console.log('Error');
//          },function(result) {
//
//            // Set current data
//            $scope.measurements.x = result.x;
//            $scope.measurements.y = result.y;
//            $scope.measurements.z = result.z;
//            $scope.measurements.timestamp = result.timestamp;
//
//            // Detecta shake
//            //$scope.detectShake(result);
//
//          });
//        };
//      },
//      gps: function($scope) {
//        // watch GPS options
//        $scope.options = {
//          timeout : 5000,
//          maximumAge: 3000,
//          enableHighAccuracy: false // may cause errors if true
//        };
//
//        // Current measurements
//        $scope.measurements = {
//          lat : null,
//          long : null
//        };
//
//        $scope.pollGPSLocation = function() {
//          $cordovaGeolocation.getCurrentPosition($scope.options)
//            .then(function (position) {
//
//              $scope.measurements.lat = position.coords.latitude;
//              $scope.measurements.long = position.coords.longitude;
//              //$ionicLoading.show({ template: 'GPS Result', noBackdrop: true, duration: 1000 });
//            }, function(err) {
//              // error
//              console.log("polling error", err);
//            });
//
//          setTimeout($scope.pollGPSLocation, 3000);
//        };
//
//        $scope.startWatchingGPS = function() {
//
//          // Device motion configuration
//          $scope.watch = $cordovaGeolocation.watchPosition($scope.options);
//
//          // Device motion initilaization
//          $scope.watch.then(null, function(error) {
//            console.log('Error');
//          },function(result) {
//
//            // Set current data
//            $scope.measurements.lat = result.coords.latitude;
//            $scope.measurements.long = result.coords.longitude;
//
//          });
//        };
//      },
//      compass: function($scope) {
//        // watch GPS options
//        $scope.options = {
//          frequency: 3000,
//          filter: true     // if frequency is set, filter is ignored
//        };
//
//        // Current measurements
//        $scope.measurements = {
//          magneticHeading : null,
//          trueHeading : null,
//          headingAccuracy: null,
//          timestamp: null
//        };
//
//        $scope.startWatchingCompass = function() {
//
//          // Device motion configuration
//          $scope.watch = $cordovaDeviceOrientation.watchHeading($scope.options);
//
//          // Device motion initilaization
//          $scope.watch.then(null, function(error) {
//            console.log('Error');
//          },function(result) {
//
//            // Set current data
//            $scope.measurements.magneticHeading = result.magneticHeading;
//            $scope.measurements.trueHeading = result.trueHeading;
//            $scope.measurements.headingAccuracy = result.headingAccuracy;
//            $scope.measurements.timeStamp = result.timestamp;
//
//          });
//        };
//      },
      camera: function($scope) {
        // various camera options
        $scope.options = {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 500,
          targetHeight: 500,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };

        $scope.getPicture = function () {
          $cordovaCamera.getPicture($scope.options).then(function (imageURI) {
            $scope.imageSrc = imageURI;
          }, function (err) {
            // error
          });
        };

        $scope.videoOptions = {
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
          mediaType: Camera.MediaType.ALLMEDIA
        };

        $scope.getVideo = function () {
          $cordovaCamera.getPicture($scope.videoOptions).then(function (URI) {
            $scope.videoSrc = URI;
            console.log('videoFile URI: '+URI);
          }, function (err) {
            // error
          });
        }

        function makeid()
        {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

          return text;
        }

        $scope.trim = function () {
          console.log('in trim function')
          var startInput = $scope.trimTimes.startInput
          var endInput = $scope.trimTimes.endInput

          var videoName = makeid();
          VideoEditor.trim(
            trimSuccess,
            trimFail,
            {
              fileUri: $scope.videoSrc, // path to input video
              trimStart: startInput, // time to start trimming in seconds
              trimEnd: endInput, // time to end trimming in seconds
              outputFileName: videoName+'.MOV', // output file name
              progress: function(info) {} // optional, see docs on progress
            }
          );

          function trimSuccess(result) {
            // result is the path to the trimmed video on the device
            $scope.result = result;
            console.log('trimSuccess, result: ' + result);
            $scope.trimmedVideoPath = 'file://'+result;
            //$scope.videoSrc = 'file://'+result;
            $scope.$apply();
            $ionicLoading.show({template: 'Trim Success', noBackdrop: true, duration: 1000});
          }

          function trimFail(err) {
            console.log('trimFail, err: ' + err);
            $ionicLoading.show({template: 'Trim Fail', noBackdrop: true, duration: 1000});
          }
        }

        $scope.saveChanges = function() {
        $cordovaFile.writeFile($scope.trimmedVideoPath,outputFileName, $scope.result , true)

        console.log("saved to ==> " + $scope.trimmedVideoPath)
        $ionicLoading.show({template: 'Save??', noBackdrop: true, duration: 1000}); // this never shows
        }



        $scope.stopmotion = function () {
          $scope.getvideoinfo();
          var videoDuration = $scope.videoInfoJSON.duration;
          var thumbnailIncrement = videoDuration / 10;
          $scope.videoThumbnails = {};
          for (var time = 0; time < videoDuration; time = time + thumbnailIncrement) {
            $scope.createJPEG(time); //?????????????????? We're not sure how to connect this with createJPEG method
            //We want to createJPEG for each time and be able to connect the JPEG files to make them into a video
          }
        }

        $scope.accessThumbnails = function () {

          for (var thumbnailNumber = 0;
               thumbnailNumber < $scope.videoThumbnails['numberOfThumbnails'];
               thumbnailNumber = thumbnailNumber + 1) {
            var thumbnailImageSrc = $scope.videoThumbnails[thumbnailNumber];
          }
        }

        //Create JPEG thumbnails from a video - start
        $scope.createJPEG = function createJPEG(time){
          var jpegName = makeid();
          VideoEditor.createThumbnail(
            thumbnailSuccess, // success cb
            thumbnailError, // error cb
            {
              fileUri: $scope.videoSrc, // the path to the video on the device
              outputFileName: jpegName+'.jpeg', // the file name for the JPEG image
              atTime: time, // optional, location in the video to create the thumbnail (in seconds)
              /* width: 320, // optional, width of the thumbnail
               height: 480, // optional, height of the thumbnail */
              quality: 100 // optional, quality of the thumbnail (between 1 and 100)
            }
          );
          function thumbnailSuccess(result){
            console.log('thumbnailSuccess, result: ' + result);
            $scope.imageSrc = 'file://'+result;
            $scope.videoThumbnails[time] = 'file://'+result;
          }
          function thumbnailError(err){
            console.log('thumbnailError, err: ' + err);
          }
        }
        //Create a factory to create a JPEG thumbnail from a video - end



        $scope.getvideoinfo = function (){
          VideoEditor.getVideoInfo(
            success, // success cb
            error, // error cb
            {
              fileUri: $scope.videoSrc, // the path to the video on the device
            }
          );
          function success(result){
            console.log('getVideoInfo, result: ' + JSON.stringify(result, null, 2));
            $scope.videoInfoJSON = result;
          }
          function error(err){
            console.log('getVideoInfo, err: ' + err);
          }
        }
      }
    };
  });
