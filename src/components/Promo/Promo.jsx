import "./style.css";

const Promo = (props) => {
    const style = {
        backgroundImage : props.pic,
    };

    let name = "promo";
    switch (props.type) {
        case "lg": name = "promo big"; break;
        case "sm": name = "promo small"; break;
        default: name = "promo";
    }

    return (
        <div className={name}>
            <div className={props.pic ? "promo_pic" : "promo_pic pic2"}></div>
            <h3>{props.text}</h3>
        </div>
    )
}

export default Promo;