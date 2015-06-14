var express = require('express'),
	p = require('./oprate_file').p;

var app = express.createServer()
app.listen(8888)

var tweets = []
app.get('/', function(req, res){
	res.send('Welcome to Node Twitter')
})

app.post('/send', express.bodyParser(), function(req, res){
	if (req.body && req.body.tweet){
		tweets.push(req.body.tweet)
		res.send({status:"ok", message:"tweet reveived"})
	}else{
		res.send({status:"nok", message:"No tweet reveived"})
	}
})

app.get('/tweets', function(req, res){
	res.send(tweets)
})