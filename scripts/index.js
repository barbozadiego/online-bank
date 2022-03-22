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


const displayOnScreen = document.getElementById('notifications'),
      informationBox = document.createElement('div')
      informationBox.className = ('information-box')

let localUsers

    window.localStorage.getItem('users')
        ? localUsers = JSON.parse(window.localStorage.getItem('users'))
        : localUsers = []

    
let localNotifications = window.localStorage.getItem('notifications')
    if(localNotifications) { 
        informationBox.innerHTML = localNotifications
        displayOnScreen.appendChild(informationBox)
    }


const formCreateAccount = document.querySelector('.create-account form')
      formTransfer = document.querySelector('.transfer form'),
      formDeposit = document.querySelector('.deposit form'),
      formCheckBalance = document.querySelector('.check-balance form'),
      btnUserQuery = document.getElementById('userQuery'),
      btnDeleteNotifications = document.getElementById('deleteNotifications'),
      btnDeleteUsers = document.getElementById('deleteUsers')



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

    btnUserQuery.addEventListener('click', () => {
      const usersLog = document.createElement('div'), 
            deleteDuplicate = document.getElementById('usersLog')
            usersLog.id = "usersLog"

            if(localUsers.length > 0) { 
                for(let user of localUsers) {
                    usersLog.innerHTML += 
                            `<p class='user'>
                                <strong>👤 Name:</strong> ${user.name} | 
                                <strong> Age:</strong> ${user.age} |
                                <strong> N° Account:</strong> ${user.account}
                            </p>`
                }
        
                displayOnScreen.appendChild(usersLog)
            } else {
                usersLog.innerHTML += 
                    `<div class='warning'>  
                        <h3>⚠️ User log is empty</h3>
                    </div>`
                displayOnScreen.appendChild(usersLog)
            }

            if(deleteDuplicate) displayOnScreen.removeChild(deleteDuplicate)    

            window.localStorage.setItem('notifications', informationBox.innerHTML)
    })

    btnDeleteNotifications.addEventListener('click', () => informationBox.innerHTML = '')

    btnDeleteUsers.addEventListener('click', () => {
        const usersLog = document.getElementById('usersLog')
        if(usersLog) usersLog.remove()
        
        localUsers = []
        window.localStorage.setItem('users', JSON.stringify(localUsers))

        informationBox.innerHTML += 
                `<div class='successful'>        
                    <h3>✅ Successfully deleted users</h3>
                </div>`

        window.localStorage.setItem('notifications', informationBox.innerHTML)
    })


/*_______________________________________________________________| Funciones  |_______________________________________________________________*/

 




/*__________________| Create Account  |__________________*/

const createAccount = (name,age,startingAmount) => {
    if (findUsers(name)) {
        informationBox.innerHTML += `
                    <div class='warning'>  
                        <h3>⚠️ Duplicate user</h3>
                        <p>The user you are trying to register is already in our database</p>
                    </div>
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

            informationBox.innerHTML += `
                     <div class='successful'>        
                        <h3>✅ Account created successfully</h3>
                        <p>Mr(s) <strong>${name} </strong> your customer account number is <strong>${accountNumber}</strong></p>
                      </div>
                      `

            localUsers = [...localUsers, newUser]
            window.localStorage.setItem('users', JSON.stringify(localUsers))

            
            formCreateAccount.reset()

        } else if (age >= 18 && startingAmount < 100) {
            
                informationBox.innerHTML += ` 
                    <div class='danger'>
                        <h3>❌ Wrong amount</h3>
                        <p>Dear user, the minimum amount to open an account is <strong>100$</strong></p>
                    </div>
                    `
        } else {
                informationBox.innerHTML += `
                   <div class='danger'>
                        <h3>❌ You are underage</h3>
                        <p>Dear user, you are not old enough to create an account</p>
                   </div>
                   `
        }
    }

    window.localStorage.setItem('notifications', informationBox.innerHTML)
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
 
    if(findUsers(remitent) && findUsers(destinatary)) {

        const remitentIndex = findUsers(remitent).index, 
              remitentName = findUsers(remitent).name, 
              remitentBalance = findUsers(remitent).balance,
              destinataryIndex = findUsers(destinatary).index, 
              destinataryName = findUsers(destinatary).name, 
              destinataryAccount = findUsers(destinatary).account, 
              destinataryBalance = findUsers(destinatary).balance 

        if(remitentName && destinataryName) {
            if(destinataryAccount === account && remitentBalance >= amount)  {  
                let availableBalance = localUsers[remitentIndex].balance -= amount
                
                informationBox.innerHTML += 
                    `<div class='successful'>
                        <h3>✅ Succesful transaction!</h3>
                        <p>Balance after the operation: <strong>${availableBalance}$</strong></p>
                        <p>You have transferred <strong>${amount}$</strong> to the account <strong>N°${account}</strong></p>
                    </div>`
    
                localUsers[destinataryIndex].balance += amount
    
            } else if (destinataryAccount === account && destinataryBalance < amount) {
                informationBox.innerHTML += 
                    `<div class='warning'>
                        <h3>⚠️ Insufficient balance for this operation</h3>
                        <p>The available balance in your account is less than the amount you want to transfer</p>
                    </div>`
            } else informationBox.innerHTML += 
                    `<div class='danger'>
                        <h3>❌ Invalid account number</h3>
                        <p>The account number you have entered does not correspond to that of any record</p>
                    </div>`
            }

    } else  informationBox.innerHTML += 
                `<div class='warning'>
                    <h3>⚠️ User does not exist</h3>
                    <p>The remitent or destinatary is not registered in our banking system</p>
                </div>`

    formTransfer.reset()

    window.localStorage.setItem('notifications', informationBox.innerHTML)
}

/*__________________| Deposit  |__________________*/

const deposit = (name,accountNumber,amount) => {

    if(findUsers(name)) {
        const {account, index} = findUsers(name) 
    
        if(account === accountNumber) {
            localUsers[index].balance += amount
            window.localStorage.setItem('users', JSON.stringify(localUsers))
            informationBox.innerHTML += 
               `<div class='successful'>
                 <h3>✅ Succesful transaction</h3>
                 <p>You have deposited the amount of <strong>${amount}$</strong> to the account <strong>N°${accountNumber}</strong> belonging to <strong>${name}</strong></p>
               </div>`
        } 
    } else {
        informationBox.innerHTML += 
            `<div class='danger'>
                <h3>❌ Wrong data</h3>
                <p>Dear user, the data you have entered is incorrect, please check and try again</p>
            </div>`
    }
    formDeposit.reset()

    window.localStorage.setItem('notifications', informationBox.innerHTML)
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
             informationBox.innerHTML += 
              `<div class='successful'>
                  <h3>💸 Available Balance</h3>
                  <p>Dear <strong>${name},</strong> the available balance in your account is <strong>${balance} $</strong></p>
               </div>`
           formCheckBalance.reset()
        } 
    }
    else if (isNaN(accountNumber)) informationBox.innerHTML += 
            `<div class='warning'>
                <p>⚠️ Enter a valid account number to check the available balance</p>
            </div>`
    else informationBox.innerHTML +=  
            `<div class='danger'>
                <p>❌ The account number you have entered is not registered in our banking system</p>
            </div>`

    formCheckBalance.reset()

    window.localStorage.setItem('notifications', informationBox.innerHTML)
}














