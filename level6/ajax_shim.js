$.ajax = function(options){
  var possibleReturns = {
    get: {
      '/cities?q=london,uk': {
        name: 'London of the United Kingdom',
        image: 'images/london.jpg',
        description: 'They love their football'
      },
      '/cities?q=paris,france': {
        name: 'Paris, France home of the Eiffel Tower',
        image: 'images/paris.jpg',
        description: 'Pastries.. everywhere'
      },
      '/cities?q=madrid,spain': {
        name: 'Madrid, Spain where bulls run the streets',
        image: 'images/madrid.jpg',
        description: 'They speak spanish here quite often'
      },
      '/weather?q=london,uk': {
        code: 200,
        weather: "scattered clouds"
      },
      '/weather?q=paris,france': {
        code: 200,
        weather: "overcast clouds"
      },
      '/weather?q=Paris,France': {
        code: 200,
        weather: "overcast clouds"
      },
      '/weather?q=madrid,spain': {
        code: 200,
        weather: "light rain"
      }
    },
    post: {}
  }

  var deferer = $.Deferred()

  // Normalize type options
  if( !options.type || options.type.match(/^get$/i) ) {
    options.type = 'get'
  } else if( options.type.match(/^post$/i) ) {
    options.type = 'post'
  }


  // Simulate an api with random time for result between 400 and 2000ms
  setTimeout(function(){
    var responseData = options.data['loc'] || options.data['q']
    var response = possibleReturns[options.type][options.url + '?q=' + responseData.replace(/\s/, '')]
    if(response) {
      deferer.resolve(response)
    } else {
      if(options.url.matches(/\/destination/)) {
        deferer.reject('Error: Destination not found')
      } else {
        deferer.reject('Error: 404')
      }
    }
  }, Math.floor( (Math.random() * 1600) + 400 ))

  // set callbacks
  if(options.success) {
    deferer.done(options.success)
  }

  if(options.error) {
    deferer.fail(options.error)
  }

  deferer.success = deferer.done
  deferer.fail = deferer.error
  deferer.complete = deferer.always

  return deferer
}