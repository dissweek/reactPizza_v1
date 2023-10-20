import React, { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import Categories from "../components/Categories/Categories";
import Sort, { POPUP_LIST } from "../components/Sort/Sort";
import PizzaCard from "../components/PizzaCard/PizzaCard";
import Skeleton from "../components/PizzaCard/Skeleton";
import { setActiveCategories, setFilters } from "../redux/slices/filterSlice";
import { getFetchPizza } from "../redux/slices/pizzaSlice";

function Home() {
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const { activeCategories, sort } = useSelector((state) => state.filter);
  const {items,status}  =  useSelector((state) => state.pizza)
  const { searchValue } = useContext(SearchContext);
  const category = activeCategories;
  const search = searchValue ? `&search=${searchValue}` : "";
  const urlParams = useRef(false);
  const isMounted = useRef(false)
  const localCart = useSelector((state)=> state.cart)

  const getPizzas = async () => {
    dispacth(getFetchPizza({
      category,
      search,
      sort,
      activeCategories
    }));

    window.scrollTo(0,0)
  };

  //Если был первый рендер и изменились параметры то сохраняем их в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = POPUP_LIST.find((obj) => obj.sort === params.sort);
      dispacth(setFilters({ ...params, sort }));
      urlParams.current = true;
      }
  }, []);

  // Если не первый рендер, и обновились параметры
  useEffect(() => {
    const queryString = qs.stringify({
      category,
      sort: sort.sort,
    });
    navigate( isMounted.current && `?${queryString}`);
    isMounted.current = true
    }, [activeCategories, sort, searchValue]);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    !urlParams.current && getPizzas();
    urlParams.current = false;
  }, [activeCategories, sort, searchValue]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            activeCategories={activeCategories}
            onClickCategories={(id) => dispacth(setActiveCategories(id))}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {status == 'loading'
            ? [...new Array(12)].map((item, index) => <Skeleton key={index} />)
            : items.map((item, index) => (
                <PizzaCard key={item.id} {...item} />
              ))}
        </div>
      </div>
    </>
  );
}

export default Home;
