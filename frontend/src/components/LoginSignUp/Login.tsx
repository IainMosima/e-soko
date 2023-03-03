import { Images } from "../../constants";
import { loginCredentials } from "../../models/loginCredentials";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as UserApi from "../../network/users";

import "./forms.scss";

const LoginForm = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const registerOptions = {
        usernameEmail: { required: 'Name or UserName is required' },
        password: { required: 'Password is required' },
    }

    return ( 
        <div className="app__loginSignUp">
            <form>
                <div>
                    <img src={Images.accountIcon} alt='profile-icon'/>
                    <input type='text' placeholder="Username or Email"/>
                </div>

                        
                <div>
                    <img src={Images.passwordLockIcon} alt='profile-icon'/>
                    <input type='password' placeholder="Password" />
                </div>

                <button>Log In</button>
            </form>
        </div>
     );
}
 
export default LoginForm;