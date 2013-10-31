'use strict';

/* Directives */


angular.module('myApp.directives', []).

    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]).

    directive('ngSidebar', function ($timeout) {
        return function (scope, element) {

            var sidebarWidth = 220;

            function toggle() {
                var sideBar = element.find('#sidebar');
                var leftPane = element.find('#left-pane');

                if (leftPane.css('left') == '0px') {
                    expand();
                } else {
                    collapse();
                }
            }

            function collapse() {
                var sideBar = element.find('#sidebar');
                var leftPane = element.find('#left-pane');

                leftPane.css('left', '0');
                sideBar.css('left', '-' + sidebarWidth.toString() + 'px');
            }

            function expand() {
                var sideBar = element.find('#sidebar');
                var leftPane = element.find('#left-pane');

                leftPane.css('left', sidebarWidth.toString() + 'px');
                sideBar.css('left', '0');
            }

            var toggleButton = element.find('#nav-title-blk');

            toggleButton.on('click', toggle);
        }
    });
