const express = require('express'),
  morgan = require('morgan');
const app = express();

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
  res.send('Welcome to my movies suggestion!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(movies);
});


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});


app.use(express.static('public'));
app.use(morgan('common'));


//error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
