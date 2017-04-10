

var abEvents = angular.module("abEvents", ['ngMap', 'ngAnimate']);



abEvents.controller("abEventsController", function($scope, $http) {
    
    
    $scope.test = "hey dere";
    
    $scope.response = "API response!";
    
    
    // API call 

    
    $scope.apiCall = function() {
        
       console.log("hmm");
        $http({
        
        url: 'https://www.eventbriteapi.com/v3/events/search/', 
        
        params: {
            
            // this is where the user input is submitted
            "token": "G7VABS45YU62M37KJ2I4",
            "location.address": "Aberdeen, UK",
            "location.within": "20mi", 
            "categories": "", // categories here
            "price": "", //insert "free" or "paid" (how to do both?)
            "start_date.range_start": "2017-04-05T08:00:00", // format: "YYYY-MM-DDTHHMMSS"
            "start_date.range_end": "2017-10-05T23:59:59",
            "start_date.keyword": "", // caninclude "this_week", "next_week", "this_weekend", "tomorrow", "today"
            
            
        },
        method: "GET",
       
      }).success(function(response){
       
        console.log(response);
            $scope.response = response.events;
            console.log(response.events[1]);
       
        
      });
    }

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


// function for formatting the event description text properly (as the returned string contains HTML)

abEvents.filter('trustAsHtml',['$sce', function($sce) {
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}]);

