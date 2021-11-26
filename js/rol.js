//codigo para modal formulario crear
const openCrear = document.getElementById('abrirModalCrear');
const closeCrear = document.getElementById('cerrarModalCrear');
const modal_container = document.getElementById('modal_container');

openCrear.addEventListener('click', ()=>{
    modal_container.classList.add('show')
});

closeCrear.addEventListener('click', ()=>{
    modal_container.classList.remove('show')
});

//codigo para modal formulario eliminar
const modal_container_eliminar = document.getElementById('modal_container_eliminar');

function openEliminar(id){
  modal_container_eliminar.classList.add('show')

  this.idRol = id;
}

function closeEliminar(){
  modal_container_eliminar.classList.remove('show')
}
// --------------------------------------------------------------------------

// codigo para modal formulario Modificar
const modal_container_modificar = document.getElementById('modal_container_modificar');

function openModificar(id) {
  modal_container_modificar.classList.add('show')

  this.idRol = id;
}

function closeModificar(){
  modal_container_modificar.classList.remove('show')
}

//-----------------------------------------------------------------------------------------------------------------
const ulRoles = document.querySelector(".ul-roles");
const formularioCrear = document.querySelector("#formulario-crear");

token = "" + localStorage.getItem("token");
url = localStorage.getItem("urlApi");

var roles;
var idRol;

function GetIndex(){
    fetch(this.url + "Rol",{
        method:'GET',
        headers:{
            "content-type": "application/json",
            "Authorization": "Bearer " + this.token
        }
    })
        .then(res => res.json())
        .then(data => {
            this.roles = data;
            let html = "";

            this.roles.forEach(item => {
                const li = `
                <div class="card">
            <div class="card-image car-1"></div>
            <h2>${item.nombre}</h2>
            <p>Nombre: ${item.nombre}</p>
            <div class="botones">
                <button type="button" data-id="${item.id}" onclick="openEliminar(${item.id})">🗑 Eliminar</button>
                <button type="button" data-id="${item.id}" onclick="openModificar(${item.id})">🖉 Editar</button>
            </div>   
        </div>
                `;
                html += li;
            });

            ulRoles.innerHTML = html;
        })
}

//-----------------------------------------------------------------------------------------------------------------
formularioCrear.addEventListener('submit', (e)=>{//capturamos el evento
    e.preventDefault();//cancela el evento por defecto

    const nombre = document.querySelector('#crear-nombre').value;
    
    CrearRol(nombre)//mandamos a llamar al metodo
})

function CrearRol(nombre){
    const Rol = {
        nombre: nombre
    }

    fetch(this.url + "Rol", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(Rol), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + this.token
        }
      })
      .then(res => {
          console.log(res);
          if(res.status == 200){
            location.reload()
          }else if(res.status == 401){
            alert('No autorizado');
          }else{
              alert('Ocurrio un error');
              formularioCrear.reset();
          }
      });
}
//-----------------------------------------------------------------------------------------------------------------
formulariomodificar = document.querySelector("#formulario-modificar");

formulariomodificar.addEventListener('submit', (e)=>{//capturamos el evento
  e.preventDefault();//cancela el evento por defecto

  const id = this.idRol;
  const nombre = document.querySelector('#modificar-nombre').value;
  
   ModificarRol(id, nombre)//mandamos a llamar al metodo
})

function ModificarRol(id, nombre){
    const Rol = {
        id: id,
        nombre: nombre
    }

    fetch(this.url + "Rol/" + this.idRol,{
        method: 'PUT', // Indicamos el tipo de Peticion HTTP a realizar
        body: JSON.stringify(Rol), // convertimos a JSON el objeto Rol
        headers:{
          'Content-Type': 'application/json', //Especificamos el tipo de contenido a enviar en este caso un JSON
          "Authorization": "Bearer " + this.token //Se anexa la autenticacion Bearer token
        }
      }).then(res => {
        console.log(res);
        if(res.status == 200){
          location.reload()
        }else if(res.status == 401){
          alert('No autorizado');
        }else{
            alert('Ocurrio un error');
            formularioCrear.reset();
        }
    });
}
//-----------------------------------------------------------------------------------------------------------------

function EliminarRol(){
    fetch(this.url + "Rol/" + this.idRol,{
        method: 'DELETE', // Indicamos el tipo de Peticion HTTP a realizar
        headers:{
          'Content-Type': 'application/json', //Especificamos el tipo de contenido a enviar en este caso un JSON
          "Authorization": "Bearer " + this.token //Se anexa la autenticacion Bearer token
        }
      }).then(res => {
        console.log(res);
        if(res.status == 200){
          location.reload()
        }else if(res.status == 401){
          alert('No autorizado');
        }else{
            alert('Ocurrio un error');
            formularioCrear.reset();
        }
    });
}
// --------------------------------------------------------------------------------------------------------------------


