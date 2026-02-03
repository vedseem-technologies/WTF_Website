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
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

    // Empty cells for the start of the month
    for (let i = 0; i < startDay; i++) {
      dateCells.push(<div key={`empty-${i}`} className="h-8 w-full" />);
    }

    // Actual dates
    for (let d = 1; d <= totalDays; d++) {
      const currentCellDate = new Date(year, month, d);
      currentCellDate.setHours(0, 0, 0, 0);
      const isPastDate = currentCellDate <= today;
      
      const isSelected = selectedDate && 
        new Date(selectedDate).getDate() === d && 
        new Date(selectedDate).getMonth() === month && 
        new Date(selectedDate).getFullYear() === year;

      dateCells.push(
        <motion.button
          key={d}
          whileHover={isPastDate ? {} : { scale: 1.1 }}
          whileTap={isPastDate ? {} : { scale: 0.95 }}
          onClick={() => {
            if (isPastDate) return;
            const date = new Date(year, month, d);
            onSelect(`${d.toString().padStart(2, '0')} / ${(month + 1).toString().padStart(2, '0')} / ${year}`);
            onClose();
          }}
          disabled={isPastDate}
          className={`h-8 w-full rounded-full flex items-center justify-center text-lg font-semibold transition-colors
            ${isPastDate 
              ? "text-slate-300 cursor-not-allowed" 
              : isSelected 
                ? "bg-red-600 text-white shadow-md shadow-red-200" 
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
        className="relative z-50 mt-2 p-4 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-red-100 shadow-2xl shadow-red-100/50 w-[320px]"
      >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="text-center">
          <h3 className="text-2xl font-black text-slate-900 leading-tight">
            {months[currentDate.getMonth()]}
          </h3>
          <p className="text-lg font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">
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
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {days.map(day => (
          <div key={day} className="h-7 w-full flex items-center justify-center text-sm font-black uppercase tracking-tighter text-slate-300">
            {day}
          </div>
        ))}
      </div>

      {/* Date Grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {renderDays()}
      </div>
    </motion.div>
    </>
  );
};

export default CustomCalendar;
