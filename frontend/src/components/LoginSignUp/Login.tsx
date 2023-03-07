import { Images } from "../../constants";
import React from "react";
import { loginCredentials } from "../../models/loginCredentials";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../../errors/http_errors";
import { login } from "../../network/users";
import { useNavigate } from "react-router-dom";




import "./forms.scss";
import { User } from "../../models/user";
import CircularProgress from "@mui/material/CircularProgress";


interface LoginProps {
    setErrorText: React.Dispatch<React.SetStateAction<string | null>>,
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>,

}



const LoginForm = ({  setErrorText,  setLoggedInUser } : LoginProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<loginCredentials>();
    const navigate = useNavigate();


    const registerOptions = {
        usernameEmail: { required: 'Name or UserName is required' },
        password: { required: 'Password is required' },
    }

    async function onSubmit(credentials: loginCredentials) {
        try {
            const user = await login(credentials);

            if (user) {
                setLoggedInUser(user);
                navigate('/');
            }

        } catch (err) {
            if (err instanceof UnauthorizedError) {
                setErrorText('Invalid credentials, try again');
            } else {
                alert(err);
                console.error(err);
                
            }
        }
    }

    
    return ( 
        <div className="app__loginSignUp">
            <form onSubmit={handleSubmit(onSubmit)}>
                {errors.usernameEmail &&
                    <p className="text-danger">Email or Username is required</p>
                }
                <div>
                    <img src={Images.accountIcon} alt='profile-icon'/>
                    <input type='text' placeholder="Username or Email"
                     {...register('usernameEmail', registerOptions.usernameEmail)}/>
                </div>
                
                
                {errors.password &&
                    <p className="text-danger">Password is required</p>
                }        
                <div>
                    <img src={Images.passwordLockIcon} alt='profile-icon'/>
                    <input type='password' placeholder="Password" 
                     {...register('password', registerOptions.password)}
                    />
                </div>

                <button>
                    {!isSubmitting &&
                        <p>Log In</p>
                    }
                    {isSubmitting &&
                        <CircularProgress color="inherit"/>
                    }
                </button>
            </form>
        </div>
     );
}
 
export default LoginForm;
