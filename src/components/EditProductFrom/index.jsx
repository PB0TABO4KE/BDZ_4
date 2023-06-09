import { useState } from "react";
import "./style.css";
import { useContext, useEffect } from "react";
import Ctx from "../../context"
import { useNavigate } from "react-router";
import Product from "../../pages/Product";

const EditProductForm = (product) => {


    const { setEditProductFormActive } = useContext(Ctx);
    const { editProductFormActive } = useContext(Ctx);
    const { token } = useContext(Ctx);

    const { setProduct } = useContext(Ctx);



    const navigate = useNavigate();




    const [editProductName, setEditProductName] = useState(product?.name);
    const [editProductPrice, setEditProductPrice] = useState(product?.price);
    const [editProductDiscount, setEditProductDiscount] = useState(product?.discount);
    const [editProductStock, setEditProductStock] = useState(product?.stock);
    const [editProductAvailable, setEditProductAvailable] = useState(product?.available);
    const [editProductWight, setEditProductWight] = useState(product?.wight);
    const [editProductDescription, setEditProductDescription] = useState(product?.description);
    const [editProductPictures, setEditProductPictures] = useState(product?.pictures);
    const [editProductTags, setEditProductTags] = useState(product?.tags);
    const [editProductIsPublished, setEditProductIsPublished] = useState(product?.isPublished);


    const editProductModal = async (e) => {
        e.preventDefault();
        let body = {
            name: editProductName,
            price: editProductPrice,
            description: editProductDescription,
            pictures: editProductPictures,
            discount: editProductDiscount,
            stock: editProductStock,
            available: editProductAvailable,
            wight: editProductWight,
            tags: editProductTags,
            isPublished: editProductIsPublished
        }
        let res = await fetch(`https://api.react-learning.ru/products/${product?._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        let data = await res.json()

        setEditProductFormActive(false);

        fetch(`https://api.react-learning.ru/products/${product?._id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.err) {

                    setProduct(data);
                }
            })
        navigate(`/product/${product?._id}`)
    }




    return <div className="modal__review__wrapper" style={{ display: editProductFormActive ? "flex" : "none" }}>
        <div className="modal">
            <button className="close__btn" onClick={() => setEditProductFormActive(false)}>Закрыть окно</button>
            <h3>Редактирование товара</h3>
            <form >
                <label>
                    Название товара *
                    <input type="text" value={editProductName} onChange={(e) => setEditProductName(e.target.value)} />
                </label>

                <label>
                    Цена товара, руб *
                    <input type="text" value={editProductPrice} onChange={(e) => setEditProductPrice(e.target.value)} />
                </label>

                <label>
                    Описание товара *
                    <input type="text" value={editProductDescription} onChange={(e) => setEditProductDescription(e.target.value)} />
                </label>

                <label>
                    Ссылка на изображение товара
                    <input type="text" value={editProductPictures} onChange={(e) => setEditProductPictures(e.target.value)} />
                </label>
                <div  style={{
                        backgroundImage: `url(${editProductPictures})`,
                        backgroundSize: "cover",
                        height: "15rem",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}></div>

                <label>
                    Скидка на товар, %
                    <input type="text" value={editProductDiscount} onChange={(e) => setEditProductDiscount(e.target.value)} />
                </label>


                <label>
                    Остаток товара
                    <input type="text" value={editProductStock} onChange={(e) => setEditProductStock(e.target.value)} />
                </label>

                <label>
                    Доступность товара
                    <input type="text" value={editProductAvailable} onChange={(e) => setEditProductAvailable(e.target.value)} />
                </label>

                <label>
                    Количество товара
                    <input type="text" value={editProductWight} onChange={(e) => setEditProductWight(e.target.value)} />
                </label>

                <label>
                    Теги
                    <input type="text" value={editProductTags} onChange={(e) => setEditProductTags(e.target.value)} />
                </label>

                <label>
                    Публикация товара
                    <input type="text" value={editProductIsPublished} onChange={(e) => setEditProductIsPublished(e.target.value)} />
                </label>



                <button type="submit" onClick={editProductModal}>Отправить</button>
                </form>
        </div>
    </div>




}

export default EditProductForm;