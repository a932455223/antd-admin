/**
 * Created by jufei on 2017/3/20.
 */

module.exports = {
  path: 'book',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/Book/Book').default)
    }, 'book')
  },
  childRoutes: [

  ]
};
