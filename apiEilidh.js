  $(function() {
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
      
        var $events = $('#eventsTable');
        
        $.ajax({
            url: "https://api.allevents.in/events/list/?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","7f3028ae78924451854a93a4151e2733");
            },
            type: "POST",           
            success: function(data) {              
                var length = data.data.length;
                
                // for each item in the data array
                for (var i = 0; i < length; i++) {
                    
                    // add data to the div called 'events'
                    $events.append('<table class="eventsTable">');
                    $events.append('<tr><td>*image*</td>');
                    $events.append('<td><p>name: ' + data.data[i].eventname + '</p></td>');
                    $events.append('<td>Icons</td></tr>')
                    $events.append('</table>');
                    $events.appent('<hr>');
                    
                   
                 
                    /* Other variables that can be displayed (apart from eventname) 
                    categories (array, as can have multiple categories)
                    end_time (int)
                    end_time_display (formatted "Tue Mar 21 2017 at 07:00pm")
                    eventname (eg "Radiohead Concert")
                    event_url (link - redirects to allevents.in website)
                    location: (string)
                    start_time 
                    start_time_display (formatted "Tue Mar 21 2017 at 0800pm")
                    */
                    
                    // print all event data to the console (view by rightclicking -> inspect -> Console
                    console.log(data.data[i]);
                    
          
                }
       
            }
            // Request body
          
        })
        ;
    });
    