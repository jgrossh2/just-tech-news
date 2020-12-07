const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
//merge dashboard router module into the app
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;