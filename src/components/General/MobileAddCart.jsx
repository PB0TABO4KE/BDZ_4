import { useContext, useState } from "react";
import Ctx from "../../context"








const MobileAddCart = () => {
    const { product,
        basket,
        setBasket
    } = useContext(Ctx);

    const [inBasket, setInBasket] = useState(basket.filter(el => el.id === product._id).length > 0)

    const addToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInBasket(true);
        setBasket(prev => [...prev, {
            id: product._id,
            cnt: 1,
            name: product.name,
            img: product.pictures,
            price: product.price,
            discount: product.discount
        }])

    }



    return (
        <div className="mobile__add__cart">
            <button className="mobile__add__cart__btn" onClick={addToCart} disabled={inBasket}>Добавить в корзину</button>
        </div>
    )
}






export default MobileAddCart;