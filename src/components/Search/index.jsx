import { useState, useEffect, useContext } from "react";
import Ctx from "../../context"

import "./style.css";

const Search = () => {
    const {setGoods} = useContext(Ctx);
    const { goods } = useContext(Ctx);
    const [text, setText] = useState("");
    const [quantity, setQuantity] = useState(goods.length)



useEffect(() => {
    if (text) {
        let result = goods.filter(el => new RegExp(text, "i").test(el.name));
        setGoods(result);
        setQuantity(result.length);
    }
    else {
        setGoods(goods);
        setQuantity(goods.length);
    }
},
[goods])

    const searchByText = (e) => {

        let val = e.target.value;
        setText(val);
  
        let result = goods.filter(el => new RegExp(val, "i").test(el.name));
        setGoods(result);
        setQuantity(result.length);

    }

    return (
        <div className="search-block">
            <input type="search" className="search__common" placeholder="Поиск по сайту" value={text} onChange={searchByText} />

            {/*<input type="search" className="search" placeholder="Поиск по сайту" value={text} onChange={()=> setText(e.target.value)} /> так тоже можно*/}
            <button /*onClick={click}*/>Тяфк</button>
            <hr />
            {/*<div>{text}, {n}, {count}</div>*/}
            <div>По вашему запросу «{text}» найден {quantity} подходящих товаров</div>
        </div>
    )
}

export default Search;