import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home/Home/Home';
import NotFound from './components/Pages/NotFound/NotFound';
import Login from './components/Pages/Login/Login';
import AuthProvider from './components/context/AuthProvider';
import Dashboard from './components/Pages/Dashboard/DashboardHome/DashboardHome';
import AddProducts from './components/Pages/Dashboard/AddProducts/AddProducts';
import Reviews from './components/Pages/Dashboard/Reviews/Reviews';
import MakeAdmin from './components/Pages/Dashboard/MakeAdmin/MakeAdmin';
import Checkout from './components/Pages/Services/Checkout/Checkout';
import ServicesMain from './components/Pages/Services/ServicesMain/ServicesMain';
import Service from './components/Pages/Services/Service/Service';
import Blog from './components/Pages/Blog/Blog';
import ServicesList from './components/Pages/Dashboard/ServicesList/ServicesList';
import OderList from './components/Pages/Dashboard/OderList/OderList';
import DashbordIntro from './components/Pages/Dashboard/DashbordIntro/DashbordIntro';
import PrivateRoute from './components/Pages/PrivateRoute/PrivateRoute';
import MyOder from './components/Pages/Dashboard/MyOder/MyOder';
import Payment from './components/Pages/Dashboard/Payment/Payment';
import OderPart from './components/Pages/Dashboard/OderPart/OderPart';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/services' element={<ServicesMain />}>
          <Route index element={<Service />} />
          <Route path='checkout/:id' element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
        </Route>
        <Route path='/dashboard/' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route index element={<DashbordIntro />} />
          <Route path='addProducts' element={<AddProducts />} />
          <Route path='reviews' element={<Reviews />} />
          <Route path='makeAdmin' element={<MakeAdmin />} />
          <Route path='oderList' element={<OderList />} />
          <Route path='servicesList' element={<ServicesList />} />
          <Route path='myOder' element={<MyOder />}>
            <Route index element={<OderPart />} />
            <Route path='payment/:id' element={<Payment />} />
          </Route>
        </Route>
        <Route path='/blogs' element={<Blog />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
