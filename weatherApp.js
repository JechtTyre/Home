
function getLocation(position)  
{
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
    var url= "https://api.darksky.net/forecast/98f524f71ef11e7f69dbe57d6a9861fa/"+latitude+","+longitude;
  $.getJSON(url+"?callback=?",getWeather);
}
function getWeather(data)
{
  
    tempmin=data.hourly.data[0].temperature;
   tempmax=data.hourly.data[0].temperature;
    wind=data.hourly.data[0].windSpeed;
  precip=round(data.hourly.data[0].precipProbability*100);
    icon=data.hourly.data[0].icon;
    
    tempmin1 = data.daily.data[1].temperatureMin;
    tempmax1 = data.daily.data[1].temperatureMax;
    wind1 = data.daily.data[1].windSpeed;
    precip1=round(data.daily.data[1].precipProbability*100);
    icon1=data.daily.data[1].icon;
  
    tempmin2 = data.daily.data[2].temperatureMin;
    tempmax2 = data.daily.data[2].temperatureMax;
    wind2 = data.daily.data[2].windSpeed;
    precip2=round(data.daily.data[2].precipProbability*100);
    icon2=data.daily.data[2].icon;
    
    tempmin3 = data.daily.data[3].temperatureMin;
    tempmax3 = data.daily.data[3].temperatureMax;
    wind3 = data.daily.data[3].windSpeed;
    precip3=round(data.daily.data[3].precipProbability*100);
    icon3=data.daily.data[3].icon;
  /*------Add values of weather-----*/
  //main box
  updateBox(toCelsius(average(tempmin,tempmax)),wind,precip);
  //Day 1
  $("#temp1").html(toCelsius(average(tempmin,tempmax)));
  $("#wind1").html(tokmh(wind));
  $("#precip1").html(precip);
    //Day 2
  $("#temp2").html(toCelsius(average(tempmin1,tempmax1)));
  $("#wind2").html(tokmh(wind1));
  $("#precip2").html(precip1);
    //Day 3
  $("#temp3").html(toCelsius(average(tempmin2,tempmax2)));
  $("#wind3").html(tokmh(wind2));
  $("#precip3").html(precip2);
   //Day 4
  $("#temp4").html(toCelsius(average(tempmin3,tempmax3)));
  $("#wind4").html(tokmh(wind3));
  $("#precip4").html(precip3);
  
  $("#temp").addClass("celsius");
  /*------Adds weekdays to weekboxes-----*/
  var weekdays = getDays();
  $("#wday1").html(weekdays[0]);
  $("#wday2").html(weekdays[1]);
  $("#wday3").html(weekdays[2]);
  $("#wday4").html(weekdays[3]);
  /*-----Add skycon icons------*/
  updateCanvas(icon,icon1,icon2,icon3);
  $("canvas").css("display","inline");
  $("canvas").css("opacity","1");
  endLoad();
}
function round(num)
{
  return Math.round(num);
}
function tokmh(mph)
{
  return round(mph*1.60934);
}
function getDays() // return 4 weekdays including today
{
    
  var weekdays = ["Sun","Mon","Tues","Wed",
                 "Thurs","Fri","Sat"];
  var date = new Date();
  var today = date.getDay();
  var arr = new Array(4);
  var index = 0;
  for(var i=0;i<arr.length;i++)
    {
      index = today + i;
      if(index <= 6)
        {
          arr[i] = weekdays[index];
        }
      else{
          index = index - 7;
          arr[i] = weekdays[index];
      }
    }
  return arr;
}
function average(a,b)
{
  return (a+b)/2;
}
function toCelsius(temp)
{
  return round((temp-32)*(5/9));
}
function toFahrenheit(temp)
{
  return round(temp*(9/5)+32);
}

function updateBox(temp,wind,precip)
{
  $("#temp").html(temp);
  $("#wind").html(tokmh(wind));
  $("#precip").html(precip);
  //don't forget icon
}

//
function testCanvas()
{
  var icons = new Skycons({"color":"black"});
  icons.set("box_canvas","rain");
  icons.play();
}
function updateCanvas(icon,icon1,icon2,icon3)
{
  skycons = new Skycons({"color":"#4A4A4A"});
  skycons.set("box_canvas",icon);
  skycons.set("canvas1",icon);
  skycons.set("canvas2",icon1);
  skycons.set("canvas3",icon2);
  skycons.set("canvas4",icon3);
  skycons.play();
}
function swapBox(day)
{
  //make box values reflect day
  if(day.localeCompare("day1") == 0)
    {
      updateBox(toCelsius(average(tempmin,tempmax)),wind,precip);
      //swap icon
      skycons.set("box_canvas",icon);
      //swap highlight
      //refresh first
      $(".days").css("background-color","#b6b6b6");
      $(".days").css("color","#4A4A4A");
      
      //hightlight 
      $("#day1").css("background-color","grey");
    }
  else if(day.localeCompare("day2") == 0)
    {
      //update box values
      $("#temp").html(toCelsius(average(tempmin1,tempmax1)));
      $("#wind").html(tokmh(wind1));
      $("#precip").html(precip1);
      skycons.set("box_canvas",icon1);
      $(".days").css("background-color","#b6b6b6");
      $(".days").css("color","#4A4A4A");
      $("#day2").css("background-color","grey");
    }
  else if(day.localeCompare("day3") == 0)
    {
      //update box values
      $("#temp").html(toCelsius(average(tempmin2,tempmax2)));
      $("#wind").html(tokmh(wind2));
      $("#precip").html(precip2);
      skycons.set("box_canvas",icon2);
      $(".days").css("background-color","#b6b6b6");
      $(".days").css("color","#4A4A4A");
      $("#day3").css("background-color","grey");
    }
    else if(day.localeCompare("day4") == 0)
    {
      //update box values
      $("#temp").html(toCelsius(average(tempmin3,tempmax3)));
      $("#wind").html(tokmh(wind3));
      $("#precip").html(precip3);
      skycons.set("box_canvas",icon3);
      $(".days").css("background-color","#b6b6b6");
      $(".days").css("color","#4A4A4A");
      $("#day4").css("background-color","grey");
    }
  //since new value is celsius
  $(".days").css("transition","0.35s ease");
  $("#tempSwitch").html("<strong>&#8451/&#8457</strong>");
  $("#temp").attr("class","celsius");
}
function startLoad()
{
  
  var loadIcons = new Skycons({"color":"#CCCCCC"});
  loadIcons.set("sun","clear-day");
  loadIcons.set("snow","snow");
  loadIcons.set("rain","sleet");
  loadIcons.set("breeze","wind");
  loadIcons.play();
}
function endLoad()
{
  $("#loading_table").css("opacity","0");
  $("#loading_table").css("transition","1s ease")
   $("body").css("background-color","#B6B6B6");
  $("#main").css("opacity","1");
  $("#main").css("transition","1s ease");
}
$(document).ready(function(){
  
  startLoad();
  if(navigator.geolocation)
    {
       navigator.geolocation.getCurrentPosition(getLocation);
    }
  else {alert("geolocation failed");}
 //temperature toggle
  $("#tempSwitch").click(function(){
    
    var state = $("#temp").attr("class");
    var temp = parseInt($("#temp").html());
    if(state.localeCompare("celsius") === 0)
      {
        $("#temp").html(toFahrenheit(temp));
        $("#temp").attr("class","fahrenheit");
        $("#tempSwitch").html("<strong>&#8457/&#8451</strong>");
      }
    else if(state.localeCompare("fahrenheit") === 0)
      {
        $("#temp").html(toCelsius(temp));
        $("#temp").attr("class","celsius");
        $("#tempSwitch").html("<strong>&#8451/&#8457</strong>");
      }
  });
    //week day toggle
  toggleDay = "day"
  $("#day1").click(function(){swapBox("day1");});
  $("#day2").click(function(){swapBox("day2");});
  $("#day3").click(function(){swapBox("day3");});
  $("#day4").click(function(){swapBox("day4");});
 
});