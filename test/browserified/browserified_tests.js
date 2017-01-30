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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwL2NvbXBvbmVudHMvZmVhdHVyZTEvZmVhdHVyZTEuc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImRlc2NyaWJlKCdBbmd1bGFyIFdoaXRlIFBhcGVyIFRlc3QgU3VpdGUnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgYmVmb3JlRWFjaChhbmd1bGFyLm1vY2subW9kdWxlKCdmZWF0dXJlMScpKTsgLy8gaW5jbHVkZSBhcHAgbW9kdWxlIGluIG91ciB0ZXN0c1xyXG5cclxuICAgIGRlc2NyaWJlKCdUZXN0aW5nIGZlYXR1cmUxIGNvbnRyb2xsZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGZlYXR1cmVzQ29udHJvbGxlciwgZmVhdHVyZXNTZXJ2aWNlLCBzY29wZSwgJGNvbnRyb2xsZXIsIGZlYXR1cmVzTGlzdDtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChhbmd1bGFyLm1vY2subW9kdWxlKCd1aS5yb3V0ZXInKSk7XHJcbiAgICAgXHJcbiAgICAgICAgYmVmb3JlRWFjaChhbmd1bGFyLm1vY2subW9kdWxlKCdmZWF0dXJlMScpKTtcclxuIFxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvLyBtb2NrIGRlcGVuZGVuY3kgKGJlZm9yZSBpbmplY3QpXHJcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBmZWF0dXJlc0xpc3QgPSBbJ3VpLXJvdXRlcicsICdib290c3RyYXAnLCAna2FybWEnXTtcclxuXHJcbiAgICAgICAgICAgIGFuZ3VsYXIubW9jay5tb2R1bGUoZnVuY3Rpb24gKCRwcm92aWRlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9ja2VkRmVhdHVyZVNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmVhdHVyZXNMaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmVzTGlzdC5wdXNoKCdndWxwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRwcm92aWRlLnZhbHVlKCdmZWF0dXJlc1NlcnZpY2UnLCBtb2NrZWRGZWF0dXJlU2VydmljZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24gKF8kY29udHJvbGxlcl8sIF8kcm9vdFNjb3BlXywgX2ZlYXR1cmVzU2VydmljZV8pIHtcclxuICAgICAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xyXG4gICAgICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xyXG4gICAgICAgICAgICBmZWF0dXJlc1NlcnZpY2UgPSBfZmVhdHVyZXNTZXJ2aWNlXztcclxuICAgICAgICAgICAgZmVhdHVyZXNDb250cm9sbGVyID0gJGNvbnRyb2xsZXIoJ2ZlYXR1cmUxJywge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgIGZlYXR1cmVzU2VydmljZTogZmVhdHVyZXNTZXJ2aWNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBzcHlPbihmZWF0dXJlc1NlcnZpY2UsICdsaXN0JykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkgeyByZXR1cm4gZmVhdHVyZXNMaXN0IH0pOyAvL2NhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGV4aXN0cycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzQ29udHJvbGxlcikudG9CZURlZmluZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgdGl0bGUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc0NvbnRyb2xsZXIudGl0bGUpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc0NvbnRyb2xsZXIudGl0bGUpLnRvQmUoJ2ZlYXR1cmUxJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB0aGUgZmVhdHVyZXMgbGlzdCB3aXRoIGEgY2FsbCB0byBmZWF0dXJlc1NlcnZpY2UubGlzdCgpJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgc3B5T24oZmVhdHVyZXNTZXJ2aWNlLCAnbGlzdCcpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG4gICAgLy8gICAgICAgIGV4cGVjdChmZWF0dXJlc1NlcnZpY2UubGlzdCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNDb250cm9sbGVyLmZlYXR1cmVzKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNDb250cm9sbGVyLmZlYXR1cmVzLmxlbmd0aCkudG9CZSgzKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzQ29udHJvbGxlci5mZWF0dXJlcykudG9FcXVhbChmZWF0dXJlc0xpc3QpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGFkZCBhIGZlYXR1cmUgdG8gdGhlIGxpc3Qgd2l0aCBhIGNhbGwgdG8gZmVhdHVyZXNTZXJ2aWNlLmFkZCgpJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyAgICAgIGV4cGVjdChmZWF0dXJlc1NlcnZpY2UubGlzdCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNDb250cm9sbGVyLmZlYXR1cmVzKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNDb250cm9sbGVyLmZlYXR1cmVzLmxlbmd0aCkudG9CZSgzKTtcclxuICAgICAgICAgICAgc3B5T24oZmVhdHVyZXNTZXJ2aWNlLCAnYWRkJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgIGZlYXR1cmVzU2VydmljZS5hZGQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzU2VydmljZS5hZGQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzQ29udHJvbGxlci5mZWF0dXJlcy5sZW5ndGgpLnRvQmUoNCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc0NvbnRyb2xsZXIuZmVhdHVyZXMpLnRvRXF1YWwoWyd1aS1yb3V0ZXInLCAnYm9vdHN0cmFwJywgJ2thcm1hJywgJ2d1bHAnXSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc0NvbnRyb2xsZXIuZmVhdHVyZXNbM10pLnRvQmUoJ2d1bHAnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdUZXN0aW5nIGZlYXR1cmVzU2VydmljZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIGZlYXR1cmVzU2VydmljZTsgLy8gIHNjb3BlLCBjdHJsLCBodHRwQmFja2VuZCwgdGltZW91dCxcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChcclxuICAgICAgICAgICAgaW5qZWN0KGZ1bmN0aW9uIChfZmVhdHVyZXNTZXJ2aWNlXykgeyAvKiRjb250cm9sbGVyLCAkcm9vdFNjb3BlLCAkaHR0cEJhY2tlbmQsICR0aW1lb3V0ICkgeyAgKi9cclxuXHJcbiAgICAgICAgICAgICAgICBmZWF0dXJlc1NlcnZpY2UgPSBfZmVhdHVyZXNTZXJ2aWNlXztcclxuXHJcbiAgICAgICAgICAgICAgICAvL3Njb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcbiAgICAgICAgICAgICAgICAvL2N0cmwgPSAkY29udHJvbGxlcignZmVhdHVyZTEnLCAgeyRzY29wZTogc2NvcGV9KTtcclxuICAgICAgICAgICAgICAgIC8vaHR0cEJhY2tlbmQgPSAkaHR0cEJhY2tlbmQ7XHJcbiAgICAgICAgICAgICAgICAvL3RpbWVvdXQgPSAkdGltZW91dDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBhZnRlckVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBjbGVhbnVwIGNvZGUgaGVyZVxyXG5cclxuICAgICAgICAgICAgLy9odHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcclxuICAgICAgICAgICAgLy9odHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGJlIGRlZmluZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc1NlcnZpY2UpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBkZXNjcmliZSgnbWV0aG9kIC5saXN0KCknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGl0KCdzaG91bGQgYmUgZGVmaW5lZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc1NlcnZpY2UubGlzdCkudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhIGxpc3Qgb2YgaGFyZC1jb2RlZCBmZWF0dXJlcycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmZWF0dXJlcyA9IFsndWktcm91dGVyJywgJ2Jvb3RzdHJhcCcsICdrYXJtYSddO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc1NlcnZpY2UubGlzdCgpKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzU2VydmljZS5saXN0KCkgaW5zdGFuY2VvZiBBcnJheSkudG9CZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc1NlcnZpY2UubGlzdCgpKS50b0VxdWFsKGZlYXR1cmVzKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnbWV0aG9kIC5nZXQoKScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBiZSBkZWZpbmVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzU2VydmljZS5nZXQpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGxpc3QnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNTZXJ2aWNlLmdldCgwKSkudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc1NlcnZpY2UuZ2V0KDApKS50b0JlKCd1aS1yb3V0ZXInKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBub3RoaW5nIGlmIGNhbGxlZCB3aXRoIGFuIGludmFsaWQgaW5kZXgnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBmZWF0dXJlc1NlcnZpY2UubGlzdCgpLmxlbmd0aCArIDE7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNTZXJ2aWNlLmdldChpbmRleCkpLnRvQmUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzU2VydmljZS5nZXQoaW5kZXgpKS50b0JlKG51bGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ21ldGhvZCAuYWRkKCknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGl0KCdzaG91bGQgYmUgZGVmaW5lZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChmZWF0dXJlc1NlcnZpY2UuYWRkKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzaG91bGQgYWRkIGFuIGVsZW1lbnQgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0b0FkZCA9ICdmZWF0dXJlQWRkZWQnO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGZlYXR1cmVzU2VydmljZS5saXN0KCkubGVuZ3RoKS50b0JlKDMpO1xyXG4gICAgICAgICAgICAgICAgZmVhdHVyZXNTZXJ2aWNlLmFkZCh0b0FkZCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNTZXJ2aWNlLmxpc3QoKS5sZW5ndGgpLnRvQmUoNCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZmVhdHVyZXNTZXJ2aWNlLmdldCgzKSkudG9CZSh0b0FkZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgICAgICAgaXQoJ3Nob3VsZCBhZGQgMiBkZXN0aW5hdGlvbnMgdG8gdGhlIGRlc3RpbmF0aW9uIGxpc3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb25zKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICAgIGV4cGVjdChzY29wZS5kZXN0aW5hdGlvbnMubGVuZ3RoKS50b0JlKDApO1xyXG5cclxuICAgICAgICAgICAgICBzY29wZS5uZXdEZXN0aW5hdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgY2l0eTogXCJMb25kb25cIixcclxuICAgICAgICAgICAgICAgICAgY291bnRyeTogXCJFbmdsYW5kXCJcclxuICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICBzY29wZS5hZGREZXN0aW5hdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb25zLmxlbmd0aCkudG9CZSgxKTtcclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb25zWzBdLmNpdHkpLnRvQmUoXCJMb25kb25cIik7XHJcbiAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmRlc3RpbmF0aW9uc1swXS5jb3VudHJ5KS50b0JlKFwiRW5nbGFuZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgc2NvcGUubmV3RGVzdGluYXRpb24uY2l0eSA9ICdGcmFua2Z1cnQnO1xyXG4gICAgICAgICAgICAgIHNjb3BlLm5ld0Rlc3RpbmF0aW9uLmNvdW50cnkgPSAnR2VybWFueSc7XHJcblxyXG4gICAgICAgICAgICAgIHNjb3BlLmFkZERlc3RpbmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgIGV4cGVjdChzY29wZS5uZXdEZXN0aW5hdGlvbi5jaXR5KS50b0JlKHVuZGVmaW5lZCk7XHJcblxyXG4gICAgICAgICAgICAgIGV4cGVjdChzY29wZS5kZXN0aW5hdGlvbnMubGVuZ3RoKS50b0JlKDIpO1xyXG4gICAgICAgICAgICAgIGV4cGVjdChzY29wZS5kZXN0aW5hdGlvbnNbMV0uY2l0eSkudG9CZShcIkZyYW5rZnVydFwiKTtcclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb25zWzFdLmNvdW50cnkpLnRvQmUoXCJHZXJtYW55XCIpO1xyXG4gICAgICAgICAgICAgIGV4cGVjdChzY29wZS5kZXN0aW5hdGlvbnNbMF0uY2l0eSkudG9CZShcIkxvbmRvblwiKTtcclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb25zWzBdLmNvdW50cnkpLnRvQmUoXCJFbmdsYW5kXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpdCgnc2hvdWxkIHJlbW92ZSBhIGRlc3RpbmF0aW9uIGZyb20gdGhlIGRlc3RpbmF0aW9ucyBsaXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgc2NvcGUuZGVzdGluYXRpb25zID0gW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjaXR5OiAnTG9uZG9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnk6ICdFbmdsYW5kJ1xyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjaXR5OiAnRnJhbmtmdXJ0JyxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnk6ICdHZXJtYW55J1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmRlc3RpbmF0aW9ucy5sZW5ndGgpLnRvQmUoMik7XHJcblxyXG4gICAgICAgICAgICAgIHNjb3BlLnJlbW92ZURlc3RpbmF0aW9uKCAwICk7XHJcblxyXG4gICAgICAgICAgICAgIGV4cGVjdChzY29wZS5kZXN0aW5hdGlvbnMubGVuZ3RoKS50b0JlKDEpO1xyXG4gICAgICAgICAgICAgIGV4cGVjdChzY29wZS5kZXN0aW5hdGlvbnNbMF0uY2l0eSkudG9CZShcIkZyYW5rZnVydFwiKTtcclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb25zWzBdLmNvdW50cnkpLnRvQmUoXCJHZXJtYW55XCIpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICBpdCgnc2hvdWxkIHJlbW92ZSB0aGUgZXJyb3IgbWVzc2FnZSBhZnRlciBhIGZpeGVkIHBlcmlvZCBvZiB0aW1lJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgc2NvcGUubWVzc2FnZSA9ICdFcnJvcic7XHJcbiAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLm1lc3NhZ2UpLnRvQmUoJ0Vycm9yJyk7XHJcblxyXG4gICAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgIHRpbWVvdXQuZmx1c2goKTtcclxuXHJcbiAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLm1lc3NhZ2UpLnRvQmVOdWxsKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBkZXNjcmliZSgnVGVzdGluZyBBbmd1bGFySlMgRmlsdGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBvbmx5IHdhcm0gZGVzdGluYXRpb25zJywgaW5qZWN0KCBmdW5jdGlvbigkZmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHdhcm1lc3QgPSAkZmlsdGVyKCd3YXJtZXN0RGVzdGluYXRpb25zJyk7XHJcblxyXG4gICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbnMgPSBbXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNpdHk6ICdCZWppbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY291bnRyeTogJ0NoaW5hJyxcclxuICAgICAgICAgICAgICAgICAgICAgIHdlYXRoZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wOiAyMVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjaXR5OiAnUm9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiAnSXRhbHknXHJcblxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjaXR5OiAnTWlhbWknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY291bnRyeTogJ1VTQScsXHJcbiAgICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcDogMjVcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY2l0eTogJ1BhcmlzJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnk6ICdGcmFuY2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgd2VhdGhlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXA6IDNcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICAgIGV4cGVjdChkZXN0aW5hdGlvbnMubGVuZ3RoKS50b0JlKDQpO1xyXG5cclxuICAgICAgICAgICAgICB2YXIgd2FybURlc3RpbmF0aW9ucyA9IHdhcm1lc3QoZGVzdGluYXRpb25zLCAxNSk7XHJcblxyXG4gICAgICAgICAgICAgIGV4cGVjdCh3YXJtRGVzdGluYXRpb25zLmxlbmd0aCkudG9CZSgyKTtcclxuICAgICAgICAgICAgICBleHBlY3Qod2FybURlc3RpbmF0aW9uc1swXS5jaXR5KS50b0JlKCdCZWppbmcnKTtcclxuICAgICAgICAgICAgICBleHBlY3Qod2FybURlc3RpbmF0aW9uc1sxXS5jaXR5KS50b0JlKCdNaWFtaScpO1xyXG4gICAgICAgICAgfSkpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGRlc2NyaWJlKCdUZXN0aW5nIEFuZ3VsYXJKUyBTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIENlbHNpdXMgdGVtcGVyYXR1cmUnLCBpbmplY3QoIGZ1bmN0aW9uKHRlbXBTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICB2YXIgZGVzdGluYXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgY2l0eTogJ01vc2NvdycsXHJcbiAgICAgICAgICAgICAgICAgY291bnRyeTogJ1J1c3NpYScsXHJcbiAgICAgICAgICAgICAgICAgd2VhdGhlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICB0ZW1wOiAyNjIgLy8gQ2Vsc2l1cyA9IEtlbHZpbiAtIDI3M1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgZXhwZWN0KGRlc3RpbmF0aW9uLndlYXRoZXIudGVtcCkudG9CZSgyNjIpO1xyXG4gICAgICAgICAgICAgdmFyIGNlbHNpdXNUZW1wID0gdGVtcFNlcnZpY2UuY29udmVydEtlbHZpblRvQ2Vsc2l1cyggZGVzdGluYXRpb24ud2VhdGhlci50ZW1wICk7XHJcbiAgICAgICAgICAgICBleHBlY3QoIGNlbHNpdXNUZW1wICkudG9CZSgtMTEpO1xyXG5cclxuICAgICAgICAgfSkpO1xyXG4gICAgICB9KTtcclxuXHJcblxyXG4gICAgICBkZXNjcmliZSgnVGVzdGluZyBBbmd1bGFySlMgRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgc2NvcGUsIHRlbXBsYXRlLCBkaXJlY3RpdmVDb250cm9sbGVyLCBodHRwQmFja2VuZCwgaXNvbGF0ZVNjb3BlLCByb290U2NvcGU7XHJcblxyXG5cclxuICAgICAgICAgLy8gYmVmb3JlRWFjaCggbW9kdWxlKCd0cGwvZGVzdGluYXRpb25EaXJlY3RpdmUuaHRtbCcpICk7XHJcbiAgICAgICAgICBiZWZvcmVFYWNoKCBtb2R1bGUoJ3Rlc3QtdGVtcGxhdGVzJykgKTtcclxuXHJcblxyXG4gICAgICAgICAgLy8gbW9jayBkZXBlbmRlbmN5IChiZWZvcmUgaW5qZWN0KVxyXG4gICAgICAgICAgYmVmb3JlRWFjaCggZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgbW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBtb2NrZWRDb252ZXJzaW9uU2VydmljZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRLZWx2aW5Ub0NlbHNpdXM6IGZ1bmN0aW9uKCB0ZW1wICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKCB0ZW1wIC0gMjczICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICRwcm92aWRlLnZhbHVlKCd0ZW1wU2VydmljZScsIG1vY2tlZENvbnZlcnNpb25TZXJ2aWNlKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKCRjb21waWxlLCAkcm9vdFNjb3BlLCAkaHR0cEJhY2tlbmQsIF90ZW1wU2VydmljZV8gKSB7XHJcblxyXG4gICAgICAgICAgICAgIHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcblxyXG4gICAgICAgICAgICAgIHJvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcblxyXG4gICAgICAgICAgICAgIGh0dHBCYWNrZW5kID0gJGh0dHBCYWNrZW5kO1xyXG5cclxuICAgICAgICAgICAgICBjb252ZXJzaW9uU2VydmljZSA9IF90ZW1wU2VydmljZV87XHJcblxyXG4gICAgICAgICAgICAgIHNjb3BlLmFwaUtleSA9IFwieHl6XCI7XHJcblxyXG4gICAgICAgICAgICAgIHNjb3BlLmRlc3RpbmF0aW9ucyA9IFtcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY2l0eTogJ1Rva3lvJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnk6ICdKYXBhbidcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KFxyXG4gICAgICAgICAgICAgICAgICAnPGRhdGEtZGVzdGluYXRpb24tZGlyZWN0aXZlIGRlc3RpbmF0aW9ucz1cImRlc3RpbmF0aW9uc1wiIGFwaS1rZXk9XCJhcGlLZXlcIiBvbi1yZW1vdmU9XCJyZW1vdmVEZXN0aW5hdGlvbnMoaW5kZXgpXCI+PC9kYXRhLWRlc3RpbmF0aW9uLWRpcmVjdGl2ZT4nXHJcbiAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgIHRlbXBsYXRlID0gJGNvbXBpbGUoZWxlbWVudCkoc2NvcGUpO1xyXG4gICAgICAgICAgICAgIHNjb3BlLiRkaWdlc3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gYmVjYXVzZSB3ZSBhcmUgdGVzdGluZyBkaXJlY3RpdmUncyBpc29sYXRlZCBzY29wZVxyXG4gICAgICAgICAgICAgIGlzb2xhdGVTY29wZSA9IGVsZW1lbnQuaXNvbGF0ZVNjb3BlKCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIGlmIHdlIGFyZSB1c2luZyBkaXJlY3RpdmUgY29udHJvbGxlcnMgKCdjb250cm9sbGVyQXMnKSBpbnN0ZWFkIG9mIGlzb2xhdGVkIHNjb3BlIHRoZW4gd2UgY2FuIGdldCB0aGUgaW5zdGFuY2UgbGlrZSB0aGlzXHJcbiAgICAgICAgICAgICAgZGlyZWN0aXZlQ29udHJvbGxlciA9IGVsZW1lbnQuY29udHJvbGxlcignZGVzdGluYXRpb25EaXJlY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdGhlIHdlYXRoZXIgZm9yIGEgc3BlY2lmaWMgZGVzdGluYXRpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBzcHlPbihjb252ZXJzaW9uU2VydmljZSwgJ2NvbnZlcnRLZWx2aW5Ub0NlbHNpdXMnKS5hbmQuY2FsbFRocm91Z2goKTsgLy8gLmFuZC5yZXR1cm5WYWx1ZSgxNik7IC8vIC5hbmQuY2FsbEZha2UoIGZ1bmN0aW9uKHRlbXApIHsgcmV0dXJuIHRlbXAgLSAyNzIgfSk7XHJcblxyXG4gICAgICAgICAgICAgIHNjb3BlLmRlc3RpbmF0aW9uID0gc2NvcGUuZGVzdGluYXRpb25zWzBdO1xyXG5cclxuICAgICAgICAgICAgICBodHRwQmFja2VuZC5leHBlY3RHRVQoJ2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0nICsgc2NvcGUuZGVzdGluYXRpb24uY2l0eSArICcmYXBwaWQ9JyArIHNjb3BlLmFwaUtleSkucmVzcG9uZChcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgd2VhdGhlcjogWyB7IG1haW4gOiAnUmFpbicsIGRldGFpbCA6ICdMaWdodCByYWluJ30gXSxcclxuICAgICAgICAgICAgICAgICAgICAgIG1haW46IHt0ZW1wOiAyODh9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb24uY2l0eSkudG9CZSgnVG9reW8nKTtcclxuXHJcbiAgICAgICAgICAgICAgLy9pc29sYXRlU2NvcGUuZ2V0V2VhdGhlciggc2NvcGUuZGVzdGluYXRpb24gKTtcclxuICAgICAgICAgICAgICBkaXJlY3RpdmVDb250cm9sbGVyLmdldFdlYXRoZXIoIHNjb3BlLmRlc3RpbmF0aW9uICk7XHJcblxyXG4gICAgICAgICAgICAgIGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcblxyXG4gICAgICAgICAgICAgIGV4cGVjdChzY29wZS5kZXN0aW5hdGlvbi53ZWF0aGVyLm1haW4pLnRvQmUoJ1JhaW4nKTtcclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb24ud2VhdGhlci50ZW1wKS50b0JlKDE1KTtcclxuICAgICAgICAgICAgICAvLyBtb2NrZWQgc2VydmljZVxyXG4gICAgICAgICAgICAgIGV4cGVjdChjb252ZXJzaW9uU2VydmljZS5jb252ZXJ0S2VsdmluVG9DZWxzaXVzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgyODgpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgIGl0KCdzaG91bGQgYWRkIGEgbWVzc2FnZSBpZiBubyBjaXR5IGlzIGZvdW5kJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgc2NvcGUuZGVzdGluYXRpb24gPSBzY29wZS5kZXN0aW5hdGlvbnNbMF07XHJcblxyXG4gICAgICAgICAgICAgIHNjb3BlLm1lc3NhZ2UgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgIGh0dHBCYWNrZW5kLmV4cGVjdEdFVCgnaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPScgKyBzY29wZS5kZXN0aW5hdGlvbi5jaXR5ICsgJyZhcHBpZD0nICsgc2NvcGUuYXBpS2V5KS5yZXNwb25kKCB7fSApO1xyXG5cclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb24uY2l0eSkudG9CZSgnVG9reW8nKTtcclxuXHJcbiAgICAgICAgICAgICAgLy9pc29sYXRlU2NvcGUuZ2V0V2VhdGhlciggc2NvcGUuZGVzdGluYXRpb24gKTtcclxuICAgICAgICAgICAgICBkaXJlY3RpdmVDb250cm9sbGVyLmdldFdlYXRoZXIoIHNjb3BlLmRlc3RpbmF0aW9uICk7XHJcblxyXG4gICAgICAgICAgICAgIGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcblxyXG4gICAgICAgICAgICAgIGV4cGVjdChyb290U2NvcGUubWVzc2FnZSkudG9CZSgnQ2l0eSBub3QgZm91bmQnKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgIGl0KCdzaG91bGQgYWRkIGEgbWVzc2FnZSBpZiBhbiBIVFRQIGVycm9yIG9jY3VycycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICBzcHlPbihyb290U2NvcGUsICckYnJvYWRjYXN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgIHNjb3BlLmRlc3RpbmF0aW9uID0gc2NvcGUuZGVzdGluYXRpb25zWzBdO1xyXG5cclxuICAgICAgICAgICAgICByb290U2NvcGUubWVzc2FnZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgaHR0cEJhY2tlbmQuZXhwZWN0R0VUKCdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JyArIHNjb3BlLmRlc3RpbmF0aW9uLmNpdHkgKyAnJmFwcGlkPScgKyBzY29wZS5hcGlLZXkpLnJlc3BvbmQoIDUwMCApO1xyXG5cclxuICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGVzdGluYXRpb24uY2l0eSkudG9CZSgnVG9reW8nKTtcclxuXHJcbiAgICAgICAgICAgICAgLy9pc29sYXRlU2NvcGUuZ2V0V2VhdGhlciggc2NvcGUuZGVzdGluYXRpb24gKTtcclxuICAgICAgICAgICAgICBkaXJlY3RpdmVDb250cm9sbGVyLmdldFdlYXRoZXIoIHNjb3BlLmRlc3RpbmF0aW9uICk7XHJcblxyXG4gICAgICAgICAgICAgIGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcblxyXG4gICAgICAgICAgICAgIGV4cGVjdChyb290U2NvcGUubWVzc2FnZSkudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgICBleHBlY3Qocm9vdFNjb3BlLiRicm9hZGNhc3QpLnRvSGF2ZUJlZW5DYWxsZWQoKTsgLy8gY2hlY2sgdGhhdCB0aGUgc3B5IHdhcyBjYWxsZWQgYXQgbGVhc3Qgb25jZVxyXG4gICAgICAgICAgICAgIGV4cGVjdChyb290U2NvcGUuJGJyb2FkY2FzdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoICdtZXNzYWdlVXBkYXRlZCcsIHsgdHlwZTogJ2Vycm9yJywgbWVzc2FnZTogJ1NlcnZlciBlcnJvcid9ICk7XHJcbiAgICAgICAgICAgICAgZXhwZWN0KHJvb3RTY29wZS4kYnJvYWRjYXN0LmNhbGxzLmNvdW50KCkpLnRvQmUoMSk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIHBhcmVudCBjb250cm9sbGVyIHJlbW92ZURlc3RpbmF0aW9uKCkgZnVuY3Rpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBzY29wZS5yZW1vdmVUZXN0ID0gMTtcclxuXHJcbiAgICAgICAgICAgICAgc2NvcGUucmVtb3ZlRGVzdGluYXRpb25zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIHNjb3BlLnJlbW92ZVRlc3QrKztcclxuICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICBpc29sYXRlU2NvcGUub25SZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLnJlbW92ZVRlc3QpLnRvQmUoMik7XHJcbiAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgaXQoJ3Nob3VsZCBnZW5lcmF0ZSB0aGUgY29ycmVjdCBIVE1MJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlQXNIdG1sID0gdGVtcGxhdGUuaHRtbCgpO1xyXG5cclxuICAgICAgICAgICAgICBleHBlY3QodGVtcGxhdGVBc0h0bWwpLnRvQ29udGFpbignVG9reW8gLSBKYXBhbicpO1xyXG5cclxuICAgICAgICAgICAgICBzY29wZS5kZXN0aW5hdGlvbnMgPSBbXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNpdHk6ICdMb25kb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY291bnRyeTogJ0VuZ2xhbmQnXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgICBzY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVBc0h0bWwgPSB0ZW1wbGF0ZS5odG1sKCk7XHJcblxyXG4gICAgICAgICAgICAgIGV4cGVjdCh0ZW1wbGF0ZUFzSHRtbCkudG9Db250YWluKCdMb25kb24gLSBFbmdsYW5kJyk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pO1xyXG4gICAgICAqL1xyXG59KTtcclxuIl19
