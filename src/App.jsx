import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";



import { Header, Footer, MobileMenu } from "./components/General";
import Modal from "./components/Modal";

import Ctx from "./context";
import Api from "./api"


import Draft from "./pages/Draft";
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Favorites from "./pages/Favorites"
import Basket from "./pages/Basket";



const App = () => {


    const [token, setToken] = useState(localStorage.getItem("rockToken"));
    const [user, setUser] = useState(localStorage.getItem("rockUser"));
    const [userId, setUserId] = useState(localStorage.getItem("rockId"));
    const [product, setProduct] = useState({});
    const [modalActive, setModalActive] = useState(false);


    const [modalReviewActive, setModalReviewActive] = useState(false);
    const [addProductFormActive, setAddProductFormActive] = useState(false);
    const [editProductFormActive, setEditProductFormActive] = useState(false);


    const [serverGoods, setServerGoods] = useState([]);
    const [goods, setGoods] = useState([]);
    const [serverNews, setServerNews] = useState([]);
    const [news, setNews] = useState([]);
    const [text, setText] = useState("");
    const [api, setApi] = useState(new Api(token));

    let bStore = localStorage.getItem("rockBasket");

    if (bStore && bStore[0] === "[" && bStore[bStore.length - 1] === "]") {
        bStore = JSON.parse(bStore);
    }
    else {
        bStore = [];
    }


    const [basket, setBasket] = useState(bStore);

    useEffect(() => {
        localStorage.setItem("rockBasket", JSON.stringify(basket));
    }, [basket])



    useEffect(() => {
        setApi(new Api(token))
    }, [token])


    useEffect(() => {
        if (api.token) {
            api.getProduct()
                .then(data => {
                    setServerGoods(data.products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
                })
        }
    }, [api.token])


    useEffect(() => {
        if (token) {
            fetch("https://newsapi.org/v2/everything?language=ru&q=dogs&q=собака&q=cats&apiKey=25c54a1ab073487a9d99403ec40b5274")
                .then(res => res.json())
                .then(data => {
                    setServerNews(data.articles);
                })
        }
    }, [token]);

    useEffect(() => {
        if (!goods.length) {
            setGoods(serverGoods);
        }
    }, [serverGoods]);

    useEffect(() => {
        if (!news.length) {
            setNews(serverNews);
        }
    }, [serverNews]);


    const [newsBlock, setNewsBlock] = useState([]);
    useEffect(() => {
        fetch("https://newsapi.org/v2/everything?q=животные&sources=lenta&apiKey=6c7fc5e6a754429ab47063a1b1a54774")
            .then(res => res.json())
            .then(data => {
                setNewsBlock(data.articles)
            })
    }, [])

    useEffect(() => {
        if (user) {
            setToken(localStorage.getItem("rockToken"));
            setUserId(localStorage.getItem("rockId"));
        }
        else {
            setToken("");
            setUserId("");
        }
    }, [user])

    return (
        <Ctx.Provider value={{
            goods,
            setGoods,
            serverGoods,
            setServerGoods,
            news,
            setServerNews,
            token,
            modalActive,
            setModalActive,
            user,
            setUser,
            userId,
            newsBlock,
            text,
            setText,
            modalReviewActive,
            setModalReviewActive,
            product,
            setProduct,
            addProductFormActive,
            setAddProductFormActive,
            editProductFormActive,
            setEditProductFormActive,
            api,
            basket,
            setBasket
        }}>
            <React.Fragment>
                <Header />
                <MobileMenu />
                <main>
                    <Routes>

                        {!user && <>
                            <Route path="/*" element={<Main />} />

                        </>}

                        {user && <>
                            <Route path="/" element={<Main />} />
                            {/*<Route path="/add" element={<Add />}/>*/}

                            <Route path="/catalog" element={<Catalog />} />

                            <Route path="/draft" element={<Draft />} />

                            <Route path="/profile" element={<Profile />} />

                            <Route path="/product/:id" element={<Product />} />

                            <Route path="/basket" element={<Basket />} />

                            <Route path="/favorites" element={<Favorites />} />
                        </>}

                    </Routes>



                </main>

                <Footer />
                <Modal />
            </React.Fragment>
        </Ctx.Provider>)
}

export default App;