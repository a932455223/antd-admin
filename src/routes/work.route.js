/**
 * Created by jufei on 2017/3/20.
 */

module.exports = {
  path: 'work',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/work/work').default)
    }, 'work');
    // import('../components/work')
    //   .then(module => {
    //     var work = module.default;
    //     cb(null, work)
    //   })
  }
};
