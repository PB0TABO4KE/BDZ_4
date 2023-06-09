import { createContext } from "react";

export default createContext({
name: "Vasya",
theme: "Dark",
getRandom: (max = 11, min = 0) => {
    Math.floor(Math.random() * (max - min) + min)
},
goods: []

});