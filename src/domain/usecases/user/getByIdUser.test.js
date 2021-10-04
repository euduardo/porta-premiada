const getByIdUser = require('./getByIdUser')
const assert = require('assert')
const { User } = require('../../entities')

describe('Find one User', () => {
  function aUser({ hasAccess }) {
    return { hasAccess }
  }

  describe('Valid User', () => {

    it('should return User if is valid', async () => {
      // Given
      const retInjection = User.fromJSON('{ "id": 5, "nickname": "herbsUser", "password": "V&eryStr0ngP@$$"}')

      const injection = {
        userRepository: new ( class userRepository {
          async  findByID(id) { return ([retInjection]) }
        })
      }
      const user = aUser({ hasAccess: true })
      /*{ nickname: String,
        password: String }*/
      const req = { id: 5 }

      // When
      const uc = getByIdUser(injection)()
      await uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)      
      assert.strictEqual(ret.ok.nickname, 'herbsUser')
      assert.strictEqual(ret.ok.isValid(), true)

    })
  })

  describe('Invalid User', () => {

    it('should not return if input is invalid', async () => {
      // Given
      const injection = {}
      const user = aUser({ hasAccess: true })
      /*{ nickname: String,
        password: String }*/
      const req = { id : '5' }

      // When
      const uc = getByIdUser(injection)()
      await uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isErr)
      assert.deepStrictEqual(ret.err, {request :[{id:[{wrongType:"Number"}]}]})
    })
  })
})
