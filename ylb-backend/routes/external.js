var express = require('express');
var router = express.Router();
// 健康检查路由
router.get('/health', function(req, res) {
  res.json({ errno: 0, errormsg: 'Alive' });
})
router.get('/a', function(req, res) {
    res.json({ errno: 0, errormsg: 'Alivea' });
  })

router.get('/b', function(req, res) {
    res.json({ errno: 0, errormsg: 'Aliveb' });
  })

module.exports = router;
