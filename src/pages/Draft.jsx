import { useState } from "react";
import Card from "../components/Card"
import Promo from "../components/Promo/Promo"
import cardsData from "../assets/data"; 


const sizes = ["sm", "lg", "md"];
const adds = [];

const Draft = () => {
    const [goods, setGoods] = useState(cardsData);
    return (

        <div className="container_old">

            <Promo text="PB0TA_B_O4KE" type="lg" pic="../../assets/images/banner_pic_1.png" />

            

            {goods.map((el, i) => <Card
                key={i}
                img={el.pictures}
                name={el.name}
                price={el.price}
            />)}

            <Promo />
            <Promo />
        </div>
    )
}

export default Draft;