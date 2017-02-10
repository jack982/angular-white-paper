describe('Angular White Paper Test Suite', function () {

    beforeEach(angular.mock.module('app.showcase')); // include app module in our tests

    describe('Testing showcase controller', function () {
        var featuresController, featuresService, scope, $controller, featuresList;

        beforeEach(angular.mock.module('ui.router'));

        beforeEach(angular.mock.module('app.showcase'));


        // mock dependency (before inject)
        beforeEach(function () {

            featuresList =  [
              {
                name: 'Bootstrap',
                version: '1.0',
                url:  'http://placehold.it/150x150'
              },
              {
                name: 'Browserify',
                version: '1.0',
                url: 'http://placehold.it/150x150'
              },
              {
                name: 'Browser-Sync',
                version: '1.0',
                url:  'http://placehold.it/150x150'
              },
              {
                name: 'FontAwesome',
                version: '1.0',
                url:  'http://placehold.it/150x150'
              },
              {
                name: 'Gulp',
                version: '1.0',
                url:  'http://placehold.it/150x150'
              },
              {
                name: 'Karma',
                version: '1.0',
                url: 'http://placehold.it/150x150'
              },
              {
                name: 'Jasmine',
                version: '1.0',
                url:  'http://placehold.it/150x150'
              },
              {
                name: 'PhantomJS',
                version: '1.0',
                url:  'http://placehold.it/150x150'
              }
            ];

            angular.mock.module(function ($provide) {
                var mockedFeatureService = {
                    list: function () {
                        return featuresList;
                    },
                    add: function () {
                        featuresList.push( { name: 'feature added', version: null, url: null} );
                    }
                };

                $provide.value('featuresService', mockedFeatureService);
            });
        });


        beforeEach(inject(function (_$controller_, _$rootScope_, _featuresService_) {
            $controller = _$controller_;
            $scope = _$rootScope_.$new();
            featuresService = _featuresService_;
            featuresController = $controller('showcase', {
                $scope: scope,
                featuresService: featuresService
            });

            spyOn(featuresService, 'list').and.callFake(function() { return featuresList; }); //callThrough();
        }));

        it('should exists', function () {
            expect(featuresController).toBeDefined();
        });

        it('should set title', function () {
            expect(featuresController.title).toBeDefined();
            expect(featuresController.title).toBe('showcase');
        });

        it('should initialize the features list with a call to featuresService.list()', function () {
        //         spyOn(featuresService, 'list').and.callThrough();
    //        expect(featuresService.list).toHaveBeenCalled();
            expect(featuresController.features).toBeDefined();
            expect(featuresController.features.length).toBe(8);
            expect(featuresController.features).toEqual(featuresList);
        });

        it('should add a feature to the list with a call to featuresService.add()', function () {
      //      expect(featuresService.list).toHaveBeenCalled();
            expect(featuresController.features).toBeDefined();
            expect(featuresController.features.length).toBe(8);
            spyOn(featuresService, 'add').and.callThrough();
            featuresService.add();
            expect(featuresService.add).toHaveBeenCalled();
            expect(featuresController.features.length).toBe(9);
            expect(featuresController.features).toEqual( featuresList );
            expect(featuresController.features[8].name).toBe('feature added');
        });
    });

    describe('Testing featuresService', function () {

        var featuresService; //  scope, ctrl, httpBackend, timeout,
        var featuresList;

        beforeEach(function() {

            featuresList = [
              {
                name: 'Bootstrap',
                version: '1.0',
                url:  'http://placehold.it/150x150'
              },
              {
                name: 'Browserify',
                version: '1.0',
                url: 'http://placehold.it/150x150'
              },
              {
                name: 'Browser-Sync',
                version: '1.0',
                url:  'http://placehold.it/150x150'
              },
              {
                name: 'FontAwesome',
                version: '1.0',
                url:  'http://placehold.it/150x150'
              },
              {
                name: 'Gulp',
                version: '1.0',
                url:  'http://placehold.it/150x150'
              },
              {
                name: 'Karma',
                version: '1.0',
                url: 'http://placehold.it/150x150'
              },
              {
                name: 'Jasmine',
                version: '1.0',
                url:  'http://placehold.it/150x150'
              },
              {
                name: 'PhantomJS',
                version: '1.0',
                url:  'http://placehold.it/150x150'
              }
            ];
        });


        beforeEach(

            inject(function (_featuresService_) { /*$controller, $rootScope, $httpBackend, $timeout ) {  */

                featuresService = _featuresService_;

                //scope = $rootScope.$new();
                //ctrl = $controller('showcase',  {$scope: scope});
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

                expect(featuresService.list()).toBeDefined();
                expect(featuresService.list() instanceof Array).toBe(true);
                expect(featuresService.list()).toEqual( featuresList );
            });

        });

        describe('method .get()', function () {
            it('should be defined', function () {
                expect(featuresService.get).toBeDefined();
            });

            it('should return the first element of the list', function () {
                expect(featuresService.get(0)).toBeDefined();
                expect(featuresService.get(0).name).toBe('Bootstrap');
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
                expect(featuresService.list().length).toBe(8);
                featuresService.add(toAdd);
                expect(featuresService.list().length).toBe(9);
                expect(featuresService.get(8)).toBe(toAdd);
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
