import { useState } from "react";
import LoginForm from "./Login";
import SignUpForm from "./Signup";

import "./forms.scss";

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
                    <LoginForm/>
                }

                {signUpToggle &&
                    <SignUpForm/>
                }
                
            </div>
        </div>
     );
}
 
export default LoginSignUp;