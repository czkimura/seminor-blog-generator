var yargs = require('yargs');

module.exports = yargs.options({
  'serve': {
    describe: 'start http server',
    alias: 's',
    type: 'boolean',
    default: false
  },
  'watch': {
    describe: 'recompile & reload browser',
    alias: 'w',
    type: 'boolean',
    default: false
  }
})
.command('[default]', 'development task')
.command('build', 'build task')
.help('help').alias('help', 'h')
.argv;
