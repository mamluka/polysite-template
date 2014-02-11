'use strict';

angular.module('landingPage', [])
    .config(function () {

    })
    .run(function () {

    });

angular.module('landingPage')
    .controller('FormCtrl', function ($scope) {
        $scope.submit = function () {
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

    });