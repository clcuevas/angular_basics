'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    jshint: {
      dev: {
        src: ['*.js', './models/**/*.js', './routes/**/*.js', './test/*test.js'],
        options: {
          'node': true,
          'globals': {
            'describe': true,
            'it': true,
            'before': true,
            'after': true,
            'beforeEach': true,
            'afterEach': true
          }
        }
      },
      client: {
        src: ['./test/client/*test.js'],
        options: {
          'node': true,
          'globals': {
            'require': true,
            'it': true,
            'describe': true
          }
        }
      },
      karma: {
        src: ['./test/karma_tests/*test.js', './app/**/*.js'],
        options: {
          'node': true,
          'globals': {
            'expect': true,
            'describe': true,
            'it': true,
            'beforeEach': true,
            'afterEach': true,
            'angular': true,
            'require': true
          }
        }
      }
    },

    jscs: {
      dev: {
        src: ['<%= jshint.dev.src %>']
      }
    },

    webpack: {
      client: {
        entry: __dirname + '/app/js/client.js',
        output: {
          path: 'build/',
          file: 'bundle.js'
        }
      },
      test: {
        entry: __dirname + '/test/client/test.js',
        output: {
          path: 'test/client/',
          file: 'test_bundle.js'
        }
      },
      karmaTest: {
        entry: __dirname + '/test/karma_tests/test_entry.js',
        output: {
          path: 'test/karma_tests/',
          file: 'bundle.js'
        }
      }
    },

    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        src: 'build/'
      }
    },

    watch: {
      app: {
        files: ['<%= jshint.dev.src %>'],
        tasks: ['jshint', 'jscs', 'webpack']
      }
    }
  });

  grunt.registerTask('test', ['jshint:dev', 'jshint:client', 'jshint:karma', 'jscs:dev']);
  grunt.registerTask('build', ['webpack:client', 'webpack:test', 'webpack:karmaTest', 'copy:html']);
  grunt.registerTask('default', ['test', 'build', 'watch']);
};
