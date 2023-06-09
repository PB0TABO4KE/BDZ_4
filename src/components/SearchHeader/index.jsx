import "./style.css";
import { useContext } from "react";
import Ctx from "../../context"


const SearchHeader = () => {
    const { setGoods } = useContext(Ctx);
    const { user } = useContext(Ctx);
    const { serverGoods } = useContext(Ctx);
    const { text, setText } = useContext(Ctx);


    const searchByText = (e) => {
        let val = e.target.value;
        setText(val);
        let result = serverGoods.filter(el => new RegExp(val, "i").test(el.name));
        setGoods(result);

    }

    return (<>
        {user && <>
            <div className="search-header">
                <input type="search" placeholder="Поиск" value={text} onChange={searchByText} />
            </div>
        </>}

    </>)
}

export default SearchHeader;