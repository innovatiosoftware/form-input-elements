'use strict';
(function () {
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    var app = angular.module('angularFormElements', [ 'ui.utils', 'ui.bootstrap', 'green.inputmask4angular']);

    var typeaheadExp = "item as item.field for item in items | filter:{field:$viewValue} | limitTo:{{limit||10}}";
    app.directive('inputDate', function () {
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
            templateUrl: currentScriptPath.replace('script/directives.js', 'templates/input-date.html'),
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


    app.directive('inputText', function () {
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
            templateUrl: currentScriptPath.replace('script/directives.js', 'templates/input-text.html'),
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

    app.directive('inputTextarea', function () {
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
            templateUrl: currentScriptPath.replace('script/directives.js', 'templates/input-textarea.html'),
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

    app.directive('inputSelect', function () {
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
            templateUrl: currentScriptPath.replace('script/directives.js', 'templates/input-select.html'),
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
    app.directive('inputTypeahead', function () {

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
            templateUrl: currentScriptPath.replace('script/directives.js', 'templates/input-typeahead.html'),
            compile: function compile(element, attrs) {


                if (attrs.objectField) {
                    var result = typeaheadExp.replace(new RegExp('field', 'g'), attrs.objectField);
                    element.find('input').removeAttr('typeahead');
                    element.find('input').attr("typeahead", result);
                }
                if (attrs.onSelect) {
                    element.removeAttr("typeahead-On-Select");   // typeahead-On-Select="addressSelected($item, $model, $label)"
                    element.find('input').attr("typeahead-On-Select", attrs.onSelect);
                }

                if (attrs.typeaheadExp) {
                    element.find('input').removeAttr('typeahead');
                    element.find('input').attr("typeahead", attrs.typeaheadExp);
                }

                if (attrs.customTemplateUrl) {
                    element.find('input').removeAttr('typeahead-template-url');
                    element.find('input').attr('typeahead-template-url', attrs.customTemplateUrl);
                }

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

    app.directive('inputRadio', function () {
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
            templateUrl: currentScriptPath.replace('script/directives.js', 'templates/input-radio.html'),
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

    app.directive('inputCheck', function () {
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
            templateUrl: currentScriptPath.replace('script/directives.js', 'templates/input-check.html'),
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

    app.directive('inputAppend', function () {
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
            templateUrl: currentScriptPath.replace('script/directives.js', 'templates/input-append.html'),
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

    app.directive('inputSearch', function () {
        return {
            restrict: 'AE',
            scope: {
                inputId: '@',
                buttonId: '@',
                inputName: '@',
                buttonName: '@',
                placeholder: '@'
            },
            templateUrl: currentScriptPath.replace('script/directives.js', 'templates/input-search.html')
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

            templateUrl: currentScriptPath.replace('script/directives.js', 'templates/form-line.html')
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

