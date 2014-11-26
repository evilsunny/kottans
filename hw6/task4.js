function getShortMessages(messages){
return messages.map(function(obj){
return obj.message }).filter(function (actMess){
return actMess.length<50
})

}
module.exports = getShortMessages;
