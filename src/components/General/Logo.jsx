import image from "../../assets/images/logo.webp";
import { Link } from "react-router-dom";


const Logo = () => {
    return <Link to="/" className="logo">
        <img src={image} alt="DogFood logo" />
        <span>RockDog</span>
    </Link>
} 

export default Logo;