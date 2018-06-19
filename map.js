var directionDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var initialPlace;
    var infowindow = new google.maps.InfoWindow();
    var browserSupportFlag =  new Boolean();
    var urPosition;
    var taipei;
 function initialize() {
     directionsDisplay = new google.maps.DirectionsRenderer();
     geocoder = new google.maps.Geocoder();
     initialPlace = new google.maps.LatLng(25.132239, 121.73928899999999);
      
      var myOptions = {
        zoom:16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: initialPlace
        }
      map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
      
      var marker = new google.maps.Marker({
            map: map, 
            position: initialPlace
        });
      infowindow.setContent("基隆");
      infowindow.open(map, marker);
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById("directionsPanel"));
     
    }
    
 function getAddress(){
        if(document.getElementById("agree").value=="no")     document.getElementById("address_lb").style.visibility="visible";
        if(document.getElementById("agree").value=="yes")      document.getElementById("address_lb").style.visibility="hidden";
        }
    
function getUrposition(){
       taipei = new google.maps.LatLng(25.091075,121.55983449999997);
        // Try W3C Geolocation (Preferred)
	  if(navigator.geolocation) {
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position) {
		  urPosition = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		  //map.setCenter(initialLocation);
		}, function() {
		  handleNoGeolocation(browserSupportFlag);
		});
	  // Try Google Gears Geolocation
	   } else if (google.gears) {
		browserSupportFlag = true;
		var geo = google.gears.factory.create('beta.geolocation');
		geo.getCurrentPosition(function(position) {
		 urPosition = new google.maps.LatLng(position.latitude,position.longitude);
		 // map.setCenter(initialLocation);
		}, function() {
		  handleNoGeoLocation(browserSupportFlag);
		});
	  // Browser doesn't support Geolocation
	    } else {
		browserSupportFlag = false;
		handleNoGeolocation(browserSupportFlag);
	  } 
	}
	 
function handleNoGeolocation(errorFlag) {
		if (errorFlag == true) {
		  alert("Geolocation service failed.");
		  //initialLocation = newyork;
		} else {
		  alert("Your browser doesn't support geolocation. We've placed you in Taipei.");
		  urPosition = taipei;
		}
		//map.setCenter(initialLocation);
	 }
	  
function calcRoute() {
      var selectedMode = document.getElementById("mode").value; //交通方式
      var selectedAgree = document.getElementById("agree").value;
      var request;
      var start;
      var end ="基隆";  //基隆 
      if(selectedAgree =="yes"){
            getUrposition();
             request = {
                origin: urPosition, 
                destination: initialPlace,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
              }  
        else if(selectedAgree == "no"){
            start=document.getElementById("address").value; 
            request = {
                origin: start, 
                destination: end,
                travelMode: google.maps.DirectionsTravelMode[selectedMode]
              };
             }
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
      });
    }
    