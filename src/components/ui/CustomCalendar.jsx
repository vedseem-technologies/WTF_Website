"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomCalendar = ({ selectedDate, onSelect, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const dateCells = [];

    // Empty cells for the start of the month
    for (let i = 0; i < startDay; i++) {
      dateCells.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    // Actual dates
    for (let d = 1; d <= totalDays; d++) {
      const isSelected = selectedDate && 
        new Date(selectedDate).getDate() === d && 
        new Date(selectedDate).getMonth() === month && 
        new Date(selectedDate).getFullYear() === year;

      dateCells.push(
        <motion.button
          key={d}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const date = new Date(year, month, d);
            onSelect(`${d.toString().padStart(2, '0')} / ${(month + 1).toString().padStart(2, '0')} / ${year}`);
            onClose();
          }}
          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
            ${isSelected 
              ? "bg-red-600 text-white shadow-lg shadow-red-200" 
              : "text-slate-700 hover:bg-red-50 hover:text-red-600"
            }`}
        >
          {d}
        </motion.button>
      );
    }

    return dateCells;
  };

  return (
    <>
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        className="relative z-50 mt-2 p-6 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-red-100 shadow-2xl shadow-red-100/50 w-[320px]"
      >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="text-center">
          <h3 className="text-lg font-black text-slate-900 leading-tight">
            {months[currentDate.getMonth()]}
          </h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">
            {currentDate.getFullYear()}
          </p>
        </div>

        <button
          onClick={handleNextMonth}
          className="p-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map(day => (
          <div key={day} className="h-10 w-10 flex items-center justify-center text-[10px] font-black uppercase tracking-tighter text-slate-300">
            {day}
          </div>
        ))}
      </div>

      {/* Date Grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </motion.div>
    </>
  );
};

export default CustomCalendar;
