var express = require('express')
const pool = require("./pool")
const upload = require("./multer")
var router = express.Router()


router.get('/firstpage',function(req,res,next){

    res.render('food_interface',{message:''})

})


router.post('/submitfood',upload.single('foodpicture'),function(req,res){

    try{
        console.log("body : ",req.body)
        console.log("file : ",req.file)
        pool.query("insert into fooditem(categoryid, subcategoryid, foodname, ingredients, description, price, offerprice, foodtype, status, foodimage) values(?,?,?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.foodname,req.body.ingredients,req.body.description,req.body.price,req.body.offerprice,req.body.foodtype,req.body.status,req.file.filename],function(error,result)
    {

        console.log("error : ",error)

            if(error)
            {
                res.render('food_interface',{message:'THERE IS AN ISSUE IN DATA BASE'})
            }

            if(result)
            {
                res.render('food_interface',{message:'THE DATA IS SUBMITTED SUCCESSFULY.....'})
            }
            
    })
        
    }   

    
    catch(e)

        {
           res.render('food_interface',{message:'THERE IS AN ERROR DUE TO SERVER'})
        }
             
    
})

    router.get('/fillcategory',function(req,res){

        pool.query("Select * from category" , function(error,result)
    {

        if(error)
            {
                res.json({data:[],status:false,message:"FAILURE"})
            }

        else
            {
                res.json({data:result,status:true,message:"SUCCESS"})
            }

    })

    })

    // -----------------------------------------------------------------

    router.get('/fillsubcategory',function(req,res){

        pool.query("Select * from subcategory where categoryid=?",[req.query.categoryid] , function(error,result)
    {

        if(error)
            {
                res.json({data:[],status:false,message:"FAILURE"})
            }

        else
            {
                res.json({data:result,status:true,message:"SUCCESS"})
            }

    })

    })

    router.get('/menu',function(req,res,next){


        pool.query('Select * from fooditem',function(error,result){
            
            res.render('menuinterface',{status:true,data:result})

        })

    })








module.exports = router;