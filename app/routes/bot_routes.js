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
        })
       


        
    });

    app.post('/scholarship', (req, res) => {
        const scholarship = {scholarshipTitle: req.body.scholarshipTitle, scholarshipDescription: req.body.scholarshipDescription,
        processType: req.body.processType, accessCode: req.body.accessCode};
        
        if(req.body.accessCode == "admin123")
        {
            db.db().collection('/scholarships').insert(scholarship, (err, result) => {
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
        
    })

    app.post('/event', (req, res) => {
        const event = {eventTitle: req.body.eventTitle, eventDate: req.body.eventTitle, 
            eventVenue: req.body.eventVenue, eventTime: req.body.eventTime, eventNotes: req.body.eventNotes, 
            accessCode: req.body.accessCode};

        if(req.body.accessCode = "admin123")
        {
            db.db().collection('/events').insert(event, (err, result) => {
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
    })

    app.post('/requirement', (req,res) => {
        const requirement = {requirementTitle: req.body.requirementTitle, requirementList: req.body.requirementList ,
        accessCode: req.body.accessCode};

        if(req.body.accessCode = "admin123")
        {
            db.db().collection('/requirements').insert(requirement, (err, result) => {
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
    })

    app.post('/processes', (req, res) => {
        const process = {processTitle: req.body.processTitle, processDescription: req.body.processDescription,
        processList: req.body.processes, accessCode: req.body.accessCode};

        if(req.body.accessCode = "admin123")
        {
            db.db().collection('/requirements').insert(requirement, (err, result) => {
                if(err){
                    res.send({'error': 'An Error has occured. Cannot create document for a process.'})
                } else {
                    res.send(result.ops[0]);
                    //NAA PANIY DUGANG FOR OUTPUT
                }
            })
        }else 
        {
            res.send("Sorry I can't add that, you've got a wrong access code.");
        }
    })
};