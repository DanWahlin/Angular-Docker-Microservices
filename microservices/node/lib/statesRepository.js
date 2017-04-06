const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      State = require('../models/state');

class StatesRepository {
    // get all the states
    getStates(callback) {
        console.log('*** StatesRepository.getStates');
        State.find({}, {}, { sort: { name: 1 } }, (err, states) => {
            if (err) { 
                console.log(`*** StatesRepository.getStates err: ${err}`); 
                return callback(err); 
            }
            callback(null, states);
        });
    }

    // get a state
    getState(stateId, callback) {
        console.log('*** StatesRepository.getState');
        State.find({ 'id': stateId }, {}, (err, state) => {
            if (err) { 
                console.log(`*** StatesRepository.getState err: ${err}`); 
                return callback(err); 
            }
            callback(null, state);
        });
    }
}

module.exports = new StatesRepository();

