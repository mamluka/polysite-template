'use strict';

angular.module('landingPage', [])
    .config(function () {

    })
    .run(function () {

        var sessionId = window.sessionStorage.getItem('mp_id') || guid();

        mixpanel.identify(sessionId);

        window.sessionStorage.setItem('mp_id', sessionId);

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        function guid() {
            return s4() + s4()
        }
    });

angular.module('landingPage')
    .controller('FormCtrl', function ($scope, $http) {
        $scope.submit = function () {
            if ($scope.lead.$invalid) {
                mixpanel.track('Invalid submission');

                validate();
                if (angular.element(document.getElementsByTagName('html')[0]).hasClass('touch'))
                    showValidationMessage();
                return;
            }

            mixpanel.alias($scope.phone);
            window.sessionStorage.setItem('mp_id', $scope.phone);

            var formDetails = {
                name: $scope.name,
                zip: $scope.zip,
                phone: $scope.phone,
                loadType: $scope.loanType,
                loanAmount: $scope.loanAmount,
                domain: settings.domain
            };
            var result = $http.post(settings.apiUrl + '/lead', formDetails);

            result.success(function () {
                mixpanel.track('Form submitted', formDetails);

                setTimeout(function () {
                    window.location.href = 'thank-you.html'
                }, 300)
            });

            function validate() {
                var form = $scope.lead;
                for (var field in  form) {
                    if (field[0] != '$' && form[field].$pristine) {
                        form[field].$setViewValue(
                            form[field].$modelValue
                        );
                    }
                }
            }

            function showValidationMessage() {
                var validationMessages = [];

                if ($scope.lead.name.$invalid)
                    validationMessages.push('* Name is required.');

                if ($scope.lead.zip.$invalid)
                    validationMessages.push('* Zip is required.');

                if ($scope.lead.phone.$invalid)
                    validationMessages.push('* Phone is required.');

                if ($scope.lead.loanType.$invalid)
                    validationMessages.push('* Loan type is required.');

                if ($scope.lead.loanAmount.$invalid)
                    validationMessages.push('* Loan amount is required.');

                alert('You are missing\n' + validationMessages.join('\n'));
            }
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

        $scope.triggerCall = function (phone) {
            setTimeout(function () {
                window.location.href = 'tel:' + phone;
            }, 250);

        };

    })
    .directive('mixpanelTrackLink', function () {
        return function (scope, element, attrs) {
            element.on('click', function () {
                mixpanel.track('Link clicked', {
                    scope: attrs.name,
                    text: element.text() || 'Empty'
                })
            });
        }
    })
    .directive('mixpanelClick', function () {
        return function (scope, element, attrs) {
            element.on('click', function () {
                mixpanel.track(attrs.mixpanelClick)
            });
        }
    })
    .directive('mixpanelInput', function () {
        return function (scope, element, attrs) {
            element.on('focus', function () {
                mixpanel.track('Focus', {
                    name: attrs.name,
                    value: attrs.value
                })
            });

            element.on('blur', function () {
                mixpanel.track('Blur', {
                    name: attrs.name,
                    value: attrs.value
                })
            });
        }
    })
    .directive('mixpanelSelect', function () {
        return function (scope, element, attrs) {
            element.on('change', function () {
                mixpanel.track('Selected', {
                    name: attrs.name,
                    value: element.val()
                })
            });
        }
    });

