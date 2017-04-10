var abEvents = angular.module("abEvents", []);


abEvents.controller("abEventsController", function($scope, $http) {
    
    $scope.test = "hey dere";
    
    $scope.response = "API response!";
    
    
    // API call 

    
    $scope.apiCall = function() {
        
       
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



	


});

