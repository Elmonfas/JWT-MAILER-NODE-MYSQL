const express = require('express');
const app = express();
const morgan = require('morgan');
const ejs = require('ejs');
const path = require('path');
const router = require('./routes/index');

app.use(morgan('dev'));
app.set('port', 5050);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));


router.use( (req , res ,next) => {
    res.sendStatus(404)
    res.send('404 NOT FOUND')
})


app.listen(app.get('port'), () => {
    console.log('Listening on port:', app.get('port'));
});
