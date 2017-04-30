angular.module('starter.services', ['ngCordova'])


.factory('sensors', function($cordovaDeviceMotion, $cordovaGeolocation, $cordovaDeviceOrientation, $cordovaCamera, $ionicLoading, $VideoEditor) {
    // Might use a resource here that returns a JSON array
    // Some fake testing data
    return {
      accelerometer: function ($scope) {
        // watch Acceleration options
        $scope.options = {
          frequency: 100, // Measure every 100ms
          deviation: 25  // We'll use deviation to determine the shake event, best values in the range between 25 and 30
        };

        // Current measurements
        $scope.measurements = {
          x: null,
          y: null,
          z: null,
          timestamp: null
        };

        // Previous measurements
        $scope.previousMeasurements = {
          x: null,
          y: null,
          z: null,
          timestamp: null
        };
        $scope.startWatchingAccel = function () {

          // Device motion configuration
          $scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.options);

          // Device motion initilaization
          $scope.watch.then(null, function (error) {
            console.log('Error');
          }, function (result) {

            // Set current data
            $scope.measurements.x = result.x;
            $scope.measurements.y = result.y;
            $scope.measurements.z = result.z;
            $scope.measurements.timestamp = result.timestamp;

            // Detecta shake
            //$scope.detectShake(result);

          });
        };
      },
      gps: function ($scope) {
        // watch GPS options
        $scope.options = {
          timeout: 5000,
          maximumAge: 3000,
          enableHighAccuracy: false // may cause errors if true
        };

        // Current measurements
        $scope.measurements = {
          lat: null,
          long: null
        };

        $scope.pollGPSLocation = function () {
          $cordovaGeolocation.getCurrentPosition($scope.options)
            .then(function (position) {

              $scope.measurements.lat = position.coords.latitude;
              $scope.measurements.long = position.coords.longitude;
              //$ionicLoading.show({ template: 'GPS Result', noBackdrop: true, duration: 1000 });
            }, function (err) {
              // error
              console.log("polling error", err);
            });

          setTimeout($scope.pollGPSLocation, 3000);
        };

        $scope.startWatchingGPS = function () {

          // Device motion configuration
          $scope.watch = $cordovaGeolocation.watchPosition($scope.options);

          // Device motion initilaization
          $scope.watch.then(null, function (error) {
            console.log('Error');
          }, function (result) {

            // Set current data
            $scope.measurements.lat = result.coords.latitude;
            $scope.measurements.long = result.coords.longitude;

          });
        };
      },
      compass: function ($scope) {
        // watch GPS options
        $scope.options = {
          frequency: 3000,
          filter: true     // if frequency is set, filter is ignored
        };

        // Current measurements
        $scope.measurements = {
          magneticHeading: null,
          trueHeading: null,
          headingAccuracy: null,
          timestamp: null
        };

        $scope.startWatchingCompass = function () {

          // Device motion configuration
          $scope.watch = $cordovaDeviceOrientation.watchHeading($scope.options);

          // Device motion initilaization
          $scope.watch.then(null, function (error) {
            console.log('Error');
          }, function (result) {

            // Set current data
            $scope.measurements.magneticHeading = result.magneticHeading;
            $scope.measurements.trueHeading = result.trueHeading;
            $scope.measurements.headingAccuracy = result.headingAccuracy;
            $scope.measurements.timeStamp = result.timestamp;

          });
        };
      },
      camera: function ($scope) {
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
            console.log('videoFile URI: ' + URI);
          }, function (err) {
            // error
          });
        }

        //Trim a video(videoSrc) - start //please test this on your phone You Wu!!!!!!
        $scope.trimVideo = function (){
          $VideoEditor.trim(
              trimSuccess,
              trimFail,
              {
                fileUri: $scope.videoSrc,
                trimStart: 5,
                trimEnd: 10,
                outputFileName: "output-name", //is naming for fileUri and outputFileName right??????????????
              }
            );
          }
          function trimSuccess(result) {
            console.log('trimSuccess, result: ' + result);
          }
          function trimFail(err) {
            console.log('trimFail, err: ' + err);
          }
        //Trim a video(videoSrc) - end

        //calling the for-loop function???????????????
        $scope.stopmotion = function () {
          var videoEnd = $scope.videoSrc.duration;
          for (var time = 0; time < videoEnd; time = time + 10) {
            createJPEG(time); //?????????????????? We're not sure how to connect this with createJPEG method
            //We want to createJPEG for each time and be able to connect the JPEG files to make them into a video
          }
        }

        //Create JPEG thumbnails from a video - start
        function createJPEG(){
          VideoEditor.createThumbnail(
            thumbnailSuccess, // success cb
            thumbnailError, // error cb
            {
              fileUri: $scope.videoSrc, // the path to the video on the device
              outputFileName: 'output-name', // the file name for the JPEG image
              atTime: 2, // optional, location in the video to create the thumbnail (in seconds)
              width: 320, // optional, width of the thumbnail
              height: 480, // optional, height of the thumbnail
              quality: 100 // optional, quality of the thumbnail (between 1 and 100)
            }
          );
        }
        function thumbnailSuccess(){
          console.log('thumbnailSuccess, result: ' + result);
        }
        function thumbnailError(){
          console.log('thumbnailError, err: ' + err);
        }
        //Create a factory to create a JPEG thumbnail from a video - end




        //Video Info Options
        $VideoEditor.getVideoInfo(
          getVideoInfoSuccess,
          getVideoInfoError,
          {
            fileUri: $scope.videoSrc,
          }
        );//how to get the video info????? ???????????????????????????????????????
        function getVideoInfoSuccess(info) {
          console.log('getVideoInfoSuccess, info: ' + JSON.stringify(info, null, 2));
        }
        function getVideoInfoError(){
          console.log('getVideoInfoError, error: ' + error);
        }
      }
    }
  })

