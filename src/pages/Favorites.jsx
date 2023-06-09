import Card from "../components/Card";
import Ctx from "../context"
import { useContext } from "react";


const Favorites = () => {
    const { setServerGoods } = useContext(Ctx); 
    const { goods } = useContext(Ctx);
    const { userId } = useContext(Ctx);
       
return <div className="container_old">
    {goods.filter(el => el.likes.includes(userId)).map( g => <Card {...g} key={g._id}
    setServerGoods={setServerGoods}
    img={g.pictures}
    />) }

</div>

}

export default Favorites;