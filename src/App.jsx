// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LayoutAdmin from "./LayoutAdmin";
import HomePage from "./pages/HomePage";
import DaftarDokterPages from "./pages/DaftarDokter.Pages";
import TutorialPages from "./pages/TutorialPages";
import SyaratKentenPages from "./pages/SyaratKentenPages";
import AboutPage from "./pages/AboutPages";
import LoginPages from "./pages/LoginPage";
import RegisterUserPage from "./pages/RegisterUserPage";

// ADMIN
import AboutAdmin from "./pages/admin/AboutAdmin";
import Hospitals from "./pages/admin/Hospitals";
import LoginAdmin from "./pages/admin/LoginAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import GejalaAdmin from "./pages/admin/GejalaAdmin";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/daftar-dokter"
        element={
          <Layout>
            <DaftarDokterPages />
          </Layout>
        }
      />
      <Route
        path="/cara-penggunaan"
        element={
          <Layout>
            <TutorialPages />
          </Layout>
        }
      />
      <Route
        path="/syaratketen"
        element={
          <Layout>
            <SyaratKentenPages />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <AboutPage />
          </Layout>
        }
      />
      <Route path="/login" element={<LoginPages />} />
      <Route path="/register-user" element={<RegisterUserPage />} />

      {/* ADMIN */}
      <Route
        path="/admin/about"
        element={
          <LayoutAdmin>
            <AboutAdmin />
          </LayoutAdmin>
        }
      />
      <Route
        path="/admin/daftar-hospitals"
        element={
          <LayoutAdmin>
            <Hospitals />
          </LayoutAdmin>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <LayoutAdmin>
            <DashboardAdmin />
          </LayoutAdmin>
        }
      />

      <Route
        path="/admin/daftar-gejala"
        element={
          <LayoutAdmin>
            <GejalaAdmin />
          </LayoutAdmin>
        }
      />

      <Route path="/admin/login-admin" element={<LoginAdmin />} />

      {/* ADMIN END */}
    </Routes>
  );
}

export default App;
