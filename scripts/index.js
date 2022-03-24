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


const notificationBox = document.getElementById('notifications'),
             localNotifications = window.localStorage.getItem('notifications')

    if(localNotifications) notificationBox.innerHTML = localNotifications


let localUsers

    window.localStorage.getItem('users')
        ? localUsers = JSON.parse(window.localStorage.getItem('users'))
        : localUsers = []


const formCreateAccount = document.querySelector('.create-account form'),
      formTransfer = document.querySelector('.transfer form'),
      formDeposit = document.querySelector('.deposit form'),
      formCheckBalance = document.querySelector('.check-balance form'),
      btnUserQuery = document.getElementById('userQuery'),
      btnDeleteNotifications = document.getElementById('deleteNotifications'),
      btnDeleteUsers = document.getElementById('deleteUsers')



/*_______________________________________________________________| Eventos Form  |_______________________________________________________________*/



    formCreateAccount.addEventListener('submit', (e) => {
        e.preventDefault()

        const name = document.getElementById('name').value.toLowerCase().trim(),
              age = parseInt(document.getElementById('age').value, 10),
              startingAmount = parseInt(document.getElementById('startingAmount').value, 10)

        createAccount(name,age,startingAmount)
    }) 


    formTransfer.addEventListener('submit', (e) => {
      e.preventDefault()

      const remitent = document.getElementById('remitent').value.toLowerCase().trim(),
            destinatary = document.getElementById('destinatary').value.toLowerCase().trim(),
            account = parseInt(document.getElementById('accountNumber').value.trim(), 10),
            amount = parseInt(document.getElementById('amountToSend').value.trim(), 10)

        transfer(remitent,destinatary,account,amount) 
    })


    formDeposit.addEventListener('submit', (e) => {
        e.preventDefault()

        const name = document.getElementById('userName').value.toLowerCase().trim(),
              account = parseInt(document.getElementById('accountToDeposit').value, 10),
              amount = parseInt(document.getElementById('balanceToDeposit').value, 10)

        deposit(name,account,amount)
    })


    formCheckBalance.addEventListener('submit', (e) => {
        e.preventDefault()
        const account = parseInt(document.getElementById('accountNumberToConsult').value, 10)
        checkBalance(account)
    })


    btnUserQuery.addEventListener('click', () => {
      const alertUsersLog = document.createElement('div'), 
            deleteDuplicate = document.getElementById('repeated')
            alertUsersLog.classList.add("alertUsersLog")

            if(localUsers.length > 0) { 
                for(let user of localUsers) {
                    alertUsersLog.innerHTML += 
                            `<div class='user-card'>
                                <img src="/img/user.png" alt="user">
                                <div>
                                    <h4>${user.name}</h4>
                                    <p>Account N° <strong>${user.account}</strong></p>
                                    <p>Available balance <strong>${user.balance}$</strong></p>
                                    <p>${user.age} years old</p>
                                </div>
                            </div>`
                }
                alertUsersLog.classList.add("content-users")
            } else {
                alertUsersLog.innerHTML += 
                    `<div class='warning'>  
                        <h3>⚠️ User log is empty</h3>
                        <p>No user to display</p>
                    </div>`
                    
                if(deleteDuplicate && localUsers.length < 1 ) notificationBox.removeChild(deleteDuplicate)
                alertUsersLog.id = 'repeated'  
            }

           process(alertUsersLog)
    })


    btnDeleteUsers.addEventListener('click', () => {
        if(localUsers.length > 0) {
            const alertDeleteUser = document.createElement('div')
            alertDeleteUser.classList.add("alertDeleteUser")

            alertDeleteUser.innerHTML = 
                    `<div class='successful'>        
                        <h3>✅ Successfully deleted users</h3>
                        <p>All users have been removed from the registry</p>
                    </div>`

    
            process(alertDeleteUser)
    
            localUsers = []
            window.localStorage.setItem('users', JSON.stringify(localUsers))
        }
    })


    btnDeleteNotifications.addEventListener('click', () => {
        window.localStorage.setItem('notifications', notificationBox.innerHTML = '')
    })


/*_______________________________________________________________| Functions |_______________________________________________________________*/


const process = (element) => {
    const firstChild = notificationBox.firstElementChild

    firstChild 
        ? notificationBox.insertBefore(element, firstChild)
        : notificationBox.appendChild(element)

    notificationBox.scroll({top: 0})
    window.localStorage.setItem('notifications', notificationBox.innerHTML)
}

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



const createAccount = (name,age,startingAmount) => {
    const alertAccountCreated = document.createElement('div')
          alertAccountCreated.classList.add("alertAccountCreated")
    
    if(findUsers(name)) {
        alertAccountCreated.innerHTML = `
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

            alertAccountCreated.innerHTML = `
                        <div class='successful'>        
                        <h3>✅ Account created successfully</h3>
                        <p>Mr(s) <strong>${name}</strong> your customer account number is <strong>${accountNumber}</strong></p>
                        </div>
                        `

            localUsers = [...localUsers, newUser]
            window.localStorage.setItem('users', JSON.stringify(localUsers))
        } else if (age >= 18 && startingAmount < 100) {
            
                alertAccountCreated.innerHTML = ` 
                    <div class='warning'>
                        <h3>⚠️ Wrong amount</h3>
                        <p>Mr(s) <strong>${name}</strong> the minimum amount to open an account is <strong>100$</strong></p>
                    </div>
                    `
        } else {
                alertAccountCreated.innerHTML = `
                    <div class='danger'>
                        <h3>❌ You are underage</h3>
                        <p><strong>${name}</strong> you are not old enough to create an account</p>
                    </div>
                    `
        }
    }
    formCreateAccount.reset()
    process(alertAccountCreated)
}

const checkBalance = (accountNumber) => {
    const alertBalance = document.createElement('div')
            alertBalance.classList.add("alertBalance")
        
    if(findAccount(accountNumber)) {
        const {name, balance, account} = findAccount(accountNumber)
    
        if(accountNumber === account) {
                alertBalance.innerHTML += 
                `<div class='successful'>
                    <h3>💸 Available Balance</h3>
                    <p>Dear <strong>${name},</strong> the available balance in your account is <strong>${balance}$</strong></p>
                </div>`
        } 
    } else if (isNaN(accountNumber)) { alertBalance.innerHTML = 
            `<div class='warning'>
                <h3>⚠️ Data entered is not valid</h3>
                <p>Enter a valid account number to check the available balance</p>
            </div>`

    } else { alertBalance.innerHTML =  
            `<div class='danger'>
                <h3>❌ The account doesn't exist</h3>
                <p>The account number you have entered is not registered in our banking system</p>
            </div>`
    }
    formCheckBalance.reset()

    process(alertBalance)
}

const deposit = (name,accountNumber,amount) => {
    const alertDeposit = document.createElement('div')
          alertDeposit.classList.add("alertDeposit")

    if(findUsers(name)) {
        const {account, index} = findUsers(name) 
    
        if(account === accountNumber) {
            localUsers[index].balance += amount
            window.localStorage.setItem('users', JSON.stringify(localUsers))
            alertDeposit.innerHTML = 
                `<div class='successful'>
                    <h3>✅ Succesful transaction</h3>
                    <p>You have deposited the amount of <strong>${amount}$</strong> to the account <strong>N°${accountNumber}</strong> belonging to <strong>${name}</strong></p>
                </div>`
        } else {
            alertDeposit.innerHTML = 
            `<div class='danger'>
                <h3>❌ Wrong data</h3>
                <p>Dear user, the data you have entered is incorrect, please check and try again</p>
            </div>`
        }
    } else {
        alertDeposit.innerHTML = 
            `<div class='warning'>
                <h3>⚠️ User does not exist</h3>
                <p>The user is not registered in our banking system</p>
            </div>`
    }

    formDeposit.reset()
    process(alertDeposit)
}

const transfer = (remitent,destinatary,account,amount) => { 
    const alertTransfer = document.createElement('div')
          alertTransfer.classList.add("alertTransfer")
    
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
                
                alertTransfer.innerHTML = 
                    `<div class='successful'>
                        <h3>✅ Succesful transaction</h3>
                        <p>Balance after the operation: <strong>${availableBalance}$</strong></p>
                        <p>You have transferred <strong>${amount}$</strong> to the account <strong>N°${account}</strong></p>
                    </div>`
    
                localUsers[destinataryIndex].balance += amount
    
            } else if (destinataryAccount === account && destinataryBalance < amount) {
                alertTransfer.innerHTML = 
                    `<div class='warning'>
                        <h3>⚠️ Insufficient balance for this operation</h3>
                        <p>The available balance in your account is less than the amount you want to transfer</p>
                    </div>`
            } else alertTransfer.innerHTML = 
                    `<div class='danger'>
                        <h3>❌ Invalid account number</h3>
                        <p>The account number you have entered does not correspond to that of any record</p>
                    </div>`
            }

    } else  alertTransfer.innerHTML = 
                `<div class='warning'>
                    <h3>⚠️ User does not exist</h3>
                    <p>The remitent or destinatary is not registered in our banking system</p>
                </div>`

    formTransfer.reset()
    process(alertTransfer)
}















