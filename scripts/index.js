
const usuariosRegistrados = []

//==========================================/* CLASES */=========================================================//


class User {
    constructor(nombre,edad){
        this.nombre = nombre
        this.edad = edad
        this.saldo
        this.cuenta    
    }
} 

//===================================================================================================//



let imprimir = document.getElementById('boxAlert')
let boxInfo = document.createElement('div')
boxInfo.className = ('info')


//============================================/* Crear Cuenta */=======================================================//

let formCrearCuenta = document.getElementById('form-cuenta')

formCrearCuenta.addEventListener('submit', (e) => {
    let nombre = document.getElementById('nombre').value.toLowerCase().trim()
    let edad = document.getElementById('edad').value
    edad = parseInt(edad,10)
    let montoApertura = document.getElementById('montoApertura').value
    montoApertura = parseInt(montoApertura,10)
    
    e.preventDefault()
    crearCuenta(nombre,edad,montoApertura)
    imprimir.appendChild(boxInfo)

}) 

//============================================/* Realizar Transferencias */=======================================================//


let formTransferir = document.getElementById('form-transferir')

formTransferir.addEventListener('submit', (e) => {
    let emisor = document.getElementById('emisor').value.toLowerCase().trim()
    let receptor = document.getElementById('receptor').value.toLowerCase().trim()
    let cuenta = document.getElementById('numeroCuenta').value.trim()
    cuenta = parseInt(cuenta,10)
    let monto = document.getElementById('montoTransferir').value.trim()
    monto = parseInt(monto,10)
    
    e.preventDefault()

   transferir(emisor,receptor,cuenta,monto) 
    
    imprimir.appendChild(boxInfo)

})




//==========================================/* Depositar */=========================================================//

let formDeposito = document.getElementById('form-deposito')

formDeposito.addEventListener('submit', (e) => {
    let nombre = document.getElementById('nombreUsuario').value.toLowerCase().trim()
    let cuenta = document.getElementById('cuentaDepositar').value.trim()
        cuenta = parseInt(cuenta,10)
    let monto = document.getElementById('montoSaldo').value.trim()
        monto = parseInt(monto,10)

    e.preventDefault()
    depositar(nombre,cuenta,monto)
    imprimir.appendChild(boxInfo)

})


//==========================================/* Funcion Crear Cuenta */=========================================================//


const crearCuenta = (nombre,edad,montoApertura) => {
    if (encontrarUsuario(nombre)) {
        boxInfo.innerHTML = `
                <p>❌ Usuario duplicado</p><br>
                <p>El usuario que intenta registrar ya se encuentra en nuestra base de datos</p>
                `
    } else {
        if(edad >= 18 && montoApertura >= 100) {

            for(let i= 1000; i <= 10000; i++) {
                let cta = Math.ceil(Math.random()*10000)
                if(cta > 1000 && cta < 10000) {
                    if(cta !== usuariosRegistrados.cuenta){
                    numCuenta = cta
                    } break
                } 
            }
                let usuarioNuevo = new User(nombre,edad)
                usuarioNuevo.saldo = montoApertura
                usuarioNuevo.cuenta = numCuenta
                boxInfo.innerHTML = `
                    <p>✅ Cuenta creada exitosamente</p><br>
                    <p>Sr(a) <strong>${nombre} </strong> su código de cuenta cliente es <strong>N°${numCuenta}</strong></p>
                    `
                usuariosRegistrados.push(usuarioNuevo)
                formCrearCuenta.reset()
        } else if (edad >= 18 && montoApertura < 100) {
            
                boxInfo.innerHTML = `
                    <p>❌ Monto incorrecto</p><br>
                    <p>Estimado usuario, el monto minimo para aperturar una cuenta es de <strong>100$</strong></p>
                    `
                    document.getElementById('edad').style.border = '.17em solid #cf1b1b'  ////////////////////////////////////////////////////////////////////
        } else {
                boxInfo.innerHTML = `
                   <p>❌ Eres menor de edad</p><br>
                   <p>Estimado usuario no tienes edad suficiente para crearte una cuenta</p>
                   `
        }
    }
}


//==========================================/* Funcion Encontrar Usuario */=========================================================//


const encontrarUsuario = (nameUser) => {
    let user
    usuariosRegistrados.forEach(({nombre,edad,saldo,cuenta}, index) => {
        if(nameUser === nombre) {
            user = {
                nombre, edad, saldo, cuenta, index
              }
        }
    })
    return user
}


//==========================================/* Funcion Transferir */=========================================================//


const transferir = (emisor,receptor,cuenta,monto) => { 
 

if(encontrarUsuario(emisor).nombre && encontrarUsuario(receptor).nombre ) {
        if(encontrarUsuario(receptor).cuenta === cuenta && encontrarUsuario(emisor).saldo >= monto)  {  
            let saldoDisponible = usuariosRegistrados[encontrarUsuario(emisor).index].saldo -= monto
            
            boxInfo.innerHTML = `
            <p>✅ Transacción exitosa!</p><br>
            <p>saldo despues de la operación: <strong>${saldoDisponible}$</strong></p><br>
            <p>Usted ha transferido <strong>${monto}$</strong> a la cuenta <strong>N°${cuenta}</strong></p>
            `
            usuariosRegistrados[encontrarUsuario(receptor).index].saldo += monto
            formTransferir.reset()

        } else if (encontrarUsuario(receptor).cuenta === cuenta && encontrarUsuario(emisor).saldo < monto) {
            boxInfo.innerHTML = `
            <p>❌ Saldo insuficiente para esta operación</p>
            `
        } else {
            boxInfo.innerHTML = `
            <p>❌ Numero de cuenta invalido</p>
            `
        } 

} else {
    boxInfo.innerHTML = `
            <p>❌ Usuario no existe</p>
            `
}
}


//==========================================/* Funcion Depositar */=========================================================//


const depositar = (nombre,cuenta,monto) => {
        let usuario = encontrarUsuario(nombre) 
    if(usuario.cuenta === cuenta) {
        usuariosRegistrados[usuario.index].saldo += monto
        boxInfo.innerHTML = `
            <p>✅ Transacción efectiva</p><br>
            <p>Usted a depositado la cantidad de <strong>${monto}$</strong> a la cuenta <strong>N°${cuenta}</strong> perteneciente a <strong>${nombre}</strong></p>
            `
        formDeposito.reset()
    } else {
        boxInfo.innerHTML = `
            <p>❌ Datos incorrectos</p><br>
            <p>Estimado usuario los datos que ha ingresado son incorrectos, porfavor verifique e intente nuevamente</p>
            `
    }
}



//==========================================/* Funcion Ver Usuarios Registrados */=========================================================//



let btnRegistrados = document.getElementById('btn-registrados')

btnRegistrados.addEventListener('click',() => {

    imprimir.removeChild(boxInfo)

   const boxRegistrados = document.createElement('div') 
   const eliminarDuplicado = document.getElementById('registro')
    boxRegistrados.id = "registro"
    for(let usuario of usuariosRegistrados) {
        // <p>👤 Usuarios Registrados:</p><br>
        // boxRegistrados.innerHTML = `Usuarios Registrados:`
        // boxRegistrados.innerHTML = `Nombre  |  Edad    |   Cuenta`
        boxRegistrados.innerHTML += `
        <p><strong>👤 Nombre:</strong> ${usuario.nombre} | <strong>Edad:</strong> ${usuario.edad} | <strong>Cuenta:</strong> N°${usuario.cuenta}</p>
        `
    }
    if(eliminarDuplicado) imprimir.removeChild(eliminarDuplicado)    
    imprimir.appendChild(boxRegistrados)
})



//==========================================/* Funcion consultar Saldo */=========================================================//

let formConsultarSaldo = document.getElementById('form-consultarSaldo')

formConsultarSaldo.addEventListener('click', (e) => {
    let nombre = document.getElementById('usuarioNombre').value.toLowerCase().trim()

    e.preventDefault()
    consultarSaldo(nombre)
    imprimir.appendChild(boxInfo)

})

const consultarSaldo = (nombre) => {

    if(encontrarUsuario(nombre)){
    let saldo = encontrarUsuario(nombre).saldo
    boxInfo.innerHTML = `
        <p>💰 Saldo Disponible</p><br>
        <p>Estimado(a) <strong>${nombre}</strong> el saldo disponible en su cuenta es de <strong>${saldo}$</strong></p>
       `
       formConsultarSaldo.reset()

    } else if (nombre === '') {
        boxInfo.innerHTML = `
        <p>⚠️ Ingrese un nombre para poder consultar su saldo</p>
        `
    } else  {
        boxInfo.innerHTML = `
        <p>❌ El usuario al que intenta depositar no posee cuenta en nuestro banco</p>
        `
    }   
}











