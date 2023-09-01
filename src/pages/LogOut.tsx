import{GoogleLogout} from 'react-google-login';
import './NavBar.css'

const CLIENT_ID = "CLIENT-ID";



function LogOut(){

    const onSuccess = () =>{
        console.log("LOGOUT SUCCESS!")
        window.location.href = "/login";
        localStorage.clear();
    }

    const onFailure = () =>{
        console.log("LOGOUT FAILED!")
    }

    return(
        <div id="logoutButton">
            <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Log out from Google"
            onLogoutSuccess={onSuccess}
            onFailure={onFailure}
            />

           
        </div>
    )
}

export default LogOut;