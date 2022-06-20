const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
const https=require("https");

//that's for static files because when we load our local server the static files are not get loaded into the browser so to get that we use express.static and we tend to place all the static files at one location only here we kept that thing in public folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

//in this we try to get the values like fname , lname , email
app.post("/",function(req,res){
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;
    console.log(firstName,lastName,email);

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);

    const url="https://us13.api.mailchimp.com/3.0/lists/a17e0dcd9f";

    const options = {
        method: "POST",
        auth: "sahil_kadiyan_:e38d1a5fd74c801c34cf8f3b6577d6d6-us13"

    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));

        })


    })
    request.write(jsonData);
    request.end();





});
//don't forgot to add action and method in form in html otherwise no console statements will be shown 


//this post req is corresponding to failure when fail occurs then we redirect the user to the root page that is they need to try thst thing i.e for signing up again!!!
app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){

    console.log("Server is running on port 3000");

//process.env.PORT is a dynamic port that the herouku will define !!!

});


//e38d1a5fd74c801c34cf8f3b6577d6d6-us13

//audience or list id :  a17e0dcd9f
