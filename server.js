require('dotenv').config()
const express = require('express')
const app=express()
const jwt= require('jsonwebtoken')


app.use(express.json())

app.get('/api' , (req,res)=>{
    res.json({
        message:"init"
    })
})

app.post('/api/posts',verifyToken , (req,res) =>{
jwt.verify(req.token, 'secretkey', (err,authData)=>{
    if(err){
        res.sendStatus(403)
    }else
    res.json({
        message:"created.....",
        authData
    })

    

})

    
})

app.post('/api/login' , (req,res) =>{
    const user={
        id:1,
        name:"stan",
        email:"stano@gmail.com"
    }
jwt.sign({user} , 'secretkey', { expiresIn: '30s' },(err,token)=>{
    res.json({
        token
    })  
})
})

function verifyToken (req,res,next) {

    //get auth header value
    const bearerHeader= req.headers['Authorization']
    //check if undefined
    if(typeof bearerHeader !== 'undefined'){
const bearer= bearerHeader.split(' ')
const bearerToken = bearer[1]
req.token=bearerToken
next()
    }else{
        //FORBIDDEN
        res.sendStatus(403)
    }
   
}



// const posts=[{
//     username:"stab",
//     title:"post1"
// }]

// app.get('/posts',authenticateToken, (req,res) =>{
    
//  res.json(posts.filter(post => post.username=== req.user.name))
// })


// function authenticateToken( req, res, next) {
//     const authHeader=req.headers['authorization']
//     const token = authHeader && authHeader.split(" ")[1]
//     if(token== null) return res.sendStatus(401)
// jwt.verify(token , process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
//     if(err) return res.sendStatus(403)
//     req.user = user
//     next()
// })
// }



app.listen(3000 , (req,res) => console.log("server is listening to port 3000..."))