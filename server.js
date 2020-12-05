const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;
//sets up express session and connects to the sequelize database
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  //actualy secret would be stored in .env file
  secret: 'Super secret secret',
  //empty brackets is all that is needed
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
//gives the url translated to something useable
app.use(express.urlencoded({ extended: true }));
//takes contents of folder as static assets
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// turn on connection to db and server
//sync is sequelize taking models and connecting them to database tables
//force: true = drop and re-create tables on startup (instead of DROP TABLE IF EXISTS)
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});