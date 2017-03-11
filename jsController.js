var abEvents = angular.module("abEvents", ['ngAnimate']);

abEvents.controller("abEventsController", function($scope) {

    // toggles visibility of menu on mobile devices
	$scope.mobileMenuToggle = false;

	$scope.eventExpandToggle = true;
    
    // event collapsing animation variable
    $scope.isCollapsed = false;

	$scope.lorum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin sapien eu hendrerit tincidunt. Aliquam sit amet elit nibh. 	Aenean et lorem sed mauris pharetra fermentum. Pellentesque placerat magna vel imperdiet dapibus. Nam ac velit velit. Sed nibh quam, semper consectetur pretium vel, consequat ut dui. Proin in maximus erat.Nulla commodo pulvinar laoreet. Ut sed elit est. Morbi dui velit, tristique at mauris consequat, molestie maximus lectus. Maecenas ornare viverra vestibulum";


	//a test array of events
	$scope.testEvents = [
		{
			name: "Crash Wednesdays",
			location: "Underground",
			date: "3rd March",
			time: "2300 - 0300",
			description: $scope.lorum,
			price: 5,
			image: "EventIcon2.jpg"
		},
		{
			name: "Rare Thursdays",
			location: "Tunnels",
			date: "42nd Blocktober",
			time: "7900 - 1202",
			description: $scope.lorum,
			price: 0,

			image: "EventIcon.jpg"
		},
		{
			name: "Crash Wednesdays",
			location: "Underground",
			date: "3rd March",
			time: "2300 - 0300",
			description: $scope.lorum,
			price: 5,
			image: "EventIcon2.jpg"
		},
		{
			name: "Crash Wednesdays",
			location: "Underground",
			date: "3rd March",
			time: "2300 - 0300",
			description: $scope.lorum,
			price: 5,
			image: "EventIcon2.jpg"
		}
	];


    // what
	$scope.test = "What";

    // function called when Menu button is pressed on mobile
	$scope.toggleMenu = function() {
		$scope.mobileMenuToggle = ($scope.mobileMenuToggle) ? false : true;
	}

	$scope.expandEvent = function() {

		$scope.eventExpandToggle = !$scope.eventExpandToggle;
        $scope.isCollapsed = !$scope.isCollapsed;


	}


});

// animating the event expansion

abEvents.directive('collapse', [function () {
		return {
			restrict: 'A',

			link: function ($scope, ngElement, attributes) {
				var element = ngElement[0];

				$scope.$watch(attributes.collapse, function (collapse) {
					var newHeight = collapse ? 0 : getElementAutoHeight();
                    console.log("new Height", newHeight);

					element.style.height = newHeight + 'px';
					ngElement.toggleClass('collapsed', collapse);
				});

				function getElementAutoHeight() {
					var currentHeight = getElementCurrentHeight();

					element.style.height = 'auto';
					var autoHeight = getElementCurrentHeight();

					element.style.height = currentHeight;
					getElementCurrentHeight(); // Force the browser to recalc height after moving it back to normal

					return autoHeight;
				}

				function getElementCurrentHeight() {
					return element.offsetHeight
				}
			}
		};
	}]);


// get window size for menu reshuffling
