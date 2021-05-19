const express = require('express'),
  morgan = require('morgan'),
  app = express();

//movie catalogue
let movies = [
  {
    name: 'Enter the Void',
    director: 'Gaspar Noe'
  },
  {
    name: 'The Matrix',
    director: 'The Wachowskis'
  },
  {
    name: 'Spirited Away',
    director: 'Hayao Miyazaki'
  },
  {
    name: 'The Irishman',
    director: 'Martin Scorsese'
  },
  {
    name: 'Django Unchained',
    director: 'Quentin Tarantino'
  },
  {
    name: 'Scarface',
    director: 'Brian De Palma'
  },
  {
    name: 'The Beach',
    director: 'Danny Boyle'
  },
  {
    name: 'Voley',
    director: 'Martín Piroyansky'
  },
  {
    name: 'The Godfather',
    director: 'Francis Ford Coppola'
  },
  {
    name: 'Wakolda',
    director: 'Lucía Puenzo'
  }
];

let directors = [
  {
    name : "Gaspar Noé",
    bio : "Gaspar Noé is an Argentine filmmaker based in Paris, France. He is the son of Argentine painter, writer and intellectual Luis Felipe Noé.[3] He has directed five feature films: I Stand Alone (1998), Irréversible (2002), Enter the Void (2009), Love (2015), and Climax (2018).",
    born : "December 27, 1963"
  },
  {
    name : "Quentin Tarantino",
    bio : "Quentin Tarantino is an American film director, screenwriter, producer, and actor. His films are characterized by nonlinear storylines, dark humor, aestheticization of violence, extended scenes of dialogue, ensemble casts, references to popular culture and a wide variety of other films, eclectic soundtracks primarily containing songs and score pieces from the 1960s to the 1980s, alternate history, and features of neo-noir film.",
    born : "March 27, 1963"
  },
];

let genres = [
  {
    name : "Experimental",
    description : "Experimental film, experimental cinema, or avant-garde cinema is a mode of filmmaking that rigorously re-evaluates cinematic conventions and explores non-narrative forms or alternatives to traditional narratives or methods of working. Many experimental films, particularly early ones, relate to arts in other disciplines: painting, dance, literature and poetry, or arise from research and development of new technical resources. While some experimental films have been distributed through mainstream channels or even made within commercial studios, the vast majority have been produced on very low budgets with a minimal crew or a single person and are either self-financed or supported through small grants."
  },
  {
    name: "Drama",
    description : "Drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre, such as soap opera (operatic drama), police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy). These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods.",
    },
];

let users = [];

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
  let username = req.body;
  users.push(username);
  res.status(201).send('User successfully created');
});

//Updates user information and favourites movies. Not sure how to work with PUT!!!
app.put('/users/:username', (req, res) => {
  res.status(201).send('New information was successfully updated');
});


app.put('/users/:username/favourites', (req, res) => {
  res.status(201).send('Favourite movie was successfully updated');
});

//Delete
app.delete('/users/:username/favourites/[movies]',  (req, res) => {
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
