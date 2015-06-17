//通过error事件捕获I/O错误
var http = require('http')
var p = require('./oprate_file').p

var opts = {
	host: 'asd'
	port: 8888
	path: '/'
}

var req = http.get(opts, function(res){
	p('This will never get called')
})

req.on('err', function(e){
	p('Got that pesky err trapped')
})


//使用多核处理器
var cluster =require('cluster')
var numCPUs = require('os').cpus.length

if(cluster.isMaster){
	//
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork()
	};

	cluster.on('death', function(worker){
		p('worker' + worker.pid + 'died')
		cluster.fork()
	})
}else{
	http.Server(function(req, res){
		res.writeHead(200);
		res.end("hello world\n");
	}).listen(8888)
}

//通过消息开监控工作进程状态

var rssWarn = (12 * 1024 * 1024),
	heapWarn = (10 * 1024 * 1024)

if(cluster.isMaster) {
	for(var i=0; i<numCPUs; i++) {
		var worker = cluster.fork();
		worker.on('message', function(m) {
			if (m.memory) {
				if(m.memory.rss > rssWarn) {
					console.log('Worker ' + m.process + ' using too much memory.')
			}
		}
		})
	}
} else {
// 服务器
	http.Server(function(req,res) {
		res.writeHead(200);
		res.end('hello world\n')
	}).listen(8000)
// 每秒报告一次状态
	setInterval(function report(){
		process.send({memory: process.memoryUsage(), process: process.pid});
	}, 1000)
}



var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
var rssWarn = (50 * 1024 * 1024),
	heapWarn = (50 * 1024 * 1024)
var workers = {}
if (cluster.isMaster) {
	for (var i = 0; i < numCPUs; i++) {
		createWorker()
	}
	s
	etInterval(function() {
		var time = new Date().getTime()
		for (pid in workers) {
			if (workers.hasOwnProperty(pid) &&
				workers[pid].lastCb + 5000 < time) {
				console.log('Long running worker ' + pid + ' killed')
				workers[pid].worker.kill()
				delete workers[pid]
				createWorker()
			}
		}
	}, 1000)
} else {
	// 服务器
	http.Server(function(req, res) {
			// 打乱 200 个请求中的 1 个
			if (Math.floor(Math.random() * 200) === 4) {
				console.log('Stopped ' + process.pid + ' from ever finishing')
				while (true) {
					continue
				}
			}
			r
			es.writeHead(200);
			res.end('hello world from ' + process.pid + '\n')
		}).listen(8000)
		// 每秒钟报告一次状态
	setInterval(function report() {
		process.send({
			cmd: "reportMem",
			memory: process.memoryUsage(),
			process: process.pid
		})
	}, 1000)
}
f
unction createWorker() {
	var worker = cluster.fork()
	console.log('Created worker: ' + worker.pid)
		// 允许开机时间
	workers[worker.pid] = {
		worker: worker,
		lastCb: new Date().getTime() - 1000
	}
	worker.on('message', function(m) {
		if (m.cmd === "reportMem") {
			workers[m.process].lastCb = new Date().getTime()
			if (m.memory.rss > rssWarn) {
				console.log('Worker ' + m.process + ' using too much memory.')
			}
		}
	})
}