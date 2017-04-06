const statesRepo  = require('../../../lib/statesRepository'),
      util        = require('util');

class StatesController {

    constructor(router) {
        router.get('/', this.getStates.bind(this));
    }

    getStates(req, res) {
        console.log('*** getStates');

        statesRepo.getStates((err, data) => {
            if (err) {
                console.log('*** getStates error: ' + util.inspect(err));
                res.json({
                    states: null
                });
            } else {
                console.log('*** getStates ok');
                res.json(data);
            }
        });
    }

}

module.exports = StatesController;