'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import Image from 'next/image';

const Header = () => {
    const pathname = usePathname();

    return (
        <header className={styles.container}>
            <div className={styles.headerLogo}>
                <Link href="/">
                    <Image src="/logo.png" alt="PuntoRed" width={300} height={100} />
                </Link>
            </div>
            <nav className={styles.header}>
                <ul className={styles.navList}>
                    <li className={pathname === '/' ? styles.active : ''}>
                        <Link href="/">Inicio</Link>
                    </li>
                    <li className={pathname === '/historial' ? styles.active : ''}>
                        <Link href="/historial">Historial</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;