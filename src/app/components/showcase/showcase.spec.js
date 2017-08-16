describe('Angular White Paper Test Suite', function () {

     beforeEach(angular.mock.module('app.shared'))
   beforeEach(angular.mock.module('app.shared.logger'));
    beforeEach(angular.mock.module('app.showcase')); // include app module in our tests

    describe('Testing showcase controller', function () {
        var featuresController, featuresService, scope, $controller, featuresList;

        beforeEach(angular.mock.module('ui.router'));
 beforeEach(angular.mock.module('app.shared'));
        beforeEach(angular.mock.module('app.shared.logger'));
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

});
