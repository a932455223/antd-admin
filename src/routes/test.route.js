/**
 * Created by jufei on 2017/3/23.
 */
module.exports = {
  path: 'test(/:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/contact').default)
    }, 'test')
  }
};
