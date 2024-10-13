import React from 'react'
import styles from './FAB.module.css'
import Link from 'next/link'

export const FAB = () => {
    return (
        <div className={styles.FABcontainer}>
            <div className={styles.FABbutton}>
                <img src="/FABicon.svg" alt="mas información" />
            </div>
            <div className={styles.hidden}>
                <p>Realizado por Andres Robayo,</p>
                 <p>más en <Link href={"https://arbyl.me"}>Arbyl.me</Link></p>
            </div>

        </div>
    )
}
