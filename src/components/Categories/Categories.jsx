import React, { useState } from "react"

function Categories({activeCategories,onClickCategories}){
  const CATEGORIES = ['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые']


  return(
      <div className="categories">
              <ul className="categories_ul">
                {CATEGORIES.map((item,index)=>{
                  return <li key={index} className={activeCategories === index ? 'active' : ''} onClick = {() => onClickCategories(index)}>{item}</li>
                })}
              </ul>
            </div>
  )
}

export default Categories