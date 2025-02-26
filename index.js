
const express = require("express")
const app = express()

PORT = 4000

app.use(express.json())
app.use(express.urlencoded({extended:true}))


const users = [
    {
        email: "abc",
        password: "xyz"
    },
    {
        email: "xyz",
        password: "pqr"
    }
]

app.post("/login", (req,res)=>{
    try{
        const {email,password} = req.body
        if(!email){
            return res.status(400).send("Email cannot be empty")
        }
        if(!password){
            return res.status(400).send("Password cannot be empty")
        }
        const user = users.filter((el)=> el.email== email)
        if(user.length < 1){
            return res.status(400).send("Wrong credentials")
        }
        if (user[0].password != password){
            return res.status(400).send("Wrong credentials")
        }
        res.send(user[0])
    }catch(err){
        res.status(500).send("Internal Server Error")
    }
})

app.get("/",(req,res)=>{
    res.send("It's working")
})

app.listen(PORT, ()=>{
    console.log(`Server is working on port ${PORT}`)
})