import { useState, useEffect, useContext } from "react";

import Card from "../components/Card";

import Pagination from "../components/Pagination";

import usePagination from "../hooks/usePagination";

import Ctx from "../context"

const Catalog = () => {
    const { goods } = useContext(Ctx);
    const { text } = useContext(Ctx);
    const paginate = usePagination(goods, 40)
    const { setServerGoods } = useContext(Ctx);
    const [sort, setSort] = useState(null);

  

    useEffect(() => {
        paginate.step(1)
    }, [text])

    const sortHandler = (vector) => {
        if (vector === sort) {
            setSort(null)
            setServerGoods(old => old.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()))
        }
        else {
            setSort(vector);
            goods.sort((a, b) => {
                return vector === "up" ? (a.price - b.price) : (b.price - a.price)
            })
        }
    }
    return (<div className="container_old">
        <div className="pagination__catalog"><Pagination hk={paginate} /></div>
        <div className="filter__catalog">

  
            <button style={{ background: sort === "up" ? "orange" : "rgb(239, 239, 239)" }} onClick={() => sortHandler("up")}>По возрастанию цены</button>
            <button style={{ background: sort === "down" ? "orange" : "rgb(239, 239, 239)" }} onClick={() => sortHandler("down")}>По убыванию цены</button>
        

        </div>
        {paginate.setDataPerPage().map(g => <Card key={g._id} {...g} img={g.pictures} setServerGoods={setServerGoods} />)}
    </div>
    )
}

export default Catalog;