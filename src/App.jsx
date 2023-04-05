import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DefaultLayout from "./layouts/Default";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
