require('dotenv').config();
const userDB = require('../../database/model/user')
const blogDB = require('../../database/model/blog')
const reviewDB = require('../../database/model/review')
const likeDB = require('../../database/model/like')
const JWT = require('jsonwebtoken')

const uuid = require('uuid')
exports.home = (req, res) => {
    res.send('Hello from Controller')
}


// function for genrate JWT

function genrateJWT(data) {
    // console.log(process.env.JWT_Secreet)
    const token  = JWT.sign(data,process.env.JWT_Secreet);
    return token; 
}





// api for registration =====================================================

exports.register = (req, res) => {

    console.log(req)

    if(req.body.fullName === undefined || req.body.email === undefined || req.body.phoneNumber === undefined || req.body.password === undefined ) return res.status(203).send('Please provides the vaild data')

    let SaveToDb = new userDB(req.body)
    let token = genrateJWT(req.body);
    
    // saving data to db
    SaveToDb
    .save()
    .then((data)=>{console.log("User Added Sucessfully !!!"); return res.send({massage : "User Added Sucessfully !!!",token})})
    .catch((err)=>{console.log({massage : "User Not Added !!!",err}); return res.status(203).send({massage : "User Not Added !!!"})})

}

// api for log in ======================================

exports.login = (req, res) => {

    if(req.body.email === undefined || req.body.password === undefined ) return res.status(203).send('Please provides the vaild data')
    
    
    userDB
    .findOne({$and :[{email : req.body.email },{ password : req.body.password}]})
    .then((data)=>{
        if(data != null)
        {
            let token = genrateJWT(req.body);
            console.log(data)
            console.log("User Found !!!",data); return res.send({massage : "Log In Sucessfully !!!",token,name : data.fullName,email : data.email})
        }
        console.log({massage : "User Not Found !!!"}); 
        return res.status(203).send({massage : "User Not Found !!!"})
    })
    .catch((err)=>{
        console.log({massage : "User Not Found !!!",err}); 
        return res.status(203).send({massage : "User Not Found !!!",err})
    })

}

// Api for card creatation 

exports.createBlog = (req,res)=>{
    // console.log(req.user)
    req.body.uuid = uuid.v4();
    req.body.author = req.user.email;
    console.log(req.body)

    let SaveToDb = new blogDB(req.body);

      // saving data to db
      SaveToDb
      .save()
      .then((data)=>{console.log("Blog Added Sucessfully !!!"); return res.send({massage : "Blog Added Sucessfully !!!"})})
      .catch((err)=>{console.log({massage : "Blog Not Added !!!",err}); return res.status(203).send({massage : "Blog Not Added !!!"})})

} 

// Api for card extraction for dasboard
 
exports.getBlog = (req,res)=>{

      // get data from db
      blogDB
      .find({author : req.user.email})
      .then((data)=>{
          console.log("Data fetched",data);
        if(data != null)
        return res.send(data)
        else 
        return res.send({message : 'No post yet'})
    })
          
      .catch((err)=>{console.log({massage : "No Data !!!",err}); return res.status(203).send({massage : "No data !!!"})})

} 


// Api for card extraction for Home

exports.getBlogHome = (req,res)=>{
    
    // get data from db
    blogDB
    .find()
    .then((data)=>{
        console.log("Data fetched",data);
        if(data != null)
        return res.send(data)
        else 
        return res.send({message : 'No post yet'})
    })
          
      .catch((err)=>{console.log({massage : "No Data !!!",err}); return res.status(203).send({massage : "No data !!!"})})

} 

// Api for posting comment         
    exports.comment = (req,res)=>{
        
        req.body.email = req.user.email;
        console.log(req.body)
      
        reviewDB.findOneAndUpdate({uuid : req.body.uuid},{ $push: {review : req.body } }, {upsert: true}).then((res)=>{console.log(res)});

        res.send({message : 'all okay'})
        
        
    } 

// Api for posting likes         
    exports.like = (req,res)=>{
        console.log(req.body)

        let data = {
            email : req.user.email,
            like : req.body.like
        }
      
        likeDB.updateOne({uuid : req.body.uuid },{$set :{likes : data}},{upsert : true}).then((res)=>{console.log(res)});

        res.send({message : 'all okay'})
        
    } 

// Api for getting likes         
    exports.getLike = async (req,res)=>{
        
        await likeDB.find({uuid : req.body.uuid})
        .then(
            (data)=>{
                let isLiked = false;
                data.map((obj)=>{
                    if(obj.likes.email === req.user.email )
                    isLiked = true;
                })
                return res.send({like : data.length,isLiked})
        })

        .catch((err)=>{console.log(err)});
        
    } 
