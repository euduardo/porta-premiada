const { usecase, step, Ok, Err } = require('@herbsjs/herbs')
const { User } = require('../../entities')

const useCase = ({ userRepository }) => () =>
  usecase('Find one User', {
    // Input/Request metadata and validation 
    request: {
      id: Number,
    },

    // Output/Response metadata
    response: User,

    //Authorization with Audit
    // authorize: user => (user.canFindOneUser ? Ok() : Err()),
    authorize: user => Ok(user),

    'Find the User': step(async ctx => {
      // ctx.ret is the Use Case return
      const [result] = await userRepository.findByID(parseInt(ctx.req.id)) 
      if (!result) return Err.notFound({ 
        message: `User entity not found by id: ${ctx.req.id}`,
        payload: { entity: 'User' }
      })
      
      return (ctx.ret = User.fromJSON(result))
    })
  })

module.exports = useCase