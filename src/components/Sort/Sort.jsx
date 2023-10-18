import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setActiveSort } from "../../redux/slices/filterSlice";

export const POPUP_LIST =[
   {
     name:'по пулярности ↑',
     sort:'rating&order=asc'
   },
   {
     name:'по пулярности ↓',
     sort:'rating&order=desc'
   },
   {
     name:'цене ↑',
     sort:'price&order=asc'
   },
   {
     name:'цене ↓',
     sort:'price&order=desc'
   },
   {
     name:'алфавиту ↑',
     sort:'title&order=asc'
   },
   {
     name:'алфавиту ↓',
     sort:'title&order=desc'
   },
 ]

function Sort(){
  const activeSort = useSelector(state => state.filter.sort)
  const dispatch = useDispatch()
  const sortRef= useRef()

  const [active,setActive] = useState(false)

  const onClickActiveSort = (item) =>{
   dispatch(setActiveSort(item));
    setActive(false)
  }

  useEffect(()=>{
    const clickNotSort = (event) =>{
      !event.composedPath().includes(sortRef.current) && setActive(false)
    }
    document.body.addEventListener('click',clickNotSort)

    return () => document.body.removeEventListener('click',clickNotSort)
  },[])

  return(
      <div className="sort" ref={sortRef}>
              <div className="sort__label">
                <svg style={active ?  {transform:`rotate(180deg)`} : {transform:`rotate(0deg)`}}
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                    fill="#2C2C2C"
                  />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={()=>setActive(!active)}>{activeSort.name}</span>
              </div>
              {active && <div className="sort__popup">
                <ul>
                  {POPUP_LIST.map((item,index)=>{
                    return <li key={index} onClick={()=>onClickActiveSort(item)} className={activeSort.name === item.name ? 'active' : ''}>{item.name}</li>
                  })}
                </ul>
              </div>}
            </div>
  )
}

export default Sort