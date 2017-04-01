

var abEvents = angular.module("abEvents", ['ngMap', 'ngAnimate']);



abEvents.controller("abEventsController", function($scope, $http) {
    
    
    var params = {
            
            // this is where the user input is submitted
            "city": "New york",
            "state": "NY",
            "country": "United States",
            "page": "0",
            "sdate": "{dateTime}",
            "edate": "{dateTime}",
            "category": "{string}",
        };
    // API call
 
    
    $http ({
        url: 'https://www.eventbriteapi.com/v3/events/search', 
        params: {
            
            // this is where the user input is submitted
            "token": "G7VABS45YU62M37KJ2I4",
        },
        method: "POST",
       
      }).success(function(response){
        console.log(response)
      });


	$scope.directions = [
          {center: [57.133680,-2.227462]},
            {center: [57.133680,-2.227462]},
          {center: [57.133680,-2.227462]},

        ];

    // toggles visibility of menu on mobile devices
		$scope.mobileMenuToggle = false;
	if (window.innerWidth < 750) {
	$scope.mobileMenuToggle = true;
}


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
			image: "EventIcon2.jpg",
			iconAge: "iconParents.png",
			iconCost: "iconFree.png",
			iconParking: "iconParking.png",
			categoryImg: "Theatre.png"
		},
		{
			name: "Rare Thursdays",
			location: "Tunnels",
			date: "42nd Blocktober",
			time: "7900 - 1202",
			description: $scope.lorum,
			price: 0,
			image: "EventIcon.jpg",

			iconAge: "icon18.png",
			iconCost: "iconPay.png",
			iconParking: "iconParking.png",
			categoryImg: "NightClub.png"

		},
		{
			name: "Crash Wednesdays",
			location: "Underground",
			date: "3rd March",
			time: "2300 - 0300",
			description: $scope.lorum,
			price: 5,
			image: "EventIcon2.jpg",

			iconAge: "icon18.png",
			iconCost: "iconPay.png",
			iconParking: "iconParking.png"
		},
		{
			name: "Crash Wednesdays",
			location: "Underground",
			date: "3rd March",
			time: "2300 - 0300",
			description: $scope.lorum,
			price: 5,
			image: "EventIcon2.jpg",

			iconAge: "icon18.png",
			iconCost: "iconPay.png",
			iconParking: "iconParking.png"
		}
	];

    $scope.apiData = "hey dere";

    // what
	$scope.test = "What";

    // function called when Menu button is pressed on mobile
	$scope.toggleMenu = function() {
		$scope.mobileMenuToggle = ($scope.mobileMenuToggle) ? false : true;
	}
    
    
    // expand the event to display more descriptive text
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
