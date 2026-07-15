
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
    return <p>Loading....</p>
  }
  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route path="/" elemnt={isSignedIn ? <ChatPage/> : <Navigate to={"/auth"} replace/> } />
          <Route path="/auth" elemnt={!isSignedIn ? <AuthPage/> : <Navigate to={"/chat"} replace/>} />
        </Routes>
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App
