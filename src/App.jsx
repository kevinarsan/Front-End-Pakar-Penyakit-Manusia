import React from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Layout from "./Layout";
import LayoutAdmin from "./LayoutAdmin";
import DiagnosaPage from "./pages/DiagnosaPage";
import DaftarDokterPages from "./pages/DaftarDokter.Pages";
import TutorialPages from "./pages/TutorialPages";
import AboutPage from "./pages/AboutPages";
import LoginPages from "./pages/LoginPage";
import RegisterUserPage from "./pages/RegisterUserPage";
import FaqPage from "./pages/FaqPage";
import ContactKami from "./pages/ContactPage";

// ADMIN
import AboutAdmin from "./pages/admin/AboutAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import GejalaAdmin from "./pages/admin/GejalaAdmin";
import LaporanAdmin from "./pages/admin/LaporanAdmin";
import PenyakitAdmin from "./pages/admin/PenyakitAdmin";
import AturanAdmin from "./pages/admin/AturanAdmin";
import TransaksiAdmin from "./pages/admin/TransaksiAdmin";

import LoginAdmin from "./pages/admin/LoginAdmin";
import Hospitals from "./pages/admin/Hospitals";

// DETAILS
import DetailDokterPages from "./pages/details/DokterDetailPages";

function App() {
  return (
    <Routes>
      {/* <Route path="/login" element={<LoginPages />} /> */}
      <Route
        path="/login"
        element={
          <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
            <LoginPages />
          </GoogleOAuthProvider>
        }
      />

      <Route path="/register-user" element={<RegisterUserPage />} />

      <Route
        path="/"
        element={
          <Layout>
            <AboutPage />
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
        path="/diagnosa"
        element={
          <Layout>
            <DiagnosaPage />
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
        path="/faq"
        element={
          <Layout>
            <FaqPage />
          </Layout>
        }
      />

      <Route
        path="/kontak-kami"
        element={
          <Layout>
            <ContactKami />
          </Layout>
        }
      />

      {/* ADMIN */}
      <Route path="/admin/login-admin" element={<LoginAdmin />} />

      <Route
        path="/admin/about"
        element={
          <LayoutAdmin>
            <AboutAdmin />
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

      <Route
        path="/admin/daftar-penyakit"
        element={
          <LayoutAdmin>
            <PenyakitAdmin />
          </LayoutAdmin>
        }
      />

      <Route
        path="/admin/basis-aturan"
        element={
          <LayoutAdmin>
            <AturanAdmin />
          </LayoutAdmin>
        }
      />

      <Route
        path="/admin/laporan"
        element={
          <LayoutAdmin>
            <LaporanAdmin />
          </LayoutAdmin>
        }
      />

      <Route
        path="/admin/transaksi"
        element={
          <LayoutAdmin>
            <TransaksiAdmin />
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

      {/* ADMIN END */}

      {/* DETAILS */}

      <Route
        path="/admin/daftar-dokter/details/:id"
        element={
          <Layout>
            <DetailDokterPages />
          </Layout>
        }
      />

      {/* DETAILS END */}
    </Routes>
  );
}

export default App;
