module.exports = function(grunt) {

	// Load the plugin that provides the "uglify" task.
	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-tinypng');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build1: {
				src: 'src/js/header.js',
				dest: 'src/js/header.min.js'
			},
			build2: {
				src: 'src/js/scripts.js',
				dest: 'src/js/scripts.min.js'
			}
		},
		concat: {
			options: {
				separator: '',
			},
			dist1: {
				src: 'src/js/header/*.js',
				dest: 'src/js/header.js',
			},
			dist2: {
				src: 'src/js/scripts/*.js',
				dest: 'src/js/scripts.js',
			},
		},
		watch: {
			css: {
				files: 'src/css/sass/*.scss',
				tasks: ['sass', 'cssmin']
			},
			js1: {
				files: 'src/js/header/*.js',
				tasks: ['concat:dist1']
			},
			js2: {
				files: 'src/js/scripts/*.js',
				tasks: ['concat:dist2']
			},
		},
		sass: {
			options: {
				sourceMap: true,
				includePaths: require("bourbon").includePaths
			},
			dist: {
				files: {
					'src/css/main.css': 'src/css/sass/main.scss'
				}
			}
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1,
				// specialComments: 0
			},
			target: {
				files: {
					'src/css/main.min.css': ['src/css/main.css']
				}
			}
		},
		replace: {
			dist: {
				options: {
					prefix: '',
					patterns: [
						{
							match: 'main.css',
							replacement: 'main.min.css'
						},
						{
							match: 'scripts.js',
							replacement: 'scripts.min.js'
						},
						{
							match: 'header.js',
							replacement: 'header.min.js'
						}
					]
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: ['src/*.html'],
						dest: 'build/'
					}
				]
			}
		},
		tinypng: {
			options: {
				apiKey: "boqpaMjnbKGYf8fm11mwoLmEgT3jd-IF",
				checkSigs: true,
				sigFile: 'src/tiny-img/file_sigs.json',
				summarize: true,
				showProgress: true,
				stopOnImageError: true
			},
			compress: {
				src: ['*.png', '*.jpg'],
		        cwd: 'src/img/',
		        dest: 'src/tiny-img/',
		        expand: true,
			}
		},
		clean: {
			build: ['build'],
			tinyimg: ['build/tiny-img']
		},
		copy: {
		  main: {
			files: [
				// includes files within path
				{expand: true, cwd: 'src/', src: ['**'], dest: 'build/'},
			],
		  },
		  img: {
			files: [
				{expand: true, cwd: 'src/tiny-img/', src: ['**', '!file_sigs.json'], dest: 'build/img'},
			],
		  }
		},
	});

	// Task(s).
	grunt.registerTask('watch-sass', ['watch:css']);
	grunt.registerTask('watch-js', ['watch:js1', 'watch:js2']);
	grunt.registerTask('watch-files', ['watch']);

	grunt.registerTask('build-img', ['tinypng', 'copy:img']);
	grunt.registerTask('build-css', ['sass', 'cssmin']);
	grunt.registerTask('build-js', ['concat', 'uglify']);
	grunt.registerTask('build-files', ['clean:build', 'copy:main', 'replace', 'clean:tinyimg']);
	grunt.registerTask('build-project', ['build-css', 'build-js', 'build-files']);
	grunt.registerTask('build-project-complete', ['build-css', 'build-js', 'build-files', 'build-img']);

};