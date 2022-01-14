import Avatar from 'components/Avatar';
import Nav from 'components/Nav';
import { useSession } from 'next-auth/react';
import styles from './Layout.module.css';

export default function Layout({ children }) {

    const { data: session } = useSession()

    return (
        <main>

            <header className={styles.header}>
                {
                    session && 
                    <Avatar src={session.user.image} alt={session.user.name} sizeW={40} sizeH={40} />
                }
                <h2>Inicio</h2>
            </header>
            <section className={styles.section}>
                {children}
            </section>
            <Nav />

        </main>
    );
}