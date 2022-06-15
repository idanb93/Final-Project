import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Scanners from './components/Scanners';
import License from './components/License';
import Report from './components/Report';
import Analytics from './components/Analytics';
import ErrorBoundary from './ErrorBoundary';
import Sidebar from './components/Sidebar';

import { useState } from 'react';

function App() {

  const [isLogin, setIsLogin] = useState(false);

  const onLogin = (isSuccessfullyLogin) => {
    setIsLogin(isSuccessfullyLogin);
  }

  return (
    <div className="App">
      <header className="App-header">
        <ErrorBoundary>
          <BrowserRouter>
            <Navbar />
              <Routes>
                <Route path='/' element={<Login onLogin={onLogin} />} />
                <Route path='/signup' element={<Signup />} />
              </Routes>
            {isLogin &&
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Sidebar />
                <div id='main-section'>
                  <Routes>
                    <Route path='/license' element={<License />} />
                    <Route path='/scanners' element={<Scanners />} />
                    <Route path='/report' element={<Report />} />
                    <Route path='/analytics' element={<Analytics />} />
                  </Routes>
                </div>
              </div>
            }
          </BrowserRouter>
        </ErrorBoundary>
      </header>

    </div>
  );
}

export default App;
