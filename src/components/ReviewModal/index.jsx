import { useState } from "react";
import "./style.css";
import { useContext } from "react";
import Ctx from "../../context"

const ReviewModal = () => {

    const { setModalReviewActive } = useContext(Ctx);
    const { modalReviewActive } = useContext(Ctx);
    const { token } = useContext(Ctx);
    const { product } = useContext(Ctx);
    const { setProduct } = useContext(Ctx);

    const [reviewText, setReviewText] = useState("");
    const [reviewStars, setReviewStars] = useState("");

    const sendReview = async (e) => {
        e.preventDefault();
        let body = {
            text: reviewText,
            rating: reviewStars
        }
        let res = await fetch(`https://api.react-learning.ru/products/review/${product._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        let data = await res.json()
  
        setModalReviewActive(false);
        setProduct(data);  
    }





    return <div className="modal__review__wrapper" style={{ display: modalReviewActive ? "flex" : "none" }}>
        <div className="modal">
            <button className="close__btn" onClick={() => setModalReviewActive(false)}>Закрыть окно</button>
            <h3>Отзыв на товар </h3>
            <span>{product.name}</span>
            <hr/>

            <form onSubmit={sendReview}>
                <label>
                    Текст отзыва
                    <input type="text" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                </label>

                <label>
                    Оценка
                    <input type="number" min="1" max= "5" value={reviewStars} onChange={(e) => setReviewStars(e.target.value)} />
                </label>

                <button type="submit">Отправить</button>
            </form>
        </div>
    </div>
}

export default ReviewModal;