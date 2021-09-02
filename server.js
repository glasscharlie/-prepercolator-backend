const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');


const sequelize = require('./config/connection.js');


const app = express();
const PORT = process.env.PORT || 3001;

// Implementing cors support in case this is an issue with axios/express
const cors = require('cors');
const corsOptions = { credentials: true }



// app.use(session(sess));
// app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use("/", routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});