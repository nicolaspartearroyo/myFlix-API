const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

const bodyParser = require('body-parser');
const express = require('express'),
  morgan = require('morgan'),
  app = express();
app.use(bodyParser.json());
  
let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

//home welcome message 
app.get('/', (req, res) => {
res.send('Welcome to myFlix!');
});

//// GET all movies
app.get('/movies', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//// GET a movie by movie title
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Ttitle: req.body.Title })
    .then((movie) => {
      res.status(201).json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Create New User
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
  if (user) {
    return res.status(400).send(req.body.Username + ' already exists');
  } else {
    Users
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then((user) => { res.status(201).json(user) })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
  }
})
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// GET all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Update a user's info, by username
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

//Add a movie to a users favorites movies
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

//Delete a favorite movie from user
app.delete('/users/:Username/movies/:FavoriteMovies', (req, res) => {
  Users.findOneAndRemove({ FavoriteMovies: req.params.FavoriteMovies })
    .then((FavoriteMovie) => {
      if (!FavoriteMovie) {
        res.status(400).send(req.params.FavoriteMovies + ' was not found');
      } else {
        res.status(200).send(req.params.FavoriteMovies + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


//Delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


//Get all directors
app.get('/directors', (req, res) => {
  Directors.find()
    .then((Directors) => {
      res.status(201).json(Directors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


//GET a director by director's name
app.get('/directors/:Name', (req, res) => {
  Directors.findOne({ Name: req.params.Name })
    .then((Director) => {
      res.json(Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Get all genres
app.get('/genres', (req, res) => {
  Genres.find()
    .then((Genres) => {
      res.status(201).json(Genres);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET a Genre by Genre's name
app.get('/genres/:Name', (req, res) => {
  Genres.findOne({ Name: req.params.Name })
    .then((Genre) => {
      res.json(Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// app.get('/documentation', (req, res) => {
//   res.sendFile('public/documentation.html', { root: __dirname });
// });

// app.get('/movies', (req, res) => {
//   res.json(movies);
// });

// app.get('/movies/:name', (req, res) => {
//   res.json(movies.find((movies) =>
//   { return movies.name === req.params.name }));
// });

// app.get('/genres', (req, res) => {
//   res.json(genres);
// });

// app.get('/genres/:name', (req, res) => {
//   res.json(genres.find((genres) =>
//   { return genres.name === req.params.name }));
// });

// app.get('/directors', (req, res) => {
//   res.json(directors);
// });

// app.get('/directors/:name', (req, res) => {
//   res.json(directors.find((directors) =>
//   { return directors.name === req.params.name }));
// });

// //Updates user information and favourites movies. Not sure how to work with PUT!!!
// app.put('/users/:username', (req, res) => {
//   res.status(201).send('New information was successfully updated');
// });

// app.put('/users/:username/favourites', (req, res) => {
//   res.status(201).send('Favourite movie was successfully updated');
// });

// //Delete
// app.delete('/users/:username/favourites/:movies', (req, res) => {
//   res.status(201).send('Movie was deleted');
// });

// app.delete('/users/:username', (req, res) => {
//   res.status(201).send('User was successfully deleted');
// });

//
app.use(express.static('public'));
app.use(morgan('common'));

// //error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
