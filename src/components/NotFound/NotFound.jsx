import React from 'react'
import styles from './NotFound.module.scss'
import { Link } from 'react-router-dom'

function NotFound (){
    return(
        <div className={styles.cnt}>
            <h1 className={styles.title}>Ничего не найдено :(</h1>
            <br />
            <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quia odit sequi perspiciatis. Et tenetur similique repellat architecto culpa velit, temporibus, dolores sapiente corrupti nihil amet sunt perferendis tempora repudiandae.</p>
            <Link to={'/'} className='button button-notFound'>Вернутся домой</Link>
        </div>
    )
}

export default NotFound