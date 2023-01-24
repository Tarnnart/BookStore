// Variable

// task 1
const namename = 'John'
let admin = namename
admin = namename
console.log('Task 1', admin)

// task 2
if (-1 || 0) {
  console.log('Task 2', 'first') // true
}
if (-1 && 0) {
  console.log('Task 2', 'second')
}
if (null || -1 && 1) { // true
  console.log('Task 2', 'third')
}

// task 3
const birthday = '04.01.1997'
const age = birthday
console.log('Task 3', age)

// Data type
// Task 4
const nameDatatype = 'Ilya'
console.log('Task 4', `hello ${1}`)
console.log('Task 4', `hello ${'nameDatatype'}`)
console.log('Task 4', `hello ${nameDatatype}`)

// Basic Operator, Maths
// Task 5
let a = 1
let b = 1
const c = ++a
const d = b++
console.log('Task 5', a, b, c, d)

// Task 6
let aa = 2
const x = 1 + (aa *= 2)
console.log('Task 6', aa, x)

// Task 7
const aaa = ('1')
const bbb = ('2')
console.log('Task 7', aaa + bbb)

// conditional braching: if, '?'
// Task 8
if ('0') {
  console.log('Task 8', 'Hello')
}

// Task 9
const value = 5
if (value > 0) {
  console.log('Task 9', 1)
} else if (value < 0) {
  console.log('Task 9', -1)
} else {
  console.log('Task 9', 0)
}

// Task 10
let result
if (a + b < 4) {
  result = 'Below'
} else {
  result = 'Over'
}
console.log('Task 10', result)

// Task 11
console.log('Task 11', null || 2 || undefined)

// Task 12
console.log('Task 12', console.log(1) || 2 || console.log(3))

// Task 13
console.log('Task 13', 1 && null && 2)

// Task 14
console.log('Task 14', (console.log(1) && console.log(2)))

// Task 15
console.log('Task 15', (null || 2 && 3 || 4))

// Task 16 (if age >= 14 && age <= 90)

// Task 17
// let ii = 0
// while (++ii < 5) { console.log('Task 17', ii) }
// 1 2 3 4
// let iii = 0
// while (iii++ < 5) console.log('Task 17', iii)
// 1 2 3 4 5

// Task 18
for (let i = 0; i < 5; i++) console.log('Task 18.1', i)
for (let i = 0; i < 5; ++i) console.log('Task 18.2', i)

// Task 19
for (let i = 2; i <= 10; i++) {
  if (i % 2 == 0) {
    console.log('Task 19', i)
  }
}

// Task 20
for (let i = 0; i < 3; i++) {
  console.log('Task 20', `number ${i}`)
}

// Task 21
const browser = 'Edge'
if (browser == 'Edge') {
  console.log('Task 21', "You've got the Edge!")
} else if (browser == 'Chrome'
|| browser == 'Firefox'
|| browser == 'Safari'
|| browser == 'Opera') {
  console.log('Task 21', 'Okay we support these browsers too')
} else {
  console.log('Task 21', 'We hope that this page looks ok!')
}

// Task 22
const testCase = 2
switch (testCase) {
  case 0:
    console.log('Task 22', 0)
    break

  case 1:
    console.log('Task 22', 1)
    break

  case 2:
  case 3:
    console.log('Task 22', 2, 3)
    break
  default:
    console.log('Task 22', '---')
}

// Task 23
function checkAge(agee) {
  if (agee > 18) {
    return true
  } else {
    return ('Did parents allow you?')
  }
}

const resultTask23 = checkAge(15)
console.log('Task 23', resultTask23)

function checkAgee(agee) {
  return (agee > 18) ? true : ('Did parents allow you?')
}
const resultTask = checkAgee(28)
console.log('Task 23.1', resultTask)

function checkAgeee(agee) {
  return (agee > 18) || ('Did parents allow you?')
}
const resulttask = checkAgeee(17)
console.log('Task 23.2', resulttask)

// Compare Password
const comparePassword = async (candidate, hashPassword) => {
  const isMatch = bcrypt.compareSync(candidate, hashPassword)
  return isMatch
}

// Compare History
const compareฺHistory = async (candidate, hashBook) => {
  const isMatch = bcrypt.compareSync(candidate, hashBook)
  return isMatch
}

// Path /User Get data from mongodb
app.post('/User', async (req, res) => res.json(await User.find()))
