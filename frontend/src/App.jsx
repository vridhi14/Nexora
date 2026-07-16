
// import {Show , SignInButton , SignUpButton , UserButton} from '@clerk/react'
// import { Button } from '@heroui/react';
import {WallpaperProvider} from './context/WallpaperContext.jsx'; 
import {ThemeProvider} from './context/ThemeContext.jsx' ; 
import ChatPage from './pages/ChatPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import { Routes, Route, Navigate } from "react-router";
import { useAuthStore } from './store/useAuthStore.js';
import { Toaster } from "react-hot-toast";
import { useAuth } from '@clerk/react';
import { useState, useEffect } from "react";
import PageLoader from './components/PageLoader.jsx'

function App() {

  const {isSignedIn , isLoaded} = useAuth();
 
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) checkAuth();
    else clearAuth();
  }, [checkAuth, clearAuth, isLoaded, isSignedIn]);
  
  if (!isLoaded || (isSignedIn && isCheckingAuth)) return <PageLoader />

  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route path="/" element={isSignedIn ? <ChatPage/> : <Navigate to={"/auth"} replace/> } />
          <Route path="/auth" element={!isSignedIn ? <AuthPage/> : <Navigate to={"/"} replace/>} />
        </Routes>
        <Toaster/>
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App
