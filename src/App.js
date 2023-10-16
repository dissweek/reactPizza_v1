import React, { createContext, useContext, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Home from "./Pages/Home";
import NotFoundPage from "./Pages/NotFound";
import { Route,Routes } from "react-router";
import Cart from "./Pages/Cart";

export const SearchContext = React.createContext()

function App() {
  const [searchValue,setSearchValue] = useState('')
  return (
    <>
      <div className="wrapper">
       <SearchContext.Provider value={{searchValue,setSearchValue}}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
       </SearchContext.Provider>
      </div>
    </>
  );
}

export default App;
