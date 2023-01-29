import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAppContext } from './context/useContext';
import { Home, Register, Login, NotFound, ForgetPassword } from './page';
import { Admin, Dashboard, Messenger } from './page/layout';
import LoggedinLayout from './page/LoggedinLayout';
import ShareLayout from './page/ShareLayout';
import { Profile } from './page/user';

function App() {
  const { dark } = useAppContext();
  return (
    <div className={`${dark ? 'dark' : ''} relative `}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme={dark ? 'dark' : 'light'}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LoggedinLayout>
                <ShareLayout />
              </LoggedinLayout>
            }
          >
            <Route index path="/" element={<Dashboard />} />
            <Route path='/messenger' element={<Messenger />} />
            <Route path='/admin' element={<Admin />} />
            <Route path="/profile/*" element={<Profile />} />
          </Route>

          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
