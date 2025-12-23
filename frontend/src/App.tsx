import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SharedDesksPage from "./pages/DesksPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/desks" />} />
          <Route path="/desks" element={<SharedDesksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
