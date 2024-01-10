//Refactor Node.js with express Router . //Refactor our server
//since we made 5 http route for 1 model so what if there are 8 models then there are 40 routes in index.js
//thats not good for readability/visibility so we can place the routes in another folder (folder structure) like we did for the models
//using express router for that , here we use router instead of app at every place

import express from "express";
import { Book } from "../models/bookModel.js"; //imported the book model from its folder 
//since we are using Book inside thr route we need to import that to here since we changed the routes from index.js to here so

const router=express.Router();  //used .Router()





//changed the app to router here
router.post("/", async (request,response)=>{     //to create/save a new book/resource we need to create a new route /books with post http method which we used to create a new resouce lao usec express app so app.post
                        //inside that we get 2 para req and response , since working with mongoose is a asynchronous fn so we use async keyword before call back fn
                        //then used try catch structure to handle success and failure
                    try{
                    if(                                         //inside try 1st validate the input in which the client add, which is in the request body now
                                                                //we tested if all the req fields like title, author is in req.body
                                                                //if any not in the req.body return a response with status cde 400 and also send a message to client
                    !request.body.title ||
                    !request.body.author ||
                    !request.body.publishYear
                    ){
                    return response.status(400).send({
                    messagge : "Send all required fields: title, author, publishYear",
                    })

                    }

                    const newBook ={                          //and if everything typed crtly /any crtly we need to process with that 
                                                                //for that for new new book created a variable and provided the 3 fields and corresponding values
                    title : request.body.title,
                    author : request.body.author,
                    publishYear : request.body.publishYear,
                    }

                    const book = await Book.create(newBook);    //then by using book creeate we created that new book thats why given inside book.create
                                                                        //we given async before fn and await before creation part

                    return response.status(201).send(book);       // if created return response with a status code also send the book (i mean the details that we given also shown)
                                                                    //after all run npm run dev in terminal but the post method cannot be shown at the browser so we used postman
                                                                    //which is a best tool for handling webapi's there we selected http method as post and given url
                                                                    //http://localhost:5555/books , use books route too bec thats in post then we need to pass a body 
                                                                    //to test if properly work if client pass any so select body raw , json and then give the sample data like{"title":"abhiram"}
                                                                    //and then click send we get an error with status code 500  bec the body did not recognize the server so for that we need to use a middle ware in express to detect and use json
                                                                    //now if we check database we can seee the the collection added to database with the name we added in the url and inside that there is cat at there we can see the data we added through post man ,those objects came to database
                                                                    //so we created a book and it saved on database successfully

                    } catch(error){                               //i accepted array in para of catch and log that message to server console
                                                                    //and then return response with a status code and send an object with error message 
                    console.log(error.message);
                    response.status(500).send({message:error.message})

                    }

})



//Route for get all books from database
router.get("/",async(request,response)=>{   //since we created book in database now we need to get all books in our database 
                                                //for that we need to create another route /books with app.get method
                                                //eventhough its same route as post but actually diff since method is diff
                                                //here we used async fn since getting form database is also asynchronous
                    try{
                                                                        //here Book is the name of variable in which we passed the model we created using mongoose
                    const books= await Book.find({});        //here in try like previous we await Book. find with empty object inside find to get all the list of books
                                                                    //then return response with a status code and also send the books we can use books inside send
                                                                    //at that time when we test that in post man we get the status code 200 and the array of list of books as [{},{}]
                                                                    //but to get that in a shape I changed the books inside send
                                                                    //and placed an object with count and data as books
                                                                    //now when we go to postman and selected http method get and placed url with local host and at last /books
                                                                    //now when we click send we can get {count: , data: [{title: ,desc: },{}]} in this format
                                                                    //eventhough we are using Book here, In the database wht we see is cat which i created as module and passed to variable Book

                    return response.status(200).send({
                    count:books.length,
                    data:books
                    });

                    } catch(error){                           //at catch we logged error at console and also shown in page
                    console.log(error.message);
                    response.status(500).send({message: error.message}); //here at send we are placed an object since we are using a key : value pair format

                    }
})

//Route for get one book from database by id   //like if there is a list of products and we need to get product details and show to client, send audio to server and get product details 
//used for recieving the requested book
//for that just copy the route part for getting all books i mean the previous one and make edit that for easiness
//for that we need/:id too in route to search in database
router.get("/:id",async(request,response)=>{   
                    try{

                    const{id}=request.params; //recieved the id to req.params (destructure)  

                    const book= await Book.findById(id);      //then used findById instead of find and used id inside that which comes from previous line and passed that to variable book not books  


                    return response.status(200).send(book); //then after finding the book by id return that to client
                    //now going to post main and select get method in the url give url and at end /books/id here we need to use the total books getting books
                    //and instead of id i placed use the id of any book which we get when we get all books then if i clicked send we get that specific book with that id
                    //url seems like http://localhost:5555/books/657d3b3417599ca55d001809

                    } catch(error){                           
                    console.log(error.message);
                    response.status(500).send({message: error.message}); 

                    }
})

//Update a book with mongoose
//for that used the put method and used a route which we used for getting one book since we are updating one book at a time here
router.put("/:id",async(request,response)=>{
                    try{
                    //Validation to check if required fields are present in the request body
                    //we can do this type of validation i mean this if case whenever we add something here on updating we write a updated one so to check
                    if(                                         //inside try 1st validate the input in which the client add, which is in the request body now
                                                                //we tested if all the req fields like title, author is in req.body
                                                                //if any not in the req.body return a response with status cde 400 and also send a message to client
                    !request.body.title ||
                    !request.body.author ||
                    !request.body.publishYear
                    ){
                    return response.status(400).send({
                    messagge : "Send all required fields: title, author, publishYear",
                    })

                    }

                    const {id}=request.params;            //same as getting a book
                    const result=await Book.findByIdAndUpdate(id, request.body);  //but here we used findbyidandupdate also need to use request.body to write the updated one in the body of post man after getting
                                        //specified item throgh post man
                                            //could you request.body which we used in post method which said the input is in req.body .. since we already created structure like title:req.bo.. so need to again create here
                    if(!result){
                    return response.status(404).send({message: "Book not found"});   // if the book with the id we given is not found 
                                                //sometimes even after using this we get error message of catch instead of this 
                    }

                    return response.status(200).send({message: "Book Updated Successfully"});  // if found and updated 
                                                    //to check go to postman give put method give url like we given for getting one book
                                                    //and like we write these go to body , raw , json add new one , click send get the message book updated successfully
                                                    //if given wrong id in the url get result book not found
                                                    //then go to get method and acees the book with same id like we did before we get the updated details


                    } catch(error){
                    console.log(error.message);
                    return response.status(500).send({message: error.message});
                    }
})

//Route for delete a book  //for deleting only need id not need request.body like in write (post and put) 
router.delete("/:id", async(request,response)=>{
                    try{
                    const {id}=request.params;
                    const result=await Book.findByIdAndDelete(id);   //just the method used got changed to findByIdAndDelete

                    if(!result){
                    return response.status(404).send({message:'Book not found'})   //for check just go to post use delete method use link like 
                                                                                    //http://localhost:5555/books/657404c998a7afd21179a525 we can get msg like Book deleted successfully
                                                                                    //we can see in our database or in other http methods it got deleted
                    }

                    return response.status(200).send({message: 'Book deleted successfully'});

                    } catch(error){
                    console.log(error.message);
                    return response.status(500).send({message: error.message})

                    }
})

export default router;  //dont forgot to export router to use in index.js //now if we checked using postman we can see its working properly 
//so refactor is working properly //dont forgot to add current ip address in mongodb before checking bec it will make some errors
//do that even before run npm run dev