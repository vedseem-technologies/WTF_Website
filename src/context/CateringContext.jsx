"use client";
import React, { createContext, useContext, useState } from "react";

const CateringContext = createContext(undefined);

export function CateringProvider({ children }) {
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const openDetailModal = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedMenuItem(null);
  };

  const value = {
    selectedOccasion,
    setSelectedOccasion,
    selectedService,
    setSelectedService,
    selectedCategory,
    setSelectedCategory,
    selectedMenuItem,
    isDetailModalOpen,
    openDetailModal,
    closeDetailModal,
  };

  return (
    <CateringContext.Provider value={value}>
      {children}
    </CateringContext.Provider>
  );
}

export function useCatering() {
  const context = useContext(CateringContext);
  if (context === undefined) {
    throw new Error("useCatering must be used within a CateringProvider");
  }
  return context;
}
