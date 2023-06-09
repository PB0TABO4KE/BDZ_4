import Logo from "./Logo";
import telegram from "../../assets/icons/telegram.png";
import insta from "../../assets/icons/insta.png";
import whatsapp from "../../assets/icons/whatsapp.png";
import viber from "../../assets/icons/viber.png";
import vk from "../../assets/icons/vk.png";
import { Link } from "react-router-dom";

const Footer = () => {
    return <footer>
        <div className="footer__cell">
        <div className="footer__logo"><Logo /></div>
            <div className="footer__logo">©️{new Date().getFullYear()}</div>
        </div>
        <div className="footer__cell footer__menu">
            <Link to="/catalog">Каталог</Link>
            <Link to="/draft">Акции (Черновик)</Link>
            <Link to="/">Новости</Link>
            <Link to="/">Отзывы</Link>
        </div>
        <div className="footer__cell footer__menu">
            <Link to="/">Оплата и доставка</Link>
            <Link to="/">Часто спрашивают</Link>
            <Link to="/">Обратная связь</Link>
            <Link to="/">Контакты</Link>
        </div>
        <div className="footer__cell footer__contacts">
            <div className="footer__cell footer__h">Мы на связи</div>
            <div className="footer__cell footer__phone"> <a href="tel:+7999000000">8 (999) 00-00-00</a></div>
            <div className="footer__cell footer__mail"><a href="mailto:dogfood@gmail.com">dogfood@gmail.com</a></div>
            <div className="footer-contacts__messagener">
                <a href="https://telegram.org/" target="_blank" rel="noreferrer"><img src={telegram} alt="telegram" /></a>
                <a href="https://whatsapp.com/" target="_blank" rel="noreferrer"><img src={whatsapp} alt="whatsapp" /></a>
                <a href="https://viber.com/" target="_blank" rel="noreferrer"><img src={viber} alt="viber" /></a>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><img src={insta} alt="insta" /></a>
                <a href="https://vk.com/" target="_blank" rel="noreferrer"><img src={vk} alt="vk" /></a>
            </div>
            <div className="footer__info">© «Интернет-магазин натуральных лакомств для собак HorDog.ru»</div>
        </div>

    </footer>
}

export default Footer;