/*
 * Base Gruntfile Module
 */
module.exports = function (grunt) {
  'use strict';

  /*
   * load grunt tasks automatically
   */
  require('load-grunt-tasks')(grunt);

  var bourbon = require('node-bourbon').includePaths;

  /*
   * setup paths
   */
  var path_vars = {
    theme_path: '../sites/all/themes/cmmdrupalboiler',
    foundation_path: '../sites/all/themes/zurb_foundation',
    compile_path: '../UI',
    bower_path: '<%= path_vars.compile_path %>/bower_components',
    gem_path: '<%= path_vars.compile_path %>/ruby_gems',
    js_base_path: '<%= path_vars.theme_path %>/js',
    js_src_path: '<%= path_vars.theme_path %>/js/src',
    js_bld_path: '<%= path_vars.theme_path %>/js/dist'
  };

  /*
   * foundation - additional libraries
   */
  var foundation_libs = [
    '<%= path_vars.foundation_path %>/js/vendor/placeholder.js',
    '<%= path_vars.foundation_path %>/js/vendor/fastclick.js'
  ];

  /*
   * foundation - core JS
   */
  var foundation_js = [
    '<%= path_vars.foundation_path %>/js/foundation/foundation.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.abide.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.accordion.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.alert.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.clearing.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.dropdown.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.equalizer.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.interchange.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.joyride.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.magellan.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.offcanvas.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.orbit.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.reveal.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.slider.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.tab.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.tooltip.js',
    '<%= path_vars.foundation_path %>/js/foundation/foundation.topbar.js'
  ];

  /*
   * grunt tasks config
   */
  grunt.initConfig({
    path_vars: path_vars,
    pkg: this.file.readJSON('package.json'),

    /*
     * grunt clean
     */
    clean: {
      css: ['<%= path_vars.theme_path %>/css'],
      js: ['<%= path_vars.theme_path %>/js/dist'],
      options: {
        force: true
      }
    },

    /*
     * grunt copy
     */
    copy: {
      main: {
        files: [{
          expand: true,
          src: [
            '<%= path_vars.bower_path %>/underscore/underscore-min.js',
            '<%= path_vars.bower_path %>/intentionjs/intention.js',
            '<%= path_vars.bower_path %>/viewportsize/viewportSize-min.js',
            '<%= path_vars.bower_path %>/requirejs/require.js',
          ],
          dest: '<%= path_vars.js_src_path %>/vendor',
          filter: 'isFile',
          flatten: true
        }]
      }
    },

    /*
     * svg minimize
     */
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path_vars.theme_path %>/images/svg',
          src: ['*.svg'],
          dest: '<%= path_vars.theme_path %>/images/svg'
        }]
      }
    },

    /*
     * grunt compass
     */
    compass: {
      clean: {
        options: {
          clean: true
        }
      },
      dev: {
        options: {
          require: ['compass'],
          basePath: '<%= path_vars.theme_path %>',
          sassDir: 'scss',
          cssDir: 'css',
          imagesDir: 'images',
          importPath: [
            '<%= path_vars.foundation_path %>/scss/'
          ].concat(bourbon),
          bundleExec: true
        },
      },
      build: {
        options: {
          basePath: '<%= path_vars.theme_path %>',
          sassDir: 'scss',
          cssDir: 'css',
          imagesDir: 'images',
          importPath: [
            '<%= path_vars.foundation_path %>/scss/'
          ].concat(bourbon),
          outputStyle: 'compressed',
          noLineComments: true,
          environment: 'production',
          bundleExec: true,
        }
      }
    },

    /*
     * grunt jshint
     */
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= path_vars.js_src_path %>/main.js',
        '<%= path_vars.js_src_path %>/modules/*.js',
        '!<%= path_vars.js_src_path %>/vendor/**/*.js'
      ]
    },

    /*
     * grunt uglify
     */
    uglify: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          '<%= path_vars.js_base_path %>/libs.min.js': [foundation_libs],
          '<%= path_vars.js_base_path %>/foundation.min.js': [foundation_js]
        }
      }
    },

    /*
     * grunt requirejs
     */
    requirejs: {
      compile: {
        options: {
          baseUrl: '.',
          appDir: '<%= path_vars.js_src_path %>',
          dir: '<%= path_vars.js_bld_path %>',
          mainConfigFile: '<%= path_vars.theme_path %>/js/src/main.js',
          optimize: 'uglify',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          removeCombined: true
        }
      }
    },
    
    /*
     * grunt watch
     */
    watch: {
      grunt: { files: ['Gruntfile.js'] },
      compass: {
        files: ['<%= path_vars.theme_path %>/scss/**/*.scss'],
        tasks: ['compass:dev']
      },
      js: {
        files: ['<%= jshint.all %>'],
        tasks: ['jshint', 'uglify']
      },
      svg: {
        files: ['<%= path_vars.theme_path %>/images/svg/*.svg'],
        tasks: ['newer:svgmin:dist']
      }
    }
  });


  /*
   * register 'dev' task
   * : for development compilation
   */
  grunt.registerTask('dev', [
    'copy',
    'clean',
    'compass:dev',
    'uglify',
    'svgmin',
    'watch'
  ]);

  /*
   * register 'build' task
   * : for production compilation
   */
  grunt.registerTask('build', [
    'copy',
    'clean',
    'compass:build',
    'uglify',
    'svgmin',
    'requirejs'
  ]);

  return this.registerTask('default', ['build']);
};
