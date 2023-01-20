import Navbar from './components/navbar/Navbar';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Articles from './pages/Articles';
import ArticlesPlan from './pages/ArticlesPlan';
import { ProtectedRoutes } from './routes/ProtectedRoutes';
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/articles' element={<ProtectedRoutes/>}>
      <Route path='/articles' element={<Articles/>}/>
      </Route>
      <Route path='/article-plan' element={<ProtectedRoutes/>}>
      <Route path='/article-plan' element={<ArticlesPlan/>}/>
      </Route>
     
    </Routes>
     
    </BrowserRouter>
  );
}

export default App;
