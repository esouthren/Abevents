// Angular Controller by ES
// Abevents Web Application, April 2017


// define application
var abEvents = angular.module("abEvents", ['ngMap', 'ngAnimate']);

//define controller for application
abEvents.controller("abEventsController", function($scope, $http, $timeout) {

    // variables to declare at the start
    $scope.priceMessage = "Wubba Lubba";
    $scope.test = "hey dere";
    $scope.response = "API response!";
	$scope.eventExpandToggle = true;
    $scope.showIconKey = false;
    $scope.keywords = "";
    $scope.startDate = "startdate!";

    // API call
    $scope.apiCall = function() {

        // get dates from Date Pickery thing
    
        $scope.startDate = (datePickerFrom.getDate().toString().slice(0,15));
        console.log($scope.startDate);
        
        // $scope.endDate = (datePickerFrom.getDate()).toString();
        
       // $scope.startDate.slice(0,15);
        
       // console.log(startDate);
        // empty data to clear the screen
        $scope.response = null;
        // turn on the loading gif
        $scope.loading = true;
        // set API key
        $http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = '7f3028ae78924451854a93a4151e2733';
        var werds = $scope.keywords;
        // aight here we go this is the good stuff right here
        $http({

            url: 'https://api.allevents.in/events/geo/',

        params: {

            // this is where the user input is submitted
            "latitude": 57.146114,
            "longitude": -2.091476,
            "radius": 15,
            "category": werds, // keywords be going here
            "page": 1,

            // these are the only search parameters for the API. So, further refining (like dates)
            // will need to be applied to the data returned below.
        },
        method: "POST",

            // if successful API call:
          }).success(function(response){
            // hide the loading gif
           $scope.loading = false;
            if (!response.data[0]) {
                console.log("nothing here boss");
                // display error image
            }
            

        // log the data to the console for inspection (right click > inspect > console to view)
        console.log(response);
        console.log(response.data[1]);

        // let's format our data to make it more friendly looking

        // apply a pricing message to each event (checking if the event has tickets and
        // changing the message accordingly)

        // loop through the data array and check it's Ticketing status
        for (var i = 0; i < response.data.length; i++) {
            
        
             var e = response.data[i];
            
            
            e.descriptionHack = ";)";
                  
           
            //console.log(e.eventname);
             
             // Ticket Status
             e.priceMessage = "";
             if (e.has_tickets == true) {
                 e.priceMessage = "Get tickets at: " + e.tickets.ticket_url;
             }
             else {
                 e.priceMessage = "This event is free!";
             }
                 
             // Category
             for (var j = 0; j < e.categories.length; j++) {
                 var cat = response.data[i].categories[j];
                // console.log(cat);
                 // check categories and apply extra variables for the Icons to read
                 switch (cat) {
                    case "Concerts":
                            break;
                    case "Music":
                         e.gig = true;
                         break;
                     case "Festivals":
                         e.festival = true;
                         break;
                     case "Comedy" :
                         e.comedy = true;
                        default:
                            break;
                 }
               
             }
            
            // finding out if it's a ceilidh - so the only way I can think to do this is search the name for stringvalue
            // it's a hack but it was written at the hackathon so bllkdjfhgslkfhdg
            var nameString = e.eventname;
            if ((e.eventname.toLowerCase()).includes("ceilidh")) {
                e.ceilidh = true;
            }

        }

        // NOTE ********* more things we need to do to the data:
            // get the icons displaying - I'm thinking have them all there in the HTML but displaying based on a boolean
            // value we set here? Like if tickets.has_tickets == false.

        // finally, bind the data to the $scope.response variable to be used in the View bit (the HTML).
        $scope.response = response.data;

      });

        // after api call, close menu (if we're in mobile mode)
        if (window.innerWidth < 750) {
	       $scope.mobileMenuToggle = true;
        }
    }

    // toggles visibility of menu on mobile devices
    $scope.mobileMenuToggle = false;
	   if (window.innerWidth < 750) {
	       $scope.mobileMenuToggle = true;
        }



    // what
	$scope.test = "What";

    // function called when Menu button is pressed on mobile - expands/minimises the menu
	$scope.toggleMenu = function() {
		$scope.mobileMenuToggle = ($scope.mobileMenuToggle) ? false : true;
	}

    // expand the event to display more descriptive text
	$scope.expandEvent = function() {

		$scope.eventExpandToggle = !$scope.eventExpandToggle;
        $scope.isCollapsed = !$scope.isCollapsed;

	}
    
    $scope.iconKeyToggle = function() {
        
        $scope.showIconKey = !$scope.showIconKey;
    }

});



// ****** tiiiiiiiiny buggies, in the code, make me happy, make me feel fine *******

// function for formatting the event description text properly (as the returned string contains HTML)

abEvents.filter('trustAsHtml',['$sce', function($sce) {
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}]);
