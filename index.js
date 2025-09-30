import { menuArray } from '/data.js'

//object destructuring
const { name, ingredients, id, price, emoji } = menuArray

const menu = document.getElementById('menu')
const checkOut = document.getElementById('checkout')

const getMenuHtml = () => {
    return menuArray.map((menu) => {
        return ``
    })
}

console.log(getMenuHtml())