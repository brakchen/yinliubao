var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// health check
// 健康检查路由
router.get('/health', function(req, res) {
  res.json({ errno: 0, errormsg: 'Alive' });
});


module.exports = router;
