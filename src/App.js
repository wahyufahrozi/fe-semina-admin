import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Speakers from "./Pages/Speakers";

import SpeakersCreate from "./Pages/Speakers/create";
import SpeakersEdit from "./Pages/Speakers/edit";
import PageSignin from "./Pages/SignIn";
import Categories from "./Pages/Categories";
import CategoriesCreate from "./Pages/Categories/create";
import CategoriesEdit from "./Pages/Categories/edit";
import { listen } from "./redux/listener";
import EventPage from "./Pages/Events";
import EventsCreate from "./Pages/Events/create";
import EventsEdit from "./Pages/Events/edit";
import Transactions from "./Pages/Transactions";
import Logout from "./Pages/Logout";
function App() {
  React.useEffect(() => {
    listen();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <Routes>
        <Route path="/login" element={<PageSignin />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/create" element={<CategoriesCreate />} />
        <Route
          path="/categories/edit/:categoryId"
          element={<CategoriesEdit />}
        />
        <Route path="speakers" element={<Speakers />} />
        <Route path="speakers" element={<Speakers />} />
        <Route path="speakers/create" element={<SpeakersCreate />} />
        <Route path="speakers/edit/:speakerId" element={<SpeakersEdit />} />
        <Route path="events" element={<EventPage />} />
        <Route path="events/create" element={<EventsCreate />} />
        <Route path="events/edit/:eventId" element={<EventsEdit />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
