module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      prod: {
        files: {
          'js/libs/script.min.js' : 'library/js/libs/*.js',
          'js/script.min.js' : 'library/js/*.js'
        }
      },
      dev: {
        options: {
          beautify: true,
          mangle: false,
          compress: false,
          preserveComments: 'all'
        },
        files: {
          'js/libs/script.min.js' : 'library/js/libs/*.js',
          'js/script.min.js' : 'library/js/**/*.js'
        }
      }
    },
    compass: {                  // Task
      prod: {                   // Target
        options: {              // Target options
          sassDir: 'library/scss',
          cssDir: 'library/css',
          outputStyle: 'compressed',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: 'library/scss',
          cssDir: 'library/css',
          outputStyle: 'expanded',
          environment: 'development'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: ['library/js/**/*.js'],
        tasks: ['uglify:dev']
      },
      css: {
        files: ['library/scss/**/*.scss'],
        tasks: ['compass:dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify:dev','compass:dev']);
  grunt.registerTask('build', ['uglify:prod','compass:prod']);

};
