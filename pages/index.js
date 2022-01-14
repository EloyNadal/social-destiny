import Layout from "components/Layout";
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import styles from "styles/Home.module.css"

export default function Home() {

  const { data: session } = useSession()

  console.log(session);
  return (

    <div className="layout">
      <Layout>
        <div className={styles.homeSection}>
          {session
            ? <>
              Signed in as {session.user.name} - {session.user.membershipId}<br />
              <Image src={session.user.image} width={50} height={50} alt={session.user.name} />
              <button onClick={() => signOut('bungie')}>Sign out</button>
            </>
            :
            <>
              Not signed in <br />
              <button onClick={() => signIn('bungie')}>Sign in</button>
            </>
          }
        </div>
      </Layout>
    </div>
  )
}


