const path = require('path'); // makes it easy to manipulate string paths.
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// *************** Define paths fpr Express config ***************
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// ***************** *************** *************** ******************

// *************** Setup handlebars for Express config ***************
// this allows to tell express which template engine we want to use
app.set('view engine', 'hbs');
// this allows to use a directory with different name to views (that is the folder that express is waiting by default to hbs)
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
// ***************** *************** *************** ******************

// *************** Setup static directory to serve ***************
// .use() is a way to customize a server
// .static() takes the path of the folder we want to serve up
app.use(express.static(publicDirectoryPath));
// ***************** *************** *************** ******************

app.get('', (req, res) => {
    // .render --> allows to render one of our views I've configured express to use the engine hbs
    res.render('index', {
        title: 'Weather App',
        name: 'Laura González'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Laura González'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Here you can see some tips that would you help...',
        name: 'Laura González'
    });
});

app.get('/help/*', (req, res) => {
    res.render('article-not-found', {
        title: 'Article not found',
        errorMessage: 'Article not found...',
        name: 'Laura González'
    });
});

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({
            error: 'You must provide a address to search'
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            return res.send({
                forecastData,
                location,
                address
            });
        });
    });
});

app.get('/products', (req, res) => {
    console.log(req.query);
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        product: []
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found...',
        name: 'Laura González'
    });
});

app.listen(3000, () => {
    console.log(`Server is up on port: 3000 ...`);
});
