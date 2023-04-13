import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/Default";

import Index from "./pages/Index";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Index />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
