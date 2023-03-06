import { Images } from "../../constants";
import "./forms.scss";

const SignUpForm = () => {

    return ( 
        <div className="app__loginSignUp">

            function onUsernamChange(event) {
                
            }

            <form>
                <div className="input-warning">
                    <img src={Images.accountIcon} alt='profile-icon'/>
                    <input type='text' placeholder="Username" />
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
        </div>
     );
}
 
export default SignUpForm;