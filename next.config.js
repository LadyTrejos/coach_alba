const withSass = require("@zeit/next-sass");
module.exports = withSass({
  cssModules: true
});
$(".carousel").carousel({
  interval: 1000
});
