"use client";
import React from "react";
import { notFound } from "next/navigation";
import CateringSummaryView from "@/components/sections/CateringSummaryView";

// Package data with their specific items
const packagesData = {
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
      { name: "Biryani", image: "/block-3.png", category: "Mains", type: "nonveg" },
    ],
  },
};

const occasions = [
  { id: 1, name: "Birthday", slug: "birthday" },
  { id: 2, name: "Wedding", slug: "wedding" },
  { id: 3, name: "Corporate", slug: "corporate" },
  { id: 4, name: "Anniversary", slug: "anniversary" },
  { id: 5, name: "Graduation", slug: "graduation" },
  { id: 6, name: "Festival", slug: "festival" },
  { id: 7, name: "Other", slug: "other" },
];

export default function OccasionPackagePage({ params }) {
  const { slug, packageSlug } = React.use(params);
  const [bookingDetails, setBookingDetails] = React.useState({
    date: "",
    time: "",
    vegGuests: "10",
  });

  // Find the occasion
  const occasion = occasions.find((o) => o.slug === slug);
  
  if (!occasion) {
    notFound();
  }

  // Find the package
  const packageData = packagesData[packageSlug];
  
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
