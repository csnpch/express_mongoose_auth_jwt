const mongoose = require('mongoose');
const config = require('./env');

mongoose.Promise = global.Promise;
mongoose.connect(config.database.uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then( () => console.log("database successfully connected") )
.catch( (err) => { console.log("Could not connect to database : " + err); /*process.exit(1)*/ } );

mongoose.set('debug', (config.server.node_env == 'development' ? true : false));

module.exports = mongoose;
