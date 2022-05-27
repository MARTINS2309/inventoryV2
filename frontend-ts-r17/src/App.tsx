/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserProfile } from './store/user/userSlice';

//  main app component to deal with routing and calling components
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // todo: replace with GraphQL call
    dispatch({
      type: setUserProfile.type,
      payload: {
        id: 1,
        userName: 'Martins',
      },
    });
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categoryproducts/:categoryId" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/stockevent/:id" element={<StockEvent />} />
      <Route path="userprofile/:id" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// home page component
function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

// product page component
function Product() {
  return (
    <div>
      <h1>Product</h1>
    </div>
  );
}

// stock event page component
function StockEvent() {
  return (
    <div>
      <h1>Stock Event</h1>
    </div>
  );
}

// user profile page component
function UserProfile() {
  return (
    <div>
      <h1>User Profile</h1>
    </div>
  );
}

// not found page component
function NotFound() {
  return (
    <div>
      <h1>404 - Not Found</h1>
    </div>
  );
}

export default App;
