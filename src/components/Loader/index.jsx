import { ArrowClockwise } from "react-bootstrap-icons";
import "./style.css";

const Loader = () => {
    return <div className="loader">
        <span className="loader__img">
            <ArrowClockwise />
        </span>
        <span className="loader__text"> Данные загружаются</span>
    </div>

}

export default Loader;

