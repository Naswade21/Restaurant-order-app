import { menuArray } from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const closeBtn = document.getElementById('close-btn')
const modal = document.getElementById('modal')
const checkOut = document.getElementById('checkout')
const checkOutForm = document.getElementById('checkout-form')
const completeOrderBtn = document.getElementById('complete-order')
let orderItemArray = []
let discountPrice = 5

document.addEventListener('click', function(e){
    if(e.target.dataset.button){
        getOrderItems(e.target.dataset.button)
    } else if(e.target.dataset.remove) {
        removeItems(e.target.dataset.remove)
    } 
})

completeOrderBtn.addEventListener('click', () => {
    modal.classList.remove('hidden')
})

closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden')
})

checkOutForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const completeOrder = document.getElementById('order-completion')

    const payForm = new FormData(checkOutForm)
    const name = payForm.get('fullName')

    modal.classList.add('hidden')

    checkOut.classList.add('hidden')

    let customerMessage = `<div class="order-done">Thanks, ${name}! Your order is on its way!</div>`

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

    return prices.reduce((newOrder, firstOrder) => newOrder + firstOrder, 0) - discountPrice
}

const getOrderItems = (buttonId) => {

    const targetItem = menuArray.filter((order) => {
        return `${order.id}` === buttonId
    })[0]

    const copiedTargetItem = {...targetItem}

    copiedTargetItem.uuid = uuidv4()

    orderItemArray.push(copiedTargetItem)

    checkOut.classList.remove('hidden')

    console.log(orderItemArray)

    if(orderItemArray.length >= 1){
        renderOrderItems()
        renderTotalPrice()
    }
}

/*
const discountTheOrder = (arr) => {
    const discountItems = arr.map((order) => {
        return order.name
    })

    const copiedDiscountItems = [...discountItems]

    const countItems = copiedDiscountItems.reduce((newOrder, currentOrder) => {
        newOrder[currentOrder] = (newOrder[currentOrder] || 0) + 1
        return newOrder
    }, {})

    console.log(countItems)

    if(countItems.Pizza === countItems.Beer){
        return discountPrice = Number(countItems.Pizza) * 5
    }
}
    */

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
    const totalPrice = document.getElementById('total-price')

    const totalPay = document.getElementById('pay-total')

    totalPrice.textContent = `$${getTotalPrice()}`

    totalPay.textContent = `Pay $${getTotalPrice()}`
}

const renderOrderItems = () => {
    const orderItems = document.getElementById('order-items')

    return orderItems.innerHTML = showOrderItems()
}

const render = () => {
    const menu = document.getElementById('menu')

    return menu.innerHTML = getMenuHtml()
}

render()