import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './pages/header/Header';
import Dashboard from './pages/dashboard/Dashboard';
import NoMatch from './pages/noMatch/NoMatch';
import PostUser from './pages/employee/PostUser';
import UpdateUSer from './pages/employee/UpdateUser';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Dashboard />}></Route>
      <Route path='/employee' element={<PostUser />}></Route>
      <Route path='/employee/update' element={<UpdateUSer />}></Route>
      <Route path='*' element={<NoMatch />}></Route>
    </Routes>
    </>
  );
}

export default App;
