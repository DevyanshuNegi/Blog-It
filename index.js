import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// var blogList = [{heading: "Global Warming", blogText: "this is the actual blog text an this is very fun here is cold but made of gold this is my kingdom come "}];
//{heading: , blogText}
var headingList = ["about", "more topics"]
var blogTextList = [
    "I am a 1st year b.tech college student studying at vit bhopal. This is one of my first web dev. projects.\n In order to make it I used HTML, CSS and JS(embedded js also not sure comes in frontend or backend) on the frontend and nodejs expressjs . I recently started backend I hope it goes well. \n As of now I have not added any database to it so your data or blogs will not be saved anywere and will be gone as soon as you reload the page"
, "use the post button to post more content "
]

var blogList = {heading: headingList, blogText: blogTextList};


for(let heading = 0; heading<headingList.length; heading++){
    app.get(("/"+headingList[heading]).replaceAll(" ", "%20"), (req, res)=>{
        var currBlog = {heading: headingList[heading], blogText: blogTextList[heading]}
        res.render("readelement.ejs", currBlog);
        console.log(heading);
    })
}

// var blogList = {}; // when you want clear in read
app.get("/", (req, res) => {
    res.render("index.ejs");

});

app.listen(port, ()=>{
    console.log("listening");
})

app.post("/post", (req, res)=>{
    console.log(req.body);
    // blogList.push(req.body);
    var heading = req.body.heading;
    var blogText = req.body.blogtext;
    headingList.push(heading);
    blogTextList.push(blogText);
    res.render("post.ejs");

    // to make get request for the new blogs
    app.get("/"+req.body.heading, (req, res)=>{
        res.render("readelement.ejs",{heading: heading, blogText:blogText} );
    }) 

})

app.get("/read", (req, res)=>{
    console.log("this is read page")
    res.render("read.ejs", blogList)


})

app.get("/post", (req, res)=>{ 

    console.log("post")
    res.render("post.ejs")

})