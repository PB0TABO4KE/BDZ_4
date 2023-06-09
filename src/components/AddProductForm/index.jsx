import { useState } from "react";
import "./style.css";
import { useContext } from "react";
import Ctx from "../../context"
import { useNavigate } from "react-router";

const AddProductForm = () => {


    const {
        setAddProductFormActive,
        addProductFormActive,
        token,
        setServerGoods,
        setGoods
    } = useContext(Ctx);




    const navigate = useNavigate();

    const [addProductName, setAddProductName] = useState("");
    const [addProductPrice, setAddProductPrice] = useState(69);
    const [addProductDiscount, setAddProductDiscount] = useState(0);
    const [addProductStock, setAddProductStock] = useState(1);
    const [addProductAvailable, setAddProductAvailable] = useState(true);
    const [addProductWight, setAddProductWight] = useState("");
    const [addProductDescription, setAddProductDescription] = useState("");
    const [addProductPictures, setAddProductPictures] = useState("https://react-learning.ru/image-compressed/default-image.jpg");
    const [addProductTags, setAddProductTags] = useState("");
    const [addProductIsPublished, setAddProductIsPublished] = useState(true);





    const addProduct = async (e) => {
        e.preventDefault();
        let body = {
            name: addProductName,
            price: addProductPrice,
            description: addProductDescription,
            pictures: addProductPictures,
            available: addProductAvailable,
            stock: addProductStock,
            wight: addProductWight,
            discount: addProductDiscount,
            isPublished: addProductIsPublished
        }
        let res = await fetch(`https://api.react-learning.ru/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        let data = await res.json()

        setAddProductFormActive(false);
        if (!data.err && !data.error) {
            setAddProductName("");
            setAddProductPrice(69);
            setAddProductDiscount(0);
            setAddProductStock(1);
            setAddProductAvailable(true);
            setAddProductWight("");
            setAddProductDescription("");
            setAddProductPictures("https://react-learning.ru/image-compressed/default-image.jpg");
            setAddProductTags("");
            setAddProductIsPublished(true);
            fetch("https://api.react-learning.ru/products", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    
                    setServerGoods(data.products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
                    setGoods(data.products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
                
                })
            navigate(`/product/${data._id}`)
        }
    }




    return <div className="modal__review__wrapper" style={{ display: addProductFormActive ? "flex" : "none" }}>
        <div className="modal">
            <button className="close__btn" onClick={() => setAddProductFormActive(false)}>Закрыть окно</button>
            <h3>Добавить товар</h3>
            <form>
                <label>
                    Название товара *
                    <input type="text" value={addProductName} onChange={(e) => setAddProductName(e.target.value)} />
                </label>

                <label>
                    Цена товара, руб *
                    <input type="text" value={addProductPrice} onChange={(e) => setAddProductPrice(e.target.value)} />
                </label>

                <label>
                    Скидка на товар, %
                    <input type="text" value={addProductDiscount} onChange={(e) => setAddProductDiscount(e.target.value)} />
                </label>

                <label>
                    Описание товара *
                    <input type="text" value={addProductDescription} onChange={(e) => setAddProductDescription(e.target.value)} />
                </label>

                <label>
                    Ссылка на изображение товара
                    <input type="text" value={addProductPictures} onChange={(e) => setAddProductPictures(e.target.value)} />
                </label>

                <div style={{
                    backgroundImage: `url(${addProductPictures})`,
                    backgroundSize: "cover",
                    height: "15rem",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}></div>



                <label>
                    Вес, г / Количество, шт
                    <input type="text" value={addProductWight} onChange={(e) => setAddProductWight(e.target.value)} />
                </label>

                <label>
                    Остаток товара, шт
                    <input type="text" value={addProductStock} onChange={(e) => setAddProductStock(e.target.value)} />
                </label>

                <div>
                    Доступность
                    <input type="checkbox" checked value={addProductAvailable} onChange={(e) => setAddProductAvailable(e.target.value)} />
                </div>

                <div>
                    Опубликовать товар
                    <input type="checkbox" checked value={addProductIsPublished} onChange={(e) => setAddProductIsPublished(e.target.value)} />
                </div>


                <button type="submit" onClick={addProduct}>Отправить</button>
            </form>
        </div>
    </div>

}

export default AddProductForm;