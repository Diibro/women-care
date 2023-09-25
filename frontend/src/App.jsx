import MainPage from './pages/mainPage';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' index element={<MainPage />}/>
        <Route path='/dashboard/*'  element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
