//document.onload = GetIndex();
const ulRoles = document.querySelector(".ul-roles");

token = "" + localStorage.getItem("token");
url = localStorage.getItem("urlApi");

var roles;

function GetIndex(){
    console.log(token)
    console.log(url)

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
            console.log(this.roles);

            this.roles.forEach(item => {
                console.log(item)
                const li = `
                <li>
                <p>${item.nombre}</p>
                <button type="button" data-id="${item.id}">🗑 Eliminar</button>
                <button type="button" data-id="${item.id}">🖉 Editar</button>
              </li>
                `;
                html += li;
            });

            ulRoles.innerHTML = html;
        })
}