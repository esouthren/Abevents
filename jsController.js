var abEvents = angular.module('abEvents', []);

abEvents.controller('abEventsController', function abEventsController($scope, $location) {
	
	$scope.mobileMenuToggle = true;
	
	$scope.toggleMenu = funtion() {
		$scope.mobileMenuToggle = ($scope.mobileMenuToggle) ? false : true;
	}
	
	
}
