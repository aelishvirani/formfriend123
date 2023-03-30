import "./App.scss";
import "boxicons/css/boxicons.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Blank from "./pages/Blank";
import Dashboard from "./pages/Dashboard";
import Forms from "./components/form/Form";
import Group from "./pages/Group";
import AddGroup from "./components/AddGroup";
import DetailsOfForm from "./components/DetailsOfForm";
import Tracking from "./components/Tracking";
import React from "react";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="group" element={<Group />} />
          <Route path="reminders" element={<Blank />} />
          <Route path="setting" element={<Blank />} />
          <Route path="user" element={<Blank />} />
          <Route path="form" element={<Forms />} />
          <Route path="group/addGroup" element={<AddGroup />} />
          <Route path="DetailsOfForm/:propValue" element={<DetailsOfForm />} />
          <Route
            path="DetailsOfForm/:propValue/Tracking"
            element={<Tracking />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
