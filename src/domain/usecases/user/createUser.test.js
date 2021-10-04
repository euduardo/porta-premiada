const createUser = require('./createUser')
const assert = require('assert')


describe('Create User', () => {
  function aUser({ hasAccess }) {
    return { hasAccess }
  }

  describe('Valid User', () => {

    it('should add User if is valid', async () => {
      // Given
      const injection = {
        userRepository: new ( class userRepository {
          async insert(user) { return (user) }
        })
      }
      const user = aUser({ hasAccess: true })
      /*{ nickname: String,
        password: String }*/
      const req = {  nickname: 'herbsUser', password: 'V&eryStr0ngP@$$'}

      // When
      const uc = createUser(injection)()
      await uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)      
      assert.strictEqual(ret.ok.isValid(), true)

    })
  })

  describe('Invalid User', () => {

    it('should not create invalid User', async () => {
      // Given
      const injection = {}
      const user = aUser({ hasAccess: true })
      /*{ nickname: String,
        password: String }*/
      const req =  {  nickname: 'herbsUser', password: 96587422 }

      // When
      const uc = createUser(injection)()
      await uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isErr)
      assert.deepStrictEqual(ret.err, {request :[{password:[{wrongType:"String"}]}]})
    })
  })
})
