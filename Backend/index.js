import express from "express";
import { PORT, mongoDBURL } from "./config.js"; //we imported mongoDBURL too because we used that in another file
import mongoose from "mongoose";  //to connect our express server with database we need to install mongoose
                                  //so we installed mongoose and imported that
                                  //next we need the save a new book with mongoose since we already createdmodel
import { Book } from "./models/bookModel.js" //imported the book model from its folder 
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body, the data send from post man body in json format can now use in express server since we used middleware express.json here which detect json format so if we click send we get
//the data we added in body of postman at the end of postman , also we can see the _id, created and updated time stamps added automatically since we used that in mongoose schema
app.use(express.json());

//cors (Cross origin resource sharing) //without this if we tried to connect our frontend with server 
//for eg: using axios.get(http:localhost...) in thr browser at console we can see error like the origin localhost :3000 (i mean the frontend) 
//to the server requested by cors policy 
//cors is a web security mechanism that restrict unauthorized cross origin access to resource/server
//simply that security meschanism which prevents the req of the frontend to a outside domain/server
//what happens is the whenever the server gets a req it checks whether the domain coming is restricted or not
//it checks the origin, methods and the allowedHeaders
app.use(cors()); //so to prevent that restriction we need to use cors package in our server  and use it llike this as a middleware
//here when we use cors() .. it accepts * as a default value which means the server accepts everything
//or we can use another way like below 
//allow custom origins which gives us more control
// app.use(cors({
//     origin: "http://localhost:3000",  //like this cors accepts an obj with 3 key value pairs i mean those 3 ones which got check by server, here in origin we give frontend url and the rest based on our needs we got control
//     methods:["GET","POST","PUT","DELETE"],
//     allowedHeaders:["Content-Type"],
// }));

app.get("/",(request,response)=>{         //we can use http method to create route here we use http method app.get, get means getting a resource from server
                                           //here we used 2 parameter one route and other call back fn where get parameter req and both response
                                           //so can even log req, can return message with response, or even send status code(status code seen at network) with msg (msg seen at screen)
    console.log(request);
    return response.status(234).send("Welcome to MERN Stack Book Store By Abhiram");

})


app.use("/books",booksRoute); //since we cut the routes from here to booksRoute.js now we can use that as a middleware
//here i am telling like for all routes with /books use middle ware booksRoute.. since we used /books here we can that part path from the routes
//that we placed inside booksRoute bec we only need that at ne place dont repeat one thing again so...


mongoose.connect(mongoDBURL).then(()=>{          //after importing mongoose library to connect our server with database we use mongoose.connect(), inside that given the url as the parameter bec we are trying to connect our database
                                                 //then used.then().catch() structure to handle success and failure case
                                                 //for success we logged some msg in .then , for failure we take error para and logged that
    console.log("App connected to Database");     //since i only need to get express server only if connected to database
                                                  //so i changed the position of app.listen from above to inside of then of mongoose.connect().then()

                                                  //then run npm run dev in terminal we get both msg of connect to db and listening to port (both msg at console.log inside then)
                                                  //both success msg shows we are ok and both db and server are running
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`); //now before using app.get if we checkecked local host we can see cannot get / 
                                                           //if we gone to tools , dev tools and network at that at docs we can see a req send to local host
                                                           //if we click that we can see 3 , general, req header, response header
                                                           //at gen we can see req url, req method:get , status code :404 (404 means we not have req url)
                                                           //for each url we need to have a http route, for server the default http route is "/" we didnt created that yet
                                                           // thats why seeing cannot get / 
                                                           //so wee need to create the http route using app.get()
      });

}).catch((error)=>{
   console.log(error);
})