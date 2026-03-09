import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

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

        {/* PUBLIC DASHBOARD PREVIEW */}

        <Route
          path="/"
          element={
            <Layout>
              <Dashboard previewMode />
            </Layout>
          }
        />

        {/* AUTH PAGES */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ROUTES */}

        <Route
          path="/leads"
          element={
            <>
              <SignedIn>
                <Layout><Leads /></Layout>
              </SignedIn>
              <SignedOut>
                <Navigate to="/signup" />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/pipeline"
          element={
            <>
              <SignedIn>
                <Layout><Pipeline /></Layout>
              </SignedIn>
              <SignedOut>
                <Navigate to="/signup" />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/visits"
          element={
            <>
              <SignedIn>
                <Layout><Visits /></Layout>
              </SignedIn>
              <SignedOut>
                <Navigate to="/signup" />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/inventory"
          element={
            <>
              <SignedIn>
                <Layout><Inventory /></Layout>
              </SignedIn>
              <SignedOut>
                <Navigate to="/signup" />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/owners"
          element={
            <>
              <SignedIn>
                <Layout><Owners /></Layout>
              </SignedIn>
              <SignedOut>
                <Navigate to="/signup" />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/agents"
          element={
            <>
              <SignedIn>
                <Layout><Agents /></Layout>
              </SignedIn>
              <SignedOut>
                <Navigate to="/signup" />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/availability"
          element={
            <>
              <SignedIn>
                <Layout><FindAvailability /></Layout>
              </SignedIn>
              <SignedOut>
                <Navigate to="/signup" />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/nearby"
          element={
            <>
              <SignedIn>
                <Layout><Nearby /></Layout>
              </SignedIn>
              <SignedOut>
                <Navigate to="/signup" />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/lead/:id"
          element={
            <>
              <SignedIn>
                <Layout><LeadDetails /></Layout>
              </SignedIn>
              <SignedOut>
                <Navigate to="/signup" />
              </SignedOut>
            </>
          }
        />

        {/* FALLBACK */}

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  );
}

export default App;