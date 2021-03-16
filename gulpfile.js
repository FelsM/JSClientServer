var {src} = require('gulp');
var server = require('gulp-server-livereload');
 
function webserver(){
  return src('app/')
    .pipe(server({
      livereload: true,
      open: true
    }));
};

exports.default = webserver;



