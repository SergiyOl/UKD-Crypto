const crypto = require('crypto')
const fs = require('fs')

function HashPassword(filePath, password) {
    const salt = crypto.randomBytes(8).toString('hex')
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 100, 32, 'sha512').toString('hex')
    fs.writeFileSync(filePath, `${salt}:${hashedPassword}`)
}

function ComparePassword(filePath, password){
    const data = fs.readFileSync(filePath, 'utf-8') 
    const [salt, hashedPassword] = data.split(':')

    const inputHashedPassword = crypto.pbkdf2Sync(password, salt, 100, 32, 'sha512').toString('hex')

    if (inputHashedPassword === hashedPassword) {
        console.log('Пароль вірний')
    }
    else {
        console.log('Пароль невірний')
    }
}

// Шифрування паролю
HashPassword('./hash.txt', 'MyPassword')
HashPassword('./hash1.txt', 'DifferentPassword')

// Перевірка паролю
ComparePassword('./hash.txt', 'MyPassword')
ComparePassword('./hash1.txt', 'MyPassword')