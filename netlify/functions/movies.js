// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  // console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre


  if (year == undefined || genre == undefined || year ==`` || genre ==``) {
    console.log(`nope`)
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Nope!` // a string of data
    }
  } else {
    let returnValue = {
      numResults: 0,
      movies: []
    }

    // create a new object to hold the count and movie data
    let moviesToReturn = {}

    // start with an empty Array for the movies
    moviesToReturn.movies = []
    
    // loop through all movies
    for (let i=0; i < moviesFromCsv.length; i++) {
      // store each movie in memory
      let movie = moviesFromCsv[i]

      // check if there is a genre and runtime:
      if (movie.runtimeMinutes != `\\N` && movie.genres != `\\N` && year == movie.startYear && genre == movie.genres) {

        // make an object that only shows me title, year and genre from this specific movie I'm looking at 
        // make an object to store data, store each item of the data
        let movieObject = {
          title: movie.primaryTitle,
          year: movie.startYear,
          genre: movie.genres
        }

        // add the listing to the Array of listings to return
        moviesToReturn.movies.push(movieObject)
      }
    }
    console.log(moviesToReturn)

    // add the number of listings to the returned listings Object
    console.log(`It returned `+ moviesToReturn.movies.length)
    moviesToReturn.numResults = moviesToReturn.movies.length
  


    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(moviesToReturn) // a string of data
    }

s
  }

    
  
  
}