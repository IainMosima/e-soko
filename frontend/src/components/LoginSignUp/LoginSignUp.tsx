import { useEffect, useState } from "react";
import LoginForm from "./Login";
import SignUpForm from "./Signup";

import "./forms.scss";
import { useLocation } from "react-router-dom";
import { User } from "../../models/user";

interface LoginSignUpProps {
    menuToggle: boolean,
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>
}

const LoginSignUp = ({ menuToggle, setLoggedInUser }: LoginSignUpProps) => {
    const [loginToggle, setLoginToggle] = useState(true);
    const [signUpToggle, setSignUpToggle] = useState(false);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [showMessage, setShowMessage] = useState(true);
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const message = queryParams.get('message');
    // const message = 'Login in to add a product to a package';
    

    useEffect(() => {
        const messageTimer = setTimeout(() => {
            setShowMessage(false);
        }, 3000);
        
      return () => clearTimeout(messageTimer);

    }, [errorText])
    
    


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
        <div className="app__loginSignUp login-only">
            {showMessage &&
                <h3 className="message">{message}</h3>
            }
            {errorText &&
                <h3 className="message">{errorText}</h3>
            }
            <div className="body">
                <div className="navigators">
                    <h3 
                     className={loginToggle ? 'active': ''}
                     onClick={()=>toggleHandler('login')}
                     >login</h3>
                    <h3
                     className={signUpToggle ? 'active' : ''}
                     style={menuToggle ? { position: 'static' } : { position: 'relative' }} 
                     onClick={()=>toggleHandler('signup')}
                    >signup</h3>
                </div>
                
                {loginToggle &&
                    <LoginForm
                     errorText={errorText}
                     setErrorText={setErrorText}
                     setLoggedInUser={setLoggedInUser}
                    />
                }

                {signUpToggle &&
                    <SignUpForm/>
                }
                
            </div>
        </div>
     );
}
 
export default LoginSignUp;