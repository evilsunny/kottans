function checkUsersValid(goodUsers) {
  return function(submittedUsers) {
    return submittedUsers.every(function(submittedUser, index, array){
      return goodUsers.some(function(goodUser, index, array){
        return goodUser.id === submittedUser.id
      })
    })
  }
}

module.exports = checkUsersValid
