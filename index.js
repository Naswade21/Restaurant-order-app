import { menuArray } from '/data.js'

//object destructuring
const { name, ingredients, id, price, emoji } = menuArray

const menu = document.getElementById('menu')
const checkOut = document.getElementById('checkout')

document.addEventListener('click', (e) => {
    return e.target.dataset.button ? getButtonTag(e.target.dataset.button) : console.log('What the?')
})

const getMenuHtml = () => {
    return menuArray.map((menu) => {
        return `<div class="menu-wrap">
                    <div class="menu-content">
                        <div class="menu-emoji">${menu.emoji}</div>
                        <div class="menu-desc">
                        <p class="item-name">${menu.name}</p>
                        <p class="item-ing">${menu.ingredients.join(', ')}</p>
                        <p class = "item-price">$${menu.price}</p>
                        </div>
                    </div>
                    <div class="addItem">
                        <button data-button="${menu.id}">+</button>
                    </div>
                 </div>`
    }).join('')
}

function getButtonTag(buttonId){
    const targetButton = menuArray.filter(function(food){
        return food.id === buttonId
    })
    console.log(targetButton)
}



const render = () => {
    return menu.innerHTML = getMenuHtml()
}

render()

//console.log(getMenuHtml())