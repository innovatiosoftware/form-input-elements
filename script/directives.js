'use strict';
(function () {

    var app = angular.module('angularFormElements', [ 'ui.utils', 'ui.bootstrap', 'green.inputmask4angular']);

    var typeaheadExp = "item as item.field for item in items | filter:{field:$viewValue} | limitTo:{{limit||10}}";
    app.directive('box', function ($log) {

        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                title: '@',
                decorate: '@',
                subTitle: '@',
                footer: '@'
            },
            templateUrl: 'templates/box.html'
        };
    });


    app.directive('windowBox', function ($log) {

        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                title: '@',
                decorate: '@',
                subTitle: '@',
                collapse: '@'

            },
            templateUrl: 'templates/window-box.html'
        };
    });

    app.directive('tileBox', function ($log) {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                title: '@',
                decorate: '@',
                subTitle: '@'
            },
            templateUrl: 'templates/tile-box.html'
        };
    });

    app.directive('inputDate', function ($log, $compile) {
        return {
            restrict: 'AE',
            scope: {
                label: '@',
                id: '@',
                model: '=',
                span: '@',
                required: '@',
                footerText: '@'
            },
            templateUrl: 'templates/input-date.html',
            compile: function (element, attrs) {
                bindValidationAttributes(element.find("input"), attrs.model, null, attrs.required);

                return function (scope, element, attrs) {
                    scope.modelName = attrs.model;
                    if (attrs.required) {
                        addValidationWatch(scope, attrs.model);
                    }
                };
            }
        };
    });


    app.directive('inputText', function ($log, $compile) {
        return {
            restrict: 'E',
            scope: {
                label: '@',
                id: '@',
                placeholder: '@',
                span: '@',
                footerText: '@',
                max: '@',
                type: '@',
                required: '@',
                model: '=',
                mask: '@'

            },
            required: '^form',
            templateUrl: 'templates/input-text.html',
            compile: function (element, attrs) {
                bindValidationAttributes(element.find("input"), attrs.model, attrs.max, attrs.required);

                return function (scope, element, attrs, ngModelController) {
                    scope.modelName = attrs.model;
                    if (scope.max || attrs.required) {
                        addValidationWatch(scope, attrs.model);
                    }
                };
            }

        };
    });

    app.directive('inputTextarea', function ($log, $compile) {
        return {
            restrict: 'E',
            scope: {
                label: '@',
                id: '@',
                placeholder: '@',
                span: '@',
                footerText: '@',
                type: '@',
                rows: '@',
                model: '=',
                required: '@',
                min: '@',
                max: '@'


            },
            required: ['model', '^form'],
            templateUrl: 'templates/input-textarea.html',
            compile: function (element, attrs) {
                bindValidationAttributes(element.find("input"), attrs.model, attrs.max, attrs.required);

                return function (scope, element, attrs, ngModelController) {
                    scope.modelName = attrs.model;
                    if (scope.max || attrs.required) {
                        addValidationWatch(scope, attrs.model);
                    }
                };
            }

        };
    });

    app.directive('inputSelect', function ($log) {
        return {
            restrict: 'E',
            scope: {
                label: '@',
                id: '@',
                placeholder: '@',
                span: '@',
                footerText: '@',
                required: '@',
                model: '=',
                options: '='
            },
            required: ['model'],
            templateUrl: 'templates/input-select.html',
            compile: function (element, attrs) {
                bindValidationAttributes(element.find("select"), attrs.model, attrs.max, attrs.required);

                return function (scope, element, attrs, ngModelController) {
                    scope.modelName = attrs.model;
                    if (scope.max || attrs.required) {
                        addValidationWatch(scope, attrs.model);
                    }
                };
            }
        };
    });
    app.directive('inputTypeahead', function ($log, $compile, $rootScope) {

        return {
            restrict: 'E',
            scope: {
                label: '@',
                id: '@',
                placeholder: '@',
                span: '@',
                footerText: '@',
                limit: '@',
                model: '=',
                required: '@',
                items: '=',
                typeaheadExp: '@',
                objectField: '@',
                onSelect: '&',
                customTemplateUrl: "@"
            },
            required: ['model', '^form'],
            templateUrl: 'templates/input-typeahead.html',
            compile: function compile(element, attrs) {


                if (attrs.objectField) {
                    var result = typeaheadExp.replace(new RegExp('field', 'g'), attrs.objectField);
                    element.find('input').removeAttr('typeahead');
                    element.find('input').attr("typeahead", result);
                }
                if (attrs.onSelect) {
                    $log.info("adding on select function to type ahead field " + attrs.onSelect);
                    element.removeAttr("typeahead-On-Select");   // typeahead-On-Select="addressSelected($item, $model, $label)"
                    element.find('input').attr("typeahead-On-Select", attrs.onSelect);
                }

                if (attrs.typeaheadExp) {
                    $log.info("adding expression to typeahead field :" + attrs.typeaheadExp);
                    element.find('input').removeAttr('typeahead');
                    element.find('input').attr("typeahead", attrs.typeaheadExp);
                }

                if (attrs.customTemplateUrl) {
                    $log.info("adding customTemplateUrl to typeahead field :" + attrs.customTemplateUrl);
                    element.find('input').removeAttr('typeahead-template-url');
                    element.find('input').attr('typeahead-template-url', attrs.customTemplateUrl);
                }

                bindValidationAttributes(element.find("input"), attrs.model, null, attrs.required);

                return function (scope, element, attrs, ngModelController) {
                    scope.modelName = attrs.model;
                    if (attrs.required) {
                        addValidationWatch(scope, attrs.model);
                    }
                };
            }

        };
    });

    app.directive('inputRadio', function ($log) {
        return {
            restrict: 'E',
            scope: {
                label: '@',
                model: '=',
                span: '@',
                required: '@',
                items: '=',
                footerText: '@'
            },
            required: ['model', '^form'],
            templateUrl: 'templates/input-radio.html',
            compile: function (element, attrs) {
                element.find("input").removeAttr('ng-model');
                element.find("input").attr('ng-model', attrs.model);

                bindValidationAttributes(element.find("input"), attrs.model, null, attrs.required);

                return function (scope, element, attrs, ngModelController) {
                    scope.modelName = attrs.model;
                    if (attrs.required) {
                        addValidationWatch(scope, attrs.model);
                    }
                };
            }

        };


    });

    app.directive('inputCheck', function ($log) {
        return {
            restrict: 'E',
            scope: {
                label: '@',
                model: '=',
                span: '@',
                required: '@',
                items: '=',
                footerText: '@'
            },
            required: ['model', '^form'],
            templateUrl: 'templates/input-check.html',
            compile: function (element, attrs) {
                element.find("input").removeAttr('ng-model');
                element.find("input").attr('ng-model', attrs.model);

                bindValidationAttributes(element.find("input"), attrs.model, null, attrs.required);

                return function (scope, element, attrs, ngModelController) {
                    scope.modelName = attrs.model;
                    if (attrs.required) {
                        addValidationWatch(scope, attrs.model);
                    }
                };
            }

        };
    });

    app.directive('inputAppend', function ($log) {
        return {
            restrict: 'AE',
            scope: {
                appendTextLeft: '@',
                appendTextRight: '@',
                appendIconLeft: '@',
                appendIconRight: '@',
                id: '@',
                placeholder: '@',
                type: '@',
                label: '@',
                model: '=',
                required: '@',
                mask:"@",
                footerText: '@'
            },
            required: '^form',
            templateUrl: 'templates/input-append.html',
            compile: function (element, attrs) {
                bindValidationAttributes(element.find("input"), attrs.model, attrs.max, attrs.required);

                return function (scope, element, attrs, ngModelController) {
                    scope.modelName = attrs.model;
                    if (scope.max || attrs.required) {
                        addValidationWatch(scope, attrs.model);
                    }
                };
            }
        };
    });

    app.directive('inputSearch', function ($log) {
        return {
            restrict: 'AE',
            scope: {
                inputId: '@',
                buttonId: '@',
                inputName: '@',
                buttonName: '@',
                placeholder: '@'
            },
            templateUrl: 'templates/input-search.html'
        };
    });

    app.directive('wizardBox', function () {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                wizardStepsElements: '=',
                uiViewRef: '@',
                title: '@'
            },
            templateUrl: 'templates/wizard.html'
        };
    });

    app.directive('formLine', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                span: '@',
                offset: '@'
            },

            templateUrl: 'templates/form-line.html'
        };
    });

    app.directive('buttonsRadio', function () {
        return {
            restrict: 'E',
            scope: {
                model: '=',
                options: '='
            },
            controller: function ($scope) {
                $scope.activate = function (option) {
                    $scope.model = option;
                };
            },
            template: "<button type='button' class='btn btn-default' ng-class='{active: option == model}' " +
                "ng-repeat='option in options' ng-click='activate(option)'>{{option}} </button>"

        };
    });


    app.directive('wizardDone', function ($timeout) {


        function markAsComplete(currentView) {
            var go = true;
            angular.forEach(angular.element('ul.wizard-steps li'), function (e) {
                if (currentView.indexOf($(e).attr('ui-sref')) < 0 && go) {
                    $(e).addClass("complete");
                }
                else {
                    $(e).removeClass("complete");
                    go = false;
                }

            });
        }

        return {
            restrict: 'A',
            controller: function ($scope, $state) {
                $scope.$watch("ta", function (newValue, oldValue) {
                    $timeout(function () {
                        markAsComplete($state.$current.self.name);
                    });
                });
                $scope.$on('$stateChangeSuccess', function (e, _2s) {
                    markAsComplete(_2s.name);
                });
            }

        };
    });

    app.directive('wizardNav', function ($compile, $state) {


        return {
            restrict: 'E',
            scope: {
                steps: '='
            },
            replace: true,
            template: '<div class="btn-group " >' +
                '<button type="submit" class="btn btn-default btn-flat" ng-click="prev()" >Anterior</button>' +
                '<button type="submit" class="btn btn-default btn-flat" ng-click="next()" >Siguiente</button>' +
                '</div>',
            controller: function ($scope, $state) {

                $scope.next = function () {
                    var split = $state.$current.self.name.split(".");
                    var base = split[0];
                    var view = "." + split[1];
                    var found = false;
                    $scope.haveNext = true;
                    angular.forEach($scope.steps, function (step) {
                        if (found) {
                            console.log("el proximo paso es :" + step.refView);
                            $state.go(base + step.refView);
                            found = false;
                        }
                        if (step.refView === view) {
                            console.log("lo econte :" + step.refView);
                            found = true;
                        }
                    });
                    if (found) {
                        $scope.haveNex = false;
                    }
                };

                $scope.prev = function () {
                    $scope.havePrev = true;
                    var split = $state.$current.self.name.split(".");
                    var base = split[0];
                    var view = "." + split[1];
                    var last = null;
                    angular.forEach($scope.steps, function (step) {

                        if (step.refView === view) {
                            if (last != null)
                                $state.go(base + last);
                        }
                        last = step.refView;
                    });

                };
            }

        };
    });


    function addValidationWatch(scope, elementModelName) {

        var $invalid = ['form["' + elementModelName + '"]' , "$invalid"].join(".");
        var $pristine = ['form["' + elementModelName + '"]' , "$pristine"].join(".");

        scope.$parent.$watch($invalid, function (is$invalid) {
            scope.$invalid = is$invalid;
        });
        scope.$parent.$watch($pristine, function (is$pristine) {
            scope.$pristine = is$pristine;
        });
    }

    function bindValidationAttributes(element, modelName, max, required) {
        element.removeAttr('name');
        element.attr('name', modelName);

        if (max) {
            element.removeAttr('maxlength');
            element.attr('maxlength', max);
        }
        if (required) {
            element.removeAttr('ng-required');
            element.attr('ng-required', true);
        }

    };


})();

