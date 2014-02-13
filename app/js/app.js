'use strict';

angular.module('landingPage', [])
    .config(function () {

    })
    .run(function () {

    });

angular.module('landingPage')
    .controller('FormCtrl', function ($scope, $http) {
        $scope.submit = function () {
            $http.post()
        }
    })
    .controller('ClickToCallCtrl', function ($scope) {

        $scope.desktop = false;

        if (angular.element(document.getElementsByTagName('html')).hasClass('no-touch')) {
            var ZingayaConfig = {"buttonLabel": "Click to call Instant Connect", "labelColor": "#13487f", "labelFontSize": 15, "labelTextDecoration": "none", "labelFontWeight": "bold", "labelShadowDirection": "bottom", "labelShadowColor": "#8fd3ec", "labelShadow": 1, "buttonBackgroundColor": "#68c3f0", "buttonGradientColor1": "#68c3f0", "buttonGradientColor2": "#5bbaee", "buttonGradientColor3": "#5fbdef", "buttonGradientColor4": "#62bfef", "buttonShadow": "true", "buttonHoverBackgroundColor": "#69ad26", "buttonHoverGradientColor1": "#30b3f1", "buttonHoverGradientColor2": "#2aa8ef", "buttonHoverGradientColor3": "#2cacf0", "buttonHoverGradientColor4": "#2daef0", "buttonActiveShadowColor1": "", "buttonActiveShadowColor2": "", "buttonCornerRadius": 2, "buttonPadding": 10, "iconColor": "#ffffff", "iconOpacity": 1, "iconDropShadow": 1, "iconShadowColor": "#13487f", "iconShadowDirection": "bottom", "iconShadowOpacity": 0.5, "callme_id": "3cd76f2c465e44d990bd18809b8e8d84", "poll_id": null, "analytics_id": null, "type": "button", "widgetPosition": "right", "save": 1};
            (function (d, t) {
                var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
                g.src = '//cdn.zingaya.com/js/zingayabutton.js';
                g.async = 'true';
                g.onload = g.onreadystatechange = function () {
                    if (this.readyState && this.readyState != 'complete' && this.readyState != 'loaded') return;
                    try {
                        Zingaya.load(ZingayaConfig, 'zingaya3cd76f2c465e44d990bd18809b8e8d84');
                        if (!Zingaya.SVG()) {
                            var p = d.createElement(t);
                            p.src = '//cdn.zingaya.com/PIE.js';
                            p.async = 'true';
                            s.parentNode.insertBefore(p, s);
                            p.onload = p.onreadystatechange = function () {
                                if (this.readyState && this.readyState != 'complete' && this.readyState != 'loaded') return;
                                if (window.PIE) PIE.attach(document.getElementById("zingayaButton" + ZingayaConfig.callme_id));
                            }
                        }
                    } catch (e) {
                    }
                };
                s.parentNode.insertBefore(g, s);
            }(document, 'script'));

            $scope.desktop = true;
        }

    })
    .directive('scrollPosition', ['$window', '$timeout', '$parse', function ($window, $timeout, $parse) {
        return function (scope, element, attrs) {

            var windowEl = angular.element($window)[0];
            var directionMap = {
                "up": 1,
                "down": -1,
                "left": 1,
                "right": -1
            };

            // We retrieve the element with the scroll
            scope.element = angular.element(element)[0];

            // We store all the elements that listen to this event
            windowEl._elementsList = $window._elementsList || [];
            windowEl._elementsList.push({element: scope.element, scope: scope, attrs: attrs});

            var element, direction, index, model, scrollAnimationFunction, tmpYOffset = 0, tmpXOffset = 0;
            var userViewportOffset = 200;

            function triggerScrollFunctions() {

                for (var i = windowEl._elementsList.length - 1; i >= 0; i--) {
                    element = windowEl._elementsList[i].element;
                    if (!element.firedAnimation) {
                        var directionY = tmpYOffset - windowEl.pageYOffset > 0 ? "up" : "down";
                        var directionX = tmpXOffset - windowEl.pageXOffset > 0 ? "left" : "right";
                        tmpXOffset = windowEl.pageXOffset;
                        tmpYOffset = windowEl.pageYOffset;
                        if (element.offsetTop - userViewportOffset < windowEl.pageYOffset && element.offsetHeight > (windowEl.pageYOffset - element.offsetTop)) {
                            model = $parse(windowEl._elementsList[i].attrs.scrollAnimation)
                            scrollAnimationFunction = model(windowEl._elementsList[i].scope)
                            windowEl._elementsList[i].scope.$apply(function () {
                                element.firedAnimation = scrollAnimationFunction(directionMap[directionX]);
                            })
                            if (element.firedAnimation) {
                                windowEl._elementsList.splice(i, 1);
                            }
                        }
                    } else {
                        index = windowEl._elementsList.indexOf(element); //TODO: Add indexOf polyfill for IE9
                        if (index > 0) windowEl._elementsList.splice(index, 1);
                    }
                }

            }

            windowEl.onscroll = triggerScrollFunctions;
        };
    }]);

