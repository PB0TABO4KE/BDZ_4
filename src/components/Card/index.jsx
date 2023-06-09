import "./style.css";
import { Link } from "react-router-dom";
import { Heart, HeartFill, Percent } from "react-bootstrap-icons";
import { useState, useContext, useEffect } from "react";
import Ctx from "../../context"




const Card = ({ img, name, price, _id, discount, tags, likes }) => {
    const {
        setServerGoods,
        userId,
        api,
        setBasket,
        basket
    } = useContext(Ctx);

    const [isLike, setIsLike] = useState(likes?.includes(userId));
    const [inBasket, setInBasket] = useState(basket.filter(el => el.id === _id).length > 0)


    const addToCart = (e) => {

        e.preventDefault();
        e.stopPropagation();
        setInBasket(true);
        setBasket(prev => [...prev, {
            id: _id,
            cnt: 1,
            name: name,
            img: img,
            price: price,
            discount: discount
        }])

    }






    const updLike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsLike(!isLike);


        api.setLike(_id, !isLike)
            .then(data => {


                setServerGoods(function (old) {

                    const arr = old.map(el => {
                        if (el._id === _id) {
                            return data;
                        }
                        else {
                            return el;
                        }
                    })
                    return arr;
                });
            })

    }

    return <Link to={`/product/${_id}`} className="card" >
        {discount > 0 && <span className="card__discount">{discount} <Percent />  </span>}
        <span className="card__like" onClick={updLike}>
            {isLike ?
                <HeartFill /> : <Heart />}
        </span>
        {/* <img src={img} alt="Картинка" className="card__img" />*/}
        <span className="card__img__2" style={{ backgroundImage: `url(${img})` }} />

        <span className="card__name">{name}</span>
        <span className="card__price">
            {discount > 0
                ? <>
                    <del>{price}</del>
                    &nbsp;
                    {price * (100 - discount) / 100}
                </>
                :
                price
            }&nbsp;руб</span>
        {inBasket && <button className="card__btn" onClick={addToCart} disabled={inBasket}>Уже в корзине</button>
        }
        {!inBasket && <button className="card__btn" onClick={addToCart} disabled={inBasket}>В корзину</button>
        }
        {/* <span className="card__tags">
        {tags.map (el => <span key={el}>{el}</span>)}
        </span>*/}
    </Link>
}

export default Card;