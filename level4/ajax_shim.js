$.ajax = function(options){
  var possibleReturns = {
    get: {
      '/favorites':[
        {
          name: 'London, UK',
          image: '../assets/photos/london.jpg'
        },
        {
          name: 'Paris, France',
          image: '../assets/photos/paris.jpg'
        },
        {
          name: 'Madrid, Spain',
          image: '../assets/photos/madrid.jpg'
        }
      ],
      '/favorite/1': {
        name: 'London, UK',
        image: '../assets/photos/london.jpg'
      },
      '/status': [
        {
          name: 'JFK - New York, NY',
          status: 'Departing Location'
        },
        {
          name: 'DEN - Denver, CO',
          status: 'Connecting Flight'
        },
        {
          name: 'SFO - San Francisco, CA',
          status: 'Destination Location'
        }
      ]
    },
    post: {}
  };

  var deferer = $.Deferred();

  // Normalize type options
  if( !options.type || options.type.match(/^get$/i) ) {
    options.type = 'get';
  } else if( options.type.match(/^post$/i) ) {
    options.type = 'post';
  }

  // Simulate an api with random time for result between 400 and 2000ms
  setTimeout(function(){
    var response = possibleReturns[options.type][options.url];
    if(response) {
      deferer.resolve(response);
    } else {
      deferer.reject('Error: 404');
    }
  }, Math.floor( (Math.random() * 1600) + 400 ));

  // set callbacks
  if(options.success) {
    deferer.done(options.success);
  }

  if(options.error) {
    deferer.fail(options.error);
  }

  deferer.success = deferer.done;
  deferer.fail = deferer.error;
  deferer.complete = deferer.always;

  return deferer;
}