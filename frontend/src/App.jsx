
// import {Show , SignInButton , SignUpButton , UserButton} from '@clerk/react'
// import { Button } from '@heroui/react';
import {WallpaperProvider} from './context/WallpaperContext'; 
import {ThemeProvider} from './context/ThemeContext' ; 
import ChatPage from './pages/ChatPage';
import AuthPage from './pages/AuthPage';
import { Navigate } from 'react-router';
function App() {

  const {isSignedIn , isLoaded} = useAuth();
  
  //todo : make it better  
  if(!isLoaded){
    return <PageLoader/>
  }
  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route path="/" element={isSignedIn ? <ChatPage/> : <Navigate to={"/auth"} replace/> } />
          <Route path="/auth" element={!isSignedIn ? <AuthPage/> : <Navigate to={"/"} replace/>} />
        </Routes>
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App
