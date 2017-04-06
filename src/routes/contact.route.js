/**
 * Created by jufei on 2017/3/20.
 */

module.exports = {
  path: 'contact',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/contact').default)
    }, 'contact')
  }
};


// module.exports = {
//   path: 'contact',
//   getComponent(nextState, cb) {
//     import('../components/contact')
//       .then( module => {
//         cb(null,module.default)
//       })
//   }
// };
