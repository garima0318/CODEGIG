const express=require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize=require('sequelize');
const Op=Sequelize.Op;
//Get gig List
router.get('/',(req,res)=>
    Gig.findAll()
       .then(gigs =>{
           res.render('gigs',{
             gigs  
           }))
       .catch(err => console.log(err)));
//Display add gig form
router.get('/add',(req,res)=>res.render('add'));
//Add a gig
router.get('/add',(req,res)=>{
    const data={
        title:'Looking for a react developer',
        technologies:'react,javascript,html,css',
        budget:'$3000',
        description:'Sequelize is a promise-based Node. js ORM tool for Postgres, MySQL, MariaDB, SQLite, DB2 and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more. Sequelize follows Semantic Versioning and supports Node v10 and above.',
        contact_email:'user1@gmail.com'
    }
let ={title,technologies,budget,description,contact_email }=data;
let errors=[];
//Validate Fields
if(!title){
    errors.push({text:'Please add a title'});
}
if(!tecnologies){
    errors.push({text:'Please add some technologies'});
}
if(!description){
    errors.push({text:'Please add some description'});
}
if(!contact_email){
    errors.push({text:'Please add some contact email'});
}
//Check for errors
if(error.length>0){
   res.render('add',{
       errors,
       title,
       technologies,
       budget,
       description,
       contact_email
});
} else{
    if(!budget){
        budget='Unknown';
    }else{
        budget=`$${budget}`;
    }
//Make lowercsae and remove space after comma
    technologies=technologies.toLowerCase().replace(/,/g,',');
//Insert into table
Gig.create({
   title, 
   technologies,
   description,
   budget,
   contact_email 
})
   .then(gig=>res.redirect('/gigs'))
   .catch(err=>console.log(err));
 }
});
//Search for gigs
router.get('/search',(req,res)=>{
  const{term}=req.query;
  Gigs.findAll({where:{technologie:{[Op.like]:'%'+term+'%'}}})
  .then(gigs=>res.render('gigs',{gigs}))
  .catch(err=>console.log(err));
});
module.exports = router;