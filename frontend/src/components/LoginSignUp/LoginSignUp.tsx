import { useState } from "react";
import { Images } from "../../constants";
import { useForm } from "react-hook-form";

import "./LoginSignUp.scss";

const LoginSignUp = () => {
    const [loginToggle, setLoginToggle] = useState(true);
    const [signUpToggle, setSignUpToggle] = useState(false);

    function toggleHandler(option: string) {
        switch (option) {
            case 'login':
                setLoginToggle(!loginToggle);
                setSignUpToggle(false);
                break;

            case 'signup':
                setSignUpToggle(!signUpToggle);
                setLoginToggle(false);
                break;
            
            default:
                setSignUpToggle(false);
                setLoginToggle(false);
        }
    }
    return ( 
        <div className="app__loginSignUp">
            <div className="body">
                <div className="navigators">
                    <h3 
                     className={loginToggle ? 'active': ''}
                     onClick={()=>toggleHandler('login')}
                     >login</h3>
                    <h3
                     className={signUpToggle ? 'active': ''}
                     onClick={()=>toggleHandler('signup')}
                    >signup</h3>
                </div>
                
                {loginToggle &&
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
                }

                {signUpToggle &&
                    <form>
                        <div>
                            <img src={Images.accountIcon} alt='profile-icon'/>
                            <input type='text' placeholder="Username"/>
                        </div>

                        <div>
                            <img src={Images.emailIcon} alt='profile-icon'/>
                            <input type='email' placeholder="Email"/>
                        </div>

                        <div>
                            <img src={Images.phoneIcon} alt='profile-icon'/>
                            <input type='text' placeholder="Mpesa Number"/>
                        </div>
                        
                        <div>
                            <img src={Images.passwordLockIcon} alt='profile-icon'/>
                            <input type='password' placeholder="Password" />
                        </div>

                        <div>
                            <img src={Images.passwordLockIcon} alt='profile-icon'/>
                            <input type='password' placeholder="Confirm Password" />
                        </div>

                        <button>Sign Up</button>
                    </form>
                }
                
            </div>
        </div>
     );
}
 
export default LoginSignUp;