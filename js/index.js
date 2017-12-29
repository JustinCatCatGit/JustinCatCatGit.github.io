//
function getWeatherURL(latitude,longitude) {
  return "http://api.wunderground.com/api/ee65416f3267a1ca/forecast/geolookup/conditions/q/" + latitude + "," + longitude + ".json";
}

function getAddress2(latitude,longitude) {
  var latlng = new google.maps.LatLng(latitude, longitude);
  var geocoder = geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          if (results[2]) {
            return results[2];
              console.log("Location: " + results[2].formatted_address);
              //output.innerHTML = '<p>' + results[2].formatted_address + '</p>';
          }
      }
  });

}

function checkRainPop(rainPop) {
  if (rainPop <= 35){
    $(".rain").hide();

    $(".top_background").css("background-image", "url(https://instagram.ftpe3-1.fna.fbcdn.net/t51.2885-15/e35/12328314_1499174193720090_1162012226_n.jpg)");

  }
}


//地點(顯示現在確切地址/geolocation/google map API)
function geoFindAddress4() {
  var output = document.getElementById("output3");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    var Weather = getWeatherURL(latitude,longitude);  
    $.ajax({  
      url: Weather,
      dataType: "jsonp",
      success: function(url) {
        console.log(url);
        var temp_f = url.current_observation.temp_f;
        var temp_c = url.current_observation.temp_c;
        //溫度
        $(".temperature").html(temp_c + "ºC");
        //降雨機率
        var rainPop=url['forecast']['txt_forecast']['forecastday']['0']['pop'];
		console.log(rainPop);
        checkRainPop(Number(rainPop));

        //一周星期
        //console.log(url['forecast']['txt_forecast']['forecastday']['7']['title']);
        var day01_title=url['forecast']['txt_forecast']['forecastday']['0']['title'];
        var day02_title=url['forecast']['txt_forecast']['forecastday']['1']['title'];
        var day03_title=url['forecast']['txt_forecast']['forecastday']['2']['title'];
        var day04_title=url['forecast']['txt_forecast']['forecastday']['3']['title'];
        var day05_title=url['forecast']['txt_forecast']['forecastday']['4']['title'];
        var day06_title=url['forecast']['txt_forecast']['forecastday']['5']['title'];
        var day07_title=url['forecast']['txt_forecast']['forecastday']['6']['title'];
        var day08_title=url['forecast']['txt_forecast']['forecastday']['7']['title'];
        
        

        $(".day01").text(day01_title);
        $(".day02").text(day02_title);
        $(".day03").text(day03_title);
        $(".day04").text(day04_title);
        $(".day05").text(day05_title);
        $(".day06").text(day06_title);
        $(".day07").text(day07_title);
        $(".day08").text(day08_title);

        //一周氣象

        //var day01_title=['forecast']['txt_forecast']['forecastday']['0']['title'];
        //$( ".day01" ).html(day01_title);



        var day01_img_URL = url['forecast']['txt_forecast']['forecastday']['0']['icon_url'];
        $( "#day_W_image01" ).empty();
        $( "<img/>" ).attr( "src", day01_img_URL ).appendTo( "#day_W_image01" );
        console.log(day01_img_URL);
        var day02_img_URL = url['forecast']['txt_forecast']['forecastday']['1']['icon_url'];
        $( "#day_W_image02" ).empty();
        $( "<img/>" ).attr( "src", day02_img_URL ).appendTo( "#day_W_image02" );
        console.log(day02_img_URL);
        var day03_img_URL = url['forecast']['txt_forecast']['forecastday']['2']['icon_url'];
        $( "#day_W_image03" ).empty();
        $( "<img/>" ).attr( "src", day03_img_URL ).appendTo( "#day_W_image03" );
        console.log(day03_img_URL);
        var day04_img_URL = url['forecast']['txt_forecast']['forecastday']['3']['icon_url'];
        $( "#day_W_image04" ).empty();
        $( "<img/>" ).attr( "src", day04_img_URL ).appendTo( "#day_W_image04" );
        console.log(day04_img_URL);
        var day05_img_URL = url['forecast']['txt_forecast']['forecastday']['4']['icon_url'];
        $( "#day_W_image05" ).empty();
        $( "<img/>" ).attr( "src", day05_img_URL ).appendTo( "#day_W_image05" );
        console.log(day05_img_URL);
        var day06_img_URL = url['forecast']['txt_forecast']['forecastday']['5']['icon_url'];
        $( "#day_W_image06" ).empty();
        $( "<img/>" ).attr( "src", day06_img_URL ).appendTo( "#day_W_image06" );
        console.log(day06_img_URL);
        var day07_img_URL = url['forecast']['txt_forecast']['forecastday']['6']['icon_url'];
        $( "#day_W_image07" ).empty();
        $( "<img/>" ).attr( "src", day07_img_URL ).appendTo( "#day_W_image07" );
        console.log(day07_img_URL);
        var day08_img_URL = url['forecast']['txt_forecast']['forecastday']['7']['icon_url'];
        $( "#day_W_image08" ).empty();
        $( "<img/>" ).attr( "src", day08_img_URL ).appendTo( "#day_W_image08" );
        console.log(day08_img_URL);
        
      }
    });

    var latlng = new google.maps.LatLng(latitude, longitude);
    var geocoder = geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[2]) {
                output.innerHTML = '<p>' + results[2].formatted_address + '</p>';
            }
        }
    });    

  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

geoFindAddress4();

//WeatherURL="http://api.wunderground.com/api/ee65416f3267a1ca/forecast/geolookup/conditions/q/24.996894599999997,121.5769461.json"

//include moment-with-locales.js
//顯示時間
//1秒更新一次
setInterval(function(){
  $(".time").text(moment().format('h:mm:ss a'));
  $(".time_year").text(moment().format('ddd, LL'));
},1000);

//日夜跳轉
//晚上先隱藏
$(".night").hide();
var day=1;
setInterval(function(){  
  if (day==1) {
    $(".day").hide();
    $(".night").show();
    day=0;
  }  else {
    $(".day").show();
    $(".night").hide();
    day=1;
  }
  
},4500);