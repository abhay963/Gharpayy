import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./layout/Layout";

import Agents from "./pages/Agents";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Pipeline from "./pages/Pipeline";
import Visits from "./pages/Visits";
import Owners from "./pages/Owners";
import Inventory from "./pages/Inventory";
import FindAvailability from "./pages/FindAvailability";
import LeadDetails from "./pages/LeadDetails";
import Nearby from "./pages/Nearby";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>

        {/* PUBLIC DASHBOARD */}
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* AUTH PAGES (still accessible if you keep them) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ALL PUBLIC ROUTES */}

        <Route
          path="/leads"
          element={
            <Layout>
              <Leads />
            </Layout>
          }
        />

        <Route
          path="/pipeline"
          element={
            <Layout>
              <Pipeline />
            </Layout>
          }
        />

        <Route
          path="/visits"
          element={
            <Layout>
              <Visits />
            </Layout>
          }
        />

        <Route
          path="/inventory"
          element={
            <Layout>
              <Inventory />
            </Layout>
          }
        />

        <Route
          path="/owners"
          element={
            <Layout>
              <Owners />
            </Layout>
          }
        />

        <Route
          path="/agents"
          element={
            <Layout>
              <Agents />
            </Layout>
          }
        />

        <Route
          path="/availability"
          element={
            <Layout>
              <FindAvailability />
            </Layout>
          }
        />

        <Route
          path="/nearby"
          element={
            <Layout>
              <Nearby />
            </Layout>
          }
        />

        <Route
          path="/lead/:id"
          element={
            <Layout>
              <LeadDetails />
            </Layout>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  );
}

export default App;