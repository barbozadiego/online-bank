/*_______________________________________________________________| Class  |_______________________________________________________________*/


class User {
    constructor(name,age){
        this.name = name
        this.age = age
        this.balance
        this.account    
    }
} 


/*_______________________________________________________________| Variables  |_______________________________________________________________*/


const displayOnScreen = document.getElementById('alerts'),
      informationBox = document.createElement('div')
      informationBox.className = ('information-box')


let localUsers

    window.localStorage.getItem('users')
        ? localUsers = JSON.parse(window.localStorage.getItem('users'))
        : localUsers = []

    // if(window.localStorage.getItem('users')) {
    //     localUsers = JSON.parse(window.localStorage.getItem('users'))
    // } else {
    //     localUsers = []
    // }





const formCreateAccount = document.querySelector('.create-account form')
      formTransfer = document.querySelector('.transfer form')
      formDeposit = document.querySelector('.deposit form')
      formCheckBalance = document.querySelector('.check-balance form')
      btnUserQuery = document.getElementById('userQuery')



/*_______________________________________________________________| Eventos Form  |_______________________________________________________________*/


/*__________________| Create Account  |__________________*/

    formCreateAccount.addEventListener('submit', (e) => {
        e.preventDefault()

        const name = document.getElementById('name').value.toLowerCase().trim(),
              age = parseInt(document.getElementById('age').value, 10),
              startingAmount = parseInt(document.getElementById('startingAmount').value, 10)

        createAccount(name,age,startingAmount)
        displayOnScreen.appendChild(informationBox)
    }) 


/*__________________| Trasnfer Balance  |__________________*/

    formTransfer.addEventListener('submit', (e) => {
      e.preventDefault()

      const remitent = document.getElementById('remitent').value.toLowerCase().trim(),
            destinatary = document.getElementById('destinatary').value.toLowerCase().trim(),
            account = parseInt(document.getElementById('accountNumber').value.trim(), 10),
            amount = parseInt(document.getElementById('amountToSend').value.trim(), 10)

        transfer(remitent,destinatary,account,amount) 
        displayOnScreen.appendChild(informationBox)
    })

/*__________________| Deposit Funds  |__________________*/

    formDeposit.addEventListener('submit', (e) => {
        e.preventDefault()

        const name = document.getElementById('userName').value.toLowerCase().trim(),
              account = parseInt(document.getElementById('accountToDeposit').value, 10),
              amount = parseInt(document.getElementById('balanceToDeposit').value, 10)

        deposit(name,account,amount)
        displayOnScreen.appendChild(informationBox)
    })

/*__________________| Check Balance  |__________________*/

    formCheckBalance.addEventListener('submit', (e) => {
        e.preventDefault()

        const account = parseInt(document.getElementById('accountNumberToConsult').value, 10)

        checkBalance(account)
        displayOnScreen.appendChild(informationBox)
    })

/*__________________| Show Users  |__________________*/

    btnUserQuery.addEventListener('click',() => {

        // displayOnScreen.removeChild(informationBox)

    const boxRegistrados = document.createElement('div'), 
          eliminarDuplicado = document.getElementById('registro')
          boxRegistrados.id = "registro"

        if(localUsers) {
            for(let user of localUsers) {
                boxRegistrados.innerHTML += 
                    `<p>
                        <strong>👤 Name:</strong> ${user.name} | 
                        <strong> Age:</strong> ${user.age} |
                        <strong> N° Account:</strong> N°${user.account}
                    </p>`
            }
    
            if(eliminarDuplicado) displayOnScreen.removeChild(eliminarDuplicado)    
            displayOnScreen.appendChild(boxRegistrados)
        }

    })




/*_______________________________________________________________| Funciones  |_______________________________________________________________*/


/*__________________| Create Account  |__________________*/

const createAccount = (name,age,startingAmount) => {
    if (findUsers(name)) {
        informationBox.innerHTML = `
                <p>⚠️ Duplicate user</p><br>
                <p>The user you are trying to register is already in our database</p>
                `
    } else {
        if(age >= 18 && startingAmount >= 100) {


            for(let i= 1000; i <= 10000; i++) {
                let cta = Math.ceil(Math.random()*10000)
                if(cta > 1000 && cta < 10000) {
                    if(cta !== localUsers.account){
                        accountNumber = cta
                    } break
                } 
            }
            
            let newUser = new User(name,age)
                newUser.balance = startingAmount
                newUser.account = accountNumber

            informationBox.innerHTML = `<p>✅ Account created successfully</p><br>
                    <p>Mr(s) <strong>${name} </strong> your customer account number is <strong>N°${accountNumber}</strong></p>
                `

            localUsers = [...localUsers, newUser]
            window.localStorage.setItem('users', JSON.stringify(localUsers))

            
            formCreateAccount.reset()

        } else if (age >= 18 && startingAmount < 100) {
            
                informationBox.innerHTML = `
                    <p>❌ Wrong amount</p><br>
                    <p>Dear user, the minimum amount to open an account is <strong>100$</strong></p>
                    `
                    document.getElementById('age').style.border = '.17em solid #cf1b1b'  ////////////////////////////////////////////////////////////////////
        } else {
                informationBox.innerHTML = `
                   <p>❌ You are underage</p><br>
                   <p>Dear user, you are not old enough to create an account</p>
                   `
        }
    }
}

/*__________________| Find User  |__________________*/

const findUsers = (nameUser) => {
    if(localUsers) {
        let user
        localUsers.forEach(({name,age,balance,account}, index) => {
            if(nameUser === name) {
                user = { name, age, balance, account, index }
            }
        })
        return user
    }
}


/*__________________| Trasnfer  |__________________*/

const transfer = (remitent,destinatary,account,amount) => { 
 

if(findUsers(remitent).name && findUsers(destinatary).name ) {
        if(findUsers(destinatary).account === account && findUsers(remitent).balance >= amount)  {  
            let saldoDisponible = localUsers[findUsers(remitent).index].balance -= amount
            
            informationBox.innerHTML = `
            <p>✅ Transacción exitosa!</p><br>
            <p>saldo despues de la operación: <strong>${saldoDisponible}$</strong></p><br>
            <p>Usted ha transferido <strong>${amount}$</strong> a la cuenta <strong>N°${account}</strong></p>
            `
            localUsers[findUsers(destinatary).index].balance += amount
            formTransfer.reset()

        } else if (findUsers(destinatary).account === account && findUsers(remitent).balance < amount) {
            informationBox.innerHTML = `
            <p>❌ Saldo insuficiente para esta operación</p>
            `
        } else {
            informationBox.innerHTML = `
            <p>❌ Numero de cuenta invalido</p>
            `
        } 

} else {
    informationBox.innerHTML = `
            <p>❌ Usuario no existe</p>
            `
}
}

/*__________________| Deposit  |__________________*/

const deposit = (name,accountNumber,amount) => {

    if(findUsers(name)) {
        const {account, index} = findUsers(name) 
    
        if(account === accountNumber) {
            localUsers[index].balance += amount
            informationBox.innerHTML = 
               `
                <p>✅ Succesful transaction</p><br>
                <p>You have deposited the amount of <strong>${amount}$</strong> to the account <strong>N°${accountNumber}</strong> belonging to <strong>${name}</strong></p>
               `
        } 
    } else {
        informationBox.innerHTML = 
            `<p>❌ Wrong data</p><br>
             <p>Dear user, the data you have entered is incorrect, please check and try again</p>`
    }
    formDeposit.reset()
}



/*__________________| Check Balance  |__________________*/


const findAccount = (accountNumber) => {
    
    if(localUsers) {
        let user
        localUsers.forEach(({name,age,balance,account}, index) => {
            if(accountNumber === account) {
                user = { name, age, balance, account, index}
            }
        })
        return user
    }
}

const checkBalance = (accountNumber) => {
    if(findAccount(accountNumber)) {
        const {name, balance, account} = findAccount(accountNumber)
    
        if(accountNumber === account) {
             informationBox.innerHTML = 
                `
                <p>💸 Available Balance</p><br>
                <p>Dear <strong>${name},</strong> the available balance in your account is <strong>${balance} $</strong></p>
                `
           formCheckBalance.reset()
        } 
    }
    else if (isNaN(accountNumber)) informationBox.innerHTML = `<p>⚠️ Enter a valid account number to check the available balance</p>`
    else informationBox.innerHTML =  `<p>❌ The account number you have entered is not registered in our banking system.</p>`

    formCheckBalance.reset()
}














