// Angular Controller by ES
// Abevents Web Application, April 2017

// define application
var abEvents = angular.module("abEvents", ['ngMap', 'ngAnimate', 'ngStorage']);

//define controller for application
abEvents.controller("abEventsController", function($scope, $http, $timeout, $window, $location) {


    $scope.response = "API response!";
	$scope.eventExpandToggle = true;
    $scope.showIconKey = false;

    // Index Search variables
    $scope.indexRadioTime = "indexToday";
    $scope.keywordsQuery = "";

    // MENU variables
    // variables to declare at the start
    $scope.priceMessage = "Wubba Lubba";
    $scope.startDate = new Date();
    $scope.endDate = new Date();
    $scope.timeToday = true;
    $scope.timeTomorrow = true;
    $scope.timeWeekend = true;
    $scope.timeWeeknights = true;
    $scope.catNightclubs = true;
    $scope.catGigs = true;
    $scope.catComedy = true;
    $scope.catTheatre = true;
    $scope.catFestivals = true;
    $scope.catCeilidh = true;
    $scope.indexPass = "";
	$scope.urlParameters = true;

    // API call Function
    $scope.apiCall = function() {

        // get dates from Date Pickery thing
        $scope.startDate = (datePickerFrom.getDate());
        $scope.startDate.setHours(0,0,0,0);
        $scope.endDate = (datePickerTo.getDate());
        $scope.endDate.setHours(0,0,0,0);

      	// making sure the end date is after the start date
      	if ($scope.startDate > $scope.endDate) {
        	$window.alert("Error: End date must come after start date!");
        	return;
      	}

        // empty data to clear the screen
        $scope.response = null;
        // turn on the loading gif
        $scope.loading = true;
        $scope.noEvents = false;
        // set API key
        $http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = '7f3028ae78924451854a93a4151e2733';

        // aight here we go! Starting API Call
        $http({
            url: 'https://api.allevents.in/events/geo/',
            params: {
              // this is where the user input is submitted
              "latitude": 57.146114,
              "longitude": -2.091476,
              "radius": 15,
              "category": "", // keywords be going here
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
      	//  console.log(response);
        console.log(response.data[1]);

        // let's format our data to make it more friendly looking

        // apply a pricing message to each event (checking if the event has tickets and
        // changing the message accordingly)

        // loop through the data array and check it's Ticketing status

        // we're looping in reverse so that if we remove elements the iteration continues
        for (var i = ((response.data.length)-1); i >=0; --i) {
            var e = response.data[i];

            e.eventText = "I'm eventText!";
             // Ticket Status
             e.priceMessage = "";
             if (e.hasTickets == true) {
                 e.priceMessage = "Get tickets at: " + e.tickets.ticket_url;
             }
             else {
                 e.priceMessage = "This event is free!";
             }

             // Category
             for (var j = 0; j < e.categories.length; j++) {
                 var cat = response.data[i].categories[j];

                 // check categories and apply extra variables for the Icons to read
                 switch (cat) {
                    case "Concerts":
                    	e.gig = true;
                    	break;
                   case "Parties":
                       e.nightclub = true;
                       break;
                    case "Sports":
                       e.sports = true;
                       break;
                   case "trips-adventures":
                       e.sports = true;
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

            // workaround: certain venues only have ticketed events
           var title = e.location.toLowerCase();
           if (title == "krakatoa" || title.includes("band") || title.includes("lemon tree") || title.includes("drummonds")) {
               e.hasTickets = true;
            	e.minAge18 = true;
            	e.minAge18 = true;
        	}
           if (title.includes("tunnels") || title.includes("51") || title.includes("cotton") || title.includes("revolucion") || title.includes("institute") || title.includes("underground")) {
	           e.hasTickets = true;
	           e.nightclub = true;
	           e.minAge18 = true;
         }

          // Editing the Output for user's selected criteria
          // Categories

          if (!$scope.catCeilidh) {
            if (e.ceilidh) {
              response.data.splice(i, 1); // remove event from array
            }
          }
          if (!$scope.catGigs) {
            if (e.categories.includes("Concerts")) {
                response.data.splice(i, 1);
            }
          }
          if (!$scope.catTheatre) {
            if (e.categories.includes("Theatre")) {
                response.data.splice(i, 1);
            }
          }
          if (!$scope.catFestivals) {
            if (e.categories.includes("Festivals")) {
              response.data.splice(i, 1);
            }
         }

         var todayDate = new Date();
         todayDate.setHours(0,0,0,0); // set the time to 0 so when we compare dates, it's only dd/mm/yyyy

         var tomorrowDate = new Date(todayDate.getTime() + (24 * 60 * 60 * 1000));

         // let's parse the returned API date into a friendly format
         var dayText = e.start_time_display.slice(0,3);
         var month = e.start_time_display.slice(4,7);
         var day = e.start_time_display.slice(8,10);
         var year = e.start_time_display.slice(11,15);

         switch (month) {
           case "Jan" : month = "00"; break;
           case "Feb" : month = "01"; break;
           case "Mar" : month = "02"; break;
           case "Apr" : month = "03"; break;
           case "May" : month = "04"; break;
           case "Jun" : month = "05"; break;
           case "Jul" : month = "06"; break;
           case "Aug" : month = "07"; break;
           case "Sep" : month = "08"; break;
           case "Oct" : month = "09"; break;
           case "Nov" : month = "10"; break;
           case "Dec" : month = "11"; break;
            default: break;
         }
         // finally assesmble into a date object we can use
         var eventDate = new Date(year, month, day);

         // if the user doesn't want Today's events
            if (!$scope.timeToday) {
              if(eventDate.getTime() == todayDate.getTime()) {
                response.data.splice(i,1);
              }
            }
          // .... or tomorrows
          if (!$scope.timeTomorrow) {
            if(eventDate.getTime() == tomorrowDate.getTime()) {
              response.data.splice(i,1);
            }
          }
          // ... or weekend events
          if (!$scope.timeWeekend) {
            if(dayText == "Sat" || dayText == "Sun") {
              response.data.splice(i,1);
            }
          }
          // ... or weeknight events
          if (!$scope.timeWeeknights) {
            if(dayText != "Sat" && dayText != "Sun") {
              response.data.splice(i,1);
            }
          }

          // if either of the date selectors have been used
          if ($scope.startDate.getTime() != todayDate.getTime() || $scope.endDate.getTime() != todayDate.getTime()) {

           if(eventDate <= $scope.startDate) {
             response.data.splice(i, 1); // remove from returned results
           }
           if(eventDate >= $scope.endDate) {
             response.data.splice(i, 1);
           }
         }

		 // check if keywords have come from index.html
		 if ($scope.urlParameters) {
			 // get URL and parse data from it
			 var words = $location.absUrl();
			 var s = words.indexOf("Keywords=");
			 console.log(s);
			 // if keywords are in the URL...
			 if (s > -1) {
				 var start = s + 9;
				 words = words.slice(start);
			
			 	$scope.keywordsQuery = words;
				// stop it from reading the URL again
				$scope.urlParameters = false;
		 	}
		}
		
        // filtering by keywords
		/// if the user has entered any keywords...
        if ($scope.keywordsQuery != "") {
            var keywords = $scope.keywordsQuery.toLowerCase().split(" ");
	    keywords = keywords.replace("%20", " ");
	    console.log(keywords);
            var remove = true;
            for (var x = 0; x < keywords.length; x++) {
                if (e.eventname.toLowerCase().includes(keywords[x])) {
                    remove = false;
                }
                if (e.location.toLowerCase().includes(keywords[x])) {
                    remove = false;
                }
               for (var c = 0; c < e.categories.length; c++) {
                   if (e.categories[c].toLowerCase() == keywords[x]) {
                       remove = false;
                   }
               }
               for (var c = 0; c < e.tags.length; c++) {
                   if (e.tags[c].toLowerCase() == keywords[x]) {
                   		remove = false;
                   }
               }
            }
            if (remove) {
                response.data.splice(i,1);
            }
        }

        e.categoriesDisplay = "";         // making a nice category display list
        if (e.categories.length > 0) {
            e.categoriesDisplay = "Categories: ";
            for (var cc = 0; cc < e.categories.length; cc++) {
                   e.categoriesDisplay += e.categories[cc] + ", ";
            }
           e.categoriesDisplay = e.categoriesDisplay.substring(0,e.categoriesDisplay.length-2);
        }

   } // end of response interation

    // finally, bind the data to the $scope.response variable to be used in the View bit (the HTML).
    $scope.response = response.data;
    console.log("Number of events:");
    console.log($scope.response.length);
    console.log($scope.response);
    // no events? display error message
    if ($scope.response.length < 1) {
      	$scope.noEvents = true;
    }

	});

        // after api call, close menu (if we're in mobile mode)
        if (window.innerWidth < 750) {
	       $scope.mobileMenuToggle = true;
        }
    }  // END OF API CALL

    // reload page (when user wants to clear search parameters)
    $scope.reload = function()    {
    	location.reload();
    }

    // toggles visibility of menu on mobile devices
    $scope.mobileMenuToggle = false;
	   if (window.innerWidth < 750) {
	       $scope.mobileMenuToggle = true;
        }

    // this toggles the category and time buttons on or off
    $scope.catToggle = function(theCat) {
      	$scope[theCat] = !$scope[theCat];
    }

    // what
	$scope.test = "What";

  // function called when the index.html radio buttons are changed
  	$scope.indexTime = function() {

  	console.log($scope.indexRadioTime);

      if ($scope.indexRadioTime == "indexToday"){
        $scope.timeToday = true;
        $scope.timeTomorrow = false; $scope.timeWeekend = false; $scope.timeWeeknights = false;
      }
      if ($scope.indexRadioTime == "indexTomorrow") {
        $scope.timeTomorrow = true;
        $scope.timeToday = false; $scope.timeWeekend = false; $scope.timeWeeknights = false;
      }
      if ($scope.indexRadioTime == "indexWeekend") {
        $scope.timeWeekend = true;
        $scope.timeToday = false; $scope.timeTomorrow = false; $scope.timeWeeknights = false;
      }
      if ($scope.indexRadioTime == "indexWeeknights") {
        $scope.timeWeeknights = true;
        $scope.timeToday = false; $scope.timeTomorrow = false; $scope.timeWeekend = false;
      }
    }

    // function called when Menu button is pressed on mobile - expands/minimises the menu
	$scope.toggleMenu = function() {
		$scope.mobileMenuToggle = ($scope.mobileMenuToggle) ? false : true;
	}

	// toggle the icon key on or off
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
