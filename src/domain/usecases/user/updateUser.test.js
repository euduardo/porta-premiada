const updateUser = require('./updateUser')
const assert = require('assert')
const { User } = require('../../entities')


describe('Update User', () => {
  function aUser({ hasAccess }) {
    return { hasAccess }
  }

  describe('Valid User', () => {

    it('should update User if is valid', async () => {
      // Given
      const retInjection = User.fromJSON('{ "id": 5, "nickname": "herbsUser", "password": "V&eryStr0ngP@$$"}')
      const injection = {
        userRepository: new ( class userRepository {
          async findByID(id) { return ([retInjection]) }
          async update(id) { return true }
        })
      }
      const user = aUser({ hasAccess: true })
      /*{ nickname: String,
        password: String }*/
      const req = {  id: 5, nickname: 'herbsUser', password: 'V&eryStr0ngP@$$'}

      // When
      const uc = updateUser(injection)()
      await uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)      

    })
  })

  describe('Invalid User', () => {

    it('should not update invalid User', async () => {
      // Given
      const injection = {}
      const user = aUser({ hasAccess: true })
      /*{ nickname: String,
        password: String }*/
      const req = {  nickname: 'herbsUser', password: 96587422 }

      // When
      const uc = updateUser(injection)()
      await uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isErr)
      assert.deepStrictEqual(ret.err, {request :[{password:[{wrongType:"String"}]}]})
    })
  })
})
