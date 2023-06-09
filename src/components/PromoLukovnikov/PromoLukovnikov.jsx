import "./style.css";


const PromoLukovnikov = (props) => {
    const imgStyle = {
        backgroundImage: `url(${props.pic})`
    };

    let name = "promo";
    switch (props.type) {
        case "lg": name = "promo big"; break;
        case "sm": name = "promo small"; break;
        default: name = "promo default";
    }

    return (
        <div className={name}>
            <div className={"promo_pic"} style={imgStyle}></div>
            <h3 className={"banner_header"}>{props.header}</h3>
            <p className={"banner_text"}>{props.text}</p>
        </div>
        
    )
}

export default PromoLukovnikov;