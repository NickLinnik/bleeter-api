import {Comment} from '../models';
import findTestUsersData from './utils';

module.exports = {
  async up(queryInterface, Sequelize) {
    const {Chokidar, Albertu, Gertrude, Poncha} = await findTestUsersData();
    
    await Comment.bulkCreate([
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lacus nec hendrerit porta. Phasellus non ex eget orci pulvinar pulvinar. Nulla facilisi.',
        userId: Chokidar.id,
        postId: Poncha.Posts[0].id
      },
      {
        text: 'Donec posuere a justo lobortis dignissim. Cras lobortis quam sed lacus suscipit, non hendrerit ex convallis. Nam eleifend efficitur varius. Aliquam id imperdiet ex.',
        userId: Albertu.id,
        postId: Chokidar.Posts[0].id
      },
      {
        text: 'Fusce consectetur ex laoreet pretium consectetur. Phasellus ut tristique ligula, ac interdum justo. Proin ultricies blandit metus quis auctor. Maecenas libero ante, tempus eleifend vulputate eu, commodo quis nibh. Cras placerat fringilla dui, nec congue magna volutpat et.',
        userId: Albertu.id,
        postId: Poncha.Posts[0].id
      },
      {
        text: 'Morbi tincidunt ultrices augue in condimentum. Etiam porttitor in tellus eu convallis. Nunc a fringilla lorem, ac commodo quam. Curabitur quis vehicula magna. Praesent id pharetra neque, vitae fringilla lorem.',
        userId: Gertrude.id,
        postId: Chokidar.Posts[0].id
      },
      {
        text: 'Duis lacinia dignissim vulputate. Mauris placerat egestas elementum. Sed pretium ligula sit amet fringilla ultricies. Proin pellentesque, felis non scelerisque fermentum, nibh ante gravida massa, eu blandit sem quam vel nisi.',
        userId: Gertrude.id,
        postId: Albertu.Posts[0].id
      },
      {
        text: 'Sed hendrerit erat ac laoreet bibendum. Nam pretium augue sed volutpat feugiat. Etiam commodo hendrerit sapien, sit amet mollis elit pellentesque vitae. Ut tempus sem erat, at aliquet purus convallis nec. Nam sodales feugiat metus sed pellentesque.',
        userId: Gertrude.id,
        postId: Poncha.Posts[0].id
      }
    ]);
  },
  
  async down() {
    await Comment.destroy({where: {}});
  }
};
