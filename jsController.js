var abEvents = angular.module("abEvents", ['ngAnimate']);

abEvents.controller("abEventsController", function($scope) {
	
    // toggles visibility of menu on mobile devices
	$scope.mobileMenuToggle = false;
    
    
	//a test array of events
	$scope.testEvents = ['one', 'two', 'three', 'four', 'five', 'six', 'sev', 'eight'];
    
    // what
	$scope.test = "What";
	
    // function called when Menu button is pressed on mobile
	$scope.toggleMenu = function() {
		$scope.mobileMenuToggle = ($scope.mobileMenuToggle) ? false : true;
	}
	
	
});


// get window size for menu reshuffling

    

