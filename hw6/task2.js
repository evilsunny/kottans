function repeat(operation,num){
	for(var  i = 0;i < num;i++){
	operation();
	}
return 0 ;
}

module.exports = repeat
