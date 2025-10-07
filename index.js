import { menuArray } from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const closeBtn = document.getElementById('close-btn')
const modal = document.getElementById('modal')
const checkOut = document.getElementById('checkout')
const checkOutForm = document.getElementById('checkout-form')
const completeOrderBtn = document.getElementById('complete-order')
const expModal = document.getElementById('exp')
const expCloseBtn = document.getElementById('rye-close-btn')
let orderItemArray = []
let discountPrice = 0
let stars = document.querySelectorAll(".rye-wrap i") //querySelectorAll returns a NodeList which is an Array-like structure allowing to use Array methods

document.addEventListener('click', function(e){
    if(e.target.dataset.button){
        getOrderItems(e.target.dataset.button)
    } else if(e.target.dataset.remove) {
        removeItems(e.target.dataset.remove)
    }
})

const rateYourExp = () => {
    stars.forEach((star, indx) => { //Iterates through each star
        star.addEventListener('click', () => { //Listens for clicks on each star
            stars.forEach((star, indxTwo) => { //Ternary activates on each star depending if the first iteration is greater than or equal to the second iteration
               indx >= indxTwo ? star.classList.add('active') : star.classList.remove('active')
            })
        })
    })
}

completeOrderBtn.addEventListener('click', () => {
    modal.classList.remove('hidden')
})

closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden')
})

expCloseBtn.addEventListener('click', () => {
    expModal.classList.add('hidden')
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
    }, 2000)

    setTimeout(() => {
        expModal.classList.toggle('hidden')

        rateYourExp()
    }, 3000)
})


const getTotalPrice = () => {
    const countItems = orderItemArray.reduce((newOrder, currentOrder) => {
        const foodName = currentOrder.name
        newOrder[foodName] = (newOrder[foodName] || 0) + 1
        return newOrder
    }, {})

    if(countItems.Pizza === countItems.Beer){
        discountPrice = 5 * Number(countItems.Pizza)
        document.getElementById('discount-message').textContent = `$${discountPrice} Discount Applied!`
    }
    else{
        discountPrice = 0
        document.getElementById('discount-message').textContent = ``
    }

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