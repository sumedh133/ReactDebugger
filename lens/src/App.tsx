import "./App.css";
import { Header } from "./Components/Header";
import HomePage from "./Pages/HomePage";
import PropertyPage from "./Pages/PropertyPage";
import PlotDetailsPage from "./Pages/PlotDetails";
import LocationPage from "./Pages/LocationPage";
import StandardsPage from "./Pages/StandardsPage";
import LifestylePage from "./Pages/Lifestyle";
import Footer from "./Components/Footer";
import EnquiryModal from "./Components/EnquiryModal";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToSectionWrapper from "./Components/ScrollToSectionWrapper";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    console.log("modal clicked");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const layoutProps = { openModal };

  const FullLayout = () => (
    <>
      <HomePage {...layoutProps} />
      <PropertyPage {...layoutProps} />
      <PlotDetailsPage {...layoutProps} />
      <LocationPage />
      <StandardsPage />
      <LifestylePage />
    </>
  );

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <ScrollToSectionWrapper>
              <FullLayout />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/home"
          element={
            <ScrollToSectionWrapper scrollTo="home">
              <FullLayout />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/overview"
          element={
            <ScrollToSectionWrapper scrollTo="overview">
              <FullLayout />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/location"
          element={
            <ScrollToSectionWrapper scrollTo="location">
              <FullLayout />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/amenities"
          element={
            <ScrollToSectionWrapper scrollTo="amenities">
              <FullLayout />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/gallery"
          element={
            <ScrollToSectionWrapper scrollTo="gallery">
              <FullLayout />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/floorplan"
          element={
            <ScrollToSectionWrapper scrollTo="floorplan">
              <FullLayout />
            </ScrollToSectionWrapper>
          }
        />
      </Routes>

      <Footer {...layoutProps} />
      <EnquiryModal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}

export default App;
