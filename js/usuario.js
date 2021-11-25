const ulUsuarios = document.querySelector(".ul-usuarios");

token = "" + localStorage.getItem("token");
url = localStorage.getItem("urlApi");

var usuarios;//aqui se guardan los usuarios
var roles;

//Codigo a Ejecutar al Cargar la Pagina
function myOnLoad() {
    GetIndex();
    ObtenerRoles();
   }

function GetIndex(){
    fetch(this.url + "Usuario",{
        method:'GET',
        headers:{
            "content-type": "application/json",
            "Authorization": "Bearer " + this.token
        }
    })
        .then(res => res.json())
        .then(data => {
            this.usuarios = data;
            let html = "";

            this.usuarios.forEach(item => {
                const li = `
                <div class="card">
            <div class="card-image car-1"></div>
            <h2>${item.login}</h2>
            <p>idRol: ${item.idRol}</p>
            <p>Dui: ${item.dui}</p>
            <p>Nombre: ${item.nombre}</p>
            <p>Apellido: ${item.apellido}</p>
            <p>Numero: ${item.numero}</p>
            <p>Login: ${item.login}</p>
            <p>Estado: ${item.estado}</p>
            <p>Fecha de Registro: ${item.fechaRegistro}</p>
            <div class="botones">
                <button type="button" data-id="${item.id}">Ver</button>
                <button type="button" data-id="${item.id}">🗑 Eliminar</button>
                <button type="button" data-id="${item.id}">🖉 Editar</button>
            </div>   
        </div>
                `;
                html += li;
            });

            ulUsuarios.innerHTML = html;
        })
}

function ObtenerRoles(){
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
            
            var selectRoles = document.querySelector(".select-roles");

            this.roles.forEach(item => {
                
                console.log(item.nombre);               
            });
        })
}

//codigo para el modal de test
/* const open = document.getElementById('open');
const close = document.getElementById('close');
const modal_container = document.getElementById('modal_container');

open.addEventListener('click', ()=>{
    modal_container.classList.add('show')
});

close.addEventListener('click', ()=>{
    modal_container.classList.remove('show')
}); */

//codigo para modal formulario
const open = document.getElementById('abrirModalFormulario');
const close = document.getElementById('cerrarModalFormulario');
const modal_container = document.getElementById('modal_container');

open.addEventListener('click', ()=>{
    modal_container.classList.add('show')
});

close.addEventListener('click', ()=>{
    modal_container.classList.remove('show')
});