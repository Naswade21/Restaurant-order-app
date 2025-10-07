import { menuArray } from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const menu = document.getElementById('menu')
const closeBtn = document.getElementById('close-btn')
const checkOut = document.getElementById('checkout')
const checkOutForm = document.getElementById('checkout-form')
const orderItems = document.getElementById('order-items')
const completeOrderBtn = document.getElementById('complete-order')
const totalPrice = document.getElementById('total-price')
const totalPay = document.getElementById('pay-total')
const completeOrder = document.getElementById('order-completion')
let orderItemArray = []

document.addEventListener('click', function(e){
    if(e.target.dataset.button){
        getOrderItems(e.target.dataset.button)
    } else if(e.target.dataset.remove) {
        removeItems(e.target.dataset.remove)
    } 
})

completeOrderBtn.addEventListener('click', () => {
    document.getElementById('modal').classList.remove('hidden')
})

closeBtn.addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden')
})

checkOutForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const payForm = new FormData(checkOutForm)
    const name = payForm.get('fullName')

    document.getElementById('modal').classList.add('hidden')

    let customerMessage = `<div class="order-done">Thanks, ${name}! Your order is on its way!</div>`

    checkOut.classList.add('hidden')

    completeOrder.innerHTML = customerMessage

    completeOrder.classList.toggle('hidden')

    setTimeout(() => {
        orderItemArray = []
        completeOrder.classList.toggle('hidden')
    }, 3000)
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
    totalPrice.textContent = `$${getTotalPrice()}`
    totalPay.textContent = `Pay $${getTotalPrice()}`
}

const renderOrderItems = () => {
    return orderItems.innerHTML = showOrderItems()
}

const render = () => {
    return menu.innerHTML = getMenuHtml()
}

render()