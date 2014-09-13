"use strict";!function(){function e(e,t){var r=['form["'+t+'"]',"$invalid"].join("."),i=['form["'+t+'"]',"$pristine"].join(".");e.$parent.$watch(r,function(t){e.$invalid=t}),e.$parent.$watch(i,function(t){e.$pristine=t})}function t(e,t,r,i){e.removeAttr("name"),e.attr("name",t),r&&(e.removeAttr("maxlength"),e.attr("maxlength",r)),i&&(e.removeAttr("ng-required"),e.attr("ng-required",!0))}var r=document.getElementsByTagName("script"),i=r[r.length-1].src,n=angular.module("angularFormElements",["ui.utils","ui.bootstrap","green.inputmask4angular"]),l="item as item.field for item in items | filter:{field:$viewValue} | limitTo:{{limit||10}}";n.directive("inputDate",function(){return{restrict:"AE",scope:{label:"@",id:"@",model:"=",span:"@",required:"@",footerText:"@"},templateUrl:i.replace("script/directives.js","templates/input-date.html"),compile:function(r,i){return t(r.find("input"),i.model,null,i.required),function(t,r,i){t.modelName=i.model,i.required&&e(t,i.model)}}}}),n.directive("inputText",function(){return{restrict:"E",scope:{label:"@",id:"@",placeholder:"@",span:"@",footerText:"@",max:"@",type:"@",required:"@",model:"=",mask:"@"},required:"^form",templateUrl:i.replace("script/directives.js","templates/input-text.html"),compile:function(r,i){return t(r.find("input"),i.model,i.max,i.required),function(t,r,i){t.modelName=i.model,(t.max||i.required)&&e(t,i.model)}}}}),n.directive("inputTextarea",function(){return{restrict:"E",scope:{label:"@",id:"@",placeholder:"@",span:"@",footerText:"@",type:"@",rows:"@",model:"=",required:"@",min:"@",max:"@"},required:["model","^form"],templateUrl:i.replace("script/directives.js","templates/input-textarea.html"),compile:function(r,i){return t(r.find("input"),i.model,i.max,i.required),function(t,r,i){t.modelName=i.model,(t.max||i.required)&&e(t,i.model)}}}}),n.directive("inputSelect",function(){return{restrict:"E",scope:{label:"@",id:"@",placeholder:"@",span:"@",footerText:"@",required:"@",model:"=",options:"="},required:["model"],templateUrl:i.replace("script/directives.js","templates/input-select.html"),compile:function(r,i){return t(r.find("select"),i.model,i.max,i.required),function(t,r,i){t.modelName=i.model,(t.max||i.required)&&e(t,i.model)}}}}),n.directive("inputTypeahead",function(){return{restrict:"E",scope:{label:"@",id:"@",placeholder:"@",span:"@",footerText:"@",limit:"@",model:"=",required:"@",items:"=",typeaheadExp:"@",objectField:"@",onSelect:"&",customTemplateUrl:"@"},required:["model","^form"],templateUrl:i.replace("script/directives.js","templates/input-typeahead.html"),compile:function(r,i){if(i.objectField){var n=l.replace(new RegExp("field","g"),i.objectField);r.find("input").removeAttr("typeahead"),r.find("input").attr("typeahead",n)}return i.onSelect&&(r.removeAttr("typeahead-On-Select"),r.find("input").attr("typeahead-On-Select",i.onSelect)),i.typeaheadExp&&(r.find("input").removeAttr("typeahead"),r.find("input").attr("typeahead",i.typeaheadExp)),i.customTemplateUrl&&(r.find("input").removeAttr("typeahead-template-url"),r.find("input").attr("typeahead-template-url",i.customTemplateUrl)),t(r.find("input"),i.model,null,i.required),function(t,r,i){t.modelName=i.model,i.required&&e(t,i.model)}}}}),n.directive("inputRadio",function(){return{restrict:"E",scope:{label:"@",model:"=",span:"@",required:"@",items:"=",footerText:"@"},required:["model","^form"],templateUrl:i.replace("script/directives.js","templates/input-radio.html"),compile:function(r,i){return r.find("input").removeAttr("ng-model"),r.find("input").attr("ng-model",i.model),t(r.find("input"),i.model,null,i.required),function(t,r,i){t.modelName=i.model,i.required&&e(t,i.model)}}}}),n.directive("inputCheck",function(){return{restrict:"E",scope:{label:"@",model:"=",span:"@",required:"@",items:"=",footerText:"@"},required:["model","^form"],templateUrl:i.replace("script/directives.js","templates/input-check.html"),compile:function(r,i){return r.find("input").removeAttr("ng-model"),r.find("input").attr("ng-model",i.model),t(r.find("input"),i.model,null,i.required),function(t,r,i){t.modelName=i.model,i.required&&e(t,i.model)}}}}),n.directive("inputAppend",function(){return{restrict:"AE",scope:{appendTextLeft:"@",appendTextRight:"@",appendIconLeft:"@",appendIconRight:"@",id:"@",placeholder:"@",type:"@",label:"@",model:"=",required:"@",mask:"@",footerText:"@"},required:"^form",templateUrl:i.replace("script/directives.js","templates/input-append.html"),compile:function(r,i){return t(r.find("input"),i.model,i.max,i.required),function(t,r,i){t.modelName=i.model,(t.max||i.required)&&e(t,i.model)}}}}),n.directive("inputSearch",function(){return{restrict:"AE",scope:{inputId:"@",buttonId:"@",inputName:"@",buttonName:"@",placeholder:"@"},templateUrl:i.replace("script/directives.js","templates/input-search.html")}}),n.directive("formLine",function(){return{restrict:"E",transclude:!0,scope:{span:"@",offset:"@"},templateUrl:i.replace("script/directives.js","templates/form-line.html")}})}();