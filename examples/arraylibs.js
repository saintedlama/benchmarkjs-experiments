var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();

var lodash = require('lodash');
var underscore = require('underscore');

var arr = buildArray(1000, function(idx) { return idx; });

var findGreaterThan = function(item) {
    return item > 500;
}

suite
.add('lodash.find', function() {
    lodash.find(arr, findGreaterThan);
})
.add('underscore.find', function() {
    underscore.find(arr, findGreaterThan);
})
.add('plain JavaScript for', function() {
    for (var i=0;i<arr.length;i++) {
        if (findGreaterThan(arr[i])) {
            return arr[i];
        }
    }
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ 'async': true });

function buildArray(count, generator) {
    var arr = [];
    for (var i=0;i<count;i++) {
        arr.push(generator(i));
    }
    
    return arr;
}
