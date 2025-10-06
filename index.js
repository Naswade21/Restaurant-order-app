import { menuArray } from '/data.js'

const menu = document.getElementById('menu')
const closeBtn = document.getElementById('close-btn')
const checkOut = document.getElementById('checkout')
const orderItems = document.getElementById('order-items')
let orderItemArray = []

document.addEventListener('click', function(e){
    if(e.target.dataset.button){
        getOrderItems(e.target.dataset.button)
    } 
})

const getOrderItems = (buttonId) => {
    const targetItem = menuArray.filter((order) => {
        return `${order.id}` === buttonId
    })[0]

    orderItemArray.push(targetItem)

    checkOut.classList.remove('hidden')

    if(orderItemArray.length >= 1){
        orderItems.innerHTML = showOrderItems()
    }

    console.log(orderItemArray)
}

const showOrderItems = () => {
    return orderItemArray.map((menu) => {
        return `
    <div class="checkout-wrap">
        <div class="menu-content">
            <div class="item-name">${menu.name}</div>
            <button class="remove-item" id="remove-item">remove</button>
         </div>
        <div class="item-price">$${menu.price}</div>
    </div>`
    }).join('')
}


/*
const renderOrderItem = (buttonId) => {
    const targetItem = menuArray.filter((food) => `${food.id}` === buttonId)

    checkOut.innerHTML = targetItem.map((menu) => `
    <div class="checkout-wrap">
    <div class="menu-content">
        <div class="item-name">${menu.name}</div>
        <button class="remove-item" id="remove-item">remove</button>
    </div>
    <div class="item-price">$${menu.price}</div>
    </div>
    `)
}
    */

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

const render = () => {
    return menu.innerHTML = getMenuHtml()
}

render()