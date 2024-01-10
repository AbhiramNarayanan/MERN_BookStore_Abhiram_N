import mongoose from "mongoose";    //creating book model with mongoose
                                   //so we created a sep folder models and inside that this file, all the models of the project created inside this folder models
                                   //to know sample code how to create book model with mongoose go to mongoosejs.com


const bookSchema = mongoose.Schema(    //here we created a schema with objects in it 
                                       //first we added objects of fields in it and added its type, and its required true that too
                                       //after the field obj, we just added another object of timestamps for get creation time and last update time.
                                       //and added this book schema we made inside the model
                                       //so Book model is now ready to use
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear:{
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)                                                       //here we need to save Book to database (maybe here cat is the book)
export const Book = mongoose.model('Cat', bookSchema); //inside mongoosejs.com we see something like this line we changes the variable name by Book
                                                      //we created a model for cat/what we needed , and after that we can see a schema of cat like {name : string}
                                                      //but what if we have more fields , because book has many,so we can create a schema separately using mongoose.schema
                                                      //then we use model to interact with database
                                                      //export to use in another file