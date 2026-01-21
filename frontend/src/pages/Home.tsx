import { authClient } from '../lib/auth-client'

const Home = () => {

  const onSingout = async () => {
    await authClient.signOut()
  }

  return (
    <div><button onClick={onSingout} >Signout</button></div>
  )
}

export default Home