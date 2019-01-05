# Advance search:

This module help to build advance mongodb search queries.

EX.  
(nodejs ANd php or angullar 4)  
(nodejs or (java and (angular 2 or (reactjs and javascript))))  
(nodejs and php or (java and php or (mongodb and typescript)))  
(sql and (mongodb or (dynamodb oR (redis or dynamodb) or (mongodb and javascript))))  

# How to use it:

const gk = require('and-or-search');

Example: (Support collection array & string attributes)

1. let res = gk.query('(nodejs AND (java or php))', 'skills', 'array');

2. let res = gk.query('(tom or jon)', 'first_name', 'string');

 1st parameter is infix expression.  
 2nd is the name of colection attribute.  
 3rd is the type of collection atrribute (array or string).  

 # Response types:

 { message: "success", code: 200, query: [object] }  
 { message: "Please provide expression to evaluate", code: 400, query: {} }


# User collection:

{  
    "_id" : ObjectId("5c30e7c172fbebb2a8776d2c"),  
    "first_name" : "tom",  
    "last_name" : "PQR",  
    "skills" : [  
        "nodejs",  
        "php",  
        "mongodb"  
    ],  
    "role" : "admin"  
}  

{  
    "_id" : ObjectId("5c30e82b72fbebb2a8776d45"),  
    "first_name" : "Jon",  
    "last_name" : "XYZ",  
    "skills" : [   
        "cordova",  
        "javascript",  
        "swift"  
    ],  
    "role" : "admin"  
}  


let res = gk.query('(nodejs AND (java or php))', 'skills', 'array');

db.collection('user')  
   .find(res.query)  
   .then(result => {  
    //  
   }).catch(err => {  
    //  
   })  





