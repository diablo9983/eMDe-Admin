module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    watch: {
      grunt: {
        files: ["Gruntfile.js"],
        options: {
          reload: true
        }
      },
      css: {
        files: ["src/scss/*.scss", "src/scss/elements/*.scss"],
        tasks: ["sass"]
      },
      jade: {
        files: ["src/jade/**/*.jade","src/sidebar.json"],
        tasks: ["jade"]
      },
      js: {
        files: ["src/js/**/*.js"],
        tasks: ["uglify"]
      },
      livereload: {
        files: ['dist/**/*'],
        options: {
          livereload: true
        }
      }
    },
    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          'dist/css/emde.css': 'src/scss/emde.scss'
        }
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            sidebar: grunt.file.readJSON("src/sidebar.json")
          }
        },
        files: [{
          'dist/index.html': 'src/jade/index.jade'
        }, {
          cwd: 'src/jade/pages',
          src: '*.jade',
          dest: 'dist/pages',
          expand: true,
          ext: '.html'
        }]
      }
    },
    uglify: {
      js: {
        options: {
          screwIE8: true,
          sourceMap: false,
          beautify: true,
          mangle: {
            except: ['$','EmdeSidebar']
          }
        },
        files: {
          'dist/js/emde.js': ['src/js/emde.js','src/js/emde.dropdown.js','src/js/emde.forms.js'],
          'dist/js/app.js': 'src/js/app.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // The default task (running "grunt" in console) is "watch"
  grunt.registerTask('default', ['watch']);
}
