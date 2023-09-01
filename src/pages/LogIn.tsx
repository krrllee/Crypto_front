import{GoogleLogin} from 'react-google-login';
import { json } from 'stream/consumers';
import HttpClient from './HttpClient';


const CLIENT_ID = "CLIENT-ID";
const secret_key = "my_secret_key"


function Login(){

    const onSuccess = async (res:any) =>{
        console.log("LOGIN SUCCESS! Current user: ",res.profileObj)
        const response = await HttpClient.post('//localhost:5000/make_token',{
            googleId:res.profileObj.googleId,
            name: res.profileObj.name,
            email: res.profileObj.email,
        }
        )
        const jwtToken = response.data.access_token;
        console.log(jwtToken)
        localStorage.setItem('jwtToken',jwtToken) 
        window.location.href = "/home";
    }

    const onFailure = (res:any) =>{
        console.log("LOGIN FAILED! res: ",res);
    }
    return(
        <div id="loginButton">
            <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            />

           
        </div>
    )
}

export default Login;