import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./Components/Start";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ForgetPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/ResetPassword";
import PasswordSuccess from "./Components/PasswordSuccess";
import Home from "./Components/Home";
import Choose from "./Components/Choose";
import Cart from "./Components/Cart";
import Delivery from "./Components/Delivery";
import AddCard from "./Components/AddCard";
import CardSuccess from "./Components/CardSuccess";
import ThankYou from "./Components/ThankYou";
import Feedback from "./Components/Feedback";
import OTPVerification from "./Components/OTPVerification";
import AdminHome from "./Components/AdminHome";
import AdminAdd from "./Components/AdminAdd";
import AdminUpdate from "./Components/AdminUpdate";
import AddAddress from  "./Components/AddAddress";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/password-success" element={<PasswordSuccess />} />
        <Route path="/home" element={<Home />} />
        <Route path="/choose/:id" element={<Choose />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/add-card" element={<AddCard />} />
        <Route path="/card-success" element={<CardSuccess />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin-add" element={<AdminAdd />} />
        <Route path="/admin-update" element={<AdminUpdate />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;