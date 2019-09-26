
const express =require('express');
const cors =require('cors');
const bodyParser= require('body-parser');
const mongodb =require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const app= express();
app.use(cors());
let client= new MongoClient('mongodb://localhost:27017/PersonInformation',{useNewUrlParser:true})
let connection;
client.connect( (err,conn)=>{
    if(!err){
        connection=conn;
        console.log("connection established")
    }
    else{
       console.log("connection not establishde");
    }
})
////api to add person in database
app.post('/Person',bodyParser.json(),(req,res) =>{
    //console.log(req.body);
    collection=connection.db('PersonInformation').collection('Person')
    collection.insertOne(req.body,(err,doc) =>{
        if(!err){
            res.send({status:"ok"});
        }
    })
})
///// api to show person in inforamion component
app.get('/Person',(req,res) =>{
    
    collection=connection.db('PersonInformation').collection('Person');
    collection.find({}).toArray((err,doc) =>{
        if(!err){
            res.send({status:"ok",docs:doc})
        }
        else{
            res.send({status:"failed"})
        }
    })
})

//////delete person from db api
app.delete('/PersonDelete/:id',(req,res)=>{
   
    console.log("these are path parameter ");
    console.log(req.params);
    collection=connection.db('PersonInformation').collection('Person');
    collection.remove({_id:ObjectId(req.params.id)},(err,r)=>{
        console.log("delete result");
        if(!err){
            res.send({status:"ok"})
        }
    })
})

////// update a person 
app.put('/Person',bodyParser.json(),(req,res) =>{
    console.log(req.body)
   collection=connection.db('PersonInformation').collection('Person');
   collection.updateOne({_id:ObjectId(req.body.id)},{$set:{Name:req.body.personData.Name,Age:req.body.personData.Age,
    Gender:req.body.personData.Gender,PhoneNumber:req.body.personData.PhoneNumber }},(err,r) =>{
       console.log("hey")
        if(!err){
            res.send({status:"ok"})
        }
        else
        {res.send(console.log("delete error"))}

    });
})
app.listen(3001,()=>{
    console.log("API is started running on port 3100");
})