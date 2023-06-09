import "./style.css";


const PromoFlex = (props) => {
    const imgStyle = {
        backgroundImage: `url(${props.pic})`
    };
  
    let name = "promo_flex";
    switch (props.type) {
        case "lg": name = "promo_flex big"; break;
        case "sm": name = "promo_flex small"; break;
        default: name = "promo_flex default";
    }

    return (
        <div className={name}>
            <div className={"promo_promo_flex"} style={imgStyle}>
            <h3 className={"banner_header_flex"}>{props.header}</h3>
            <p className={"banner_text_flex"}>{props.text}</p>
            </div>
            <div className={"promo_pic_flex"} style={imgStyle}></div>
        </div>
        
    )
}

export default PromoFlex;