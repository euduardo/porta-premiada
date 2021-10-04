
exports.up = async function (knex) {
    knex.schema.hasTable('users').then(function(exists) {
        if(!exists) {
            return knex.schema
            .createTable('users', function (table) {
            table.increments('id').primary()
            table.string('nickname')
table.string('password')
        }   )
        }  
    })
}

exports.down = function (knex) {
    return knex.schema 
    .dropTableIfExists('users')
}