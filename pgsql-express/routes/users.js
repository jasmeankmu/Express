const express = require('express');
const router = express.Router();
const Connection = require('../settingDB');

/* GET users listing. */
router.get('/read', async (req, res, next) => {
  try {
    const { rows } = await Connection.query('select * FROM public."Usesr"');
    res.send(rows);
  } catch (err) {
    console.log(err);
    next();
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const rows = await Connection.query(
      `INSERT INTO public."Usesr" (id, "User_id", "User_pw", "User_name") 
        VALUES (DEFAULT, $1, $2, $3)`,
      [req.body.id, req.body.pw, req.body.name]
    );
    res.send(rows);
  } catch (err) {
    console.log(err);
    next();
  }
});

router.post('/update', async (req, res, next) => {
  try {
    //예시
    const rows = await Connection.query(`직접 채워보기 `, [
      req.body.id || 'default',
      req.body.pw || 'default',
      req.body.name || 'default',
    ]);
    console.log(rows);
    res.send(rows);
  } catch (err) {
    console.log(err);
    next();
  }
});

router.post('/delete', async (req, res, next) => {
  try {
    const rows = await Connection.query(`직접 채워보기 `, [req.body.id]);
    res.send(rows);
  } catch (err) {
    console.log(err);
    next();
  }
});

module.exports = router;
