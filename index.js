var express = require('express');
var coolfaces = require('cool-ascii-faces');
var url = require('url');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Does ordering of routes matter? E.g. will req go through /cool
// AND home route..
// without the star, /cool goes to just the /cool part. so get is strict?
// wonder with star.
// and also with app.use and app.post . 

app.get('/*', function(req, res) {
    // res.end('the first get router, catchall?');
    var urlObj = url.parse(req.url, true);
    // console.log('dirname is: '+ __dirname); // root dir of where index.js
    // launches from. i.e. Dir 'getting started with node'.

    // BACK TO ORIGINAL
    res.render(__dirname + '/views/pages/index'); // does it auto know .ejs? 

    //  res.json(urlObj.query); // should send JSON.stringify-ed version of
    // 					  // urlObj.query which should be in obj rather
    // 					  // than str format. 
    // // waiting for res.render('index') // and option objs. 
    //  // next(); 
});

// app.get is strict with its mountPath. So if something gets
// caught, it doesn't go to the next app.get.. 
app.get('/cool', function(req, res) {
    // console.log("the /cool app.get route"); 
    res.send(coolfaces());
    // // INVESTIGATE BELOW!!!
    //    var x = coolfaces(); // it gives a string... 
    //    res.write(typeof x); 
    //    // how to test if buffer? 
    //    res.end(); // so why does putting string in end not work??? 
    //    // read up on node.js documentation for res.end(). 
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
