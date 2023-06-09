import { useContext } from "react";
import { Link } from "react-router-dom";
import BasketMobile from "./BasketMobile";
import Ctx from "../context"
import { TruckFront } from "react-bootstrap-icons";
const Basket = () => {

    const {
        basket,
        setBasket
    } = useContext(Ctx);

    const setPrice = ({ price, cnt, discount }) => {
        return price * cnt * (1 - discount / 100)
    }


    const summ = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price
    }, 0)

    const sale = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price * (1 - el.discount / 100)
    }, 0)

    const summ_cnt = basket.reduce((acc, el) => {
        return acc + el.cnt
    }, 0)

    const summ_minus_sale = (summ, sale) => {
        return summ - sale
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

    const clearBasket = () => {
        setBasket([]);
    }

    return <>

        <h1> {summ_cnt} товаров в корзине</h1>

        {basket.length === 0 && <>
            <p className="basket__inside__mobile">В корзине пусто. Добавьте товары, чтобы сделать заказ.</p>
            <p className="basket__inside">В корзине пусто. Добавьте товары, чтобы сделать заказ.</p>
            <Link to={`/catalog`}><p>Перейти в каталог</p></Link>

        </>}






        {basket.length > 0 && <>

            <div className="basket__inside">
                <button className="product__cart__btn" style={{ width: "100%", backgroundColor: "lightgrey", marginTop: "15px", marginBottom: "15px" }} onClick={clearBasket} >Очистить корзину</button>
                <table>
                    <thead>
                        <tr>
                            <td>Изображение</td>
                            <td>Название</td>
                            <td>Количество</td>
                            <td>Цена</td>
                            <td>Скидка</td>
                            <td>Цена со скидкой</td>
                        </tr>
                    </thead>
                    <tbody>
                        {basket.map(el => <tr key={el.id}>

                            <td><img src={el.img} alt={el.name} height="50" /></td>
                            <td><Link to={`/product/${el.id}`}>{el.name}</Link></td>
                            <td>
                                <button onClick={() => dec(el.id, el.cnt)}>-</button>
                                <span style={{ padding: "0 10px" }}>{el.cnt}</span>
                                <button onClick={() => inc(el.id)}>+</button>
                            </td>
                            <td>{el.price * el.cnt}&nbsp;₽</td>
                            <td>{el.discount > 0 && `${el.discount}%`}</td>
                            <td>{el.discount > 0 && <>{setPrice(el).toFixed(2)}&nbsp;₽</>}</td>
                        </tr>)}

                    </tbody>
              
                </table>
            </div>

            <div className="basket__inside__total__desktop">
                <h2>Ваша корзина</h2>

                <div>
                    <div className="basket__inside__total__line">
                        <span>Товары ({summ_cnt})</span>
                        <span>{summ}&nbsp;₽</span>
                    </div>
                    {summ_minus_sale(summ, sale) > 0 && <>
                        <div className="basket__inside__total__line">
                            <span>Скидка</span>
                            <span style={{ color: "red" }}>-&nbsp;{summ_minus_sale(summ, sale).toFixed(2)}&nbsp;₽</span>
                        </div>
                    </>
                    }

                    <hr />

                    <div className="basket__inside__total__line">
                        <span>Общая стоимость</span>
                        <span>{sale.toFixed(2)}&nbsp;₽</span>
                    </div>

                </div>


                <button className="product__cart__btn" style={{ width: "100%" }}>Оформить заказ</button>

            </div>

            <div style={{ gridRowStart: "3", margin: "10px", alignItems: "center" }} className="product__delivery"><div className="product__delivery__garanty__ico"><TruckFront /></div><div className="product__delivery__garanty__text"><h3>Доставка по всему Миру!</h3><span>Доставка курьером —— от 399 ₽</span><br /><span>Доставка в пункт выдачи — от 199 ₽</span></div></div>



        </>}

        {basket.length > 0 && <>
            <div className="basket__inside__mobile">
                {basket.map(el => <BasketMobile key={el.id} {...el} img={el.img} />)}
                <button className="product__cart__btn" style={{ width: "100%", backgroundColor: "lightgrey" }} onClick={clearBasket} >Очистить корзину</button>
                <hr />

                <div className="basket__inside__total">
                    <h2>Ваша корзина</h2>

                    <div>
                        <div className="basket__inside__total__line">
                            <span>Товары ({summ_cnt})</span>
                            <span>{summ}&nbsp;₽</span>
                        </div>
                        {summ_minus_sale(summ, sale) > 0 && <>
                            <div className="basket__inside__total__line">
                                <span>Скидка</span>
                                <span style={{ color: "red" }}>-&nbsp;{summ_minus_sale(summ, sale).toFixed(2)}&nbsp;₽</span>
                            </div>
                        </>
                        }

                        <hr />

                        <div className="basket__inside__total__line">
                            <span>Общая стоимость</span>
                            <span>{sale.toFixed(2)}&nbsp;₽</span>
                        </div>

                    </div>


                    <button className="product__cart__btn" style={{ width: "100%" }}>Оформить заказ</button>

                </div>
            </div>
        </>}


    </>

}

export default Basket;