//Now let's implement Home page
//so i imported useeeffect and usestate

import React, { useEffect, useState } from "react";
import axios from "axios"; //for sending http req
import Spinner from "../components/Spinner"; //to show spinner on loading state
import { Link } from "react-router-dom"; //for links
import { AiOutlineEdit } from "react-icons/ai"; //then diff icons
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  //then we need to create 2 state
  const [books, setBooks] = useState([]); //books state with default value of empty array //at starting we didnt created any books //maybe thats why empty
  const [loading, setLoading] = useState(false); //loading state with default value of false //maybe since at start we dont need loading rigt
  //then we need useEffect to call our backend
  //used a useEffect with a empty dependancy array
  useEffect(() => {
    setLoading(true); //then made setLoading to true //when we connect we need loading at 1st that's why
    //then we call axios.get with backend route for books list
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        //here response.data is the object of our response result and data is our content data
        //we use this data to save in our state
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        //if we shown any of the result we need to stop loading right whats why it set to false
        setLoading(false);
      });
  }, []);
  return (
    //now lets work on jsx parts //for our main div we given a padding 4
    <div className="p-4">
      <div className="flex justify-between items-center">
        {/* we given flex and justify content space between and items aligned to center */}
        <h1 className="text-3xl my-8">Books List</h1>
        {/*for text 3x large margin y 8 */}{" "}
        {/*we have a main div inside that a div inside that a heading and a link, for this label use an icon up in MdOutlineAddBox  */}
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />{" "}
          {/*for the link we used an icon */}
        </Link>
      </div>
      {/* then we used a condition if loading show spinner else show a table*/}
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          
          {/*then we give width and other styles , usedthead and tbody just placed the heading and body sep and others are same */}
          <thead>
            <tr>
              <th className="border border-slate-600 rounder-md">No</th>{" "}
              {/*then border s late */}
              <th className="border border-slate-600 rounder-md">Title</th>
              <th className="border border-slate-600 rounder-md max-md:hidden">
                Author
              </th>{" "}
              {/*here in 2 columns out of 5 we use max-md:hidden which means these 2 columns are hidden for mobile and tablet sizes i mean for smaller sizes */}
              <th className="border border-slate-600 rounder-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-600 rounder-md">Operations</th>
            </tr>
          </thead>
          <tbody>
                               {/*nowinside the tbody we mapped the books and for each content in books array we received 2 , abook and its index */}
                               {/*here i am using () after the map function , like this enclose everything , i mean every jsx using parantheses is needed to get result of map , it needed to show tr inside map*/}
                               {/*if not () this ,can use {return()} instead of (), enclose every jsx in return after curly bracket, Using Curly Braces and Return Statement */}
            {books.map((book, index) => ( 
              <tr key={book._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                  {/*we use this because the index start from 0 but we need it from 1 so... */}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {/*like we did before given styles for each */}
                  {book.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {/*in the last td we placed a div with 3 lnks */}
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      {/*we given the route like this to get dynamic route  */}
                      <BsInfoCircle className="text-2x1 text-green-800" />{" "}
                      {/*used icon as link */}
                    </Link>

                    <Link to={`/books/details/${book._id}`}>
                      <AiOutlineEdit className="text-2x1 text-yellow-600" />{" "}
                      {/*Edit icon */}
                    </Link>

                    <Link to={`/books/details/${book._id}`}>
                      <MdOutlineDelete className="text-2x1 text-red-600" />{" "}
                      {/*delete icon */}
                    </Link>
                  </div>
                </td>
              </tr>
            )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;

//after typing all , right click and format document, coding should align crtly ,and then go to our application (to the url we get when we run npm run dev in frontend) to see results
