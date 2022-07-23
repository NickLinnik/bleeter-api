import findTestUsersData from './utils';

module.exports = {
  async up(queryInterface, Sequelize) {
    const {Chokidar, Albertu, Gertrude, Poncha} = await findTestUsersData();
    
    await queryInterface.bulkInsert('likes', [
      {userId: Chokidar.id, likeableId: Albertu.Posts[0].likeableId},
      {userId: Chokidar.id, likeableId: Poncha.Posts[0].likeableId},
      {userId: Albertu.id, likeableId: Chokidar.Posts[0].likeableId},
      {userId: Albertu.id, likeableId: Poncha.Posts[0].likeableId},
      {userId: Albertu.id, likeableId: Poncha.Posts[1].likeableId},
      {userId: Poncha.id, likeableId: Poncha.Posts[0].likeableId},
      {userId: Poncha.id, likeableId: Poncha.Posts[1].likeableId},
      {userId: Chokidar.id, likeableId: Albertu.Comments[0].likeableId},
      {userId: Chokidar.id, likeableId: Gertrude.Comments[1].likeableId},
      {userId: Chokidar.id, likeableId: Gertrude.Comments[2].likeableId},
      {userId: Albertu.id, likeableId: Chokidar.Comments[0].likeableId},
      {userId: Albertu.id, likeableId: Gertrude.Comments[0].likeableId},
      {userId: Albertu.id, likeableId: Gertrude.Comments[1].likeableId},
      {userId: Albertu.id, likeableId: Gertrude.Comments[2].likeableId},
      {userId: Gertrude.id, likeableId: Chokidar.Comments[0].likeableId},
      {userId: Gertrude.id, likeableId: Albertu.Comments[0].likeableId},
      {userId: Poncha.id, likeableId: Chokidar.Comments[0].likeableId},
    ]);
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('likes', null, {});
  }
};
