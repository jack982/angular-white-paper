(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
describe('Angular White Paper Test Suite', function () {

    beforeEach(angular.mock.module('feature1')); // include app module in our tests

    describe('Testing feature1 controller', function () {
        var featuresController, featuresService, scope, $controller, featuresList;

        beforeEach(angular.mock.module('ui.router'));
     
        beforeEach(angular.mock.module('feature1'));
 

        // mock dependency (before inject)
        beforeEach(function () {

            featuresList = ['ui-router', 'bootstrap', 'karma'];

            angular.mock.module(function ($provide) {
                var mockedFeatureService = {
                    list: function () {
                        return featuresList;
                    },
                    add: function () {
                        featuresList.push('gulp');
                    }
                }

                $provide.value('featuresService', mockedFeatureService);
            });
        });


        beforeEach(inject(function (_$controller_, _$rootScope_, _featuresService_) {
            $controller = _$controller_;
            $scope = _$rootScope_.$new();
            featuresService = _featuresService_;
            featuresController = $controller('feature1', {
                $scope: scope,
                featuresService: featuresService
            });
           
            spyOn(featuresService, 'list').and.callFake(function() { return featuresList }); //callThrough();
        }));

        it('should exists', function () {
            expect(featuresController).toBeDefined();
        });

        it('should set title', function () {
            expect(featuresController.title).toBeDefined();
            expect(featuresController.title).toBe('feature1');
        });

        it('should initialize the features list with a call to featuresService.list()', function () {
        //         spyOn(featuresService, 'list').and.callThrough();
    //        expect(featuresService.list).toHaveBeenCalled();
            expect(featuresController.features).toBeDefined();
            expect(featuresController.features.length).toBe(3);
            expect(featuresController.features).toEqual(featuresList);
        });

        it('should add a feature to the list with a call to featuresService.add()', function () {
      //      expect(featuresService.list).toHaveBeenCalled();
            expect(featuresController.features).toBeDefined();
            expect(featuresController.features.length).toBe(3);
            spyOn(featuresService, 'add').and.callThrough();
            featuresService.add();
            expect(featuresService.add).toHaveBeenCalled();
            expect(featuresController.features.length).toBe(4);
            expect(featuresController.features).toEqual(['ui-router', 'bootstrap', 'karma', 'gulp']);
            expect(featuresController.features[3]).toBe('gulp');
        });
    });

    describe('Testing featuresService', function () {

        var featuresService; //  scope, ctrl, httpBackend, timeout,

        beforeEach(
            inject(function (_featuresService_) { /*$controller, $rootScope, $httpBackend, $timeout ) {  */

                featuresService = _featuresService_;

                //scope = $rootScope.$new();
                //ctrl = $controller('feature1',  {$scope: scope});
                //httpBackend = $httpBackend;
                //timeout = $timeout;
            })
        );

        afterEach(function () {
            // cleanup code here

            //httpBackend.verifyNoOutstandingExpectation();
            //httpBackend.verifyNoOutstandingRequest();
        });

        it('should be defined', function () {
            expect(featuresService).toBeDefined();
        });


        describe('method .list()', function () {
            it('should be defined', function () {
                expect(featuresService.list).toBeDefined();
            });

            it('should return a list of hard-coded features', function () {
                var features = ['ui-router', 'bootstrap', 'karma'];

                expect(featuresService.list()).toBeDefined();
                expect(featuresService.list() instanceof Array).toBe(true);
                expect(featuresService.list()).toEqual(features);
            });

        });

        describe('method .get()', function () {
            it('should be defined', function () {
                expect(featuresService.get).toBeDefined();
            });

            it('should return the first element of the list', function () {
                expect(featuresService.get(0)).toBeDefined();
                expect(featuresService.get(0)).toBe('ui-router');
            });
            
            it('should return nothing if called with an invalid index', function () {
                var index = featuresService.list().length + 1;
                expect(featuresService.get(index)).toBe(null);
                index = -1;
                expect(featuresService.get(index)).toBe(null);
            });
        });

        describe('method .add()', function () {
            it('should be defined', function () {
                expect(featuresService.add).toBeDefined();
            });

            it('should add an element to the end of the list', function () {
                var toAdd = 'featureAdded';
                expect(featuresService.list().length).toBe(3);
                featuresService.add(toAdd);
                expect(featuresService.list().length).toBe(4);
                expect(featuresService.get(3)).toBe(toAdd);
            });

        });

    });

    /*
          it('should add 2 destinations to the destination list', function() {
              expect(scope.destinations).toBeDefined();
              expect(scope.destinations.length).toBe(0);

              scope.newDestination = {
                  city: "London",
                  country: "England"
              };

              scope.addDestination();

              expect(scope.destinations.length).toBe(1);
              expect(scope.destinations[0].city).toBe("London");
              expect(scope.destinations[0].country).toBe("England");

              scope.newDestination.city = 'Frankfurt';
              scope.newDestination.country = 'Germany';

              scope.addDestination();

              expect(scope.newDestination.city).toBe(undefined);

              expect(scope.destinations.length).toBe(2);
              expect(scope.destinations[1].city).toBe("Frankfurt");
              expect(scope.destinations[1].country).toBe("Germany");
              expect(scope.destinations[0].city).toBe("London");
              expect(scope.destinations[0].country).toBe("England");


          });

          it('should remove a destination from the destinations list', function() {
              scope.destinations = [
                  {
                      city: 'London',
                      country: 'England'
                  },
                  {
                      city: 'Frankfurt',
                      country: 'Germany'
                  }
              ];

              expect(scope.destinations.length).toBe(2);

              scope.removeDestination( 0 );

              expect(scope.destinations.length).toBe(1);
              expect(scope.destinations[0].city).toBe("Frankfurt");
              expect(scope.destinations[0].country).toBe("Germany");

          });


          it('should remove the error message after a fixed period of time', function() {
              scope.message = 'Error';
              expect(scope.message).toBe('Error');

              scope.$apply();
              timeout.flush();

              expect(scope.message).toBeNull();
          });
      });

      describe('Testing AngularJS Filter', function() {
          it('should return only warm destinations', inject( function($filter) {
              var warmest = $filter('warmestDestinations');

              var destinations = [
                  {
                      city: 'Bejing',
                      country: 'China',
                      weather: {
                          temp: 21
                      }
                  },
                  {
                      city: 'Rome',
                      country: 'Italy'

                  },
                  {
                      city: 'Miami',
                      country: 'USA',
                      weather: {
                          temp: 25
                      }
                  },
                  {
                      city: 'Paris',
                      country: 'France',
                      weather: {
                          temp: 3
                      }
                  }
              ];

              expect(destinations.length).toBe(4);

              var warmDestinations = warmest(destinations, 15);

              expect(warmDestinations.length).toBe(2);
              expect(warmDestinations[0].city).toBe('Bejing');
              expect(warmDestinations[1].city).toBe('Miami');
          }));
      });

      describe('Testing AngularJS Service', function() {
         it('should return Celsius temperature', inject( function(tempService) {
             var destination = {
                 city: 'Moscow',
                 country: 'Russia',
                 weather: {
                     temp: 262 // Celsius = Kelvin - 273
                 }
             };

             expect(destination.weather.temp).toBe(262);
             var celsiusTemp = tempService.convertKelvinToCelsius( destination.weather.temp );
             expect( celsiusTemp ).toBe(-11);

         }));
      });


      describe('Testing AngularJS Directive', function() {
          var scope, template, directiveController, httpBackend, isolateScope, rootScope;


         // beforeEach( module('tpl/destinationDirective.html') );
          beforeEach( module('test-templates') );


          // mock dependency (before inject)
          beforeEach( function() {
              module(function($provide) {
                  var mockedConversionService = {
                      convertKelvinToCelsius: function( temp ) {
                          return Math.round( temp - 273 );
                      }
                  }

                  $provide.value('tempService', mockedConversionService);
              });
          });

          beforeEach(inject(function($compile, $rootScope, $httpBackend, _tempService_ ) {

              scope = $rootScope.$new();

              rootScope = $rootScope;

              httpBackend = $httpBackend;

              conversionService = _tempService_;

              scope.apiKey = "xyz";

              scope.destinations = [
                  {
                      city: 'Tokyo',
                      country: 'Japan'
                  }
              ];

              var element = angular.element(
                  '<data-destination-directive destinations="destinations" api-key="apiKey" on-remove="removeDestinations(index)"></data-destination-directive>'
              );


              template = $compile(element)(scope);
              scope.$digest();

              // because we are testing directive's isolated scope
              isolateScope = element.isolateScope();

              // if we are using directive controllers ('controllerAs') instead of isolated scope then we can get the instance like this
              directiveController = element.controller('destinationDirective');

          }));

          it('should update the weather for a specific destination', function() {
              spyOn(conversionService, 'convertKelvinToCelsius').and.callThrough(); // .and.returnValue(16); // .and.callFake( function(temp) { return temp - 272 });

              scope.destination = scope.destinations[0];

              httpBackend.expectGET('http://api.openweathermap.org/data/2.5/weather?q=' + scope.destination.city + '&appid=' + scope.apiKey).respond(
                  {
                      weather: [ { main : 'Rain', detail : 'Light rain'} ],
                      main: {temp: 288}
                  }
              );

              expect(scope.destination.city).toBe('Tokyo');

              //isolateScope.getWeather( scope.destination );
              directiveController.getWeather( scope.destination );

              httpBackend.flush();

              expect(scope.destination.weather.main).toBe('Rain');
              expect(scope.destination.weather.temp).toBe(15);
              // mocked service
              expect(conversionService.convertKelvinToCelsius).toHaveBeenCalledWith(288);
          });


          it('should add a message if no city is found', function() {
              scope.destination = scope.destinations[0];

              scope.message = undefined;

              httpBackend.expectGET('http://api.openweathermap.org/data/2.5/weather?q=' + scope.destination.city + '&appid=' + scope.apiKey).respond( {} );

              expect(scope.destination.city).toBe('Tokyo');

              //isolateScope.getWeather( scope.destination );
              directiveController.getWeather( scope.destination );

              httpBackend.flush();

              expect(rootScope.message).toBe('City not found');
          });



           it('should add a message if an HTTP error occurs', function() {

              spyOn(rootScope, '$broadcast');

              scope.destination = scope.destinations[0];

              rootScope.message = undefined;

              httpBackend.expectGET('http://api.openweathermap.org/data/2.5/weather?q=' + scope.destination.city + '&appid=' + scope.apiKey).respond( 500 );

              expect(scope.destination.city).toBe('Tokyo');

              //isolateScope.getWeather( scope.destination );
              directiveController.getWeather( scope.destination );

              httpBackend.flush();

              expect(rootScope.message).toBeDefined();
              expect(rootScope.$broadcast).toHaveBeenCalled(); // check that the spy was called at least once
              expect(rootScope.$broadcast).toHaveBeenCalledWith( 'messageUpdated', { type: 'error', message: 'Server error'} );
              expect(rootScope.$broadcast.calls.count()).toBe(1);
          });

          it('should call the parent controller removeDestination() function', function() {
              scope.removeTest = 1;

              scope.removeDestinations = function() {
                  scope.removeTest++;
              };

              isolateScope.onRemove();

              expect(scope.removeTest).toBe(2);
          });


          it('should generate the correct HTML', function() {
              var templateAsHtml = template.html();

              expect(templateAsHtml).toContain('Tokyo - Japan');

              scope.destinations = [
                  {
                      city: 'London',
                      country: 'England'
                  }
              ];

              scope.$digest();
              templateAsHtml = template.html();

              expect(templateAsHtml).toContain('London - England');
          });

      });
      */
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwL2NvbXBvbmVudHMvZmVhdHVyZTEvZmVhdHVyZTEuc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJkZXNjcmliZSgnQW5ndWxhciBXaGl0ZSBQYXBlciBUZXN0IFN1aXRlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGJlZm9yZUVhY2goYW5ndWxhci5tb2NrLm1vZHVsZSgnZmVhdHVyZTEnKSk7IC8vIGluY2x1ZGUgYXBwIG1vZHVsZSBpbiBvdXIgdGVzdHNcclxuXHJcbiAgICBkZXNjcmliZSgnVGVzdGluZyBmZWF0dXJlMSBjb250cm9sbGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBmZWF0dXJlc0NvbnRyb2xsZXIsIGZlYXR1cmVzU2VydmljZSwgc2NvcGUsICRjb250cm9sbGVyLCBmZWF0dXJlc0xpc3Q7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goYW5ndWxhci5tb2NrLm1vZHVsZSgndWkucm91dGVyJykpO1xyXG4gICAgIFxyXG4gICAgICAgIGJlZm9yZUVhY2goYW5ndWxhci5tb2NrLm1vZHVsZSgnZmVhdHVyZTEnKSk7XHJcbiBcclxuXHJcbiAgICAgICAgLy8gbW9jayBkZXBlbmRlbmN5IChiZWZvcmUgaW5qZWN0KVxyXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgZmVhdHVyZXNMaXN0ID0gWyd1aS1yb3V0ZXInLCAnYm9vdHN0cmFwJywgJ2thcm1hJ107XHJcblxyXG4gICAgICAgICAgICBhbmd1bGFyLm1vY2subW9kdWxlKGZ1bmN0aW9uICgkcHJvdmlkZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vY2tlZEZlYXR1cmVTZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZlYXR1cmVzTGlzdDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlc0xpc3QucHVzaCgnZ3VscCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkcHJvdmlkZS52YWx1ZSgnZmVhdHVyZXNTZXJ2aWNlJywgbW9ja2VkRmVhdHVyZVNlcnZpY2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uIChfJGNvbnRyb2xsZXJfLCBfJHJvb3RTY29wZV8sIF9mZWF0dXJlc1NlcnZpY2VfKSB7XHJcbiAgICAgICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcclxuICAgICAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcclxuICAgICAgICAgICAgZmVhdHVyZXNTZXJ2aWNlID0gX2ZlYXR1cmVzU2VydmljZV87XHJcbiAgICAgICAgICAgIGZlYXR1cmVzQ29udHJvbGxlciA9ICRjb250cm9sbGVyKCdmZWF0dXJlMScsIHtcclxuICAgICAgICAgICAgICAgICRzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICBmZWF0dXJlc1NlcnZpY2U6IGZlYXR1cmVzU2VydmljZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgc3B5T24oZmVhdHVyZXNTZXJ2aWNlLCAnbGlzdCcpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHsgcmV0dXJuIGZlYXR1cmVzTGlzdCB9KTsgLy9jYWxsVGhyb3VnaCgpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBleGlzdHMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc0NvbnRyb2xsZXIpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgc2V0IHRpdGxlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNDb250cm9sbGVyLnRpdGxlKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNDb250cm9sbGVyLnRpdGxlKS50b0JlKCdmZWF0dXJlMScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgdGhlIGZlYXR1cmVzIGxpc3Qgd2l0aCBhIGNhbGwgdG8gZmVhdHVyZXNTZXJ2aWNlLmxpc3QoKScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgIHNweU9uKGZlYXR1cmVzU2VydmljZSwgJ2xpc3QnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgIC8vICAgICAgICBleHBlY3QoZmVhdHVyZXNTZXJ2aWNlLmxpc3QpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzQ29udHJvbGxlci5mZWF0dXJlcykudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzQ29udHJvbGxlci5mZWF0dXJlcy5sZW5ndGgpLnRvQmUoMyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc0NvbnRyb2xsZXIuZmVhdHVyZXMpLnRvRXF1YWwoZmVhdHVyZXNMaXN0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgYSBmZWF0dXJlIHRvIHRoZSBsaXN0IHdpdGggYSBjYWxsIHRvIGZlYXR1cmVzU2VydmljZS5hZGQoKScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8gICAgICBleHBlY3QoZmVhdHVyZXNTZXJ2aWNlLmxpc3QpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzQ29udHJvbGxlci5mZWF0dXJlcykudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzQ29udHJvbGxlci5mZWF0dXJlcy5sZW5ndGgpLnRvQmUoMyk7XHJcbiAgICAgICAgICAgIHNweU9uKGZlYXR1cmVzU2VydmljZSwgJ2FkZCcpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG4gICAgICAgICAgICBmZWF0dXJlc1NlcnZpY2UuYWRkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc1NlcnZpY2UuYWRkKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc0NvbnRyb2xsZXIuZmVhdHVyZXMubGVuZ3RoKS50b0JlKDQpO1xyXG4gICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNDb250cm9sbGVyLmZlYXR1cmVzKS50b0VxdWFsKFsndWktcm91dGVyJywgJ2Jvb3RzdHJhcCcsICdrYXJtYScsICdndWxwJ10pO1xyXG4gICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNDb250cm9sbGVyLmZlYXR1cmVzWzNdKS50b0JlKCdndWxwJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnVGVzdGluZyBmZWF0dXJlc1NlcnZpY2UnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBmZWF0dXJlc1NlcnZpY2U7IC8vICBzY29wZSwgY3RybCwgaHR0cEJhY2tlbmQsIHRpbWVvdXQsXHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goXHJcbiAgICAgICAgICAgIGluamVjdChmdW5jdGlvbiAoX2ZlYXR1cmVzU2VydmljZV8pIHsgLyokY29udHJvbGxlciwgJHJvb3RTY29wZSwgJGh0dHBCYWNrZW5kLCAkdGltZW91dCApIHsgICovXHJcblxyXG4gICAgICAgICAgICAgICAgZmVhdHVyZXNTZXJ2aWNlID0gX2ZlYXR1cmVzU2VydmljZV87XHJcblxyXG4gICAgICAgICAgICAgICAgLy9zY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xyXG4gICAgICAgICAgICAgICAgLy9jdHJsID0gJGNvbnRyb2xsZXIoJ2ZlYXR1cmUxJywgIHskc2NvcGU6IHNjb3BlfSk7XHJcbiAgICAgICAgICAgICAgICAvL2h0dHBCYWNrZW5kID0gJGh0dHBCYWNrZW5kO1xyXG4gICAgICAgICAgICAgICAgLy90aW1lb3V0ID0gJHRpbWVvdXQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gY2xlYW51cCBjb2RlIGhlcmVcclxuXHJcbiAgICAgICAgICAgIC8vaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKCk7XHJcbiAgICAgICAgICAgIC8vaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBiZSBkZWZpbmVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNTZXJ2aWNlKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ21ldGhvZCAubGlzdCgpJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGJlIGRlZmluZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNTZXJ2aWNlLmxpc3QpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYSBsaXN0IG9mIGhhcmQtY29kZWQgZmVhdHVyZXMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmVhdHVyZXMgPSBbJ3VpLXJvdXRlcicsICdib290c3RyYXAnLCAna2FybWEnXTtcclxuXHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNTZXJ2aWNlLmxpc3QoKSkudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc1NlcnZpY2UubGlzdCgpIGluc3RhbmNlb2YgQXJyYXkpLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNTZXJ2aWNlLmxpc3QoKSkudG9FcXVhbChmZWF0dXJlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ21ldGhvZCAuZ2V0KCknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGl0KCdzaG91bGQgYmUgZGVmaW5lZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc1NlcnZpY2UuZ2V0KS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBsaXN0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzU2VydmljZS5nZXQoMCkpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNTZXJ2aWNlLmdldCgwKSkudG9CZSgndWktcm91dGVyJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gbm90aGluZyBpZiBjYWxsZWQgd2l0aCBhbiBpbnZhbGlkIGluZGV4JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZmVhdHVyZXNTZXJ2aWNlLmxpc3QoKS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzU2VydmljZS5nZXQoaW5kZXgpKS50b0JlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSAtMTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc1NlcnZpY2UuZ2V0KGluZGV4KSkudG9CZShudWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdtZXRob2QgLmFkZCgpJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGJlIGRlZmluZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNTZXJ2aWNlLmFkZCkudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGFkZCBhbiBlbGVtZW50IHRvIHRoZSBlbmQgb2YgdGhlIGxpc3QnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9BZGQgPSAnZmVhdHVyZUFkZGVkJztcclxuICAgICAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc1NlcnZpY2UubGlzdCgpLmxlbmd0aCkudG9CZSgzKTtcclxuICAgICAgICAgICAgICAgIGZlYXR1cmVzU2VydmljZS5hZGQodG9BZGQpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzU2VydmljZS5saXN0KCkubGVuZ3RoKS50b0JlKDQpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzU2VydmljZS5nZXQoMykpLnRvQmUodG9BZGQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICAgICAgIGl0KCdzaG91bGQgYWRkIDIgZGVzdGluYXRpb25zIHRvIHRoZSBkZXN0aW5hdGlvbiBsaXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmRlc3RpbmF0aW9ucykudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb25zLmxlbmd0aCkudG9CZSgwKTtcclxuXHJcbiAgICAgICAgICAgICAgc2NvcGUubmV3RGVzdGluYXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgIGNpdHk6IFwiTG9uZG9uXCIsXHJcbiAgICAgICAgICAgICAgICAgIGNvdW50cnk6IFwiRW5nbGFuZFwiXHJcbiAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgc2NvcGUuYWRkRGVzdGluYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmRlc3RpbmF0aW9ucy5sZW5ndGgpLnRvQmUoMSk7XHJcbiAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmRlc3RpbmF0aW9uc1swXS5jaXR5KS50b0JlKFwiTG9uZG9uXCIpO1xyXG4gICAgICAgICAgICAgIGV4cGVjdChzY29wZS5kZXN0aW5hdGlvbnNbMF0uY291bnRyeSkudG9CZShcIkVuZ2xhbmRcIik7XHJcblxyXG4gICAgICAgICAgICAgIHNjb3BlLm5ld0Rlc3RpbmF0aW9uLmNpdHkgPSAnRnJhbmtmdXJ0JztcclxuICAgICAgICAgICAgICBzY29wZS5uZXdEZXN0aW5hdGlvbi5jb3VudHJ5ID0gJ0dlcm1hbnknO1xyXG5cclxuICAgICAgICAgICAgICBzY29wZS5hZGREZXN0aW5hdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUubmV3RGVzdGluYXRpb24uY2l0eSkudG9CZSh1bmRlZmluZWQpO1xyXG5cclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb25zLmxlbmd0aCkudG9CZSgyKTtcclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb25zWzFdLmNpdHkpLnRvQmUoXCJGcmFua2Z1cnRcIik7XHJcbiAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmRlc3RpbmF0aW9uc1sxXS5jb3VudHJ5KS50b0JlKFwiR2VybWFueVwiKTtcclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb25zWzBdLmNpdHkpLnRvQmUoXCJMb25kb25cIik7XHJcbiAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmRlc3RpbmF0aW9uc1swXS5jb3VudHJ5KS50b0JlKFwiRW5nbGFuZFwiKTtcclxuXHJcblxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgaXQoJ3Nob3VsZCByZW1vdmUgYSBkZXN0aW5hdGlvbiBmcm9tIHRoZSBkZXN0aW5hdGlvbnMgbGlzdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIHNjb3BlLmRlc3RpbmF0aW9ucyA9IFtcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY2l0eTogJ0xvbmRvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiAnRW5nbGFuZCdcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY2l0eTogJ0ZyYW5rZnVydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiAnR2VybWFueSdcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICAgIGV4cGVjdChzY29wZS5kZXN0aW5hdGlvbnMubGVuZ3RoKS50b0JlKDIpO1xyXG5cclxuICAgICAgICAgICAgICBzY29wZS5yZW1vdmVEZXN0aW5hdGlvbiggMCApO1xyXG5cclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb25zLmxlbmd0aCkudG9CZSgxKTtcclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb25zWzBdLmNpdHkpLnRvQmUoXCJGcmFua2Z1cnRcIik7XHJcbiAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmRlc3RpbmF0aW9uc1swXS5jb3VudHJ5KS50b0JlKFwiR2VybWFueVwiKTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgaXQoJ3Nob3VsZCByZW1vdmUgdGhlIGVycm9yIG1lc3NhZ2UgYWZ0ZXIgYSBmaXhlZCBwZXJpb2Qgb2YgdGltZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIHNjb3BlLm1lc3NhZ2UgPSAnRXJyb3InO1xyXG4gICAgICAgICAgICAgIGV4cGVjdChzY29wZS5tZXNzYWdlKS50b0JlKCdFcnJvcicpO1xyXG5cclxuICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICB0aW1lb3V0LmZsdXNoKCk7XHJcblxyXG4gICAgICAgICAgICAgIGV4cGVjdChzY29wZS5tZXNzYWdlKS50b0JlTnVsbCgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZGVzY3JpYmUoJ1Rlc3RpbmcgQW5ndWxhckpTIEZpbHRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gb25seSB3YXJtIGRlc3RpbmF0aW9ucycsIGluamVjdCggZnVuY3Rpb24oJGZpbHRlcikge1xyXG4gICAgICAgICAgICAgIHZhciB3YXJtZXN0ID0gJGZpbHRlcignd2FybWVzdERlc3RpbmF0aW9ucycpO1xyXG5cclxuICAgICAgICAgICAgICB2YXIgZGVzdGluYXRpb25zID0gW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjaXR5OiAnQmVqaW5nJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnk6ICdDaGluYScsXHJcbiAgICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcDogMjFcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY2l0eTogJ1JvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY291bnRyeTogJ0l0YWx5J1xyXG5cclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY2l0eTogJ01pYW1pJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnk6ICdVU0EnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgd2VhdGhlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXA6IDI1XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNpdHk6ICdQYXJpcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiAnRnJhbmNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgIHdlYXRoZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wOiAzXHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgICBleHBlY3QoZGVzdGluYXRpb25zLmxlbmd0aCkudG9CZSg0KTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHdhcm1EZXN0aW5hdGlvbnMgPSB3YXJtZXN0KGRlc3RpbmF0aW9ucywgMTUpO1xyXG5cclxuICAgICAgICAgICAgICBleHBlY3Qod2FybURlc3RpbmF0aW9ucy5sZW5ndGgpLnRvQmUoMik7XHJcbiAgICAgICAgICAgICAgZXhwZWN0KHdhcm1EZXN0aW5hdGlvbnNbMF0uY2l0eSkudG9CZSgnQmVqaW5nJyk7XHJcbiAgICAgICAgICAgICAgZXhwZWN0KHdhcm1EZXN0aW5hdGlvbnNbMV0uY2l0eSkudG9CZSgnTWlhbWknKTtcclxuICAgICAgICAgIH0pKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBkZXNjcmliZSgnVGVzdGluZyBBbmd1bGFySlMgU2VydmljZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBDZWxzaXVzIHRlbXBlcmF0dXJlJywgaW5qZWN0KCBmdW5jdGlvbih0ZW1wU2VydmljZSkge1xyXG4gICAgICAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgIGNpdHk6ICdNb3Njb3cnLFxyXG4gICAgICAgICAgICAgICAgIGNvdW50cnk6ICdSdXNzaWEnLFxyXG4gICAgICAgICAgICAgICAgIHdlYXRoZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgdGVtcDogMjYyIC8vIENlbHNpdXMgPSBLZWx2aW4gLSAyNzNcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgIGV4cGVjdChkZXN0aW5hdGlvbi53ZWF0aGVyLnRlbXApLnRvQmUoMjYyKTtcclxuICAgICAgICAgICAgIHZhciBjZWxzaXVzVGVtcCA9IHRlbXBTZXJ2aWNlLmNvbnZlcnRLZWx2aW5Ub0NlbHNpdXMoIGRlc3RpbmF0aW9uLndlYXRoZXIudGVtcCApO1xyXG4gICAgICAgICAgICAgZXhwZWN0KCBjZWxzaXVzVGVtcCApLnRvQmUoLTExKTtcclxuXHJcbiAgICAgICAgIH0pKTtcclxuICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgZGVzY3JpYmUoJ1Rlc3RpbmcgQW5ndWxhckpTIERpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIHNjb3BlLCB0ZW1wbGF0ZSwgZGlyZWN0aXZlQ29udHJvbGxlciwgaHR0cEJhY2tlbmQsIGlzb2xhdGVTY29wZSwgcm9vdFNjb3BlO1xyXG5cclxuXHJcbiAgICAgICAgIC8vIGJlZm9yZUVhY2goIG1vZHVsZSgndHBsL2Rlc3RpbmF0aW9uRGlyZWN0aXZlLmh0bWwnKSApO1xyXG4gICAgICAgICAgYmVmb3JlRWFjaCggbW9kdWxlKCd0ZXN0LXRlbXBsYXRlcycpICk7XHJcblxyXG5cclxuICAgICAgICAgIC8vIG1vY2sgZGVwZW5kZW5jeSAoYmVmb3JlIGluamVjdClcclxuICAgICAgICAgIGJlZm9yZUVhY2goIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbW9ja2VkQ29udmVyc2lvblNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0S2VsdmluVG9DZWxzaXVzOiBmdW5jdGlvbiggdGVtcCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCggdGVtcCAtIDI3MyApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAkcHJvdmlkZS52YWx1ZSgndGVtcFNlcnZpY2UnLCBtb2NrZWRDb252ZXJzaW9uU2VydmljZSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkY29tcGlsZSwgJHJvb3RTY29wZSwgJGh0dHBCYWNrZW5kLCBfdGVtcFNlcnZpY2VfICkge1xyXG5cclxuICAgICAgICAgICAgICBzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xyXG5cclxuICAgICAgICAgICAgICByb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG5cclxuICAgICAgICAgICAgICBodHRwQmFja2VuZCA9ICRodHRwQmFja2VuZDtcclxuXHJcbiAgICAgICAgICAgICAgY29udmVyc2lvblNlcnZpY2UgPSBfdGVtcFNlcnZpY2VfO1xyXG5cclxuICAgICAgICAgICAgICBzY29wZS5hcGlLZXkgPSBcInh5elwiO1xyXG5cclxuICAgICAgICAgICAgICBzY29wZS5kZXN0aW5hdGlvbnMgPSBbXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNpdHk6ICdUb2t5bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiAnSmFwYW4nXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChcclxuICAgICAgICAgICAgICAgICAgJzxkYXRhLWRlc3RpbmF0aW9uLWRpcmVjdGl2ZSBkZXN0aW5hdGlvbnM9XCJkZXN0aW5hdGlvbnNcIiBhcGkta2V5PVwiYXBpS2V5XCIgb24tcmVtb3ZlPVwicmVtb3ZlRGVzdGluYXRpb25zKGluZGV4KVwiPjwvZGF0YS1kZXN0aW5hdGlvbi1kaXJlY3RpdmU+J1xyXG4gICAgICAgICAgICAgICk7XHJcblxyXG5cclxuICAgICAgICAgICAgICB0ZW1wbGF0ZSA9ICRjb21waWxlKGVsZW1lbnQpKHNjb3BlKTtcclxuICAgICAgICAgICAgICBzY29wZS4kZGlnZXN0KCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIGJlY2F1c2Ugd2UgYXJlIHRlc3RpbmcgZGlyZWN0aXZlJ3MgaXNvbGF0ZWQgc2NvcGVcclxuICAgICAgICAgICAgICBpc29sYXRlU2NvcGUgPSBlbGVtZW50Lmlzb2xhdGVTY29wZSgpO1xyXG5cclxuICAgICAgICAgICAgICAvLyBpZiB3ZSBhcmUgdXNpbmcgZGlyZWN0aXZlIGNvbnRyb2xsZXJzICgnY29udHJvbGxlckFzJykgaW5zdGVhZCBvZiBpc29sYXRlZCBzY29wZSB0aGVuIHdlIGNhbiBnZXQgdGhlIGluc3RhbmNlIGxpa2UgdGhpc1xyXG4gICAgICAgICAgICAgIGRpcmVjdGl2ZUNvbnRyb2xsZXIgPSBlbGVtZW50LmNvbnRyb2xsZXIoJ2Rlc3RpbmF0aW9uRGlyZWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHRoZSB3ZWF0aGVyIGZvciBhIHNwZWNpZmljIGRlc3RpbmF0aW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgc3B5T24oY29udmVyc2lvblNlcnZpY2UsICdjb252ZXJ0S2VsdmluVG9DZWxzaXVzJykuYW5kLmNhbGxUaHJvdWdoKCk7IC8vIC5hbmQucmV0dXJuVmFsdWUoMTYpOyAvLyAuYW5kLmNhbGxGYWtlKCBmdW5jdGlvbih0ZW1wKSB7IHJldHVybiB0ZW1wIC0gMjcyIH0pO1xyXG5cclxuICAgICAgICAgICAgICBzY29wZS5kZXN0aW5hdGlvbiA9IHNjb3BlLmRlc3RpbmF0aW9uc1swXTtcclxuXHJcbiAgICAgICAgICAgICAgaHR0cEJhY2tlbmQuZXhwZWN0R0VUKCdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JyArIHNjb3BlLmRlc3RpbmF0aW9uLmNpdHkgKyAnJmFwcGlkPScgKyBzY29wZS5hcGlLZXkpLnJlc3BvbmQoXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHdlYXRoZXI6IFsgeyBtYWluIDogJ1JhaW4nLCBkZXRhaWwgOiAnTGlnaHQgcmFpbid9IF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICBtYWluOiB7dGVtcDogMjg4fVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmRlc3RpbmF0aW9uLmNpdHkpLnRvQmUoJ1Rva3lvJyk7XHJcblxyXG4gICAgICAgICAgICAgIC8vaXNvbGF0ZVNjb3BlLmdldFdlYXRoZXIoIHNjb3BlLmRlc3RpbmF0aW9uICk7XHJcbiAgICAgICAgICAgICAgZGlyZWN0aXZlQ29udHJvbGxlci5nZXRXZWF0aGVyKCBzY29wZS5kZXN0aW5hdGlvbiApO1xyXG5cclxuICAgICAgICAgICAgICBodHRwQmFja2VuZC5mbHVzaCgpO1xyXG5cclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb24ud2VhdGhlci5tYWluKS50b0JlKCdSYWluJyk7XHJcbiAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmRlc3RpbmF0aW9uLndlYXRoZXIudGVtcCkudG9CZSgxNSk7XHJcbiAgICAgICAgICAgICAgLy8gbW9ja2VkIHNlcnZpY2VcclxuICAgICAgICAgICAgICBleHBlY3QoY29udmVyc2lvblNlcnZpY2UuY29udmVydEtlbHZpblRvQ2Vsc2l1cykudG9IYXZlQmVlbkNhbGxlZFdpdGgoMjg4KTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICBpdCgnc2hvdWxkIGFkZCBhIG1lc3NhZ2UgaWYgbm8gY2l0eSBpcyBmb3VuZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIHNjb3BlLmRlc3RpbmF0aW9uID0gc2NvcGUuZGVzdGluYXRpb25zWzBdO1xyXG5cclxuICAgICAgICAgICAgICBzY29wZS5tZXNzYWdlID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICBodHRwQmFja2VuZC5leHBlY3RHRVQoJ2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0nICsgc2NvcGUuZGVzdGluYXRpb24uY2l0eSArICcmYXBwaWQ9JyArIHNjb3BlLmFwaUtleSkucmVzcG9uZCgge30gKTtcclxuXHJcbiAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmRlc3RpbmF0aW9uLmNpdHkpLnRvQmUoJ1Rva3lvJyk7XHJcblxyXG4gICAgICAgICAgICAgIC8vaXNvbGF0ZVNjb3BlLmdldFdlYXRoZXIoIHNjb3BlLmRlc3RpbmF0aW9uICk7XHJcbiAgICAgICAgICAgICAgZGlyZWN0aXZlQ29udHJvbGxlci5nZXRXZWF0aGVyKCBzY29wZS5kZXN0aW5hdGlvbiApO1xyXG5cclxuICAgICAgICAgICAgICBodHRwQmFja2VuZC5mbHVzaCgpO1xyXG5cclxuICAgICAgICAgICAgICBleHBlY3Qocm9vdFNjb3BlLm1lc3NhZ2UpLnRvQmUoJ0NpdHkgbm90IGZvdW5kJyk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICBpdCgnc2hvdWxkIGFkZCBhIG1lc3NhZ2UgaWYgYW4gSFRUUCBlcnJvciBvY2N1cnMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgc3B5T24ocm9vdFNjb3BlLCAnJGJyb2FkY2FzdCcpO1xyXG5cclxuICAgICAgICAgICAgICBzY29wZS5kZXN0aW5hdGlvbiA9IHNjb3BlLmRlc3RpbmF0aW9uc1swXTtcclxuXHJcbiAgICAgICAgICAgICAgcm9vdFNjb3BlLm1lc3NhZ2UgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgIGh0dHBCYWNrZW5kLmV4cGVjdEdFVCgnaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPScgKyBzY29wZS5kZXN0aW5hdGlvbi5jaXR5ICsgJyZhcHBpZD0nICsgc2NvcGUuYXBpS2V5KS5yZXNwb25kKCA1MDAgKTtcclxuXHJcbiAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmRlc3RpbmF0aW9uLmNpdHkpLnRvQmUoJ1Rva3lvJyk7XHJcblxyXG4gICAgICAgICAgICAgIC8vaXNvbGF0ZVNjb3BlLmdldFdlYXRoZXIoIHNjb3BlLmRlc3RpbmF0aW9uICk7XHJcbiAgICAgICAgICAgICAgZGlyZWN0aXZlQ29udHJvbGxlci5nZXRXZWF0aGVyKCBzY29wZS5kZXN0aW5hdGlvbiApO1xyXG5cclxuICAgICAgICAgICAgICBodHRwQmFja2VuZC5mbHVzaCgpO1xyXG5cclxuICAgICAgICAgICAgICBleHBlY3Qocm9vdFNjb3BlLm1lc3NhZ2UpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgICAgZXhwZWN0KHJvb3RTY29wZS4kYnJvYWRjYXN0KS50b0hhdmVCZWVuQ2FsbGVkKCk7IC8vIGNoZWNrIHRoYXQgdGhlIHNweSB3YXMgY2FsbGVkIGF0IGxlYXN0IG9uY2VcclxuICAgICAgICAgICAgICBleHBlY3Qocm9vdFNjb3BlLiRicm9hZGNhc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCAnbWVzc2FnZVVwZGF0ZWQnLCB7IHR5cGU6ICdlcnJvcicsIG1lc3NhZ2U6ICdTZXJ2ZXIgZXJyb3InfSApO1xyXG4gICAgICAgICAgICAgIGV4cGVjdChyb290U2NvcGUuJGJyb2FkY2FzdC5jYWxscy5jb3VudCgpKS50b0JlKDEpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRoZSBwYXJlbnQgY29udHJvbGxlciByZW1vdmVEZXN0aW5hdGlvbigpIGZ1bmN0aW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgc2NvcGUucmVtb3ZlVGVzdCA9IDE7XHJcblxyXG4gICAgICAgICAgICAgIHNjb3BlLnJlbW92ZURlc3RpbmF0aW9ucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICBzY29wZS5yZW1vdmVUZXN0Kys7XHJcbiAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgaXNvbGF0ZVNjb3BlLm9uUmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgIGV4cGVjdChzY29wZS5yZW1vdmVUZXN0KS50b0JlKDIpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgIGl0KCdzaG91bGQgZ2VuZXJhdGUgdGhlIGNvcnJlY3QgSFRNTCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZUFzSHRtbCA9IHRlbXBsYXRlLmh0bWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgZXhwZWN0KHRlbXBsYXRlQXNIdG1sKS50b0NvbnRhaW4oJ1Rva3lvIC0gSmFwYW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgc2NvcGUuZGVzdGluYXRpb25zID0gW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjaXR5OiAnTG9uZG9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnk6ICdFbmdsYW5kJ1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgICAgc2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlQXNIdG1sID0gdGVtcGxhdGUuaHRtbCgpO1xyXG5cclxuICAgICAgICAgICAgICBleHBlY3QodGVtcGxhdGVBc0h0bWwpLnRvQ29udGFpbignTG9uZG9uIC0gRW5nbGFuZCcpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KTtcclxuICAgICAgKi9cclxufSk7XHJcbiJdfQ==
