var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();

var arr = buildArray(100, function(idx) { return idx; });

suite
.add('forEach()', function() {
    var cnt = 0;
    arr.forEach(function(item) {
       cnt+=item; 
    });
})
.add('forEach() extracted iterator', function() {
    var cnt = 0;
    var iterator = function(item) {
       cnt+=item; 
    }
    
    arr.forEach(iterator);
})
.add('for', function() {
    var cnt = 0;
    for (var i=0;i++;i<arr.length) {
        cnt+=arr[i];
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
