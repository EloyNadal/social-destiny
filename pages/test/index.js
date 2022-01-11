import { useSession, signIn, signOut, getSession, getCsrfToken } from "next-auth/react"
import Image from "next/image"

export default function Component() {

    const { data: session } = useSession()
    if (session) {
        console.log(session);
        return (
            <>
                Signed in as {session.user.name} - {session.user.id}<br />
                <Image src={session.user.image} width={50} height={50} alt={session.user.name} />
                <button onClick={() => signOut('bungie')}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}

