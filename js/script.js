const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}



document.addEventListener('DOMContentLoaded',() => {
    fetchData()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        infoCarrito()
    }
})

cards.addEventListener('click', e =>{
    addCarrito(e)
})

items.addEventListener('click', e => { 
    btnAumentarDisminuir(e) 

})


const fetchData = async () =>{
    try{
        const res = await fetch('productos.json')
        const data = await res.json()
        infoCard(data)
    } catch (error){
        console.log(error)
    }
}

const infoCard = data => {
    data.forEach(producto => {
        templateCard.querySelector('h4').textContent = producto.nombre
        templateCard.querySelector('h5').textContent =producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.foto)
        templateCard.querySelector('.btn-id').dataset.id =producto.id
        const clone = templateCard.cloneNode(true)
         fragment.appendChild(clone)
    });
    
    cards.appendChild(fragment) 

}
// Evento del click

const addCarrito = e => {

    if(e.target.classList.contains('btn-id')){
        setCarrito(e.target.parentElement) 
            swal({
            title: "Se añadio al carrito",
            icon: "success",
          });
     }      
    e.stopPropagation()
}

// Campura de elementos
const setCarrito = objeto => {
    
    const producto ={
        id: objeto.querySelector('.btn-id').dataset.id,
        nombre: objeto.querySelector('h4').textContent,
        precio: objeto.querySelector('h5').textContent,
        cantidad: 1
        
    }
    

    // Aumento de cantidad del producto
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto} 
    infoCarrito()

}

const infoCarrito =() =>{
    
    items.innerHTML = ''
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id,
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre,
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent =producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    infoFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const infoFooter = () => {

    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0 ){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return
    }

    const totalCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const precioTotal = Object.values(carrito).reduce ((acc, {cantidad, precio}) => acc + cantidad * precio,0)
    
    templateFooter.querySelectorAll('td')[0].textContent = totalCantidad,
    templateFooter.querySelector('span').textContent = precioTotal

    const clone =templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)
   const vaciarCarrito = document.getElementById('vaciar-carrito')
   vaciarCarrito.addEventListener('click', ()=>{
    swal ( " Has vaciado el carrito " ) ;
        carrito = {}
       infoCarrito()

   }) 
}

const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        swal({
            title: "Se añadio al carrito",
            text: producto.nombre,
            icon: "success",
          });
        infoCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
            swal({
                title: "Ha sido eliminado ",
                text: producto.nombre,
                icon: "success",
              });
        } else {
            carrito[e.target.dataset.id] = {...producto}
            swal({
                title: "Ha sido eliminado ",
                text: producto.nombre,
                icon: "success",
              });
              
        }
        infoCarrito()
    }
    e.stopPropagation()
}
