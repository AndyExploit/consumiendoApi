//codigo para modal formulario crear
const open = document.getElementById('abrirModalCrear');
const close = document.getElementById('cerrarModalCrear');
const modal_container = document.getElementById('modal_container');

open.addEventListener('click', ()=>{
    modal_container.classList.add('show')
});

close.addEventListener('click', ()=>{
    modal_container.classList.remove('show')
});

//-----------------------------------------------------------------------------------------------------------------
const ulRoles = document.querySelector(".ul-roles");
const formularioCrear = document.querySelector("#formulario-crear");

token = "" + localStorage.getItem("token");
url = localStorage.getItem("urlApi");

var roles;

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
                <button type="button" data-id="${item.id}">Ver</button>
                <button type="button" data-id="${item.id}">🗑 Eliminar</button>
                <button type="button" data-id="${item.id}">🖉 Editar</button>
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

function ModificarRol(id, nombre){
    const Rol = {
        id: id,
        nombre: nombre
    }

    fetch(this.rul + "Rol/" + id,{
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
function EliminarRol(id, nombre){
    const Rol = {
        id: id
    }

    fetch(this.url + "Rol/" + id,{
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


