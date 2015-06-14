function p(){
    for ( i in arguments){
        console.log(arguments[i])
    }
}

/*var fs = require('fs');
var path = require('path');
fs.readFile(path.join(__dirname, 'example.txt'), {encoding: 'utf-8'},
	function  (err, data) {
		if (err){throw err}
		p(data)
		
});

fs.writeFile(path.join(__dirname, 'example.txt'), 'Hello World!', function(err){
	if(err) throw err;
	p('Writing is done.')
})*/

exports.p = p