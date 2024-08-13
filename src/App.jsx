
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './charge/Main.jsx';
import Login from './charge/Login.jsx';
import Join from './charge/Join.jsx';
import MyPage from './charge/MyPage.jsx';
import Admin from './charge/Admin.jsx';
import Owner from './charge/Owner.jsx';
import Test from './charge/components/ReviewCreate.jsx'
import Test2 from './charge/components/ReviewRead.jsx'

function App() {
  return (

      <Router>
        <Routes>

        <Route path="/" element={<Main />} />

        <Route path="/login" element={<Login />} />
        
        <Route path="/join" element={<Join />} />

        <Route path="/mypage" element={<MyPage />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/owner" element={<Owner />} />

<Route path="/test" element={<Test />} />
<Route path="/test2" element={<Test2 />} />
        
        </Routes>
      </Router>

  );
}

export default App;
