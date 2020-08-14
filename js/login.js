//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    const backUrl = 'http://localhost:8080';
    
    const loginForm = document.getElementById('loginForm');
    
    loginForm.onsubmit = (e) => {
        e.preventDefault()
        const user = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;
        getJSONData('/auth', {
            user,
            password
        });
    };
    
    
    const getJSONData = function(endpoint, userData){
        let url = `${backUrl}${endpoint}`;
        
        fetch(url, {
          method: 'POST', 
          body: JSON.stringify(userData),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => {
            alert('Usuario y/o contraseña incorrecta')
        })
        .then(response => {
            console.log('Success:', response)
            localStorage.setItem('token', response.token);
            window.location.href = '/';
        });
    }
    
    });