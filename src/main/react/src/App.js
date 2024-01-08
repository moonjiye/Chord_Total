import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Header from "./style/Header";
import GlobalStyle from "./style/GlobalStyle";
import Footer from "./style/Footer";
import Performance from "./pages/performance/Performance";
import PerformanceDetail from "./pages/performance/PerformanceDetail";
import PerformanceUpdate from "./pages/performance/PerformanceUpdate";
import KakaoLogin from "./api/KakaoLoginApi";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import MusicInfo from "./pages/musicPage/MusicInfoPage";
import MusicRegistPage from "./pages/musicPage/MusicRegistPage";
import MusicList from "./pages/musicPage/MusicListPage";
import CommunityPage from "./pages/CommunityPage";
import MyPage from "./pages/MyPage";
import Test from "./pages/SimpleTest";
import AdminPage from "./pages/AdminPage";
import ShopPage from "./pages/Shop/ShopPage";
import CartPage from "./pages/Product/CartPage";
import OrderFormPage from "./pages/Product/OrderFormPage";
import ProductPage from "./pages/Product/ProductPage";
import OtherPage from "./pages/OtherPage";
import FooterContext from "./context/FooterContext";
import { CartProvider } from "./context/CartContext";

function App() {
  const [footerData, setFooterData] = useState([]);

  return (
    <>
      <GlobalStyle />
      <Router>
        <CartProvider>
          <FooterContext.Provider value={{ footerData, setFooterData }}>
            <Header />

            <Routes>
              <Route path="/performance" element={<Performance />} />
              <Route
                path="/PerformanceUpdate"
                element={<PerformanceUpdate />}
              />
              <Route
                path="/PerformanceDetail/:id"
                element={<PerformanceDetail />}
              />
              <Route path="/" element={<MainPage></MainPage>} />
              <Route path="/login" element={<LoginPage></LoginPage>} />
              <Route path="/signup" element={<SignupPage></SignupPage>} />
              <Route path="/kakao" element={<KakaoLogin></KakaoLogin>} />
              <Route
                path="/music-regist"
                element={<MusicRegistPage></MusicRegistPage>}
              />
              <Route path="/music-list" element={<MusicList></MusicList>} />
              <Route path="/music-info/:id" element={<MusicInfo></MusicInfo>} />
              <Route
                path="/communitypage/*"
                element={<CommunityPage></CommunityPage>}
              />
              <Route path="/otherpage/:email" element={<OtherPage />} />
              <Route path="/mypage" element={<MyPage></MyPage>} />
              <Route path="/adminpage" element={<AdminPage />} />
              <Route path="/test" element={<Test></Test>} />
              <Route path="/shopPage" element={<ShopPage></ShopPage>} />
              <Route path="/cart" element={<CartPage></CartPage>} />
              <Route
                path="/orderform"
                element={<OrderFormPage></OrderFormPage>}
              />
              <Route
                path="/productPage"
                element={<ProductPage></ProductPage>}
              />
            </Routes>
            <Footer />
          </FooterContext.Provider>
        </CartProvider>
      </Router>
    </>
  );
}
export default App;
