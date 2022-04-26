import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Categories from "./Pages/Categories";
import SignIn from "./Pages/SignIn";
import NavbarComponent from "./components/Navbar";
import Speakers from "./Pages/Speakers";
import CategoryCreate from "./Pages/Categories/create";
import CategoryEdit from "./Pages/Categories/edit";
import { listen } from "./redux/listener";
// import PageSignIn from "./Pages/SignIn";
// import Title from "./title";

function App() {
  useEffect(() => {
    listen();
  }, []);
  // const [tombol, setTombol] = useState(false);
  // const [tombol2, setTombol2] = useState(false);
  // const [categories, setCategories] = useState([]);
  // const [speakers, setSpeakers] = useState([]);
  // const [keyword, setKeyword] = useState("");

  // const [time, setTime] = useState(" ");

  // const [counter, setCounter] = useState(0);
  // const [value, setvalue] = useState(0);
  // const handleClickIncrement = (counter) => {
  //   setCounter(counter);
  // };

  ////////////////////
  //LIFE CYCLE
  ///////////////////
  // React.useEffect(() => {
  // setInterval(() => {
  //   setTime(new Date().toLocaleTimeString());
  // }, 1000);
  // console.log("use effect tanpa depedenciees");
  // }); //d panggil tiap ada perubahan pada state

  // React.useEffect(() => {
  //   console.log("component did mount"); //cumman sekali saja dipanggil
  // }, []);

  // React.useEffect(() => {
  //   console.log("Use effect tombol"); //menantau perubahan pada tombol
  // }, [tombol]);
  // const getAllCategories = async () => {
  //   const res = await axios.get(`http://localhost:4000/api/v1/categories`, {
  //     headers: {
  //       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiIHdhaHl1IGZhaHJvemkiLCJ1c2VySWQiOiI2MjM4YTYzOWI2ZWE0NThhODJiOWFkZjgiLCJyb2xlIjoic3VwZXItYWRtaW4iLCJlbWFpbCI6Impha2FydGExMjNAZ21haWwuY29tIiwiaWF0IjoxNjQ5NTgwODAzfQ.LPKBBKol_72QXrPpFzePno2lFcIh0Gl4ufkUFfIRNzA`,
  //     },
  //   });
  ///////////////////////////=======================================////////////////////////////////

  //   setCategories(res.data.data);
  // };
  // const getAllSpeaker = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4000/api/v1/speakers?keyword=${keyword}`,
  //     {
  //       headers: {
  //         authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiIHdhaHl1IGZhaHJvemkiLCJ1c2VySWQiOiI2MjM4YTYzOWI2ZWE0NThhODJiOWFkZjgiLCJyb2xlIjoic3VwZXItYWRtaW4iLCJlbWFpbCI6Impha2FydGExMjNAZ21haWwuY29tIiwiaWF0IjoxNjQ5NTgwODAzfQ.LPKBBKol_72QXrPpFzePno2lFcIh0Gl4ufkUFfIRNzA`,
  //       },
  //     }
  //   );

  //   setSpeakers(res.data.data);
  // };
  // React.useEffect(() => {
  //   getAllCategories();
  // }, []);

  // React.useEffect(() => {
  //   getAllSpeaker();
  // }, [keyword]);

  return (
    <BrowserRouter>
      <NavbarComponent />
      <br />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/create" element={<CategoryCreate />} />
        <Route path="/categories/edit/:categoryId" element={<CategoryEdit />} />
        <Route path="/speakers" element={<Speakers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
