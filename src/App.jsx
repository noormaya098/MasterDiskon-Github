import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import OrderProduct from "./pages/order/OrderProduct";
import { SignIn } from "./pages/auth";
import DetailEditUser from './pages/user_corporate/DetailEditUser';
import TambahUserCorporate from './pages/user_corporate/TambahUserCorporate';
import TambahVendor from './pages/vendor/TambahVendor';
import EditDetailVendor from './pages/vendor/EditDetailVendor';
import TambahPromo from './pages/promo/TambahPromo';
import EditDetailPromo from './pages/promo/EditDetailPromo';
import TambahCoupon from './pages/coupon/TambahCoupon';
import EditCoupon from './pages/coupon/EditCoupon';
import routes from './routes';
import DetailOrderNew from './pages/order/DetailOrderNew';
import DetailEditHotel from './pages/hotel/DetailEditHotel';
import DetailHotelNew from './pages/hotel/DetailHotelNew';
import DetailCoupon from './pages/coupon/DetailCoupon';

// Fungsi utilitas untuk memeriksa apakah pengguna telah login atau tidak
const isUserAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token ? true : false;
};

function App() {
  
  return (
    <Routes>
      <Route path="/dashboard/*" element={isUserAuthenticated() ? <Dashboard routes={routes} /> : <Navigate to="/auth/signin" />} >
        <Route path='user/corporate/detailUserCorporate' element={<DetailEditUser/>}/>
        <Route path='order/orderProduct/detail-order-product/:id_order' element={<DetailOrderNew/>}/>
        <Route path='hotel/Hotel/detail-hotel/:id_hotel' element={<DetailHotelNew/>}/>
        <Route path='coupon/Coupon/detail-coupon/:id_coupon' element={<DetailCoupon/>}/>
        <Route path='promo/Promo/DetailPromo/:id_promo' element={<EditDetailPromo/>}/>
        <Route path='user/corporate/AddUserCorporate' element={<TambahUserCorporate/>}/>
        <Route path='vendor/addVendor' element={<TambahVendor/>}/>
        <Route path='vendor/editDetailVendor' element={<EditDetailVendor/>}/>
        <Route path='promo/addPromo' element={<TambahPromo/>}/>
        <Route path='promo/EditDetailPromo' element= {<EditDetailPromo/>}/>  
        <Route path='coupon/AddCoupon' element= {<TambahCoupon/>}/>  
        <Route path='coupon/EditCoupon' element= {<EditCoupon/>}/>  
      </Route>
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/auth/signin" element={!isUserAuthenticated() ? <SignIn /> : <Navigate to="/dashboard/home" />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
