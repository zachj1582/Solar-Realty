import React, {useState} from 'react'
import AdminLogin from './AdminLogin'

const Footer = props => {
    const [showAuth, setShowAuth] = useState(false)


    return(
        <div>
            <h1>logo</h1>
            <button onClick={()=> setShowAuth(!showAuth)} >Admins</button>
            {showAuth && <AdminLogin toggleFn={setShowAuth}/>}
        </div>
    )
}

export default Footer