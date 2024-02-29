import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Registation from './pages/Registation/Registation';
import Logout from './pages/Logout/Logout';
import AuthProvider from './providers/AuthProvider';


const App = () => {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Main><Index/></Main>}/>
            <Route path='/login/' element={<Main><Login/></Main>}/>
            <Route path='/registration/' element={<Main><Registation/></Main>}/>
            <Route path='/logout/' element={<Main><Logout/></Main>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App;
