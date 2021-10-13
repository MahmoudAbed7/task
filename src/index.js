const Todo = require('./services/todo')
todos = []
Todo.list().then(response => {
    window.todos = response.data
    window.renderTodos(response.data)
})
htmlToElement = (html) => {
    let templete = document.createElement('template')
    html = html.trim()
    templete.innerHTML = html
    return templete.content.firstChild
}
window.renderTodos = (data) => {
    for (let i of data) {
        var trParentElement = document.createElement('tr')
        var imgElement = window.htmlToElement(`<td><img src="${i.image}" style="width:150px"></td>`)
        trParentElement.appendChild(imgElement)

        var detailsParentElement = document.createElement('td')
        var detailsELement = window.htmlToElement(`<div class="col">
        <h3>${i.title}</h3>
        <p>${i.description}</p>
        <div class="row"><div class=col><h4 style="color:green">${i.price}$</h4></div></div>
        </div>`)
        detailsParentElement.appendChild(detailsELement)
        trParentElement.appendChild(detailsParentElement)

        var buttonParentEl = window.htmlToElement(`<div class="col"></div>`)
        var buttonElement = window.htmlToElement(`<button type="submit" class="btn btn-outline-primary btn-sm">Add To Cart</button>`)
        buttonElement.addEventListener('click', () => addCart(i))
        buttonParentEl.appendChild(buttonElement)
        trParentElement.appendChild(buttonParentEl)

        document.getElementById('todosList').appendChild(trParentElement)


    }
}
window.addCart = (item) => {
    const { title, price } = item
    data = {
        title,
        price
    }
    Todo.create(data).then(response => {
        var parentTr = document.createElement('tr')
        var titleElement = window.htmlToElement(`<td id="title">${response.data.title}</td>`)
        var priceElement = window.htmlToElement(`<td id="price">${response.data.price}</td>`)
        var btnElement = window.htmlToElement(`<td><button type="submit" class="btn btn-danger btn-sm ms-3">x</button></td>`)
        btnElement.addEventListener('click', () => deleteItem())
        parentTr.appendChild(titleElement)
        parentTr.appendChild(priceElement)
        priceElement.appendChild(btnElement)
        document.getElementById('#cart').appendChild(parentTr)

    })
}
window.deleteItem = () => {

    
      var title=document.getElementById('title')
      title.remove()
      var price=document.getElementById('price')
      price.remove()
}

