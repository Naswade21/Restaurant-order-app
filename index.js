import { menuArray } from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const menu = document.getElementById('menu')
const closeBtn = document.getElementById('close-btn')
const checkOut = document.getElementById('checkout')
const orderItems = document.getElementById('order-items')
let orderItemArray = []

document.addEventListener('click', function(e){
    if(e.target.dataset.button){
        getOrderItems(e.target.dataset.button)
    } else if(e.target.dataset.remove) {
        removeItems(e.target.dataset.remove)
    } else if(e.target.id = 'complete-order'){
        document.getElementById('modal').classList.toggle('hidden')
    }
})

closeBtn.addEventListener('click', () => {
    document.getElementById('modal').classList.toggle('hidden')
})

const getTotalPrice = () => {
    const prices = orderItemArray.map((order) => {
        return order.price
    })

    return prices.reduce((newOrder, firstOrder) => newOrder + firstOrder, 0)
}

const getOrderItems = (buttonId) => {

    const targetItem = menuArray.filter((order) => {
        return `${order.id}` === buttonId
    })[0]

    const copiedTargetItem = {...targetItem}

    copiedTargetItem.uuid = uuidv4()

    orderItemArray.push(copiedTargetItem)

    checkOut.classList.remove('hidden')

    if(orderItemArray.length >= 1){
        renderOrderItems()
        renderTotalPrice()
    }
}

const removeItems = (removeId) => {
   const deleteOrderItem = orderItemArray.filter((order) => {
    if(removeId === order.uuid){
        return false
    }

    return true
   })

    orderItemArray = deleteOrderItem

    renderOrderItems()
    renderTotalPrice()

    if(orderItemArray.length === 0){
         checkOut.classList.add('hidden')
    }
    
    console.log(orderItemArray)
  
}

const showOrderItems = () => {
    return orderItemArray.map((menu) => {
        return `
    <div class="checkout-wrap">
        <div class="menu-content">
            <div class="item-name">${menu.name}</div>
            <button class="remove-item" data-remove="${menu.uuid}">remove</button>
         </div>
        <div class="item-price">$${menu.price}</div>
    </div>`
    }).join('')
}

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

const renderTotalPrice = () => {
    document.getElementById('total-price').textContent = `$${getTotalPrice()}`
    document.getElementById('pay-total').textContent = `Pay $${getTotalPrice()}`
}

const renderOrderItems = () => {
    return orderItems.innerHTML = showOrderItems()
}

const render = () => {
    return menu.innerHTML = getMenuHtml()
}

render()