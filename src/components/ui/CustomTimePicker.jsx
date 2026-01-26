"use client";
import React from "react";
import { motion } from "framer-motion";

const times = [
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
  "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM",
  "11:00 PM"
];

const CustomTimePicker = ({ selectedTime, onSelect, onClose }) => {
  return (
    <>
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative z-50 mt-2 p-4 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-red-100 shadow-2xl shadow-red-100/50 w-[240px] max-h-[300px] flex flex-col"
      >
        <div className="px-2 mb-3 border-b border-red-50 pb-2">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Select Time</h3>
        </div>
        
        <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 gap-1">
            {times.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <motion.button
                  key={time}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onSelect(time);
                    onClose();
                  }}
                  className={`px-4 py-2.5 rounded-xl text-left text-2xl font-bold transition-all
                    ${isSelected 
                      ? "bg-red-600 text-white shadow-lg shadow-red-200" 
                      : "text-slate-600 hover:bg-red-50 hover:text-red-600"
                    }`}
                >
                  {time}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fee2e2;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #fecaca;
        }
      `}</style>
    </>
  );
};

export default CustomTimePicker;
