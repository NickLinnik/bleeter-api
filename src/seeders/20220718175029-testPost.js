import {Post} from '../models';

module.exports = {
  async up(queryInterface) {
    const [NickId, AlbertuId, PonchaId] = await Promise.all([queryInterface.rawSelect('users', {
      where: {
        login: 'Nick'
      }
    }, ['id']), queryInterface.rawSelect('users', {
      where: {
        login: 'Albertu'
      }
    }, ['id']), queryInterface.rawSelect('users', {
      where: {
        login: 'Poncha'
      }
    }, ['id'])]);
    
    await Post.bulkCreate([
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lacus neque, dignissim nec ornare eu, venenatis et urna. Nulla at nunc a lacus tempus gravida volutpat at justo. Nam suscipit massa id augue laoreet, eu sodales elit commodo. Maecenas sodales dolor viverra tincidunt molestie. Aenean quis iaculis mi, ut ornare leo. Maecenas molestie dapibus mi et efficitur. Praesent pretium turpis et pulvinar tincidunt. Maecenas finibus velit ipsum. Aliquam sit amet erat pharetra, rhoncus felis at, aliquet ex.',
        userId: NickId
      },
      {
        text: 'Nulla eget urna sit amet massa sagittis blandit at sit amet magna. Nulla porttitor tellus sit amet justo suscipit, non placerat augue imperdiet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi in nunc ex. Suspendisse feugiat, diam eu bibendum tristique, purus ipsum ornare nunc, id iaculis tellus quam quis elit. Praesent aliquam molestie magna et facilisis. Aenean a dui nunc. Proin eu dui laoreet, varius felis ut, elementum nunc. Aenean vestibulum consectetur ullamcorper. Maecenas ultrices vehicula varius. Sed nunc lorem, vulputate non massa in, tincidunt egestas mi. Pellentesque commodo risus nibh, a vestibulum ipsum varius vel. Nunc faucibus ut neque rutrum bibendum.',
        userId: AlbertuId
      },
      {
        text: 'Duis sollicitudin consequat ex nec pellentesque. Vestibulum efficitur ex nisl, id posuere metus vehicula quis. Integer sollicitudin accumsan neque, vitae bibendum diam tempor et. Sed hendrerit, massa vitae ultrices ultricies, turpis velit volutpat ante, at consequat diam urna eu libero. Nulla ac velit est. Donec sagittis varius nisi, venenatis egestas ligula pharetra ut. Morbi ullamcorper eros eu aliquet venenatis.',
        userId: PonchaId
      },
      {
        text: 'Nam id suscipit lectus, fringilla pretium quam. Nullam dolor diam, bibendum vitae condimentum tempus, auctor id ex. Nullam vel eros ut dolor vehicula sagittis ac in nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent tempus eleifend nunc non malesuada. Aliquam erat volutpat. Pellentesque facilisis sapien enim, eget lobortis ante tincidunt ut. Ut fringilla, lacus sit amet pretium accumsan, eros mauris finibus enim, sed congue dui risus non dolor. Proin a tincidunt sem. Suspendisse ac porttitor enim, sed tincidunt leo.',
        userId: PonchaId
      }
    ]);
    
    // await Promise.all([
    //   Post.create({
    //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lacus neque, dignissim nec ornare eu, venenatis et urna. Nulla at nunc a lacus tempus gravida volutpat at justo. Nam suscipit massa id augue laoreet, eu sodales elit commodo. Maecenas sodales dolor viverra tincidunt molestie. Aenean quis iaculis mi, ut ornare leo. Maecenas molestie dapibus mi et efficitur. Praesent pretium turpis et pulvinar tincidunt. Maecenas finibus velit ipsum. Aliquam sit amet erat pharetra, rhoncus felis at, aliquet ex.',
    //     userId: NickId
    //   }),
    //
    //   Post.create({
    //     text: 'Nulla eget urna sit amet massa sagittis blandit at sit amet magna. Nulla porttitor tellus sit amet justo suscipit, non placerat augue imperdiet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi in nunc ex. Suspendisse feugiat, diam eu bibendum tristique, purus ipsum ornare nunc, id iaculis tellus quam quis elit. Praesent aliquam molestie magna et facilisis. Aenean a dui nunc. Proin eu dui laoreet, varius felis ut, elementum nunc. Aenean vestibulum consectetur ullamcorper. Maecenas ultrices vehicula varius. Sed nunc lorem, vulputate non massa in, tincidunt egestas mi. Pellentesque commodo risus nibh, a vestibulum ipsum varius vel. Nunc faucibus ut neque rutrum bibendum.',
    //     userId: AlbertuId
    //   }),
    //
    //   Post.create({
    //     text: 'Duis sollicitudin consequat ex nec pellentesque. Vestibulum efficitur ex nisl, id posuere metus vehicula quis. Integer sollicitudin accumsan neque, vitae bibendum diam tempor et. Sed hendrerit, massa vitae ultrices ultricies, turpis velit volutpat ante, at consequat diam urna eu libero. Nulla ac velit est. Donec sagittis varius nisi, venenatis egestas ligula pharetra ut. Morbi ullamcorper eros eu aliquet venenatis.',
    //     userId: PonchaId
    //   }),
    //
    //   Post.create({
    //     text: 'Nam id suscipit lectus, fringilla pretium quam. Nullam dolor diam, bibendum vitae condimentum tempus, auctor id ex. Nullam vel eros ut dolor vehicula sagittis ac in nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent tempus eleifend nunc non malesuada. Aliquam erat volutpat. Pellentesque facilisis sapien enim, eget lobortis ante tincidunt ut. Ut fringilla, lacus sit amet pretium accumsan, eros mauris finibus enim, sed congue dui risus non dolor. Proin a tincidunt sem. Suspendisse ac porttitor enim, sed tincidunt leo.',
    //     userId: PonchaId
    //   })
    // ]);
  },
  
  async down() {
    await Post.destroy({where: {}});
  }
};


// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const [NickId, AlbertuId, PonchaId] = await Promise.all([queryInterface.rawSelect('users', {
//       where: {
//         login: 'Nick'
//       }
//     }, ['id']), queryInterface.rawSelect('users', {
//       where: {
//         login: 'Albertu'
//       }
//     }, ['id']), queryInterface.rawSelect('users', {
//       where: {
//         login: 'Poncha'
//       }
//     }, ['id'])]);
//
//     await queryInterface.bulkInsert('posts', [
//       {
//         userId: NickId,
//         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lacus neque, dignissim nec ornare eu, venenatis et urna. Nulla at nunc a lacus tempus gravida volutpat at justo. Nam suscipit massa id augue laoreet, eu sodales elit commodo. Maecenas sodales dolor viverra tincidunt molestie. Aenean quis iaculis mi, ut ornare leo. Maecenas molestie dapibus mi et efficitur. Praesent pretium turpis et pulvinar tincidunt. Maecenas finibus velit ipsum. Aliquam sit amet erat pharetra, rhoncus felis at, aliquet ex.'
//       },
//       {
//         userId: AlbertuId,
//         text: 'Nulla eget urna sit amet massa sagittis blandit at sit amet magna. Nulla porttitor tellus sit amet justo suscipit, non placerat augue imperdiet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi in nunc ex. Suspendisse feugiat, diam eu bibendum tristique, purus ipsum ornare nunc, id iaculis tellus quam quis elit. Praesent aliquam molestie magna et facilisis. Aenean a dui nunc. Proin eu dui laoreet, varius felis ut, elementum nunc. Aenean vestibulum consectetur ullamcorper. Maecenas ultrices vehicula varius. Sed nunc lorem, vulputate non massa in, tincidunt egestas mi. Pellentesque commodo risus nibh, a vestibulum ipsum varius vel. Nunc faucibus ut neque rutrum bibendum.'
//       },
//       {
//         userId: PonchaId,
//         text: 'Duis sollicitudin consequat ex nec pellentesque. Vestibulum efficitur ex nisl, id posuere metus vehicula quis. Integer sollicitudin accumsan neque, vitae bibendum diam tempor et. Sed hendrerit, massa vitae ultrices ultricies, turpis velit volutpat ante, at consequat diam urna eu libero. Nulla ac velit est. Donec sagittis varius nisi, venenatis egestas ligula pharetra ut. Morbi ullamcorper eros eu aliquet venenatis.'
//       },
//       {
//         userId: PonchaId,
//         text: 'Nam id suscipit lectus, fringilla pretium quam. Nullam dolor diam, bibendum vitae condimentum tempus, auctor id ex. Nullam vel eros ut dolor vehicula sagittis ac in nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent tempus eleifend nunc non malesuada. Aliquam erat volutpat. Pellentesque facilisis sapien enim, eget lobortis ante tincidunt ut. Ut fringilla, lacus sit amet pretium accumsan, eros mauris finibus enim, sed congue dui risus non dolor. Proin a tincidunt sem. Suspendisse ac porttitor enim, sed tincidunt leo.'
//       }
//     ]);
//   },
//
//   async down(queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('posts', null, {});
//   }
// };