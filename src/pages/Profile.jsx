import logout_ico from "../assets/icons/logout_ico.svg";
import { useNavigate } from "react-router";
import Ctx from "../context"
import { useContext, useEffect, useState } from "react";
import AddProductForm from "../components/AddProductForm";


const Profile = () => {
    const navigate = useNavigate();
    const { user } = useContext(Ctx);
    const { setUser } = useContext(Ctx);
    const { userId } = useContext(Ctx);
    const { token } = useContext(Ctx);
    const { setAddProductFormActive } = useContext(Ctx);

    const { setEditProductFormActive } = useContext(Ctx);


    const capitonStyle = {
        fontWeight: "bold",
    }
    const logOut = (e) => {
        e.preventDefault();
        setUser("");
        localStorage.removeItem("rockUser");
        localStorage.removeItem("rockToken");
        localStorage.removeItem("rockId");
        navigate("/");
    }
    const [userInfo, setUserInfo] = useState({});


    useEffect(() => {
        fetch(`https://api.react-learning.ru/users/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.err) {

                    setUserInfo(data);
                }
            })
    }, [token]);







    const addProductForm = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        setAddProductFormActive(true);
    }


    return (<>



        <section className="container__product">
            <h1 className="product__name">Личный кабинет</h1>

            <div className="product__synopsis"><span style={capitonStyle}>Добро пожаловать,
                <br />уважаемый {userInfo.name}!</span></div>



            <div className="product__picture">
                <img className="product__img" src={userInfo.avatar} alt={userInfo.name} />
            </div>


            <div>
                <div className="profile__user_role">
                    Роль: <span>{userInfo.about}</span>
                </div>
                <div className="profile__user_email">
                    Email: <span style={capitonStyle}>{userInfo.email}</span>
                </div>
                <div className="profile__user_group">
                    Группа: <span style={capitonStyle}>{userInfo.group}</span>
                </div>
            </div>

            <div><button className="product__cart__btn" style={{ width: "100%" }} onClick={addProductForm}>ДОБАВИТЬ ТОВАР</button></div>
            <div className="product__description">
                {<a href="" title="Выйти" className="profile__logout" onClick={logOut}><img src={logout_ico} className="profile__logout" alt="Выйти" />Выйти</a>}
            </div>

        </section>




        <AddProductForm />
    </>)
}

export default Profile;