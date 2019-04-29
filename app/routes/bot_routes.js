
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

        console.log("recieve post request.");
        if (req.body.queryResult.parameters.accessCode != null) {
            //MGA POST DIRI, IN SHORT, PARA ADMIN
            if (req.body.queryResult.parameters.informationType == "scholarship") {
                const scholarship = {scholarshipTitle: req.body.queryResult.parameters.scholarshipTitle,
                scholarshipDescription: req.body.queryResult.parameters.scholarshipDescription,
                informationType: req.body.queryResult.parameters.informationType, 
                accessCode: req.body.queryResult.parameters.accessCode};
                   
                    if(req.body.queryResult.parameters.accessCode == "admin123")
                    {
                        db.db().collection('scholarships').insertOne(scholarship, (err, result) => {
                            if(err) {
                               // res.send({ 'error': 'An error has occured. Cannot create document for Scholarship. '});
                                return res.json({
                                    "fulfillmentText":"An error has occured. Cannot create document for Scholarship."
                                });
                            } else {
                                //res.send(result.ops[0]);
                                var scholarshipTitle = result.ops[0].scholarshipTitle;
                                var scholarshipDescription = result.ops[0].scholarshipDescription;

                                return res.json({
                                    "fulfillmentText" : "Okay, got it! You added a scholarship information which is " + scholarshipTitle +
                                    " with a description: " + scholarshipDescription
                                });

                            }
                        }) 
                    }else 
                    {
                        return res.json({
                            "fulfillmentText":"Sorry I cannot add that, you've got a wrong access code."
                        });
                    }
    
            } else if (req.body.queryResult.parameters.informationType == "event") {
                
                const event = {informationType: req.body.queryResult.parameters.informationType, 
                    eventTitle: req.body.queryResult.parameters.eventTitle,
                    eventDateTime: {startDate: dateToISO(req.body.queryResult.parameters.eventDateTime.startTime), 
                    endDate: dateToISO(req.body.queryResult.parameters.eventDateTime.endTime)}, 
                    eventLocation: req.body.queryResult.parameters.eventLocation, 
                    eventDetails: req.body.queryResult.parameters.eventDetails,  accessCode: req.body.queryResult.parameters.accessCode };
        
                if(req.body.queryResult.parameters.accessCode == "admin123")
                {
                    db.db().collection('events').insertOne(event, (err, result) => {
                        if(err) {
                            //res.send({ 'error': 'An error has occured. Cannot create document for an Event. '});
                            return res.json({
                                "fulfillmentText":"An error has occured. Cannot create document for an Event."
                            });
                        } else {
                            //res.send(result.ops[0]);
                            var eventTitle = result.ops[0].eventTitle;
                            var eventStart = result.ops[0].eventDateTime.startDate;
                            var eventEnd = result.ops[0].eventDateTime.endDate;
                            var eventLocation = result.ops[0].eventLocation;
                            var eventDetails = result.ops[0].eventDetails;

                            return res.json({
                                "fulfillmentText": "Okay, got it! You added an event named " + eventTitle +
                                " that will be held on " + eventStart + " to " + eventEnd + " at " + eventLocation +
                                ". the details added for the event: " + eventDetails 
                            });
                        }
                    })
                }else 
                {
                    return res.json({
                        "fulfillmentText":"Sorry I cannot add that, you've got a wrong access code."
                    });
                }
    
            } else if (req.body.queryResult.parameters.informationType == "requirements") {

                var requirement;
                if(req.body.queryResult.parameters.deadlineDate != null)
                {
                    requirement = {informationType: req.body.queryResult.parameters.informationType, 
                        requirementTitle: req.body.queryResult.parameters.requirementTitle,
                        requirementList: req.body.queryResult.parameters.requirementsList, 
                        accessCode: req.body.queryResult.parameters.accessCode,
                        deadlineDate: dateToISO(req.body.queryResult.parameters.deadlineDate)
                    };
                }else {
                    requirement = {informationType: req.body.queryResult.parameters.informationType, 
                        requirementTitle: req.body.queryResult.parameters.requirementTitle,
                        requirementList: req.body.queryResult.parameters.requirementsList, 
                        accessCode: req.body.queryResult.parameters.accessCode
                    };
                }
                
        
                if(req.body.queryResult.parameters.accessCode == "admin123")
                {
                    db.db().collection('requirements').insertOne(requirement, (err, result) => {
                        if(err){
                            //res.send({ 'error': 'An error has occured. Cannot create document for requirement. '});
                            return res.json({
                                "fulfillmentText": "An error has occured. Cannot create document for requirement information."
                            })
                        } else {
                            //res.send(result.ops[0]);
                            var requirementTitle = result.ops[0].requirementTitle;
                            var requirementsList = result.ops[0].requirementList;
                            
                            if (req.body.queryResult.parameters.deadlineDate != null)
                            {
                                var deadlineDate = result.ops[0].deadlineDate;
                                return res.json({
                                    "fulfillmentText": "Okay, got it! You added a requirement information which is for "+
                                    requirementTitle + " which have the following requirements: " + requirementsList +
                                    " and deadline is on " + deadlineDate
                                })
                            } else {
                                return res.json({
                                    "fulfillmentText": "Okay, got it! You added a requirement information which is for "+
                                    requirementTitle + " which have the following requirements: " + requirementsList   
                                })
                            }
                            
                        }
                    })
                }else 
                {
                    return res.json({
                        "fulfillmentText":"Sorry I cannot add that, you've got a wrong access code."
                    });
                }
    
            } else if (req.body.queryResult.parameters.informationType == "process") {

                var process;
                if (req.body.queryResult.parameters.processDate != null)
                {
                    process = {informationType: req.body.queryResult.parameters.informationType, 
                        processTitle: req.body.queryResult.parameters.processTitle,
                        processList: req.body.queryResult.parameters.processList, 
                        accessCode: req.body.queryResult.parameters.accessCode,
                        processDate:{
                            endDate: dateToISO(req.body.queryResult.parameters.processDate.endDate),
                            startDate: dateToISO(req.body.queryResult.parameters.processDate.startDate)
                        }};
                } else {
                    process = {informationType: req.body.queryResult.parameters.informationType, 
                        processTitle: req.body.queryResult.parameters.processTitle, 
                        processList: req.body.queryResult.parameters.processList, 
                        accessCode: req.body.queryResult.parameters.accessCode};
                }

                if(req.body.queryResult.parameters.accessCode == "admin123")
                {
                    db.db().collection('processes').insertOne(process, (err, result) => {
                        if(err){
                            //res.send({'error': 'An Error has occured. Cannot create document for a process.'});
                            return res.json({
                                "fulfillmentText": "An Error has occured. Cannot create document for student housing information."
                            })
                        } else {
                            //res.send(result.ops[0]);

                            var processTitle = result.ops[0].processTitle;
                            var processList = result.ops[0].processList;


                            if (req.body.queryResult.parameters.processDate != null)
                            {
                                var startDate = result.ops[0].processDate.startDate;
                                var endDate = result.ops[0].processDate.endDate;
                                return res.json({
                                    "fulfillmentText": "Okay, got it! You added a University Process information which is for" +
                                    processTitle + ". the flow of the process occordingly are: " + processList
                                   + ". This process will be only valid from " + startDate + " to " + endDate
                                });


                            } else {
                                return res.json({
                                    "fulfillmentText": "Okay, got it! You added a University Process information which is for" +
                                    processTitle + ". the flow of the process occordingly are: " + processList
                                })
                            }
                           
                        }
                    })
                }else 
                {
                    //res.send("Sorry I cannot add that, you've got a wrong access code.");
                    return res.json({
                        "fulfillmentText":"Sorry I cannot add that, you've got a wrong access code."
                    });
                }
    
            } else if (req.body.queryResult.parameters.informationType == "housing") {
                const studentHousing = {informationType: req.body.queryResult.parameters.informationType, 
                    housingType: req.body.queryResult.parameters.studentHousing,
                    housingDetails: req.body.queryResult.parameters.housingDetails, 
                    contactPerson: req.body.queryResult.parameters.contactPerson, 
                    contactNumber: req.body.queryResult.parameters.contactNumber,
                    accessCode: req.body.queryResult.parameters.accessCode};
            
                    if (req.body.queryResult.parameters.accessCode == "admin123" )
                    {
                        db.db().collection('studentHousing').insertOne(studentHousing, (err, result) => {
                            if(err){
                                return res.json({
                                    "fulfillmentText": "An Error has occured. Cannot create document for student housing information."
                                });
                              //  res.send({'error': 'An Error has occured. Cannot create document for student housing information.'});
                            }else {
                                var housingDetails = result.ops[0].housingDetails;
                                var housingType = result.ops[0].housingType;
                                var contactPerson = result.ops[0].contactPerson;
                                var contactNumber = result.ops[0].contactNumber;

                                let response = " ";
                                var textResponse = "Okay, got it! You added Student Housing information with the following details: " +
                                "housing type is a " + housingType + ". The details are " + housingDetails + ". You can contact " + contactPerson + 
                                " with his/her phone number " + contactNumber;

                                let responseObject ={
                                    "fulfillmentText": response,
                                    "fulfillmentMessages": [{"text":{"text": [textResponse]}}],
                                    "source":""
                                };
                                return res.json(responseObject);
                               
                            }
                            
                        })
                    }else
                    {
                        return res.json ({
                            "fulfillmentText": "Sorry I cannot add that, you've got a wrong access code."
                        });
                       // res.send("Sorry I cannot add that, you've got a wrong access code.");
                    }
            }
        

        }else {
            
                //res.send("abot diri");
               // const informationType = req.body.informationType;
    
                if(req.body.queryResult.parameters.informationType == "scholarship")
                {
                        var scholarshipTitle = req.body.queryResult.parameters.scholarshipTitle;
                        db.db().collection('scholarships').find({
                            "scholarshipTitle": { "$regex": scholarshipTitle, "$options": "i" }
                        }).toArray(function(err, docs){
                            if(err){
                                return res.json({
                                    "fulfillment":"Sorry, failed to get scholarship information"
                                })
                                //handleError(res, err.message, "Failed to get scholarship collection.");
                            }else{
                                res.status(200).json(docs);
                            }
                        });
                        
                }
                else if(req.body.queryResult.parameters.informationType == "event")
                {
                    
                    if((req.body.queryResult.parameters.eventDate != "") || (req.body.eventLocation != "" || req.body.date != ""))
                    {

                    
                    var dateEventEnd = req.body.queryResult.parameters.eventDate.endDate;
                    var dateEventStart = req.body.queryResult.parameters.eventDate.startDate;
                    var locationEvent = req.body.queryResult.parameters.eventLocation;
                    var eventDate = req.body.queryResult.parameters.eventDate;
                    

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
                            
                           // res.status(200).json(docs);
                            res.send(docs[2].eventLocation);

                        }
                    });
                    }
                    
                }
                else if(req.body.queryResult.parameters.informationType == "process")
                {

                    
                        
                    db.db().collection('processes').find({}).toArray(function(err, docs){
                        if(err){
                            handleError(res, err.message, "Failed to get process collection.");
                        }else{
                            res.status(200).json(docs);
                        }
                    });
                }
                else if(req.body.queryResult.parameters.informationType == "program")
                {
                    res.send("get/program");
                }
                else if(req.body.queryResult.parameters.informationType == "requirements")
                {
                    db.db().collection('requirements').find({}).toArray(function(err, docs){
                        if(err){
                            handleError(res, err.message, "Failed to get requirement collection.");
                        }else{
                            res.status(200).json(docs);
                        }
                    });
                }
                else if(req.body.queryResult.parameters.informationType == "organization")
                {
                    res.send("get/organization");
                }
                else if(req.body.queryResult.parameters.informationType == "scholarship")
                {
                    res.send("get/scholarship");
                }
                else if(req.body.queryResult.parameters.informationType == "guidelines")
                {
                    var guidelines = req.body.queryResult.parameters.guidelines;
                    console.log(guidelines);
                    db.db().collection('guidelines').find({
                        "guidelines": { "$regex": guidelines, "$options": "i" }
                    }).toArray(function(err, docs){
                        if(err){
                            return res.json({
                                "fulfillmentText":"Sorry, failed to get scholarship information"
                            })
                            //handleError(res, err.message, "Failed to get scholarship collection.");
                        }
                        if (docs != ""){

                            var guidelinesList = docs.guidelinesList;
                            res.status(200).json(docs);       
                        } else {
                            return res.json({
                                "fulfillmentText": "Sorry, I don't know about that."
                            });
                        }
                        
                    });
                }
                else if(req.body.queryResult.parameters.informationType == "housing")
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