import { menuArray } from '/data.js'

const menu = document.getElementById('menu')
const checkOut = document.getElementById('checkout')
const closeBtn = document.getElementById('close-btn')
let orderItems = []

document.addEventListener('click', function(e){
    if(e.target.dataset.button){
        getOrderItems(e.target.dataset.button)
    } 
})

const getOrderItems = (buttonId) => {
    const targetItem = menuArray.filter((order) => {
        return `${order.id}` === buttonId
    })[0]

    orderItems.push(targetItem)

    orderItems.length >= 1 ? console.log('Show my order bro!') : console.log('You gonna order?')

    console.log(orderItems)
}

const showOrderItems = () => {
    return orderItems.map((menu) => {
        return `
    <div class="checkout-wrap">
        <div class="menu-content">
            <div class="item-name">${menu.name}</div>
            <button class="remove-item" id="remove-item">remove</button>
         </div>
        <div class="item-price">$${menu.price}</div>
    </div>`
    })
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