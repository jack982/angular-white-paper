describe('Angular White Paper Test Suite', function () {


    describe('testing logging service', function () {
        var LOG_MSG = "this is a log message";
        var loggingService;

        beforeEach(function () {
            angular.mock.module(function ($provide) {
                var mockedLoggingService = {

                    log: function (msg) {
                        return msg;
                    },
                    debug: function (msg) {
                        return msg;
                    },
                    info: function (msg) {
                        return msg;
                    },
                    warn: function (msg) {
                        return msg;
                    },
                    error: function (msg) {
                        return msg;
                    }
                }

                $provide.value('loggingService', mockedLoggingService);
            });

            angular.mock.inject(function (_loggingService_) {
                loggingService = _loggingService_;
            });

            spyOn(loggingService, 'info').and.returnValue(LOG_MSG);
        });

        it('should be defined', function () {
            expect(loggingService).toBeDefined();
        });

        it('should be called', function () {
            loggingService.info(LOG_MSG);
            expect(loggingService.info).toHaveBeenCalledWith(LOG_MSG);
        });

        it('should be called with parameter and return same value', function () {
            var result = loggingService.info(LOG_MSG);
            expect(loggingService.info).toHaveBeenCalledWith(LOG_MSG);
            expect(result).toEqual(LOG_MSG);
        });


    });





});