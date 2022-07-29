import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignIn from './components/signin/Index';
import SignUp from './components/signup/Index';
import Home from './pages/home/Index';
import Chat from './pages/chat/Index';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
