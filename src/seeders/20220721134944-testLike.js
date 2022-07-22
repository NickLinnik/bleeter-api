import findUsersPostsLikeables from './utils'

module.exports = {
  async up (queryInterface, Sequelize) {
    const {Chokidar, Albertu, Poncha} = await findUsersPostsLikeables()
    
    await queryInterface.bulkInsert('likes', [
      {userId: Chokidar.id, likeableId: Albertu.Posts[0].likeableId},
      {userId: Chokidar.id, likeableId: Poncha.Posts[0].likeableId},
      {userId: Albertu.id, likeableId: Chokidar.Posts[0].likeableId},
      {userId: Albertu.id, likeableId: Poncha.Posts[0].likeableId},
      {userId: Albertu.id, likeableId: Poncha.Posts[1].likeableId},
      {userId: Poncha.id, likeableId:  Poncha.Posts[0].likeableId},
      {userId: Poncha.id, likeableId:  Poncha.Posts[1].likeableId}
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('likes', null, {})
  }
};
