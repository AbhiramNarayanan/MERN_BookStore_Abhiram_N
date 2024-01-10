//deleted the previously made frontend folder that just made for showing
//here instead of CRA , create react app package to install react here we are using vite which is a build tool which helps to create react app
//simpler and faster than create react app package
//so for that came to main folder of app in terminal npm create @vitelatest to install latest vite 
//give the project name(thats the name coing to the folder) so i gave frontend, then selected framework as react and variant javascript
//now we can see the folder frontend appears with src, public and other folders inside it , then type npm install for install npm package 
// thus we can see the node modules appeared then we installed vite now then now we need to install tailwind css
//for that go to tailwind css.com , get started , framework guides, vite, then we can see some lines of code step by step
//we already done 1st step which is npm create vite@latest.., then come to second step there is 2 line of code to install tailwind css
//npm install -D tailwindcss postcss autoprefixer  (for CSS autoprefixer)//npx tailwindcss init -p put that in terminal one by one after ths second line
//we can see tailwind config and postcss config in src folder ,then there is something to place in content part of tailwindconfig which get from site
//then at index.css delete all and place the code get from tailwind css website inside that index.css and then delete app.css we dont need that
//then at app.js delete all and then create a component using rafce 

import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";

const App = () => {
  return (
  
  // <div className="bg-red-400 text-white">App</div>//use styles like these type placed inside className //in tailwind css we dont need an extra file 
                                                           //we can create css styles in the main file itself for eg in html itself or at js file react
                                                           //using styles in className
                                                           //then npm run dev at terminal to run code (its already like that dont need to give in script or any like we did in backend)
                                                           //we can see the localhost in which it running if we gone to that we can see App with a color and background color
                                                           //now we created a react project with tailwind css

  //after installing vite and tailwind css and texting with above written comment now we need single page application (spa)
  //but by default react dont have that so we need to install a package npm i react-router-dom then we need to add some configuration
  //go to main.jsx and import BrowserRouter from react-router-dom (replace i mean dlt React.StrictMode in that place we are using the BrowserRouter)and place the app component as a child in BrowserRouter
  //now we have access to react-router-dom on all our projects
  //now import routes and route in the App.js page and like we studied before create diff routes and for each routes go to dff components 
  //now for components make a folder pages and then inside that create diff components are created and use them as our application base
  //here for each component start the name with capital also use extension .jsx may be .jsx also ok
  //we test them one by one when we develop space 



  <Routes>

    <Route path="/" element={<Home />}/>
    <Route path="/books/create" element={<CreateBook />}/>
    <Route path="/books/details/:id" element={<ShowBook />}/>
    <Route path="/books/edit/:id" element={<EditBook />}/>
    <Route path="/books/delete/:id" element={<DeleteBook />}/>

  </Routes>

  
)};

export default App;
//After doing these installed axios and react icons (npm i axios react-icons)
//axios for sending http req
//then go to frontend npm run dev
//since now the frontend ip is diff use the default cors of backend , and made the one which we give origin to comment, because now its diff  (the frontend origin (ip))since we used vite..
//then at another terminal npm run dev for backend