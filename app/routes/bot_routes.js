
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

    function dateToISO(dateOriginal)
    {
        var date = dateOriginal;
        var dateObject = new Date(date);
        return dateObject;
    }
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
    app.post('/webhook', (req, res) => {

        
        if (req.body.accessCode != null) {
            //MGA POST DIRI, IN SHORT, PARA ADMIN
            if (req.body.informationType == "scholarship") {
                const scholarship = {scholarshipTitle: req.body.scholarshipTitle, scholarshipDescription: req.body.scholarshipDescription,
                    informationType: req.body.informationType, accessCode: req.body.accessCode};
                   
                    if(req.body.accessCode == "admin123")
                    {
                        db.db().collection('scholarships').insertOne(scholarship, (err, result) => {
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
    
            } else if (req.body.informationType == "event") {
                
                const event = {informationType: req.body.informationType, eventTitle: req.body.eventTitle,
                    eventDateTime: {startDate: dateToISO(req.body.startDate), endDate: dateToISO(req.body.endDate)}, 
                    eventLocation: req.body.eventLocation, eventDetails: req.body.eventDetails, 
                    accessCode: req.body.accessCode};
        
                if(req.body.accessCode == "admin123")
                {
                    db.db().collection('events').insertOne(event, (err, result) => {
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
    
            } else if (req.body.informationType == "requirement") {
                const requirement = {processType: req.body.processType, requirementTitle: req.body.requirementTitle,
                    requirementList: req.body.requirementList, accessCode: req.body.accessCode};
        
                if(req.body.accessCode == "admin123")
                {
                    db.db().collection('requirements').insertOne(requirement, (err, result) => {
                        if(err){
                            res.send({ 'error': 'An error has occured. Cannot create document for requirement. '});
                        } else {
                            res.send(result.ops[0]);
                            //NAA PANIY DUGANG FOR OUTPUT
                        }
                    })
                }
    
            } else if (req.body.informationType == "process") {
                const process = {processType: req.body.processType, processTitle: req.body.processTitle, 
                    processDescription: req.body.processDescription, processList: req.body.processes, accessCode: req.body.accessCode};
        
                if(req.body.accessCode == "admin123")
                {
                    db.db().collection('processes').insertOne(requirement, (err, result) => {
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
    
            } else if (req.body.informationType == "housing") {
                const studentHousing = {processType: req.body.processType, housingType: req.body.housingType,
                    housingDetails: req.body.housingDetails, contactPerson: req.body.contactPerson, contactNumber: req.body.contactNumber,
                    contactNumber: req.body.contactNumber, accessCode: req.body.accessCode};
            
                    if (req.body.accessCode == "admin123" )
                    {
                        db.db().collection('studentHousing').insertOne(studentHousing, (err, result) => {
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
            }
        

        }else {
            
                //res.send("abot diri");
               // const informationType = req.body.informationType;
    
                if(req.body.informationType == "scholarship")
                {
                        db.db().collection('scholarships').find({}).toArray(function(err, docs){
                            if(err){
                                handleError(res, err.message, "Failed to get scholarship collection.");
                            }else{
                                res.status(200).json(docs);
                            }
                        });
                        
                }
                else if(req.body.informationType == "event")
                {
                    
                    if((req.body.startDate !== null && req.body.endDate !== null) || req.body.eventLocation !== null)
                    {
                    var dateEventStart = req.body.startDate;
                    var dateEventEnd = req.body.endDate;
                    var locationEvent = req.body.eventLocation;
                    var sampleNi = "2019-12-01T12:00:00+09:00";
                    

                    db.db().collection('events').find({
                        $or:[
                          {eventDateTime:{
                            startDate: {
                                "$gte": dateToISO(dateEventStart),
                                "$lte": dateToISO(dateEventEnd)
                            },
                            endDate:{
                                "$gte": dateToISO(dateEventStart),
                                "$lte": dateToISO(dateEventEnd)
                            }
                        }},
                          {eventLocation:locationEvent}
                        ]
                      }).toArray(function(err, docs){
                        if(err){
                            handleError(res, err.message, "Failed to get event collection.");
                        }else{
                            res.status(200).json(docs);
                        }
                    });
                    }
                    
                }
                else if(req.body.informationType == "process")
                {
                    db.db().collection('processes').find({}).toArray(function(err, docs){
                        if(err){
                            handleError(res, err.message, "Failed to get process collection.");
                        }else{
                            res.status(200).json(docs);
                        }
                    });
                }
                else if(req.body.informationType == "program")
                {
                    res.send("get/program");
                }
                else if(req.body.informationType == "requirements")
                {
                    db.db().collection('requirements').find({}).toArray(function(err, docs){
                        if(err){
                            handleError(res, err.message, "Failed to get requirement collection.");
                        }else{
                            res.status(200).json(docs);
                        }
                    });
                }
                else if(req.body.informationType == "organization")
                {
                    res.send("get/organization");
                }
                else if(req.body.informationType == "scholarship")
                {
                    res.send("get/scholarship");
                }
                else if(req.body.informationType == "guidelines")
                {
                    res.send("get/guidelines");
                }
                else if(req.body.informationType == "housing")
                {
                    db.db().collection('/studentHousing').find({}).toArray(function(err, docs){
                        if(err){
                            handleError(res, err.message, "Failed to get student housing collection.");
                        }else{
                            res.status(200).json(docs);
                        }
                    });
                }
                else
                {
                    res.send("Sorry, transaction failed. No specified information type.");
                }
                
            
        }
        
        
    });


};