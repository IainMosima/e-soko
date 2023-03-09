import { useNavigate } from "react-router-dom";
import { User } from "../../models/user";
import "./Packages.scss";

interface PackageProps {
    loggedInUser: User | null,
}

const Packages = ({ loggedInUser }: PackageProps) => {
    const navigate = useNavigate();

    if (!loggedInUser) {
        navigate('/loginSignup/packages');
    }

    return ( 
        <div>
            
        </div> 
    );
}
 
export default Packages;