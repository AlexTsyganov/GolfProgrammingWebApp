var events = require('events');
var fs = require('fs');
var exec = require("child_process").exec;
var eventEmitter = new events.EventEmitter();

//var log = require('../libs/log.js')(module);

function compileSystem(task, langInfo, solution, cb) {
	var PATH = "../tasks/" + task[0].id + "/solutions/" + 
		    solution[0].id + "/";	
	console.log(langInfo);
	exec('cp '+PATH+'main '+PATH+ 'main'+langInfo[0].ex_compiled_file, function (err, stdout,stderr){
	  if (err) return console.error(err)
	  console.log("success!")
	    
	    var outputFile = PATH + "results.txt";
	    var fileName = 'main';
	    //log.info('langInfo: '+ langInfo);			
	    if(langInfo[0].comand_to_compile != '') {
		if(langInfo[0].compiler_options != '') {
		    //log.info(langInfo[0].COMAND_TO_COMPILE + ' ' + PATH + fileName + 
		    //        langInfo[0].EX_COMPILED_FILE + ' ' + 
		    //        langInfo[0].COMPILER_OPTIONS + ' ' + PATH + fileName);
		    exec(langInfo[0].comand_to_compile + ' ' + PATH + fileName + 
		            langInfo[0].ex_compiled_file + ' ' + 
		            langInfo[0].compiler_options + ' ' + PATH + fileName + 
		            " 2>" + PATH + "compilelog.txt", function(err, stdout, stderr){
		                eventEmitter.emit('readyToExec', cb);
		            });				
		} else {
		    //log.info('no options');
		    exec(langInfo[0].comand_to_compile + " " + PATH + fileName + 
		            langInfo[0].ex_compiled_file + " 2>" + PATH + 
		            "compilelog.txt", function(err, stdout, stderr){
		                eventEmitter.emit('readyToExec', cb);
		            });	
		}					
	    } else {
		//log.info('no compiler');
		eventEmitter.emit('readyToExec', cb);	
	    }
	});
}

eventEmitter.on('readyToExec', function(cb){
    cb('OK');
});

//example of use compileSystem function
/*compileSystem(1,tmp,1, function(rd){
	log.info(rd);
});*/
module.exports = compileSystem; 
