"use client";
import React from "react";
import { notFound } from "next/navigation";
import CateringSummaryView from "@/components/sections/CateringSummaryView";
import CustomCalendar from "@/components/ui/CustomCalendar";
import CustomTimePicker from "@/components/ui/CustomTimePicker";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Package data with their specific items
const packagesData = {
  "delivery-only": {
    "cocktail-menu": {
      id: 1,
      name: "Cocktail Menu",
      slug: "cocktail-menu",
      price: "₹759",
      image: "/block-1.png",
      type: "nonveg",
      servingSize: "8+",
      items: [
        { name: "Bhuttayan De Kebab", image: "/block-1.png", category: "Starters", type: "veg" },
        { name: "Paneer Chilgoza", image: "/block-3.png", category: "Starters", type: "veg" },
        { name: "Hara mutter ki tikki", image: "/block-1.png", category: "Starters", type: "veg" },
        { name: "Lasooni Khumb Peshawari", image: "/block-3.png", category: "Starters", type: "veg" },
        { name: "Tawa Veg Masala", image: "/block-1.png", category: "Mains", type: "veg" },
        { name: "Dal Moradabadi", image: "/block-3.png", category: "Mains", type: "veg" },
      ],
    },
    "indian-degustibus": {
      id: 2,
      name: "Indian DeGustibus",
      slug: "indian-degustibus",
      price: "₹689",
      image: "/block-3.png",
      type: "veg",
      servingSize: "8+",
      items: [
        { name: "Bhuttayan De Kebab", image: "/block-1.png", category: "Starters", type: "veg" },
        { name: "Paneer Chilgoza", image: "/block-3.png", category: "Starters", type: "veg" },
        { name: "Hara mutter ki tikki", image: "/block-1.png", category: "Starters", type: "veg" },
        { name: "Lasooni Khumb Peshawari", image: "/block-3.png", category: "Starters", type: "veg" },
        { name: "Tawa Veg Masala", image: "/block-1.png", category: "Mains", type: "veg" },
        { name: "Dal Moradabadi", image: "/block-3.png", category: "Mains", type: "veg" },
      ],
    },
  },
  "on-site": {
    "cocktail-menu": {
      id: 1,
      name: "Cocktail Menu",
      slug: "cocktail-menu",
      price: "₹759",
      image: "/block-1.png",
      type: "nonveg",
      servingSize: "8+",
      items: [
        { name: "Chicken Tikka", image: "/block-1.png", category: "Starters", type: "nonveg" },
        { name: "Fish Amritsari", image: "/block-2.png", category: "Starters", type: "nonveg" },
        { name: "Paneer Tikka", image: "/block-3.png", category: "Starters", type: "veg" },
        { name: "Butter Chicken", image: "/block-1.png", category: "Mains", type: "nonveg" },
        { name: "Mutton Rogan Josh", image: "/block-2.png", category: "Mains", type: "nonveg" },
        { name: "Dal Makhani", image: "/block-3.png", category: "Mains", type: "veg" },
      ],
    },
    "wedding-feast": {
      id: 3,
      name: "Wedding Feast",
      slug: "wedding-feast",
      price: "₹899",
      image: "/block-3.png",
      type: "nonveg",
      servingSize: "10+",
      items: [
        { name: "Chicken Tikka", image: "/block-1.png", category: "Starters", type: "nonveg" },
        { name: "Fish Amritsari", image: "/block-3.png", category: "Starters", type: "nonveg" },
        { name: "Mutton Seekh Kebab", image: "/block-1.png", category: "Starters", type: "nonveg" },
        { name: "Butter Chicken", image: "/block-3.png", category: "Mains", type: "nonveg" },
        { name: "Mutton Rogan Josh", image: "/block-1.png", category: "Mains", type: "nonveg" },
        { name: "Biryani", image: "/block-3.png", category: "Bread & Rice", type: "nonveg" },
      ],
    },
  },
  "full-service": {
    "wedding-feast": {
      id: 3,
      name: "Wedding Feast",
      slug: "wedding-feast",
      price: "₹899",
      image: "/block-3.png",
      type: "nonveg",
      servingSize: "10+",
      items: [
        { name: "Tandoori Chicken", image: "/block-1.png", category: "Starters", type: "nonveg" },
        { name: "Seekh Kebab", image: "/block-2.png", category: "Starters", type: "nonveg" },
        { name: "Malai Tikka", image: "/block-3.png", category: "Starters", type: "nonveg" },
        { name: "Paneer Lababdar", image: "/block-1.png", category: "Mains", type: "veg" },
        { name: "Chicken Curry", image: "/block-2.png", category: "Mains", type: "nonveg" },
        { name: "Fish Curry", image: "/block-3.png", category: "Mains", type: "nonveg" },
        { name: "Garlic Naan", image: "/block-1.png", category: "Bread & Rice", type: "veg" },
        { name: "Pulao", image: "/block-2.png", category: "Bread & Rice", type: "veg" },
      ],
    },
  },
};

const categories = [
  { id: 1, name: "Delivery Only", slug: "delivery-only" },
  { id: 2, name: "On-site", slug: "on-site" },
  { id: 3, name: "Full Service", slug: "full-service" },
  { id: 4, name: "DIY", slug: "diy" },
];

export default function PackagePage({ params }) {
  const { slug, packageSlug } = React.use(params);
  const [bookingDetails, setBookingDetails] = React.useState({
    date: "",
    time: "",
    vegGuests: "10",
  });

  // Find the category
  const category = categories.find((c) => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  // Find the package
  const packageData = packagesData[slug]?.[packageSlug];
  
  if (!packageData) {
    notFound();
  }

  return (
    <CateringSummaryView
      selectedItem={packageData}
      bookingDetails={bookingDetails}
      onBack={() => window.history.back()}
      slug={slug}
      packageSlug={packageSlug}
    />
  );
}
