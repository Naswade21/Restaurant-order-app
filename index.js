import { menuArray } from '/data.js'

//object destructuring
const { name, ingredients, id, price, emoji } = menuArray

/* Render the menu-items
     <div class="menu-wrap">
                    <div class="menu-content">
                        <div class="menu-emoji">🍕<!-- Insert emoji --></div>
                        <div class="menu-desc">
                            <!-- Insert desc -->
                        </div>
                    </div>
                    <div class="addItem">
                        <button>+</button>
                    </div>
                 </div>
*/

const menu = document.getElementById('menu')
const checkOut = document.getElementById('checkout')

const getMenuHtml = () => {
    return menuArray.map((menu) => {
        return `<div class="menu-wrap">
                    <div class="menu-content">
                        <div class="menu-emoji">${menu.emoji}<!-- Insert emoji --></div>
                        <div class="menu-desc">
                        <p>${menu.name}</p>
                        <p>${menu.ingredients}</p>
                        <p>${menu.price}</p>
                            <!-- Insert desc -->
                        </div>
                    </div>
                    <div class="addItem">
                        <button id="${menu.id}">+</button>
                    </div>
                 </div>`
    }).join('')
}

const render = () => {
    return menu.innerHTML = getMenuHtml()
}

render()

//console.log(getMenuHtml())