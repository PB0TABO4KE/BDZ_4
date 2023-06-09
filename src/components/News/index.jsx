import "./style.css";
import Ctx from "../../context"
import { useContext, useEffect, useState } from "react";


const News = ({ description, title, url, urlToImage }) => {
    const { news } = useContext(Ctx);
    const [data, setData] = useState(news || [])

    useEffect(() => {

        if (data.lenght) {
            const id = setTimeout(() => {
                let updateArr = [...data];
                let firstNew = updateArr.shift();
                updateArr.push(firstNew);
                setData(updateArr)

            }, 2000)
            return () => clearTimeout(id);
        }

    }, [data])

    useEffect(() => {
        setData(news)
    }, news)

    return <>

        <a href={url} className="news__card" >
            <h3 className="news__name">{title}</h3>
            <img src={urlToImage} alt="Картинка" className="news__img" />

            <span className="news__description">{description}</span>
            <button className="news__btn">Читать источник</button>

        </a>

    </>
}


export default News