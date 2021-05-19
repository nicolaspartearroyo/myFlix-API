const express = require('express'),
  morgan = require('morgan'),
  app = express();

//movie catalogue
let movies = [
  {
    title: 'Enter the Void',
    director: 'Gaspar Noe'
  },
  {
    title: 'The Matrix',
    director: 'The Wachowskis'
  },
  {
    title: 'Spirited Away',
    director: 'Hayao Miyazaki'
  },
  {
    title: 'The Irishman',
    director: 'Martin Scorsese'
  },
  {
    title: 'Django Unchained',
    director: 'Quentin Tarantino'
  },
  {
    title: 'Scarface',
    director: 'Brian De Palma'
  },
  {
    title: 'The Beach',
    director: 'Danny Boyle'
  },
  {
    title: 'Voley',
    director: 'Martín Piroyansky'
  },
  {
    title: 'The Godfather',
    director: 'Francis Ford Coppola'
  },
  {
    title: 'Wakolda',
    director: 'Lucía Puenzo'
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:name', (req, res) => {
  res.json(movies.find((movies) =>
  { return movies.name === req.params.name }));
});

app.get('/genres', (req, res) => {
  res.json(genres);
});

app.get('/genres/:name', (req, res) => {
  res.json(genres.find((genres) =>
  { return genres.name === req.params.name }));
});

app.get('/directors', (req, res) => {
  res.json(directors);
});

app.get('/directors/:name', (req, res) => {
  res.json(directors.find((directors) =>
  { return directors.name === req.params.name }));
});

//Create New User
app.post('/users', (req, res) => {
    users.push(req.body);
    res.status(201).send('User successfully created');
  }
);

//Updates user information and favourites movies. Not sure how to work with PUT!!!
app.put('/users/:username', (req, res) => {
  res.status(201).send('New information was successfully updated');
});

app.put('/users/:username/favourites', (req, res) => {
  res.status(201).send('Favourite movie was successfully updated');
});

//Delete
app.delete('/users/:username/favourites',  (req, res) => {
  res.status(201).send('Movie was deleted');
});

app.delete('/users/:username',  (req, res) => {
  res.status(201).send('User was successfully deleted');
});


//
app.use(express.static('public'));
app.use(morgan('common'));


//error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
