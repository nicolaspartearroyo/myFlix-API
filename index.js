const express = require('express'),
  morgan = require('morgan'),
  app = express();

//movie catalogue
let movies = [
  {
    name: 'Enter the Void',
    director: 'Gaspar Noe',
    genre: 'Drama',
    descritpion: "Tokyo's nasty underside, seen primarily through the eyes of Oscar, a heavy drug user, whose sister Linda is a stripper. Oscar also has flashbacks to his childhood when trauma upends the siblings. Oscar's drug-fed hallucinations alter Tokyo's already-disconcerting nights, and after the police shoot him, he can float above and look down: on his sister's sorrow, on the rooms of a love hotel, and on life at even a molecular level. The spectrum's colors can be beautiful; it's people's colorless lives that can be ugly. And what of afterlife, is there more than a void?",
    img: 'https://en.wikipedia.org/wiki/Enter_the_Void#/media/File:Enter-the-void-poster.png',
    url: 'https://en.wikipedia.org/wiki/Enter_the_Void'
  },
  {
    name: 'The Matrix',
    director: 'The Wachowskis',
    genre: 'Cyberpunk',
    descritpion: 'Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. As a rebel against the machines, Neo must confront the agents: super-powerful computer programs devoted to stopping Neo and the entire human rebellion.',
    img: 'https://en.wikipedia.org/wiki/The_Matrix#/media/File:The_Matrix_Poster.jpg',
    url: 'https://en.wikipedia.org/wiki/The_Matrix'
  },
  {
    name: 'Spirited Away',
    director: 'Hayao Miyazaki',
    genre: 'Anime',
    descritpion: "Chihiro and her parents are moving to a small Japanese town in the countryside, much to Chihiro's dismay. On the way to their new home, Chihiro's father makes a wrong turn and drives down a lonely one-lane road which dead-ends in front of a tunnel. Her parents decide to stop the car and explore the area. They go through the tunnel and find an abandoned amusement park on the other side, with its own little town. When her parents see a restaurant with great-smelling food but no staff, they decide to eat and pay later. However, Chihiro refuses to eat and decides to explore the theme park a bit more. She meets a boy named Haku who tells her that Chihiro and her parents are in danger, and they must leave immediately. She runs to the restaurant and finds that her parents have turned into pigs. In addition, the theme park turns out to be a town inhabited by demons, spirits, and evil gods. At the center of the town is a bathhouse where these creatures go to relax. The owner of the bathhouse",
    img: 'https://en.wikipedia.org/wiki/Spirited_Away#/media/File:Spirited_Away_Japanese_poster.png',
    url: 'https://en.wikipedia.org/wiki/Spirited_Away'
  },
  {
    name: 'The Irishman',
    director: 'Martin Scorsese',
    genre: 'Crime',
    descritpion: 'Frank "The Irishman" Sheeran is a man with a lot on his mind. The former labor union high official and hitman, learned to kill serving in Italy during the Second World War. He now looks back on his life and the hits that defined his mob career, maintaining connections with the Bufalino crime family. In particular, the part he claims to have played in the disappearance of his life-long friend, Jimmy Hoffa, the former president of the International Brotherhood of Teamsters, who mysteriously vanished in late July 1975 at the age of 62.',
    img: 'https://en.wikipedia.org/wiki/The_Irishman#/media/File:The_Irishman_poster.jpg',
    url: 'https://en.wikipedia.org/wiki/The_Irishman'
  },
  {
    name: 'Django Unchained',
    director: 'Quentin Tarantino',
    genre: 'Western',
    descritpion: "In 1858, a bounty-hunter named King Schultz seeks out a slave named Django and buys him because he needs him to find some men he is looking for. After finding them, Django wants to find his wife, Broomhilda, who along with him were sold separately by his former owner for trying to escape. Schultz offers to help him if he chooses to stay with him and be his partner. Eventually they learn that she was sold to a plantation in Mississippi. Knowing they can't just go in and say they want her, they come up with a plan so that the owner will welcome them into his home and they can find a way.",
    img: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Django_Unchained_Poster.jpg',
    url: 'https://en.wikipedia.org/wiki/Django_Unchained'
  },
  {
    name: 'Scarface',
    director: 'Brian De Palma',
    genre: 'Crime',
    descritpion: "Tony Montana manages to leave Cuba during the Mariel exodus of 1980. He finds himself in a Florida refugee camp but his friend Manny has a way out for them: undertake a contract killing and arrangements will be made to get a green card. He's soon working for drug dealer Frank Lopez and shows his mettle when a deal with Colombian drug dealers goes bad. He also brings a new level of violence to Miami. Tony is protective of his younger sister but his mother knows what he does for a living and disowns him. Tony is impatient and wants it all however, including Frank's empire and his mistress Elvira Hancock. Once at the top however, Tony's outrageous actions make him a target and everything comes crumbling down.",
    img: 'https://en.wikipedia.org/wiki/Scarface_(1983_film)#/media/File:Scarface_-_1983_film.jpg',
    url: 'https://en.wikipedia.org/wiki/Scarface_(1983_film)'
  },
  {
    name: 'The Beach',
    director: 'Danny Boyle',
    genre: 'Drama',
    descritpion: "Garland's novel centers on a young nicotine-addicted traveler named Richard, an avid pop-culture buff with a particular love for video games and Vietnam War movies. While at a hotel in Bangkok, he finds a map left by his strange, whacked-out neighbor, who just committed suicide. The map supposedly leads to a legendary island paradise where some other wayward souls have settled. ",
    img: 'https://en.wikipedia.org/wiki/The_Beach_(film)#/media/File:The_Beach_film.jpg',
    url: 'https://en.wikipedia.org/wiki/The_Beach_(film)'
  },
  {
    name: 'Volley',
    director: 'Martín Piroyansky',
    genre: 'Comedy',
    descritpion: "Six friends spend New Year's at a house by the river. The host, Nicolas brings his ex-girlfriend Pilar with whom he just had a one-night stand. But, he hits on every other girl including the brooding Cata and the voluptuous Belén. When Nicolas unexpectedly falls into bed and then into love with the high-strung Manuela who also happens to be his best friend's girlfriend, the last laugh is on him.",
    img: 'https://en.wikipedia.org/wiki/Volley_(film)#/media/File:Volley_poster.jpg',
    url: 'https://en.wikipedia.org/wiki/Volley_(film)'
  },
  {
    name: 'The Godfather',
    director: 'Francis Ford Coppola',
    genre: 'Crime',
    descritpion: "The Godfather Don Vito Corleone is the head of the Corleone mafia family in New York. He is at the event of his daughter's wedding. Michael, Vito's youngest son and a decorated WW II Marine is also present at the wedding. Michael seems to be uninterested in being a part of the family business. Vito is a powerful man, and is kind to all those who give him respect but is ruthless against those who do not. But when a powerful and treacherous rival wants to sell drugs and needs the Don's influence for the same, Vito refuses to do it. What follows is a clash between Vito's fading old values and the new ways which may cause Michael to do the thing he was most reluctant in doing and wage a mob war against all the other mafia families which could tear the Corleone family apart.",
    img: 'https://en.wikipedia.org/wiki/The_Godfather#/media/File:Godfather_ver1.jpg',
    url: 'https://en.wikipedia.org/wiki/The_Godfather'
  },
  {
    name: 'Wakolda',
    director: 'Lucía Puenzo',
    genre: 'Drama',
    descritpion: "Patagonia, 1960. A German doctor (Alex Brendemühl) meets an Argentinean family and follows them on a long desert road to a small town where the family will be starting a new life. Eva (Natalia Oreiro), Enzo (Diego Peretti) and their three children welcome the doctor into their home and entrust their young daughter, Lilith (Florencia Bado), to his care, not knowing that they are harboring one of the most dangerous criminals in the world. At the same time, Israeli agents are desperately looking to bring THE GERMAN DOCTOR to justice. Based on filmmaker Lucía Puenzo's (XXY) fifth novel, the story follows Josef Mengele, the Angel of Death, a German SS officer and a physician at the Auschwitz concentration camp, in the years he spent hiding, along with many other Nazi's, in South America following his escape from Germany. Mengele was considered to be one of WWII's most heinous Nazi war criminals.",
    img: 'https://en.wikipedia.org/wiki/The_German_Doctor#/media/File:Wakolda.jpg',
    url: 'https://en.wikipedia.org/wiki/The_German_Doctor'
  }
];

let directors = [
  {
    name : "Gaspar Noé",
    bio : "Gaspar Noé is an Argentine filmmaker based in Paris, France. He is the son of Argentine painter, writer and intellectual Luis Felipe Noé. He has directed five feature films: I Stand Alone (1998), Irréversible (2002), Enter the Void (2009), Love (2015), and Climax (2018).",
    born : "December 27, 1963"
  },
  {
    name : "The Wachowskis",
    bio : "Lana Wachowski and Lilly Wachowski are American film and television directors, writers and producers. The sisters are both trans women. Collectively known as the Wachowskis, the sisters have worked as a writing and directing team through most of their careers. They made their directing debut in 1996 with Bound, and achieved fame with their second film The Matrix (1999), a major box office success for which they won the Saturn Award for Best Director. They wrote and directed its two sequels: The Matrix Reloaded and The Matrix Revolutions (both in 2003), and were involved in the writing and production of other works in Matrix franchise. Following the commercial success of the Matrix series, the Wachowskis wrote and produced the 2005 film V for Vendetta (an adaptation of the graphic novel by Alan Moore & David Lloyd), and in 2008 released the film Speed Racer, a live-action adaptation of the Japanese anime series. Their next film, Cloud Atlas, based on the novel by David Mitchell and co-written and co-directed by Tom Tykwer, was released in 2012. Their film Jupiter Ascending and the Netflix series Sense8, which they co-created with J. Michael Straczynski, debuted in 2015; the second season of Sense8 ended the series in 2018 and was Lana's first major creative undertaking without Lilly. Since the series finale of Sense8, the Wachowskis have been working separately on different projects: Lilly is writing and executive-producing Showtime's Work in Progress (2019) with creators Abby McEnany and Tim Mason, while Lana is filming a fourth Matrix film planned for 2021, which she wrote with Mitchell and Aleksandar Hemon.",
    born : "June 21, 1965 and December 29, 1967"
  },
  {
    name : "Hayao Miyazaki",
    bio : "Hayao Miyazaki is a Japanese animator, director, producer, screenwriter, author, and manga artist. A co-founder of Studio Ghibli, a film and animation studio, he has attained international acclaim as a masterful storyteller and as a maker of animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation. Born in Bunkyō ward of Tokyo, Miyazaki expressed interest in manga and animation from an early age, and he joined Toei Animation in 1963. Miyazaki co-founded Studio Ghibli in 1985. He directed numerous films with Ghibli, including Castle in the Sky (1986), My Neighbor Totoro (1988), Kiki's Delivery Service (1989), and Porco Rosso (1992). The films were met with critical and commercial success in Japan. Miyazaki's film Princess Mononoke was the first animated film ever to win the Japan Academy Prize for Picture of the Year, and briefly became the highest-grossing film in Japan following its release in 1997; its distribution to the Western world greatly increased Ghibli's popularity and influence outside Japan. His 2001 film Spirited Away became the highest-grossing film in Japanese history,[b] winning the Academy Award for Best Animated Feature at the 75th Academy Awards, and is frequently ranked among the greatest films of the 2000s. Miyazaki's later films—Howl's Moving Castle (2004), Ponyo (2008), and The Wind Rises (2013)—also enjoyed critical and commercial success. Following the release of The Wind Rises, Miyazaki announced his retirement from feature films, though he returned to work on the upcoming feature film How Do You Live? in 2016.",
    born : "January 5, 1941"
  },
  {
    name : "Martin Scorsese",
    bio : "Martin Charles Scorsese is an American film director, producer, screenwriter, and actor. One of the major figures of the New Hollywood era, he is widely regarded as one of the most significant and influential directors in film history. Scorsese's body of work explores themes such as Italian-American identity, Catholic concepts of guilt and redemption, faith, machismo, nihilism, crime and sectarianism. Many of his films are known for their depiction of violence and the liberal use of profanity. Scorsese has also dedicated his life to film preservation and film restoration by founding the nonprofit organization The Film Foundation in 1990, as well as the World Cinema Foundation in 2007 and the African Film Heritage Project in 2017",
    born : "November 17, 1942"
  },
  {
    name : "Quentin Tarantino",
    bio : "Quentin Tarantino is an American film director, screenwriter, producer, and actor. His films are characterized by nonlinear storylines, dark humor, aestheticization of violence, extended scenes of dialogue, ensemble casts, references to popular culture and a wide variety of other films, eclectic soundtracks primarily containing songs and score pieces from the 1960s to the 1980s, alternate history, and features of neo-noir film.",
    born : "March 27, 1963"
  },
  {
    name : "Brian De Palma",
    bio : "Brian Russell De Palma is an American film director and screenwriter. With a career spanning over 50 years, he is best known for his work in the suspense, crime and psychological thriller genres. His prominent films include mainstream box office hits such as Carrie (1976), Dressed to Kill (1980), Scarface (1983), The Untouchables (1987), and Mission: Impossible (1996), as well as cult favorites such as Sisters (1972), Phantom of the Paradise (1974), Blow Out (1981), Body Double (1984), Casualties of War (1989), Carlito's Way (1993), and Femme Fatale (2002). De Palma is often cited as a leading member of the New Hollywood generation of film directors. His directing style often makes use of quotations from other films or cinematic styles, and bears the influence of filmmakers such as Alfred Hitchcock and Jean-Luc Godard.[2] His films have been criticised for their violence and sexual content but have also been championed by prominent American critics such as Roger Ebert and Pauline Kael.",
    born : "September 11, 1940"
  },
  {
    name : "Francis Ford Coppola",
    bio : "Francis Ford Coppola is an American film director, producer and screenwriter. He was a central figure in the New Hollywood filmmaking movement of the 1960s and 1970s, and is widely considered to be one of the greatest filmmakers of all time. His accolades include five Academy Awards, six Golden Globe Awards, two Palmes d'Or, and a British Academy Film Award. After directing The Rain People in 1969, Coppola co-wrote Patton (1970), earning the Academy Award for Best Original Screenplay along with Edmund H. North. Coppola's reputation as a filmmaker was cemented with the release of The Godfather (1972). The film revolutionized movie-making in the gangster genre[6] and was adored by the public and critics alike. The Godfather won three Academy Awards: Best Picture, Best Actor, and Best Adapted Screenplay (shared with Mario Puzo). The Godfather Part II, which followed in 1974, became the first sequel to win the Academy Award for Best Picture. Highly regarded by critics, the film brought Coppola three more Academy Awards: Best Adapted Screenplay, Best Director, and Best Picture, and made him the second director (after Billy Wilder) to be so honored three times for the same film. The Conversation, which Coppola directed, produced and wrote, was released that same year, winning the Palme d'Or at the Cannes Film Festival. His next film, Apocalypse Now (1979), which notoriously had a lengthy and strenuous production, was widely acclaimed for its vivid depiction of the Vietnam War. The film won the Palme d'Or, making Coppola one of only eight filmmakers to have won that award twice.",
    born : "April 7, 1939"
  },
  {
    name : "Martín Piroyansky",
    bio : "Martín Piroyansky is an Argentine actor and film director. He appeared in more than forty films since 1998.",
    born : "March 3, 1986"
  },
  {
    name : "Danny Boyle",
    bio : "Daniel Francis Boyle is an English film, television, and stage director and producer. He is known for his work on films including Shallow Grave, Trainspotting and its sequel T2 Trainspotting, The Beach, 28 Days Later, Sunshine, Slumdog Millionaire, 127 Hours, Steve Jobs and Yesterday. His debut film Shallow Grave won the BAFTA Award for Best British Film. The British Film Institute ranked Trainspotting the 10th greatest British film of the 20th century. Boyle's 2008 film Slumdog Millionaire, the most successful British film of the decade, was nominated for ten Academy Awards and won eight, including the Academy Award for Best Director. He also won the Golden Globe and BAFTA Award for Best Director. Boyle was presented with the Extraordinary Contribution to Filmmaking Award at the 2008 Austin Film Festival, where he also introduced that year's AFF Audience Award Winner Slumdog Millionaire. In 2012, Boyle was the artistic director for Isles of Wonder, the opening ceremony of the 2012 Summer Olympics. He was subsequently offered a knighthood as part of the New Year Honours but declined due to his republican beliefs. In 2014, it was announced that Boyle would become a patron of HOME in Manchester.",
    born : "October 20, 1956"
  },
  {
    name : "Lucía Puenzo",
    bio : "Lucía Puenzo is an Argentine author, screenwriter and film director. She is the daughter of the Oscar-winning film director, producer, and screenplay writer, Luis Puenzo.",
    born : "November 28, 1976"
  },
];

let genres = [
  {
    name : "Cyberpunk",
    description : "Cyberpunk is a subgenre of science fiction in a dystopian futuristic setting that tends to focus on a combination of lowlife and high tech featuring advanced technological and scientific achievements, such as artificial intelligence and cybernetics, juxtaposed with a degree of breakdown or radical change in the social order. Much of cyberpunk is rooted in the New Wave science fiction movement of the 1960s and 1970s, when writers like Philip K. Dick, Roger Zelazny, John Brunner, J. G. Ballard, Philip José Farmer and Harlan Ellison examined the impact of drug culture, technology, and the sexual revolution while avoiding the utopian tendencies of earlier science fiction."
  },
  {
    name : "Anime",
    description : "Anime is hand-drawn and computer animation originating from Japan. Anime is a diverse medium with distinctive production methods that have adapted in response to emergent technologies. It combines graphic art, characterization, cinematography, and other forms of imaginative and individualistic techniques. Compared to Western animation, anime production generally focuses less on movement, and more on the detail of settings and use of camera effects, such as panning, zooming, and angle shots. Diverse art styles are used, and character proportions and features can be quite varied, with a common characteristic feature being large and emotive eyes."
  },
  {
    name : "Crime",
    description : "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection. Stylistically, the genre may overlap and combine with many other genres, such as drama or gangster film,[1] but also include comedy, and, in turn, is divided into many sub-genres, such as mystery, suspense or noir."
  },
  {
    name : "Western",
    description : "Western is a genre of fiction set primarily in the latter half of the 19th and early 20th century in the Western United States, which is styled the Old West. Its stories commonly center on the life of a nomadic cowboy or gunfighter[1] who rides a horse and is armed with a revolver and/or a rifle. Cowboys and gunslingers typically wear broad-brimmed and high-crowned Stetson hats, neckerchief bandannas, vests, spurs, cowboy boots, and buckskins (alternatively dusters). Recurring characters include the aforementioned cowboys, Indians, Spaniards, Mexicans, bandits, lawmen, prostitutes, bounty hunters, outlaws, gamblers, soldiers (especially mounted cavalry, such as buffalo soldiers), and settlers (farmers, ranchers, and townsfolk). The ambience is usually punctuated with a western music score, including American and Spanish/Mexican folk music such as country, Native American music, New Mexico music, and rancheras."
  },
  {
    name : "Comedy",
    description : "Comedy is a genre of fiction consisting of discourses or works intended to be humorous or amusing by inducing laughter, especially in theatre, film, stand-up comedy, television, radio, books, or any other entertainment medium. The term originated in Ancient Greece: in Athenian democracy, the public opinion of voters was influenced by political satire performed by comic poets in theaters.[1] The theatrical genre of Greek comedy can be described as a dramatic performance pitting two groups, ages, genders, or societies against each other in an amusing agon or conflict. Northrop Frye depicted these two opposing sides as a Society of Youth and a Society of the Old. A revised view characterizes the essential agon of comedy as a struggle between a relatively powerless youth and the societal conventions posing obstacles to his hopes. In this struggle, the youth then becomes constrained by his lack of social authority, and is left with little choice but to resort to ruses which engender dramatic irony, which provokes laughter."
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
app.delete('/users/:username/favourites/:movies', (req, res) => {
  res.status(201).send('Movie was deleted');
});

app.delete('/users/:username', (req, res) => {
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
