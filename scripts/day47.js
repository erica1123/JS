// #47-1 XHR
const url = 'https://hexschool-tutorial.herokuapp.com/api/signup'
function postAjax (mail, psw){
    const xhr = new XMLHttpRequest()
    let data = `email=${mail}&password=${psw}`
    let msg = getElemt('.xhr .form')
    xhr.open('post', url) 
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
    xhr.send(data)
    xhr.onload = () => {
        let str = JSON.parse(xhr.responseText)
        if (str.success == true) {
            msg.innerHTML += `<div class="alert alert-info">${str.message}</div>`
        } else {
            msg.innerHTML += `<div class="alert alert-danger">${str.message}</div>`
        }
    }
}

getElemt('#singup1').addEventListener('click', () => {
    let mail = getElemt('#email_xhr').value
    let psw = getElemt('#password_xhr').value
    postAjax(mail, psw)
})

// #47-2 Fetch
function fetchAjax (mail, psw){
    let msg = getElemt('.fetch .form')
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify({
            email: mail,
            password: psw
        })
    }).then( reponse => {
        return reponse.json()
    }).then( res => {
        if( res.success ) {
            msg.innerHTML += `<div class="alert alert-info">${res.message}</div>`
        } else {
            msg.innerHTML += `<div class="alert alert-danger">${res.message}</div>`
        }
    }).catch( error => {
        console.log(error)
    })
}

getElemt('#singup2').addEventListener('click', () => {
    let mail = getElemt('#email_fetch').value
    let psw = getElemt('#password_fetch').value
    fetchAjax(mail, psw)
})

// #47-3 Axios
function axiosAjax (mail, psw){
    let msg = getElemt('.axios .form')
    let data = {
        email: mail,
        password: psw
    }
    axios.post(url, data).then( res => {
        if( res.data.success ) {
            msg.innerHTML += `<div class="alert alert-info">${res.data.message}</div>`
        } else {
            msg.innerHTML += `<div class="alert alert-danger">${res.data.message}</div>`
        }
    }).catch( error => {
        console.log(error)
    })
}
getElemt('#singup3').addEventListener('click', () => {
    let mail = getElemt('#email_axios').value
    let psw = getElemt('#password_axios').value
    axiosAjax(mail, psw)
})