function getShortMessages(messages) {
  function filtering(el) {
    return el.message.length < 50
  }
  return messages.filter(filtering).map(function(el){
    return el.message
  })
}

module.exports = getShortMessages
