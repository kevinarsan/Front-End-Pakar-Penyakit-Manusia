import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
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

// DASHBOARD
import LayoutDashboard from "./LayoutDashboard";
import HomePage from "./pages/dashboard/HomePage";
import NotificationPage from "./pages/dashboard/NotificationPage";
import ProfilesPage from "./pages/dashboard/ProfilesPage";
import PenyakitDetails from "./pages/dashboard/details/PenyakitDetails";
import DiagnosaDetails from "./pages/dashboard/details/DiagnosaDetails";
import RiwayatDetails from "./pages/dashboard/details/RiwayatDetails";

// ADMIN
import AboutAdmin from "./pages/admin/AboutAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import GejalaAdmin from "./pages/admin/GejalaAdmin";
import LaporanAdmin from "./pages/admin/LaporanAdmin";
import PenyakitAdmin from "./pages/admin/PenyakitAdmin";
import AturanAdmin from "./pages/admin/AturanAdmin";
import TransaksiAdmin from "./pages/admin/TransaksiAdmin";
import DoctorActive from "./pages/admin/DoctorActive";
import HospitalsAdmin from "./pages/admin/HospitalsAdmin";
import UserActive from "./pages/admin/UsersActive";

import LoginAdmin from "./pages/admin/LoginAdmin";

// DOKTER
import DashboardDokter from "./pages/dokter/DashboardDokter";

// DETAILS
import DetailDokterPages from "./pages/details/DokterDetailPages";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

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

      <Route
        path="/register-user"
        element={
          <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
            <RegisterUserPage />
          </GoogleOAuthProvider>
        }
      />

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

      {/* ADMIN */}
      <Route path="/admin/login-admin" element={<LoginAdmin />} />

      <Route
        path="/admin/about"
        element={
          localStorage.getItem("role") === "admin" ? (
            <LayoutAdmin>
              <AboutAdmin />
            </LayoutAdmin>
          ) : (
            <Navigate to="/admin/login-admin" />
          )
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          localStorage.getItem("role") === "admin" ? (
            <LayoutAdmin>
              <DashboardAdmin />
            </LayoutAdmin>
          ) : (
            <Navigate to="/admin/login-admin" />
          )
        }
      />

      <Route
        path="/admin/daftar-gejala"
        element={
          localStorage.getItem("role") === "admin" ? (
            <LayoutAdmin>
              <GejalaAdmin />
            </LayoutAdmin>
          ) : (
            <Navigate to="/admin/login-admin" />
          )
        }
      />

      <Route
        path="/admin/daftar-penyakit"
        element={
          localStorage.getItem("role") === "admin" ? (
            <LayoutAdmin>
              <PenyakitAdmin />
            </LayoutAdmin>
          ) : (
            <Navigate to="/admin/login-admin" />
          )
        }
      />

      <Route
        path="/admin/basis-aturan"
        element={
          localStorage.getItem("role") === "admin" ? (
            <LayoutAdmin>
              <AturanAdmin />
            </LayoutAdmin>
          ) : (
            <Navigate to="/admin/login-admin" />
          )
        }
      />

      <Route
        path="/admin/laporan"
        element={
          localStorage.getItem("role") === "admin" ? (
            <LayoutAdmin>
              <LaporanAdmin />
            </LayoutAdmin>
          ) : (
            <Navigate to="/admin/login-admin" />
          )
        }
      />

      <Route
        path="/admin/transaksi"
        element={
          localStorage.getItem("role") === "admin" ? (
            <LayoutAdmin>
              <TransaksiAdmin />
            </LayoutAdmin>
          ) : (
            <Navigate to="/admin/login-admin" />
          )
        }
      />

      <Route
        path="/admin/daftar-hospitals"
        element={
          localStorage.getItem("role") === "admin" ? (
            <LayoutAdmin>
              <HospitalsAdmin />
            </LayoutAdmin>
          ) : (
            <Navigate to="/admin/login-admin" />
          )
        }
      />

      <Route
        path="/admin/daftar-doctors"
        element={
          localStorage.getItem("role") === "admin" ? (
            <LayoutAdmin>
              <DoctorActive />
            </LayoutAdmin>
          ) : (
            <Navigate to="/admin/login-admin" />
          )
        }
      />

      <Route
        path="/admin/daftar-users"
        element={
          localStorage.getItem("role") === "admin" ? (
            <LayoutAdmin>
              <UserActive />
            </LayoutAdmin>
          ) : (
            <Navigate to="/admin/login-admin" />
          )
        }
      />

      {/* ADMIN END */}

      {/* DASHBOARD */}
      <Route
        path="/dashboard/home-page"
        element={
          <PrivateRoute>
            <LayoutDashboard>
              <HomePage />
            </LayoutDashboard>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/notification"
        element={
          <PrivateRoute>
            <LayoutDashboard>
              <NotificationPage />
            </LayoutDashboard>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/profiles"
        element={
          <PrivateRoute>
            <LayoutDashboard>
              <ProfilesPage />
            </LayoutDashboard>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/detail-penyakit"
        element={
          <PrivateRoute>
            <LayoutDashboard>
              <PenyakitDetails />
            </LayoutDashboard>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/detail-diagnosa/:id"
        element={
          <PrivateRoute>
            <LayoutDashboard>
              <DiagnosaDetails />
            </LayoutDashboard>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/detail-riwayat/:id"
        element={
          <PrivateRoute>
            <LayoutDashboard>
              <RiwayatDetails />
            </LayoutDashboard>
          </PrivateRoute>
        }
      />
      {/* DASHBOARD END */}

      {/* DASHBOARD HOME LOGIN */}

      {/* DASHBOARD HOME LOGIN END */}

      {/* DOKTER */}

      <Route path="/dokter/dashboard" element={<DashboardDokter />} />

      {/* DOKTER END */}
    </Routes>
  );
}

export default App;
