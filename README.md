# component-toml

  A plugin to compile TOML to Javascript for the component builder.

## Install

    $ npm install component-toml

## Usage
  
  Add your TOML files to the `files` array in your `component.json`:

  ```js
  {
    "files": [
      "config.toml"
    ]
  }
  ```

  Use the plugin during your build process:

  ```js
  var fs      = require('fs')
    , Builder = require('component-builder')
    , toml    = require('component-toml');

  var builder = new Builder(__dirname);

  builder.use(toml);

  builder.build(function(err, res){
    if (err) throw err;
    fs.writeFileSync('build/build.js', res.require + res.js);
    if (res.css) fs.writeFileSync('build/build.css', res.css);
  });
  ```

  And then require the files in your Javascript:

  ```js
  var tip     = require('tip')
    , config  = require('config');
  ```