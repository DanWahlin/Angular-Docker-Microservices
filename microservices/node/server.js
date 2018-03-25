const express       = require('express'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    errorhandler    = require('errorhandler'),
    csrf            = require('csurf'),
    morgan          = require('morgan'),
    favicon         = require('serve-favicon'),
    
    database        = require('./lib/database'),
    seeder          = require('./lib/dbSeeder'),
    app             = express(),
    router          = require('express-convention-routes'),
    port            = 3000;

class Server {

    constructor() {
        this.initExpressMiddleWare();
        this.initCustomMiddleware();
        this.initDbSeeder();
        this.initRoutes();
        this.start();
    }

    start() {
        app.listen(port, (err) => {
            console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
        });
    }

    initExpressMiddleWare() {
        app.use(morgan('dev'));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(errorhandler());
        app.use(cookieParser());
        //app.use(csrf({ cookie: true }));

        // app.use((req, res, next) => {
        //     var csrfToken = req.csrfToken();
        //     res.locals._csrf = csrfToken;
        //     res.cookie('XSRF-TOKEN', csrfToken);
        //     next();
        // });

        //CORS
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
            next();
        });

        process.on('uncaughtException', (err) => {
            if (err) console.log(err, err.stack);
        });
    }

    initCustomMiddleware() {
        if (process.platform === "win32") {
            require("readline").createInterface({
                input: process.stdin,
                output: process.stdout
            }).on("SIGINT", () => {
                console.log('SIGINT: Closing MongoDB connection');
                database.close();
            });
        }

        process.on('SIGINT', () => {
            console.log('SIGINT: Closing MongoDB connection');
            database.close();
        });
    }

    initDbSeeder() {
        database.open(() => {
            //Set NODE_ENV to 'development' and uncomment the following if to only run
            //the seeder when in dev mode
            //if (process.env.NODE_ENV === 'development') {
            //  seeder.init();
            //} 
            seeder.init();
        });
    }

    initRoutes() {
        router.load(app, {
          //Defaults to "./controllers" but showing for example
          routesDirectory: './controllers', 
      
          //Root directory where your server is running
          rootDirectory: __dirname,
          
          //Do you want the created routes to be shown in the console?
          logRoutes: true
        });
    }

}

var server = new Server();