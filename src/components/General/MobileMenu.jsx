import { HouseFill, CardList, Heart, Bag, PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import login_ico from "../../assets/icons/login_ico.svg";
import { useContext, useEffect, useState } from "react";
import Ctx from "../../context"






const MobileMenu = () => {

    const {
        user,
        setModalActive,
        basket,
        serverGoods,
        userId
    } = useContext(Ctx);


    const navigate = useNavigate();

    const [cartCnt, setCartCnt] = useState(0);
    const [likeCnt, setLikeCnt] = useState(0);
    const logIn = (e) => {
        e.preventDefault();
        setModalActive(true);
        navigate("/profile")
    }

    useEffect(() => {
        let cnt = 0;
        for (let i = 0; i < basket.length; i++) {
            cnt += basket[i].cnt
        }
        setCartCnt(cnt);
    }, [basket])

    
   
    useEffect(() => {
        setLikeCnt(serverGoods.filter(el => el.likes.includes(userId)).length) }
        , [serverGoods]);

    return (



        <nav className="mobile__menu">
            {user && <>
                <Link to="/" title="Главная"><div className="mobile__menu__item"><HouseFill /></div><div className="mobile__menu__item"><span>Главная</span></div></Link>
                <Link to="/catalog" title="Каталог"><div className="mobile__menu__item"><span className="mobile__menu__badge">{serverGoods.length}</span><CardList /></div><div className="mobile__menu__item"><span>Каталог</span></div></Link>
                <Link to="/basket" title="Корзина"><div className="mobile__menu__item"><span className="mobile__menu__badge">{cartCnt}</span><Bag /></div><div className="mobile__menu__item"><h4>Корзина</h4></div></Link>
                <Link to="/favorites" title="Избранное"><div className="mobile__menu__item"><span className="mobile__menu__badge">{likeCnt}</span><Heart /></div><div className="mobile__menu__item"><h4>Избранное</h4></div></Link>
                <Link to="/profile" title="Профиль"><div className="mobile__menu__item"><PersonCircle /></div><div className="mobile__menu__item"><h4>Профиль</h4></div></Link>


                
            </>}
            {!user && <Link to="" title="Войти" className="mobile__menu__item mobile__menu__login" onClick={logIn}><img src={login_ico} className="mobile__menu__item" alt="Войти" />Войти</Link>}

        </nav>
    )
}







export default MobileMenu;