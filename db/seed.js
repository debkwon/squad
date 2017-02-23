const db = require('APP/db')

const seedMembers = () => db.Promise.map([
  {first_name: 'Larena', last_name: 'K', email: 'larkin@example.com', password: '1234'},
  {first_name: 'Dulian', last_name: 'J',email: 'dulianthedude@example.com', password: '1234'},
  {first_name: 'Cordon', last_name: 'G', email: 'cordo@example.com', password: '1234'},
  {first_name: 'Sessie', last_name: 'J', email: 'jenesis@example.com', password: '1234'},
  {first_name: 'Latharina', last_name: 'C', email: 'latch@example.com', password: '1234'},
  {first_name: 'Lennis', last_name: 'D', email: 'dlennis@example.com', password: '1234'},
  {first_name: 'Hrace', last_name: 'G', email: 'hurrace@example.com', password: '1234'},
  {first_name: 'Nathleen', last_name: 'K', email: 'knahhh@example.com', password: '1234'},
  {first_name: 'Jeborah', last_name: 'D', email: 'jebby@example.com', password: '1234'},
  {first_name: 'Zavid', last_name: 'D', email: 'iluvdrake@example.com', password: '1234'},
  {first_name: 'Hames', last_name: 'J', email: 'huh@example.com', password: '1234'}
], member => db.model('members').create(member))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedMembers)
  .then(members => console.log(`Seeded ${members.length} members OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
