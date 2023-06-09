import {useState, useEffect, useContext} from "react";
import Ctx from "../../context";
import "./style.css";
import Carousel from "better-react-carousel";


const NewsBlock = () => {
    const {newsBlock} = useContext(Ctx);
    const [data, setData] = useState(newsBlock || [])

    useEffect(() => {
            const id = setTimeout(() => {
                let updateArr = [...data];
                let firstNew = updateArr.shift();
                updateArr.push(firstNew);
                setData(updateArr);
            }, 4000)
            return () => clearTimeout(id);
    }, [data])

    useEffect(() => {
        setData(newsBlock)
    }, [newsBlock])

    return (<> <div className="news-container">
        <h2>Новости Lenta.ru</h2>
        <div className="news-block">
            {data.slice(0, 4).map((el,i) => <img
                key={i}
                src={el.urlToImage}
                alt={el.title}
                
            />)}
        </div>
    </div>
    <div>
    <h2>Новости Lenta.ru 2</h2>
    </div>


    </>)
}

export default NewsBlock;