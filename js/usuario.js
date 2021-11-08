const ulUsuarios = document.querySelector(".ul-usuarios");

token = "" + localStorage.getItem("token");
url = localStorage.getItem("urlApi");

var usuarios;

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