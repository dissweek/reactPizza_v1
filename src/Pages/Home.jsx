import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../App";
import { setActiveCategories,setFilters } from "../redux/slices/filterSlice";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router";
import qs from 'qs'

import Categories from "../components/Categories/Categories";
import Sort, { POPUP_LIST } from "../components/Sort/Sort";
import PizzaCard from "../components/PizzaCard/PizzaCard";
import Skeleton from "../components/PizzaCard/Skeleton";
import axios from 'axios'

function Home() {
  const navigate = useNavigate()
  const dispacth = useDispatch()
  const {activeCategories, sort} = useSelector(state => state.filter) 
  const [pizzalist,setPizzaList] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const category = activeCategories ? `category=${activeCategories}` : ''
  const {searchValue} = useContext(SearchContext)
  const search = searchValue ? `&search=${searchValue}` : ''
  

  useEffect(()=>{
    console.log(window.location.search)
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1))
      console.log({...params.sort})
      const sort = POPUP_LIST.find((obj)=> obj.sort === params.sort)
      dispacth(setFilters({...params,sort}))
    } 
  },[])

  useEffect(()=>{
    setIsLoading(true)
    axios.get(`https://6525cd0a67cfb1e59ce7af29.mockapi.io/Items?${category}&sortBy=${sort.sort}${search}`)
      .then((res)=> {
          setPizzaList(res.data)
          setIsLoading(false)
        })
    window.scrollTo(0,0) 
  },[activeCategories,sort,searchValue])

  useEffect(()=>{
    const queryString = qs.stringify({
      sort:sort.sort,
     category,
    })
    console.log(activeCategories)
    navigate(`?${queryString}`)
  },[activeCategories,sort,searchValue])


  return (
    <>
        <div className="container">
        <div className="content__top">
            <Categories activeCategories={activeCategories} onClickCategories={(id)=>dispacth(setActiveCategories(id))}/>
            <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
            {
            isLoading ? [... new Array(12)].map((item,index)=><Skeleton key={index} />) : pizzalist.map((item,index)=><PizzaCard key={item.id} {...item}/>)
            }
        </div>
        </div>
    </>
  );
}

export default Home;
