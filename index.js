var fs     = require('fs')
  , path   = require('path')
  , toml   = require('toml')
  , debug  = require('debug')('component-toml');



module.exports = compileTOML;


/**
 * Compile TOML.
 */

function compileTOML (builder) {
  builder.hook('before scripts', function (builder, callback) {
    if (!builder.conf.files) return callback();

    var files = builder.conf.files.filter(filterTOML);

    files.forEach(function (file) {
      debug('compiling: %s', file);

      var contents = fs.readFileSync(builder.path(file), 'utf8')
        , js       = 'module.exports = ' + JSON.stringify(toml.parse(contents))
        , newFile  = path.basename(file, path.extname(file)) + '.js';

      builder.addFile('scripts', newFile, js);
      builder.removeFile('scripts', file);
    });

    callback();
  });
}


/**
 * Filter for TOML files.
 */

function filterTOML (filename) {
  return (/\.toml/).test(filename);
}