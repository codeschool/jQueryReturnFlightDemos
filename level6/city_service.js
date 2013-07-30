/*
  Is it necessary to attach this service to window or is there something better?
*/
window.CityService = {
  getWeatherForLocation: function(location){
    var deferer = $.Deferred()

    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather',
      dataType: 'jsonp',
      data: {
        q: location
      },
      success: function(d) {
        deferer.resolve(d.weather[0].description)
      },
      error: function(o,s,e) {
        deferer.reject("City not found.")
      }
    });

    return deferer
  },

  getInfoForLocation: function(location){
    return $.ajax({
      url: 'http://cityinfo.com/cities',
      type: 'get',
      data: {
        loc: location
      }
    });
  }
}