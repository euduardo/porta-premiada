const deleteUser = require('./deleteUser')
const assert = require('assert')


describe('Delete User', () => {
  function aUser({ hasAccess }) {
    return { hasAccess }
  }

  describe('Valid User', () => {

    it('should delete User if is valid', async () => {
      // Given
      const injection = {
        userRepository: new ( class userRepository {
          async deleteByID(id) { return true }
        })
      }
      const user = aUser({ hasAccess: true })
      /*{ nickname: String,
        password: String }*/
      const req = {  id : 5 }

      // When
      const uc = deleteUser(injection)()
      await uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)      

    })
  })

  describe('Invalid User', () => {

    it('should not delete invalid User', async () => {
      // Given
      const injection = {}
      const user = aUser({ hasAccess: true })
      /*{ nickname: String,
        password: String }*/
      const req = { id : '5' }

      // When
      const uc = deleteUser(injection)()
      await uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isErr)
      assert.deepStrictEqual(ret.err, {request :[{id:[{wrongType:"Number"}]}]})
    })
  })
})
