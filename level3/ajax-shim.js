$.ajax = function(url, options){
  var response = {
    totalPrice: 1196.00,
    nights: 4,
    location: 'Paris, France',
    confirmation: 'awesome-trip-345feab'
  }

  var deferer = $.Deferred()

  // Simulate an api with random time for result between 400 and 2000ms
  setTimeout(function(){
    deferer.resolve(response)
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