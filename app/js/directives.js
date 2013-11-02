'use strict';

/* Directives */


angular.module('myApp.directives', []).

    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]).

    directive('burroakSidebar', function ($window, $location) {
        /**
         * A directive to control the open/close state of the sidebar.
         */
        return function (scope, element) {
            /**
             * The default sidebar width.
             * @type {number}
             */
            var sidebarWidth = 260;

            /**
             * The ratio between the width of the sidebar and the width of the content
             * pane that is used to determine whether the sidebar is opened or closed.
             * @type {number}
             */
            var sidebarMinContent = 4;

            /**
             * Set the state of the sidebar (open or closed) based on the width of the window.
             */
            function setState() {
                var windowWidth = angular.element($window).width();

                if (windowWidth < (sidebarWidth * sidebarMinContent)) {
                    close();
                    showButton();
                } else {
                    open();
                    hideButton();
                }
            }

            /**
             * Hide the navigation button.
             */
            function hideButton() {
                var sidebarButton = element.find('#nav-title-blk');

                if (sidebarButton) {
                    sidebarButton.css('display', 'none');
                }
            }

            /**
             * Show the navigation button.
             */
            function showButton() {
                var sidebarButton = element.find('#nav-title-blk');

                if (sidebarButton) {
                    sidebarButton.css('display', 'inline');
                }
            }

            /**
             * Toggle the sidebar open/closed.
             */
            function toggle() {
                var leftPane = element.find('#left-pane');

                if (leftPane.css('left') == '0px') {
                    open();
                } else {
                    close();
                }
            }

            /**
             * Close the sidebar.
             */
            function close() {
                var sideBar = element.find('#sidebar');
                var leftPane = element.find('#left-pane');

                leftPane.css('left', '0');
                sideBar.css('left', '-' + sidebarWidth.toString() + 'px');
            }

            /**
             * Open the sidebar.
             */
            function open() {
                var sideBar = element.find('#sidebar');
                var leftPane = element.find('#left-pane');

                leftPane.css('left', sidebarWidth.toString() + 'px');
                sideBar.css('left', '0');
            }

            // Attach a handler to the window resize event to cause the sidebar to open/close
            // based on the screen size.
            angular.element($window).bind('resize', function () {
                scope.$apply(function () {
                    setState();
                });
            });

            // Attach the click event handler to the sidebar toggle button.
            var toggleButton = element.find('#nav-title-blk');
            toggleButton.on('click', toggle);

            // Attach a watch to the current location, closing the sidebar if it
            // changes and the sidebar is collapsable.
            scope.location = $location;
            scope.$watch('location.path()', function(newPath) {
                var sidebarButton = element.find('#nav-title-blk');

                if (sidebarButton) {
                    if (sidebarButton.css('display') != 'none') {
                        close();
                    }
                }
            });

            // Set the initial open/close state.
            setState();
        }
    }).

    directive('burroakNavList', function() {
        /**
         * A directive to highlight sidebar link buttons that reference current path.
         */
        return {
            restrict: 'A',
            link: function(scope, element) {
                var $ul = $(element);
                var $tabs = $ul.children();
                var tabMap = {};

                $tabs.each(function() {
                    var $li = $(this);
                    //Substring 1 to remove the # at the beginning (because location.path() below does not return the #)
                    tabMap[$li.find('a').attr('href').substring(1)] = $li;
                });

                scope.$watch('location.path()', function(newPath) {
                    $tabs.removeClass("active");
                    tabMap[newPath].addClass("active");
                });
            }

        };

    });
