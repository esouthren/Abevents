var abEvents = angular.module("abEvents", ['ngAnimate']);

abEvents.controller("abEventsController", function($scope) {

    // toggles visibility of menu on mobile devices
	$scope.mobileMenuToggle = false;

	$scope.eventExpandToggle = true;

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
			name: "Rare Thursday",
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

		$scope.eventExpandToggle = ($scope.eventExpandToggle) ? false : true;


	}


});


// get window size for menu reshuffling
