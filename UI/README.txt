/*******************************
 * How to build the front-end
 ******************************/

1)
You first need to install:

NODEJS
https://nodejs.org/

BOWER
http://bower.io/

BUNDLER
http://bundler.io/

You may also need grunt-cli
https://github.com/gruntjs/grunt-cli


2)
From the UI folder, run: "npm install"

This will install the npm / bower / gem dependencies locally to this project


3)
When working locally, and only for development/debugging, run

"grunt dev"

This command will run the 'dev' task, which compiles/copies everything and 'watches' for changes while you code your CSS/JS

After completing your work and before you do a Git Commit, run

"grunt build"

This will re-compile everything and minify the css and uglify/compress the JS, making it ready for production.


**NOTES:

In the theme folder, there is a 'theme-functions.php'.  Which helps drupal determine, if we are on a 'development' environment or not.  

The cmm_is_dev_mode() method will preg_match the current URL check if 'dev' is part of the URL string.  If so, then we are in DEV mode.  Based on that, the other methods will use the the proper path to the JS files.

The "html.tpl.php" file will have this line:

<script id="requirejs" data-rev="<?php print cmm_rjs_rev(); ?>" data-main="<?php print cmm_path_to_rjs_main(); ?>" src="<?php print cmm_path_to_rjs(); ?>"></script>

There you can see the methods at work, returning the proper paths, based on the 'environment'.

When you run 'grunt build' the JS will get put into a 'dist' folder.  This is for production (with all the JS compression and CSS minification). This is also where the methods will point, for the JS on production type environments (everything but your local machine).

Vendor specific JS should be stored in the js/src/vendor. Hopefully you can find vendor code in a bower or node package. Then you can add it to the grunt ‘copy’ task, which will store it in the appropriate vendor folder.







