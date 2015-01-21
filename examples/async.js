var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var fs = require('fs');

suite
.add('readFile binary', {
    defer : true,
    fn : function(deferred) {
        fs.readFile('package.json', function(err) {
           if (err) { throw err; }
           
           deferred.resolve();
        });
    }
})
.add('readFile utf-8', {
    defer : true,
    fn : function(deferred) {
        fs.readFile('package.json', 'utf-8', function(err) {
           if (err) { throw err; }
           
           deferred.resolve();
        });
    }
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run();
