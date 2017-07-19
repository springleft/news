var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
	host: 'localhost',
	port:'3306', 
    user: 'root',
    password: '123456',
    database: 'web01'
})

/* GET admin page. */
router.get('/', function(req, res, next) {
  res.render('admin' ,{});
});




//查找
router.get('/getnews',function(req,res){
	
	con.query('SELECT * FROM `news_db`',function(err,rows,f){
	  
      if(!err){
      	res.send(rows);
      }
	})
})


  

//添加
router.post('/addnews',function(req,res){
	var  userAddSql = 'INSERT INTO `news_db`(`title`,`text`,`address`,`source`,`date`,`label`) VALUES(?,?,?,?,?,?)';
    var  userAddSql_Params = [req.body.title,req.body.text,req.body.address,req.body.source, req.body.date,req.body.label];
	con.query(userAddSql,userAddSql_Params,function(err,result,f){
		if(err){
			console.log(err);
		}else{
			res.send(result);
		}      
	})
})

//修改
router.put('/update',function(req,res){
	var UpdateSql = 'UPDATE `news_db` SET `title`=?,`text`=?,`address`=?,`source`=?,`date`=?,`label`=? WHERE `id`=?';
    var UpdateSql_Params = [req.body.title,req.body.text,req.body.address,req.body.source, req.body.date,req.body.label,req.body.id];
    console.log(UpdateSql_Params);
    con.query(UpdateSql,UpdateSql_Params,function(err,result,f){
    	if(err){
    		console.log(err);
    	}else{
    		console.log(result);
    	res.send(result);
		}
    })
})

//删除
router.delete('/delete',function(req,res){
	var id=req.body.id;
	con.query('DELETE FROM `news_db` WHERE id='+id ,function(err,result,f){
		if(err){
			console.log(err);
		}else{
			res.send(result);
		}
		
	})

})

//左右对应
router.get('/shownews',function(req,res){
	// 如果是get请求  则查询信息在req.query中
	id = req.query.id;
	con.query('SELECT * FROM `news_db` WHERE id='+id ,function(err,rows,f){
		if(err){
			console.log(err);
		}else{
			res.send(rows);
		}
		
	})
})

//查找某一个
router.get('/thatnews',function(req,res){
	// 如果是get请求  则查询信息在req.query中
	label = req.query.label;

	con.query('SELECT * FROM `news_db` WHERE label=?',[label],function(err,rows,f){
		res.send(rows);
	})
})

module.exports = router;
