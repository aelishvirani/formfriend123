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
import GroupView from "./components/GroupView";
import React from "react";
import Responces from "./components/Responces";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Template from "./components/template";
import UserForm from "./components/UserForm";
import Reminder from "./components/Reminder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registration' element={<Register/>}/>
        <Route path="/" element={<AppLayout />}>
          <Route index  element={<Dashboard />} />
          <Route path="group" element={<Group />} />
          <Route path="reminders" element={<Reminder/>} />
          <Route path="setting" element={<Blank />} />
          <Route path="user" element={<Blank />} />
          <Route path="form" element={<Forms />} />
          <Route path="group/addGroup" element={<AddGroup />} />
          <Route path="DetailsOfForm/:propValue" element={<DetailsOfForm />} />
          <Route path="DetailsOfForm/:propValue/Tracking/Responces" element={<Responces />} />
          <Route path=":propValue/GroupView" element={<GroupView />} />
          <Route
            path="DetailsOfForm/:propValue/Tracking"
            element={<Tracking />}
          />
          <Route path='login' element={<Login/>}/>
          <Route path='addTemplate/:propValue' element={<Template/>}/>
          <Route path='UserForm/:propValue' element={<UserForm/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
