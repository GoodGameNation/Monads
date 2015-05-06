module.exports = function(grunt) {
  grunt.initConfig({
    broccoli: {
      src: {
        dest: 'lib',
        config: 'brocfiles/src.js'
      }
    }
  })

  grunt.loadNpmTasks('grunt-broccoli')

  grunt.registerTask('default', 'watch')
  grunt.registerTask('watch', ['broccoli:src:watch'])
  grunt.registerTask('build', ['broccoli:src:build'])
  grunt.registerTask('serve', ['broccoli:src:serve'])
}
