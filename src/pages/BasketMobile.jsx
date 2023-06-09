import Ctx from "../context"
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";

const BasketMobile = ({ img, name, id, cnt, discount, price }) => {


    const {
        basket,
        setBasket
    } = useContext(Ctx);


    const setPrice = (price, discount) => {
        return (price * (1 - discount / 100))
    }


    const inc = (id) => {
        setBasket(prev => prev.map(el => {
            if (el.id === id) {
                el.cnt++;
            }
            return el;
        }))

    }

    const dec = (id, cnt) => {

        if (cnt === 1) {
            setBasket(prev => prev.filter(el => el.id !== id));
        }
        else {
            setBasket(prev => prev.map(el => {
                if (el.id === id) {
                    el.cnt--;
                }

                return el;
            }))
        }

    }

    const delFromCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setBasket(basket.filter(el => el.id !== id));
    }


    const summ = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price
    }, 0)

    const sale = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price * (1 - el.discount / 100)
    }, 0)


    return <>

        <div className="single__product__inside__mobile">


            <Link to={`/product/${id}`}> <div className="single__product__inside__mobile__picture">
                <img className="single__product__inside__mobile__img" src={img} alt={name} />
            </div> </Link>
            <div className="single__product__inside__mobile__price__info">
                {discount > 0 && <>
                    <span className="single__product__inside__mobile__price__befor__disc">{price.toFixed(2)}&nbsp;₽</span>
                    <br />
                    <span className="single__product__inside__mobile__price" style={{ color: "red" }}><>{setPrice(price, discount).toFixed(2)}&nbsp;₽</></span>
                </>}

                {!discount && <>
                    <span className="single__product__inside__mobile__price">{price}&nbsp;₽</span>
                </>}
                <Link to={`/product/${id}`}><p className="single__product__inside__mobile__name">{name}</p></Link>

                <div className="single__product__inside__mobile__cnt">
                    <button onClick={() => dec(id, cnt)} className="single__product__inside__mobile__btn" >-</button>
                    <span className="single__product__inside__mobile__btn">{cnt}</span>
                    <button onClick={() => inc(id)} className="single__product__inside__mobile__btn">+</button>
                </div>

            </div>
            <div>
                <Trash className="single__product__inside__trash" onClick={delFromCart} />
            </div>









        </div>
        <hr />
    </>

}

export default BasketMobile;