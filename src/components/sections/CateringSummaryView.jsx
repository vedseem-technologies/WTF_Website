"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";

const getQuantityRules = (item) => {

  const isKg = item.measurement?.toLowerCase() === 'kg' ||
    (typeof item.price === 'string' && item.price.toLowerCase().includes('/kg'));

  const defaultLabel = isKg ? 'kg' : 'pcs';

  if (typeof item.price === 'string') {
    const match = item.price.match(/\/(\d+)\s*(pcs|pc|kg)/i);
    if (match && match[1]) {
      const qty = parseInt(match[1], 10);
      const unit = match[2].toLowerCase();
      return {
        min: qty,
        step: qty,
        label: unit.startsWith('kg') ? 'kg' : 'pcs'
      };
    }
  }

  if (item.baseQuantity && item.baseQuantity >= 1) {
    return {
      min: item.baseQuantity,
      step: item.baseQuantity,
      label: defaultLabel
    };
  }

  return { min: 1, step: 1, label: defaultLabel };
};

const CateringSummaryView = ({ selectedItem, selectionType, packageItem, bookingDetails: initialBookingDetails, onBack, slug, packageSlug }) => {
  const [expandedCategory, setExpandedCategory] = useState("Starter");
  const [items, setItems] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPriceBreakup, setShowPriceBreakup] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("zoho");
  const [showDetails, setShowDetails] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authFormData, setAuthFormData] = useState({ email: '', password: '', firstName: '', lastName: '', phone: '' });
  const [authAddresses, setAuthAddresses] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddressInput, setNewAddressInput] = useState('');

  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [activeCategoryForAdd, setActiveCategoryForAdd] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuData, setMenuData] = useState(null);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [availableMenuItems, setAvailableMenuItems] = useState([]);

  const itemsInitializedRef = useRef(false);

  const [orderId, setOrderId] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Get booking details from sessionStorage or use initial
  const [bookingDetails, setBookingDetails] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('bookingDetails');
      return stored ? JSON.parse(stored) : (initialBookingDetails || { date: "", time: "", vegGuests: "10" });
    }
    return initialBookingDetails || { date: "", time: "", vegGuests: "10" };
  });

  // **PRODUCTION-GRADE: Fetch menu selection from backend**
  // Extract stable primitive values to prevent infinite loops
  const entityId = selectedItem?.id || selectedItem?._id;
  const entityType = selectedItem?.entityType || 'occasion';

  React.useEffect(() => {
    const fetchMenuSelection = async () => {
      // Guard: Don't fetch if no entity
      if (!entityId) {
        setLoadingMenu(false);
        return;
      }

      // Guard: Prevent duplicate fetches for same entity
      const fetchKey = `${entityType}-${entityId}`;
      if (itemsInitializedRef.current) {
        return;
      }

      try {
        setLoadingMenu(true);

        // Fetch entity-specific menu
        const menuResponse = await fetch(`${BACKEND_URL}/api/menu-selection/${entityType}/${entityId}`);
        const menuData = await menuResponse.json();

        // Initialize items from menu selection
        if (menuData) {
          const initialGuests = parseInt(bookingDetails.vegGuests || 10);
          const defaultQuantity = initialGuests * 2;

          // Helper to calculate initial quantity based on rules
          const getInitialQty = (item, guests) => {
            const rules = getQuantityRules(item);
            let qty = guests * 2;
            if (rules.step > 1) {
              qty = Math.ceil(qty / rules.step) * rules.step;
            }
            return Math.max(rules.min, qty);
          };

          const allItems = [
            ...(menuData.starters || []).map(item => ({
              ...item,
              baseQuantity: item.quantity,
              category: 'Starters',
              quantity: getInitialQty({ ...item, baseQuantity: item.quantity }, parseInt(bookingDetails.vegGuests || 10)),
              price: item.unitPrice || item.price || 0
            })),
            ...(menuData.mainCourses || []).map(item => ({
              ...item,
              baseQuantity: item.quantity,
              category: 'Mains',
              quantity: getInitialQty({ ...item, baseQuantity: item.quantity }, parseInt(bookingDetails.vegGuests || 10)),
              price: item.unitPrice || item.price || 0
            })),
            ...(menuData.desserts || []).map(item => ({
              ...item,
              baseQuantity: item.quantity,
              category: 'Desserts',
              quantity: getInitialQty({ ...item, baseQuantity: item.quantity }, parseInt(bookingDetails.vegGuests || 10)),
              price: item.unitPrice || item.price || 0
            })),
            ...(menuData.breadRice || []).map(item => ({
              ...item,
              baseQuantity: item.quantity,
              category: 'Bread & Rice',
              quantity: getInitialQty({ ...item, baseQuantity: item.quantity }, parseInt(bookingDetails.vegGuests || 10)),
              price: item.unitPrice || item.price || 0
            }))
          ];

          setItems(allItems); // <--- FIXED: Update state with fetched items

          // **NEW: Extract and merge unselected items into availableMenuItems**
          const unselectedItems = [
            ...(menuData.unselectedStarters || []).map(i => ({ ...i, category: i.category || 'Starter' })),
            ...(menuData.unselectedMainCourses || []).map(i => ({ ...i, category: i.category || 'Main Course' })),
            ...(menuData.unselectedDesserts || []).map(i => ({ ...i, category: i.category || 'Dessert' })),
            ...(menuData.unselectedBreadRice || []).map(i => ({ ...i, category: i.category || 'Bread & Rice' }))
          ];

          if (unselectedItems.length > 0) {

            setAvailableMenuItems(prev => {
              const existingIds = new Set(prev.map(p => p._id || p.id));
              const newItems = unselectedItems.filter(u => !existingIds.has(u._id || u.id));
              return [...prev, ...newItems];
            });
          }

          itemsInitializedRef.current = true; // Mark as loaded
        } else {
          itemsInitializedRef.current = true; // Still mark as attempted
        }

        setLoadingMenu(false);
      } catch (error) {
        console.error(error);
        setLoadingMenu(false);
      }
    };

    fetchMenuSelection();

  }, [entityId, entityType, BACKEND_URL]);

  React.useEffect(() => {
    const fetchAllMenuItems = async () => {
      try {
        const menuItemsResponse = await fetch(`${BACKEND_URL}/api/menu-items?limit=1000`);
        const menuItemsData = await menuItemsResponse.json();
        setAvailableMenuItems(prev => {
          const incoming = menuItemsData.data || [];
          const existingIds = new Set(prev.map(p => p._id || p.id));
          const newItems = incoming.filter(i => !existingIds.has(i._id || i.id));
          return [...prev, ...newItems];
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllMenuItems();
  }, [BACKEND_URL]);


  const handleAddItem = (item) => {
    const existing = items.find(i => i.name === item.name);
    if (!existing) {
      const rules = getQuantityRules(item);
      const initialGuests = parseInt(bookingDetails.vegGuests || 10);


      let calculatedQty = initialGuests * 2;

      if (rules.step > 1) {
        calculatedQty = Math.ceil(calculatedQty / rules.step) * rules.step;
      }

      const initialQty = Math.max(rules.min, calculatedQty);

      const newItem = {
        _id: item._id || item.id,
        name: item.name,
        image: item.image || '/block-1.png',
        type: item.type || 'veg',
        baseQuantity: item.baseQuantity || item.quantity || 1,
        quantity: initialQty,
        price: item.unitPrice || item.price || 0,
        measurement: item.measurement || item.unit || 'pcs',
        category: getCategoryKeyFromDb(item.category)
      };
      setItems([...items, newItem]);
    } else {
    }
  };

  const handleRemoveItem = (itemName) => {
    setItems(items.filter(i => i.name !== itemName));
  };

  const getCategoryKeyFromDb = (dbCategory) => {
    const mapping = {
      'Starter': 'Starters',
      'Main Course': 'Mains',
      'Dessert': 'Desserts',
      'Bread & Rice': 'Bread & Rice',
      'Rice & Bread': 'Bread & Rice'
    };
    return mapping[dbCategory] || dbCategory;
  };

  const categoryFullMenu = React.useMemo(() => {
    if (!availableMenuItems.length) return [];

    if (activeCategoryForAdd) {
      return availableMenuItems.filter(item => {
        const itemCategoryKey = getCategoryKeyFromDb(item.category);
        return itemCategoryKey === activeCategoryForAdd;
      });
    }

    return availableMenuItems;
  }, [availableMenuItems, activeCategoryForAdd]);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('wtf_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.addresses && parsedUser.addresses.length > 0) {
        setSelectedAddress(parsedUser.addresses[0]);
      }
    }
  }, []);

  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent("hideBottomNavbar", { detail: true }));
    return () => {
      window.dispatchEvent(new CustomEvent("hideBottomNavbar", { detail: false }));
    };
  }, []);

  // Handle body scroll lock
  React.useEffect(() => {
    if (showAddItemModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAddItemModal]);

  const groupItemsByCategory = (items) => {
    const grouped = {};
    items?.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  };

  const groupedItems = groupItemsByCategory(items);
  const categoriesMap = [
    { label: "Starter", key: "Starters" },
    { label: "Main Course", key: "Mains" },
    { label: "Bread, Rice & Noodles", key: "Bread & Rice" },
    { label: "Dessert", key: "Desserts" },
    { label: "Live Services (Home or Outdoor)", key: "Live Services" },
  ];

  const liveServices = [
    { name: "Live Pizza Party", image: "/pizza-live.png" },
    { name: "Live Momo Party", image: "/momo-live.png" },
    { name: "Live Bread / Starters (Chef + Tandoor)", image: "/bread-live.png" },
    { name: "Live Pasta Party", image: "/pasta-live.png" },
    { name: "Live Chaat Party", image: "/chaat-live.png" },
  ];

  const updateQuantity = (itemName, direction) => {
    setItems(items.map(item => {
      if (item.name === itemName) {
        const rules = getQuantityRules(item);
        const currentQty = item.quantity || 0;
        let newQty;

        if (direction === 'increase') {
          newQty = currentQty + rules.step;
        } else {
          // If already at min, don't decrease further
          if (currentQty <= rules.min) return item;
          newQty = currentQty - rules.step;
        }

        // Final safety check (Rule 4: Never below min)
        newQty = Math.max(rules.min, newQty);

        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    // Logic: Sum of (Price * Quantity) + Service Charge
    // Note: Quantity is "Pieces". Price is "Per Piece".
    const itemsTotal = items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
    return itemsTotal + 1500; // + Service Charge
  };



  // Create order with backend-generated ID
  const createOrder = async (forceNew = false) => {
    if (orderId && !forceNew) return orderId;

    // Force refresh user from storage if missing
    let currentUser = user;
    if (!currentUser) {
      const stored = localStorage.getItem('wtf_user');
      if (stored) {
        currentUser = JSON.parse(stored);
        setUser(currentUser);
      }
    }

    // Get Token
    const token = localStorage.getItem('wtf_token');
    if (!token) {
      alert("Please login to place an order.");
      // setCurrentStep(3); // Go to details/login
      // setShowDetails(true);
      return null;
    }

    setOrderLoading(true);
    try {
      const orderPayload = {
        // userId: currentUser?._id || currentUser?.id || null, // REMOVED: Managed by Backend via Token
        entityType: entityType,
        entityId: String(entityId),
        items: items.map(item => ({
          itemId: String(item._id || item.id),
          name: item.name,
          category: item.category,
          quantity: Number(item.quantity) || 0,
          price: Number(item.price) || 0,
          baseQuantity: Number(item.baseQuantity) || 1,
          measurement: item.measurement || 'pcs',
          type: item.type || 'Veg',
          image: item.image || ''
        })),
        bookingDetails: bookingDetails,
        totalAmount: calculateTotal(),
        address: selectedAddress,
        notes: '',
        paymentMethod: paymentMethod || 'zoho'
      };

      console.log("Sending Order Payload:", orderPayload);

      const response = await fetch(`${BACKEND_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      });

      const data = await response.json();
      if (data.success) {
        setOrderId(data.data.orderId);
        return data.data.orderId;
      } else {
        console.error("Order Creation Failed:", data.message, data.errors);
        alert(`Failed to create order: ${data.message}`);
        return null;
      }
    } catch (error) {
      console.error("Order Creation Error:", error);
      alert("An error occurred. Check console for details.");
      return null;
    } finally {
      setOrderLoading(false);
    }
  };

  /* 
    RESTORED: Generate Order ID immediately for reference
  */
  const handlePriceCheck = () => {
    // Defer order creation to "Confirm Details" step
    setShowPriceBreakup(true);
    setCurrentStep(2);
  };

  const handleProceedToPay = () => {
    setShowPriceBreakup(false);
    setShowDetails(true);
    setCurrentStep(3);
  };

  const handleDetailsComplete = (e) => {
    if (e) e.preventDefault();

    if (!selectedAddress) {
      alert("Please select or add an address");
      return;
    }

    // Direct Payment Trigger
    if (orderId) {
      // Re-create order to capture any address changes
      createOrder(true).then(id => {
        if (id) proceedWithPayment(id);
      });
    } else {
      createOrder(true).then(id => {
        if (id) proceedWithPayment(id);
      });
    }
    // Skip the "Pay Now" screen
    // setShowPayment(true);
    // setCurrentStep(4);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/signup';
      const body = isLoginMode
        ? { email: authFormData.email, password: authFormData.password }
        : { ...authFormData, addresses: authAddresses.filter(a => a.trim()) };

      const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        // Both login and signup now return token and user, so we can auto-login
        localStorage.setItem('wtf_token', data.token);
        localStorage.setItem('wtf_user', JSON.stringify(data.user));
        setUser(data.user);
        if (data.user.addresses?.length > 0) setSelectedAddress(data.user.addresses[0]);

        if (!isLoginMode) {
          // If it was signup, show a brief success message or just proceed
          // alert("Signup successful!"); 
        }
      } else {
        alert(data.message || "Authentication failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewAddress = () => {
    if (!newAddressInput.trim()) return;
    const updatedUser = {
      ...user,
      addresses: [...(user.addresses || []), newAddressInput.trim()]
    };
    setUser(updatedUser);
    localStorage.setItem('wtf_user', JSON.stringify(updatedUser));
    setSelectedAddress(newAddressInput.trim());
    setNewAddressInput('');
    setShowAddAddress(false);
  };

  const proceedWithPayment = async (id) => {
    const idToUse = id || orderId;
    if (!idToUse) return;

    if (paymentMethod === 'cod') {
      // Handle COD directly
      alert(`Order Placed Successfully! Order ID: ${idToUse}`);
      window.location.href = '/'; // Or redirect to success page
      return;
    }

    // Handle Zoho (Online Payment)
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/orders/payment/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: idToUse })
      });

      const data = await response.json();
      if (data.success && data.data.paymentLink) {
        // Redirect to Zoho Payment Link
        window.location.href = data.data.paymentLink;
      } else {
        alert('Failed to initiate payment. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('An error occurred. Please try again.');
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-white pb-24 pt-12 overflow-hidden relative font-dongle">

      {/* Add Item Modal Overlay */}
      <AnimatePresence>
        {showAddItemModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-6"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white w-full max-w-2xl rounded-t-3xl md:rounded-3xl shadow-2xl h-[90vh] md:h-[80vh] flex flex-col overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <h3 className="text-3xl font-bold text-gray-800">Add Items</h3>
                <button onClick={() => setShowAddItemModal(false)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="p-4 bg-gray-50">
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-2xl text-gray-800 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-red-300 [&::-webkit-scrollbar-thumb]:to-orange-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                {categoryFullMenu
                  .filter(item => !items.find(i => i.name === item.name))
                  .filter(item =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item, idx) => {
                    return (
                      <div key={idx} className="flex items-center gap-4 p-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all">
                        <div className="w-16 h-16 rounded-xl bg-gray-200 relative overflow-hidden shrink-0">
                          <Image src={item.image || "/block-1.png"} alt={item.name} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${item.type?.toLowerCase() === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                            <h4 className="font-bold text-2xl text-gray-800 leading-none">{item.name}</h4>
                          </div>
                          <p className="text-lg text-gray-500 font-bold">₹{item.unitPrice || item.price || 0}</p>
                        </div>
                        <button
                          onClick={() => handleAddItem(item)}
                          className="bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-100 px-5 py-2 rounded-xl font-bold text-xl transition-all"
                        >
                          Add
                        </button>
                      </div>
                    )
                  })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Progress Bar Section */}
      <div className="max-w-3xl mx-auto px-4 md:px-24 md:mb-8">

        <div className="relative flex items-center justify-between mb-8 md:mb-12">
          {/* Base line */}
          <div className="absolute inset-x-5 top-[20px] h-[2px] bg-red-100" />

          {/* Active progress line */}
          <motion.div
            className="absolute left-5 top-[20px] h-[2px] bg-red-500 origin-left"
            initial={false}
            animate={{ width: `calc(${(currentStep / 4) * 100}% - ${currentStep === 4 ? '40px' : '20px'})` }}
            transition={{ duration: 0.5 }}
          />

          {[
            { label: "Event" },
            { label: "Menu" },
            { label: "Price" },
            { label: "Details" },
            { label: "Pay" },
          ].map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isActive = idx === currentStep;

            return (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                <motion.div
                  animate={{
                    backgroundColor: isCompleted || isActive ? "#ef4444" : "#ffffff",
                    color: isCompleted || isActive ? "#ffffff" : "#fecaca",
                    scale: isActive ? 1.1 : 1,
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm border-2 ${isCompleted || isActive ? "border-transparent" : "border-red-100"
                    }`}
                >
                  {isCompleted && idx !== currentStep ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </motion.div>
                <span className={`text-lg font-semibold uppercase tracking-widest transition-colors duration-300 ${isCompleted || isActive ? "text-red-600" : "text-red-200"
                  }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="border-t border-gray-100" />
      </div>

      {/* Main Content Area with Sliding Animation */}
      <div className="relative max-w-3xl mx-auto px-6 md:px-24 min-h-[400px]">
        <AnimatePresence mode="wait">
          {!showPriceBreakup && !showDetails && !showPayment ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-red-50/50 rounded-2xl p-6 mb-8 border border-red-100/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 opacity-70 uppercase tracking-wider">Booking Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-xl text-gray-500 font-semibold mb-1 capitalize">
                      {selectionType || 'Interest'}
                    </p>
                    <p className="text-2xl font-bold text-gray-800 leading-none mb-2">
                      {selectedItem?.name}
                    </p>
                    {packageItem && (
                      <>
                        <p className="text-xl text-gray-500 font-semibold mb-1">Package</p>
                        <p className="text-2xl font-bold text-gray-800 leading-none">
                          {packageItem.name}
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    <p className="text-xl text-gray-500 font-semibold mb-1">Date</p>
                    <p className="text-2xl font-bold text-gray-800 leading-none">
                      {bookingDetails.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xl text-gray-500 font-semibold mb-1">Time</p>
                    <p className="text-2xl font-bold text-gray-800 leading-none">
                      {bookingDetails.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-xl text-gray-500 font-semibold mb-1">Guests</p>
                    <p className="text-2xl font-bold text-gray-800 leading-none">
                      {bookingDetails.vegGuests} <span className="text-lg text-gray-400 font-normal">Veg</span>
                    </p>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-2">
                Menu Summary
              </h1>
              <p className="text-2xl text-gray-500 mb-8">
                Review and fine-tune your catering selection
              </p>

              {/* Info Box */}
              <div className="bg-white/70 backdrop-blur rounded-2xl p-5 flex gap-4 mb-10 shadow-sm border border-orange-50/50">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-sm">
                  💡
                </div>
                <p className="text-2xl text-gray-600 leading-relaxed font-medium">
                  Quantities are <span className="font-bold text-gray-800">auto-calculated</span> based on your guest count.
                </p>
              </div>

              {/* Categories List */}
              <div className="space-y-4 pb-12">
                {categoriesMap.map((cat) => {
                  const isExpanded = expandedCategory === cat.label;
                  const categoryItems = groupedItems[cat.key] || [];
                  const isLiveService = cat.label.includes("Live Services");

                  return (
                    <div key={cat.label} className="rounded-3xl bg-white/80 backdrop-blur shadow-sm hover:shadow-md transition-all border border-gray-50">
                      <button
                        onClick={() => setExpandedCategory(isExpanded ? null : cat.label)}
                        className="w-full flex items-center justify-between px-6 py-5 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-3xl font-bold text-gray-900">{cat.label}</span>
                          <span className="text-lg font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                            ({isLiveService ? "0" : categoryItems.length})
                          </span>
                        </div>
                        <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} className="text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 border-t border-gray-50 overflow-hidden"
                          >
                            {isLiveService ? (
                              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x pt-6">
                                {liveServices.map((service, idx) => (
                                  <div key={idx} className="flex-shrink-0 w-36 h-44 bg-gray-50 rounded-2xl overflow-hidden relative snap-center border border-gray-100">
                                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    <span className="absolute bottom-3 inset-x-3 text-white text-lg font-black uppercase tracking-tight z-20">
                                      {service.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="pt-6">
                                {/* Item List */}
                                <div className="space-y-3 pb-6">
                                  {categoryItems.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                                      <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0 relative overflow-hidden">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-1.5 font-bold text-2xl text-gray-800 leading-none">
                                          <div className={`w-2 h-2 rounded-full shrink-0 ${item.type?.toLowerCase() === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                                          <span className="truncate">{item.name}</span>
                                        </div>

                                        <div className="text-xl font-bold text-gray-500 mt-1">
                                          ₹{item.price * item.quantity}
                                          <span className="text-sm font-normal text-gray-400">
                                            (@ ₹{item.price}/{item.baseQuantity && item.baseQuantity > 1 ? item.baseQuantity : ''}{item.measurement === 'pcs' ? 'pc' : item.measurement})
                                          </span>
                                        </div>

                                      </div>
                                      <div className="flex items-center gap-3">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-2 py-1 shadow-sm">
                                          <button
                                            onClick={() => updateQuantity(item.name, 'decrease')}
                                            className={`w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all font-bold text-lg ${item.quantity <= (getQuantityRules(item).min) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={item.quantity <= (getQuantityRules(item).min)}
                                          >
                                            -
                                          </button>
                                          <span className="text-xl font-bold text-gray-800 min-w-[50px] text-center">{item.quantity}</span>
                                          <button
                                            onClick={() => updateQuantity(item.name, 'increase')}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 transition-all font-bold text-lg"
                                          >
                                            +
                                          </button>
                                        </div>
                                        {/* Delete Button */}
                                        <button
                                          onClick={() => handleRemoveItem(item.name)}
                                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-600 hover:text-white transition-all"
                                        >
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Add Items Button (Bottom Right) */}
                                <div className="flex justify-end pt-2 pb-4">
                                  <button
                                    onClick={() => {
                                      setActiveCategoryForAdd(cat.key);
                                      setShowAddItemModal(true);
                                      setSearchTerm("");
                                    }}
                                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:cursor-pointer hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg shadow-red-100 flex items-center gap-2 transition-all transform hover:scale-105"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                                    Add Items
                                  </button>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : showPriceBreakup && !showPayment ? (
            <motion.div
              key="price"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="pb-20 pt-6 md:pt-0"
            >
              <div className="bg-red-50/50 rounded-2xl p-6 mb-8 border border-red-100/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 opacity-70 uppercase tracking-wider">Booking Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-xl text-gray-500 font-semibold mb-1 capitalize">
                      {selectionType || 'Interest'}
                    </p>
                    <p className="text-2xl font-bold text-gray-800 leading-none mb-2">
                      {selectedItem?.name}
                    </p>
                    {packageItem && (
                      <>
                        <p className="text-xl text-gray-500 font-semibold mb-1">Package</p>
                        <p className="text-2xl font-bold text-gray-800 leading-none">
                          {packageItem.name}
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    <p className="text-xl text-gray-500 font-semibold mb-1">Date</p>
                    <p className="text-2xl font-bold text-gray-800 leading-none">
                      {bookingDetails.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xl text-gray-500 font-semibold mb-1">Time</p>
                    <p className="text-2xl font-bold text-gray-800 leading-none">
                      {bookingDetails.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-xl text-gray-500 font-semibold mb-1">Guests</p>
                    <p className="text-2xl font-bold text-gray-800 leading-none">
                      {bookingDetails.vegGuests} <span className="text-lg text-gray-400 font-normal">Veg</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div style={{ lineHeight: "0.7" }}>
                  <h1 className="text-4xl font-semibold text-gray-900">
                    Price Summary
                  </h1>
                  {/* <p className="text-md text-gray-400 mt-1">
                    Order ID • {orderLoading ? 'Generating...' : (orderId || 'N/A')}
                  </p> */}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl">
                <div className="px-6 py-5 border-b border-gray-100">
                  <div className="flex justify-between items-start" style={{ lineHeight: "0.7" }}>
                    <div>
                      <p className="text-2xl font-medium text-gray-900">
                        {packageItem?.name || "Standard Catering Package"}
                      </p>
                      <p className="text-md text-gray-400 mt-1">
                        Vegetarian • {bookingDetails?.vegGuests || 10} Guests
                      </p>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">
                      ₹{759 * (bookingDetails?.vegGuests || 10)}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-5 md:space-y-3">
                  <div className="flex justify-between text-2xl text-gray-600">
                    <span>Service & Setup</span>
                    <span className="font-medium text-gray-900">₹1,500</span>
                  </div>
                  <div className="flex justify-between text-2xl text-gray-600">
                    <span>Equipment Charges</span>
                    <span className="font-medium text-gray-900">₹0</span>
                  </div>
                  {/* Itemized Breakdown (Optional or Simplified) */}
                  <div className="border-t border-gray-100 my-4 pt-4">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xl text-gray-600 mb-2">
                        <span>{item.name} <span className="text-sm text-gray-400">x{item.quantity}</span></span>
                        <span className="font-medium text-gray-900">₹{(item.price || 0) * (item.quantity || 0)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-2xl text-gray-600">
                    <span>Service & Setup</span>
                    <span className="font-medium text-gray-900">₹1,500</span>
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                <div className="px-6 py-5 flex justify-between items-center">
                  <div style={{ lineHeight: "0.7" }}>
                    <p className="text-md uppercase tracking-wide text-gray-400">
                      Total Payable
                    </p>
                    <p className="text-md text-gray-400 mt-1">
                      Includes all items & services
                    </p>
                  </div>
                  <p className="text-2xl font-semibold text-red-600">
                    ₹{calculateTotal().toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-6 text-md text-gray-500" style={{ lineHeight: "0.7" }}>
                <span>• FSSAI certified kitchens</span>
                <span>• On-time setup guarantee</span>
              </div>
            </motion.div>
          ) : showDetails && !showPayment ? (
            <motion.div
              key="details"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              className="pb-20 pt-6"
            >
              {!user ? (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">{isLoginMode ? 'Login to Continue' : 'Create Account'}</h1>
                    <p className="text-2xl text-gray-500">Please {isLoginMode ? 'login' : 'sign up'} to proceed with your booking</p>
                  </div>
                  <form onSubmit={handleAuthSubmit} className="space-y-4">
                    {!isLoginMode && (
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-3xl text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-500 transition-all"
                          value={authFormData.firstName}
                          onChange={(e) => setAuthFormData({ ...authFormData, firstName: e.target.value })}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-3xl text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-500 transition-all"
                          value={authFormData.lastName}
                          onChange={(e) => setAuthFormData({ ...authFormData, lastName: e.target.value })}
                        />
                      </div>
                    )}
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-3xl text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-500 transition-all"
                      value={authFormData.email}
                      onChange={(e) => setAuthFormData({ ...authFormData, email: e.target.value })}
                      required
                    />
                    {!isLoginMode && (
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-3xl text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-500 transition-all"
                        value={authFormData.phone}
                        onChange={(e) => setAuthFormData({ ...authFormData, phone: e.target.value })}
                        required
                      />
                    )}
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-3xl text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-500 transition-all"
                      value={authFormData.password}
                      onChange={(e) => setAuthFormData({ ...authFormData, password: e.target.value })}
                      required
                    />
                    {!isLoginMode && (
                      <div className="space-y-2">
                        <label className="text-xl text-gray-500 block">Addresses</label>
                        {authAddresses.map((addr, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              type="text"
                              placeholder={`Address ${idx + 1}`}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-3xl text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-500 transition-all"
                              value={addr}
                              onChange={(e) => {
                                const newAddrs = [...authAddresses];
                                newAddrs[idx] = e.target.value;
                                setAuthAddresses(newAddrs);
                              }}
                              required={idx === 0}
                            />
                            {idx > 0 && (
                              <button type="button" onClick={() => setAuthAddresses(authAddresses.filter((_, i) => i !== idx))} className="text-red-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                            )}
                          </div>
                        ))}
                        {authAddresses.length < 3 && (
                          <button type="button" onClick={() => setAuthAddresses([...authAddresses, ''])} className="text-red-600 font-bold text-xl flex items-center gap-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            Add Address
                          </button>
                        )}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-red-600 text-white rounded-xl py-4 text-2xl font-bold hover:bg-red-700 transition-all disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : (isLoginMode ? 'Login' : 'Sign Up')}
                    </button>
                  </form>
                  <p className="text-center text-xl text-gray-500 mt-4">
                    {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLoginMode(!isLoginMode)} className="ml-2 text-red-600 font-bold underline">
                      {isLoginMode ? 'Sign Up' : 'Login'}
                    </button>
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Delivery Details</h1>
                    <p className="text-2xl text-gray-500">Confirm your details and select delivery address</p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">Your Information</h2>
                      <button
                        onClick={() => {
                          localStorage.removeItem('wtf_token');
                          localStorage.removeItem('wtf_user');
                          setUser(null);
                        }}
                        className="text-red-600 font-bold text-xl uppercase tracking-tighter"
                      >
                        Edit / Logout
                      </button>
                    </div>
                    <p className="text-2xl text-gray-600">{user.firstName} {user.lastName}</p>
                    <p className="text-xl text-gray-500">{user.email} {user.phone && `• ${user.phone}`}</p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">Select Delivery Address</h2>
                    <div className="space-y-3">
                      {user.addresses?.map((addr, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${selectedAddress === addr ? 'border-red-500 bg-red-50/20' : 'border-gray-100 hover:border-gray-200'}`}
                          onClick={() => setSelectedAddress(addr)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAddress === addr ? 'border-red-500 bg-red-500' : 'border-gray-300'}`}>
                              {selectedAddress === addr && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <span className="text-2xl text-gray-700">{addr}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const updatedAddresses = user.addresses.filter((_, i) => i !== idx);
                              setUser({ ...user, addresses: updatedAddresses });
                              if (selectedAddress === addr) setSelectedAddress(null);
                            }}
                            className="text-gray-400 hover:text-red-500 p-1"
                            title="Remove Address"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    {showAddAddress ? (
                      <div className="mt-4 flex gap-2">
                        <input
                          type="text"
                          value={newAddressInput}
                          onChange={(e) => setNewAddressInput(e.target.value)}
                          placeholder="Enter new address"
                          className="flex-1 bg-white border border-gray-200 rounded-xl py-2 px-4 text-2xl text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-red-100"
                        />
                        <button
                          onClick={handleAddNewAddress}
                          className="bg-red-600 text-white px-4 py-2 rounded-xl text-xl font-bold"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => setShowAddAddress(false)}
                          className="text-gray-400 px-2"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      (user.addresses?.length || 0) < 3 && (
                        <button
                          onClick={() => setShowAddAddress(true)}
                          className="flex items-center gap-2 text-red-600 font-bold text-2xl mt-2"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                          Add New Address
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="payment"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="pb-20 pt-6"
            >
              <div className="mb-8" style={{ lineHeight: "0.5" }}>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Select Payment Method
                </h1>
                <p className="text-md text-gray-400 mt-1">
                  Secure your booking with these options
                </p>
              </div>

              <div className="space-y-4">
                {/* Zoho/Online Option */}
                <button
                  onClick={() => setPaymentMethod("zoho")}
                  className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 ${paymentMethod === "zoho"
                    ? "border-red-500 bg-red-50/20"
                    : "border-gray-100 bg-white hover:border-gray-200"
                    }`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h10v2H6zm12-4h2v2h-2zm-4 0h2v2h-2z" />
                      </svg>
                    </div>
                    <div style={{ lineHeight: "0.5" }}>
                      <p className="font-bold text-3xl text-gray-900">Online Payments</p>
                      <p className="text-md text-gray-500">Cards, Netbanking, UPI, Wallets</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === "zoho" ? "border-red-500 bg-red-500" : "border-gray-200"
                    }`}>
                    {paymentMethod === "zoho" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                    )}
                  </div>
                </button>

                {/* COD Option */}
                {/* <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 ${
                    paymentMethod === "cod"
                      ? "border-red-500 bg-red-50/20"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                      </svg>
                    </div>
                    <div style={{lineHeight: "0.5"}}>
                      <p className="font-bold text-3xl text-gray-900">Cash on Delivery</p>
                      <p className="text-md text-gray-500">Pay 100% at the venue</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    paymentMethod === "cod" ? "border-red-500 bg-red-500" : "border-gray-200"
                  }`}>
                    {paymentMethod === "cod" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                    )}
                  </div>
                </button> */}
              </div>

              <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100/50">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-500 text-2xl">Payable amount now</span>
                  <span className="font-extrabold text-gray-900 text-2xl">₹{paymentMethod === "cod" ? "0" : (759 * (bookingDetails?.vegGuests || 10) + 1500)}</span>
                </div>
                {paymentMethod === "cod" && (
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight">
                    Booking confirmation is subject to verification.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 md:p-6 p-4 z-[120]">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4 md:px-28">
          <button
            onClick={() => {
              if (showPayment) {
                setShowPayment(false);
                setCurrentStep(3);
              } else if (showDetails) {
                setShowDetails(false);
                setShowPriceBreakup(true);
                setCurrentStep(2);
              } else if (showPriceBreakup) {
                setShowPriceBreakup(false);
                setCurrentStep(1);
              } else {
                onBack();
              }
            }}
            className="py-2.5 px-6 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all outline-none border border-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          {(!showPriceBreakup && !showDetails && !showPayment) ? (
            <button
              onClick={handlePriceCheck}
              className="flex-1 bg-red-600 text-white rounded-2xl py-3 px-6 text-2xl font-semibold shadow-lg shadow-red-200 active:scale-[0.98] transition-all hover:bg-red-700"
            >
              Check Price
            </button>
          ) : showPriceBreakup ? (
            <button
              onClick={handleProceedToPay}
              className="flex-1 bg-red-600 text-white rounded-2xl py-3 px-6 text-2xl font-semibold shadow-lg shadow-red-200 active:scale-[0.98] transition-all hover:bg-red-700"
            >
              Proceed to Pay
            </button>
          ) : showDetails ? (
            <button
              onClick={handleDetailsComplete}
              disabled={!user}
              className="flex-1 bg-red-600 text-white rounded-2xl py-3 px-6 text-2xl font-semibold shadow-lg shadow-red-200 active:scale-[0.98] transition-all hover:bg-red-700 disabled:opacity-50"
            >
              Confirm Details
            </button>
          ) : (
            <button
              onClick={() => {
                // Ensure we capture latest details even if orderId exists
                createOrder(true).then(id => {
                  if (id) proceedWithPayment(id);
                });
              }}
              className="flex-1 bg-red-600 text-white rounded-2xl py-3 px-6 text-2xl font-semibold shadow-lg shadow-red-200 active:scale-[0.98] transition-all hover:bg-red-700 uppercase tracking-tight"
            >
              {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default CateringSummaryView;
