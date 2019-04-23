module.exports = function(app, db) {
    //CREATE
    /*When the app receives a post request to the notes path "/notes"
    it will execute the code inside the callback 
    */
    app.post('/notes', (req, res) => {
        //CREATE HERE FOR DB
        /* In the callback, it will pass a request object "req"
        which contains the parameters or the JSON of the request
        and res object used to reply 
        */
       //GET THE PASSED JSON OR OBJECT
        const note = {text: req.body.body, title: req.body.title};

        db.db().collection('notes').insert(note, (err, result) => {
            if(err) {
                res.send({ 'error' : 'An error has occured. Cannot create document'});

            } else {
                res.send(result.ops[0]);
            }
        });      
    });

    // GET OR READ STARTS HERE
    
    //READ all Documents per Collection
    app.get('/notes', (req, res) => {
        
        db.db().collection('notes').find({}).toArray(function(err, docs){
            if (err) {
                handleError(res, err.message, "Failed to get notes.");
              } else {
                res.status(200).json(docs);
              }
        });
    });
    
    app.get('/scholarship',(req, res) =>{
        db.db().collection('scholarships').find({}).toArray(function(err, docs){
            if(err){
                handleError(res, err.message, "Failed to get scholarship collection.");
            }else{
                res.status(200).json(docs);
            }
        });
        
    });

    app.get('/event', (req, res) =>{
        db.db().collection('events').find({}).toArray(function(err, docs){
            if(err){
                handleError(res, err.message, "Failed to get event collection.");
            }else{
                res.status(200).json(docs);
            }
        });
    });

    app.get('/requirement', (req, res) =>{
        db.db().collection('requirements').find({}).toArray(function(err, docs){
            if(err){
                handleError(res, err.message, "Failed to get requirement collection.");
            }else{
                res.status(200).json(docs);
            }
        });
    });

    app.get('/processes', (req, res) =>{
        db.db().collection('processes').find({}).toArray(function(err, docs){
            if(err){
                handleError(res, err.message, "Failed to get process collection.");
            }else{
                res.status(200).json(docs);
            }
        });
    });

    app.get('/studentHousing', (req, res) =>{
        db.db().collection('/studentHousing').find({}).toArray(function(err, docs){
            if(err){
                handleError(res, err.message, "Failed to get student housing collection.");
            }else{
                res.status(200).json(docs);
            }
        });
    });

    //GET SPECIFIC per ID

    var ObjectID = require('mongodb').ObjectID;

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id //from the url ID  
        const details = {'_id': new ObjectID(id)};
        db.db().collection('notes').findOne(details, (err, item) =>{
            if(err) {
                res.send({ 'error' : 'An error has occured. Cannot create document'});

            } else {
                res.send(item);
            }
        });
    });

    // POST OR CREATE STARTS HERE
    //WEBHOOK REQUEST GAMIT DIRIIIII
    app.post('/scholarship', (req, res) => {
        const scholarship = {scholarshipTitle: req.body.scholarshipTitle, scholarshipDescription: req.body.scholarshipDescription,
        processType: req.body.processType, accessCode: req.body.accessCode};
        
        if(req.body.accessCode == "admin123")
        {
            db.db().collection('scholarships').insert(scholarship, (err, result) => {
                if(err) {
                    res.send({ 'error': 'An error has occured. Cannot create document for Scholarship. '});
                } else {
                    res.send(result.ops[0]);
                    //NAA PANIY DUGANG FOR OUTPUT
                }
            })
        }else 
        {
            res.send("Sorry I can't add that, you've got a wrong access code.");
        }
        
    });

    app.post('/event', (req, res) => {
        const event = {processType: req.body.processType, eventTitle: req.body.eventTitle, eventDate: req.body.eventTitle, 
            eventVenue: req.body.eventVenue, eventTime: req.body.eventTime, eventNotes: req.body.eventNotes, 
            accessCode: req.body.accessCode};

        if(req.body.accessCode == "admin123")
        {
            db.db().collection('events').insert(event, (err, result) => {
                if(err) {
                    res.send({ 'error': 'An error has occured. Cannot create document for an Event. '});
                } else {
                    res.send(result.ops[0]);
                    //NAA PANIY DUGANG FOR OUTPUT
                }
            })
        }else 
        {
            res.send("Sorry I can't add that, you've got a wrong access code.");
        }
    });

    app.post('/requirement', (req,res) => {
        const requirement = {processType: req.body.processType, requirementTitle: req.body.requirementTitle,
            requirementList: req.body.requirementList, accessCode: req.body.accessCode};

        if(req.body.accessCode == "admin123")
        {
            db.db().collection('requirements').insert(requirement, (err, result) => {
                if(err){
                    res.send({ 'error': 'An error has occured. Cannot create document for requirement. '});
                } else {
                    res.send(result.ops[0]);
                    //NAA PANIY DUGANG FOR OUTPUT
                }
            })
        }else 
        {
            res.send("Sorry I can't add that, you've got a wrong access code.");
        }
    });

    app.post('/processes', (req, res) => {
        const process = {processType: req.body.processType, processTitle: req.body.processTitle, 
            processDescription: req.body.processDescription, processList: req.body.processes, accessCode: req.body.accessCode};

        if(req.body.accessCode == "admin123")
        {
            db.db().collection('processes').insert(requirement, (err, result) => {
                if(err){
                    res.send({'error': 'An Error has occured. Cannot create document for a process.'});
                } else {
                    res.send(result.ops[0]);
                    //NAA PANIY DUGANG FOR OUTPUT
                }
            })
        }else 
        {
            res.send("Sorry I cannot add that, you've got a wrong access code.");
        }
    });

    app.post('/studentHousing', (req, res) => {
        const studentHousing = {processType: req.body.processType, housingType: req.body.housingType,
        housingDetails: req.body.housingDetails, contactPerson: req.body.contactPerson, contactNumber: req.body.contactNumber,
        contactNumber: req.body.contactNumber, accessCode: req.body.accessCode};

        if (req.body.accessCode == "admin123" )
        {
            db.db().collection('studentHousing').insert(studentHousing, (err, result) => {
                if(err){
                    res.send({'error': 'An Error has occured. Cannot create document for student housing information.'});
                }else {
                    res.send(result.ops[0]);
                    //NAA PANIY DUGANG FOR OUTPUT
                }
                
            })
        }else
        {
            res.send("Sorry I cannot add that, you've got a wrong access code.");
        }
    });
};