var Benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');

var suite = new Benchmark.Suite();

suite
.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})
.on('cycle', function(event) {
  benchmarks.add(event.target);
})
.on('complete', function() {
  benchmarks.log();
})
.run({ 'async': true });