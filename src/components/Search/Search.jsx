import React, { useContext, useRef, useCallback, useState } from 'react'
import { SearchContext } from '../../App'
import debounce from 'lodash.debounce'

import style from './Search.module.scss'

function Search(){
    const [value , setValue] = useState('')
    const { setSearchValue} = useContext(SearchContext)
    const searchRef = useRef()

    const clearSearch = () =>{
        setValue('')
        setSearchValue('')
        searchRef.current.focus()   
    }

    const onChangeSearch = useCallback(
        debounce((a)=>{
            setSearchValue(a)
        },250),
        []
    )

    const onChangeInput = (e) =>{
        setValue(e.target.value);
        onChangeSearch(value)
    }
    

    return(
        <div className={style.search}>
            <svg className={style.search_svgFind} fill="#000000" viewBox="-0.04 0 31.793 31.793" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g transform="translate(-609.503 -130.759)"> <path d="M622.914,132.759a11.41,11.41,0,1,1-11.411,11.41,11.424,11.424,0,0,1,11.411-11.41m0-2a13.41,13.41,0,1,0,13.41,13.41,13.41,13.41,0,0,0-13.41-13.41Z"></path> <path d="M640.208,162.552a1,1,0,0,1-.707-.292L631.64,154.4a1,1,0,1,1,1.414-1.414l7.861,7.86a1,1,0,0,1-.707,1.707Z"></path> </g> </g></svg>
            <input ref={searchRef} value={value} onChange={(e)=>onChangeInput(e)} type="text" className={style.search_input} placeholder='Поиск пицц...' />
            {value && <svg className={style.search_svgClose} onClick={()=>clearSearch()} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"></path> </g></svg>}
        </div>
    )
}

export default Search