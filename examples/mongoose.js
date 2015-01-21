var Benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');

var faker = require('faker');
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  userName : { type : String, required : true },
  userEmail: { type : String, required : true },
  comment : { type : String, required : true },
  createdAt : { type : Date, required : true, index: true }
});

var Comment = mongoose.model('Comment', commentSchema);
Comment.ensureIndexes();

mongoose.connect('mongodb://' + process.env.IP);

var comments = [];
for (var i=0;i<1000;i++) {
  comments.push(new Comment({
    userName : faker.name.findName(),
    userEmail : faker.internet.email(),
    comment : faker.lorem.paragraphs(),
    createdAt : faker.date.past()
  }));
}

console.log('Preparing test data');

Comment.remove({}).exec()
  .then(function() {
    return Comment.create(comments);
  })
  .then(function() {
    console.log('Running test suite');
    return runSuite();
  });

function runSuite() {
  var suite = new Benchmark.Suite();
  
  suite
  .add('Model#find', { 
    fn : function(deferred) {
      Comment
        .find({ createdAt : { $lt : new Date() }})
        .exec(function(err) {
          if (err) throw err;
        
          deferred.resolve();
        });
    },
    defer : true
  })
  .add('Model#find.lean', { 
    fn : function(deferred) {
      Comment
        .find({ createdAt : { $lt : new Date() }})
        .lean()
        .exec(function(err) {
          if (err) throw err;
        
          deferred.resolve();
        });
    },
    defer : true
  })
  .on('cycle', function(event) {
    benchmarks.add(event.target);
  })
  .on('complete', function() {
    benchmarks.log();
    process.exit(0);
  })
  .run();
}
