//document.onload = GetIndex();
const ulRoles = document.querySelector(".ul-roles");

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