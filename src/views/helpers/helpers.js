const addClassifUser = (a, b) => {
  if (a === b) {
    return "class='member the-user'";
  }
  return "class='member'";
};

module.exports = addClassifUser
