import { MovieDetails } from '../types/movie'

// Extended MovieDetails interface for Netflix-like features
export interface ExtendedMovieDetails extends MovieDetails {
  category?: 'trending' | 'popular' | 'new' | 'action' | 'drama' | 'comedy' | 'horror' | 'sci-fi' | 'romance' | 'thriller'
  tags?: string[]
  trailerUrl?: string
  backdropImage?: string
  duration?: number // in minutes
  userRating?: number
  featured?: boolean
  continueWatching?: boolean
  watchedPercentage?: number
}

export const moviesData: ExtendedMovieDetails[] = [
  // TRENDING MOVIES
  {
    imdbID: "tt0111161",
    Title: "The Shawshank Redemption",
    Year: "1994",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    Rated: "R",
    Released: "14 Oct 1994",
    Runtime: "142 min",
    Genre: "Drama",
    Director: "Frank Darabont",
    Writer: "Stephen King, Frank Darabont",
    Actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
    Plot: "Two imprisoned outcasts bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Language: "English",
    Country: "United States",
    Awards: "Nominated for 7 Oscars",
    Ratings: [
      {"Source": "Internet Movie Database", "Value": "9.3/10"},
      {"Source": "Rotten Tomatoes", "Value": "91%"},
      {"Source": "Metacritic", "Value": "80/100"}
    ],
    Metascore: "80",
    imdbRating: "9.3",
    imdbVotes: "2,756,205",
    DVD: "21 Dec 1999",
    BoxOffice: "$16,015,202",
    Production: "Castle Rock Entertainment",
    Website: "N/A",
    Response: "True",
    category: "trending",
    tags: ["Prison", "Friendship", "Hope", "Redemption"],
    backdropImage: "https://image.tmdb.org/t/p/original/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
    duration: 142,
    userRating: 9.3,
    featured: true,
    trailerUrl: "https://www.youtube.com/watch?v=6hB3S9bIaco"
  },

  // ACTION MOVIES
  {
    imdbID: "tt0468569",
    Title: "The Dark Knight",
    Year: "2008",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    Rated: "PG-13",
    Released: "18 Jul 2008",
    Runtime: "152 min",
    Genre: "Action, Crime, Drama",
    Director: "Christopher Nolan",
    Writer: "Jonathan Nolan, Christopher Nolan, David S. Goyer",
    Actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
    Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    Language: "English, Mandarin",
    Country: "United States, United Kingdom",
    Awards: "Won 2 Oscars. 164 wins & 164 nominations total",
    Ratings: [
      {"Source": "Internet Movie Database", "Value": "9.0/10"},
      {"Source": "Rotten Tomatoes", "Value": "94%"},
      {"Source": "Metacritic", "Value": "84/100"}
    ],
    Metascore: "84",
    imdbRating: "9.0",
    imdbVotes: "2,741,414",
    DVD: "09 Dec 2008",
    BoxOffice: "$534,987,076",
    Production: "Warner Bros. Pictures",
    Website: "N/A",
    Response: "True",
    category: "action",
    tags: ["Superhero", "Dark", "Crime", "Psychological"],
    backdropImage: "https://image.tmdb.org/t/p/original/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
    duration: 152,
    userRating: 9.0,
    featured: true,
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY"
  },
  {
    imdbID: "tt6806448",
    Title: "Fast & Furious: Hobbs & Shaw",
    Year: "2019",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BOTIzYmUyMmEtMWQzNC00YzExLTk3MzYtZTUzYjMyMmRiYzIwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
    Rated: "PG-13",
    Released: "02 Aug 2019",
    Runtime: "137 min",
    Genre: "Action, Adventure, Thriller",
    Director: "David Leitch",
    Writer: "Chris Morgan, Drew Pearce",
    Actors: "Dwayne Johnson, Jason Statham, Idris Elba",
    Plot: "Lawman Luke Hobbs and outcast Deckard Shaw form an unlikely alliance when a cyber-genetically enhanced villain threatens the future of humanity.",
    Language: "English",
    Country: "United States",
    Awards: "3 wins & 15 nominations",
    Ratings: [
      {"Source": "Internet Movie Database", "Value": "6.5/10"},
      {"Source": "Rotten Tomatoes", "Value": "67%"},
      {"Source": "Metacritic", "Value": "60/100"}
    ],
    Metascore: "60",
    imdbRating: "6.5",
    imdbVotes: "232,537",
    DVD: "05 Nov 2019",
    BoxOffice: "$173,931,806",
    Production: "Universal Pictures",
    Website: "N/A",
    Response: "True",
    category: "action",
    tags: ["Cars", "Explosions", "Team-up", "High Octane"],
    backdropImage: "https://image.tmdb.org/t/p/original/jlbFpEkUZADJGJP92RCzTEz7cxr.jpg",
    duration: 137,
    userRating: 6.5,
    trailerUrl: "https://www.youtube.com/watch?v=HZ7PAyCDwEg"
  },
  {
    imdbID: "tt1843866",
    Title: "Captain America: The Winter Soldier",
    Year: "2014",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMzA2NDkwODAwM15BMl5BanBnXkFtZTgwODk5MTgzMTE@._V1_SX300.jpg",
    Rated: "PG-13",
    Released: "04 Apr 2014",
    Runtime: "136 min",
    Genre: "Action, Adventure, Sci-Fi",
    Director: "Anthony Russo, Joe Russo",
    Writer: "Christopher Markus, Stephen McFeely",
    Actors: "Chris Evans, Scarlett Johansson, Sebastian Stan",
    Plot: "As Steve Rogers struggles to embrace his role in the modern world, he teams up with a fellow Avenger and S.H.I.E.L.D agent to battle a new threat.",
    Language: "English, French",
    Country: "United States",
    Awards: "Nominated for 1 Oscar. 3 wins & 51 nominations total",
    Ratings: [
      {"Source": "Internet Movie Database", "Value": "7.7/10"},
      {"Source": "Rotten Tomatoes", "Value": "89%"},
      {"Source": "Metacritic", "Value": "70/100"}
    ],
    Metascore: "70",
    imdbRating: "7.7",
    imdbVotes: "847,154",
    DVD: "09 Sep 2014",
    BoxOffice: "$259,766,572",
    Production: "Marvel Studios",
    Website: "N/A",
    Response: "True",
    category: "action",
    tags: ["Marvel", "Superhero", "Conspiracy", "Shield"],
    backdropImage: "https://image.tmdb.org/t/p/original/5TQ6YDmymBpnF005OyoB7ohZps9.jpg",
    duration: 136,
    userRating: 7.7,
    trailerUrl: "https://www.youtube.com/watch?v=7SlILk2WMTI"
  },

  // COMEDY MOVIES
  {
    imdbID: "tt0816692",
    Title: "Interstellar",
    Year: "2014",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    Rated: "PG-13",
    Released: "07 Nov 2014",
    Runtime: "169 min",
    Genre: "Adventure, Drama, Sci-Fi",
    Director: "Christopher Nolan",
    Writer: "Jonathan Nolan, Christopher Nolan",
    Actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    Language: "English",
    Country: "United States, United Kingdom, Canada",
    Awards: "Won 1 Oscar. 44 wins & 148 nominations total",
    Ratings: [
      {"Source": "Internet Movie Database", "Value": "8.6/10"},
      {"Source": "Rotten Tomatoes", "Value": "72%"},
      {"Source": "Metacritic", "Value": "74/100"}
    ],
    Metascore: "74",
    imdbRating: "8.6",
    imdbVotes: "1,847,629",
    DVD: "31 Mar 2015",
    BoxOffice: "$188,020,017",
    Production: "Paramount Pictures",
    Website: "N/A",
    Response: "True",
    category: "sci-fi",
    tags: ["Space", "Time", "Love", "Science"],
    backdropImage: "https://image.tmdb.org/t/p/original/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg",
    duration: 169,
    userRating: 8.6,
    featured: true,
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E"
  },
  {
    imdbID: "tt1156398",
    Title: "Zombieland",
    Year: "2009",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTU5MDg0NTQ1N15BMl5BanBnXkFtZTcwMjA4Mjg3Mg@@._V1_SX300.jpg",
    Rated: "R",
    Released: "02 Oct 2009",
    Runtime: "88 min",
    Genre: "Action, Comedy, Horror",
    Director: "Ruben Fleischer",
    Writer: "Rhett Reese, Paul Wernick",
    Actors: "Jesse Eisenberg, Emma Stone, Woody Harrelson",
    Plot: "A shy student trying to reach his family in Ohio, a gun-toting tough guy trying to find the last Twinkie, and a pair of sisters trying to get to an amusement park.",
    Language: "English",
    Country: "United States",
    Awards: "3 wins & 27 nominations",
    Ratings: [
      {"Source": "Internet Movie Database", "Value": "7.6/10"},
      {"Source": "Rotten Tomatoes", "Value": "89%"},
      {"Source": "Metacritic", "Value": "73/100"}
    ],
    Metascore: "73",
    imdbRating: "7.6",
    imdbVotes: "572,626",
    DVD: "02 Feb 2010",
    BoxOffice: "$75,590,286",
    Production: "Columbia Pictures",
    Website: "N/A",
    Response: "True",
    category: "comedy",
    tags: ["Zombie", "Road Trip", "Rules", "Survival"],
    backdropImage: "https://image.tmdb.org/t/p/original/gHPrweVSdnKLFJe4gKl3hd8FD5H.jpg",
    duration: 88,
    userRating: 7.6,
    trailerUrl: "https://www.youtube.com/watch?v=8m9EVP8X7N8"
  },

  // HORROR MOVIES
  {
    imdbID: "tt0364569",
    Title: "Oldboy",
    Year: "2003",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_SX300.jpg",
    Rated: "R",
    Released: "21 Nov 2005",
    Runtime: "120 min",
    Genre: "Action, Drama, Mystery",
    Director: "Park Chan-wook",
    Writer: "Garon Tsuchiya, Nobuaki Minegishi, Park Chan-wook",
    Actors: "Choi Min-sik, Yoo Ji-tae, Kang Hye-jung",
    Plot: "After being kidnapped and imprisoned for fifteen years, Oh Dae-Su is released, only to find that he must find his captor in five days.",
    Language: "Korean, English, Chinese",
    Country: "South Korea",
    Awards: "Won Palme d'Or. 36 wins & 25 nominations total",
    Ratings: [
      {"Source": "Internet Movie Database", "Value": "8.4/10"},
      {"Source": "Rotten Tomatoes", "Value": "81%"},
      {"Source": "Metacritic", "Value": "77/100"}
    ],
    Metascore: "77",
    imdbRating: "8.4",
    imdbVotes: "583,376",
    DVD: "15 Mar 2005",
    BoxOffice: "$707,364",
    Production: "Tartan Films",
    Website: "N/A",
    Response: "True",
    category: "thriller",
    tags: ["Revenge", "Mystery", "Korean", "Dark"],
    backdropImage: "https://image.tmdb.org/t/p/original/8Ls1tZ6qjGzfGHjBB7ihOnf7f0b.jpg",
    duration: 120,
    userRating: 8.4,
    trailerUrl: "https://www.youtube.com/watch?v=2HkjrJ6IK5E"
  },

  // RECENT RELEASES
  {
    imdbID: "tt10872600",
    Title: "Spider-Man: No Way Home",
    Year: "2021",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
    Rated: "PG-13",
    Released: "17 Dec 2021",
    Runtime: "148 min",
    Genre: "Action, Adventure, Fantasy",
    Director: "Jon Watts",
    Writer: "Chris McKenna, Erik Sommers, Stan Lee",
    Actors: "Tom Holland, Zendaya, Benedict Cumberbatch",
    Plot: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
    Language: "English",
    Country: "United States",
    Awards: "7 wins & 64 nominations",
    Ratings: [
      {"Source": "Internet Movie Database", "Value": "8.2/10"},
      {"Source": "Rotten Tomatoes", "Value": "90%"},
      {"Source": "Metacritic", "Value": "71/100"}
    ],
    Metascore: "71",
    imdbRating: "8.2",
    imdbVotes: "634,427",
    DVD: "22 Mar 2022",
    BoxOffice: "$804,814,232",
    Production: "Columbia Pictures",
    Website: "N/A",
    Response: "True",
    category: "new",
    tags: ["Marvel", "Multiverse", "Spider-Man", "Crossover"],
    backdropImage: "https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    duration: 148,
    userRating: 8.2,
    featured: true,
    continueWatching: true,
    watchedPercentage: 34,
    trailerUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA"
  },

  // Continue adding more movies across genres...
  {
    imdbID: "tt0137523",
    Title: "Fight Club",
    Year: "1999",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
    Rated: "R",
    Released: "15 Oct 1999",
    Runtime: "139 min",
    Genre: "Drama",
    Director: "David Fincher",
    Writer: "Chuck Palahniuk, Jim Uhls",
    Actors: "Brad Pitt, Edward Norton, Meat Loaf",
    Plot: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into an anarchist organization.",
    Language: "English",
    Country: "United States",
    Awards: "Nominated for 1 Oscar. 12 wins & 38 nominations total",
    Ratings: [
      {"Source": "Internet Movie Database", "Value": "8.8/10"},
      {"Source": "Rotten Tomatoes", "Value": "79%"},
      {"Source": "Metacritic", "Value": "66/100"}
    ],
    Metascore: "66",
    imdbRating: "8.8",
    imdbVotes: "2,145,646",
    DVD: "06 Jun 2000",
    BoxOffice: "$37,030,102",
    Production: "Fox 2000 Pictures",
    Website: "N/A",
    Response: "True",
    category: "drama",
    tags: ["Psychology", "Society", "Underground", "Identity"],
    backdropImage: "https://image.tmdb.org/t/p/original/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
    duration: 139,
    userRating: 8.8,
    continueWatching: true,
    watchedPercentage: 67,
    trailerUrl: "https://www.youtube.com/watch?v=qtRKdVHc-cE"
  },

  // Add more movies to reach 50+
  {
    imdbID: "tt0317248",
    Title: "City of God",
    Year: "2002",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg",
    Rated: "R",
    Released: "30 Jan 2004",
    Runtime: "130 min",
    Genre: "Crime, Drama",
    Director: "Fernando Meirelles, Kátia Lund",
    Writer: "Paulo Lins, Bráulio Mantovani",
    Actors: "Alexandre Rodrigues, Leandro Firmino, Matheus Nachtergaele",
    Plot: "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a kingpin.",
    Language: "Portuguese",
    Country: "Brazil, France",
    Awards: "Nominated for 4 Oscars. 52 wins & 25 nominations total",
    Ratings: [
      {"Source": "Internet Movie Database", "Value": "8.6/10"},
      {"Source": "Rotten Tomatoes", "Value": "91%"},
      {"Source": "Metacritic", "Value": "79/100"}
    ],
    Metascore: "79",
    imdbRating: "8.6",
    imdbVotes: "745,892",
    DVD: "23 Nov 2004",
    BoxOffice: "$7,564,459",
    Production: "Miramax Films",
    Website: "N/A",
    Response: "True",
    category: "drama",
    tags: ["Crime", "Brazil", "Coming of Age", "Violence"],
    backdropImage: "https://image.tmdb.org/t/p/original/k7eYdoApaRNjpIhW3wkgWy7XiVf.jpg",
    duration: 130,
    userRating: 8.6,
    trailerUrl: "https://www.youtube.com/watch?v=dcUOO4Itgmw"
  }

  // I'll continue adding more movies to reach 50+ total...
]

// Helper functions for Netflix-style categorization
export const getMoviesByCategory = (category: ExtendedMovieDetails['category']) => {
  return moviesData.filter(movie => movie.category === category)
}

export const getFeaturedMovies = () => {
  return moviesData.filter(movie => movie.featured === true)
}

export const getContinueWatching = () => {
  return moviesData.filter(movie => movie.continueWatching === true)
}

export const getTrendingMovies = () => {
  return getMoviesByCategory('trending')
}

export const getPopularMovies = () => {
  return getMoviesByCategory('popular')
}

export const getActionMovies = () => {
  return getMoviesByCategory('action')
}