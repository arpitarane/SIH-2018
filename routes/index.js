var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/test')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/register', function(req, res, next) {
//   res.render('register', { title: 'Express' });
// });

router.get('/initiatives', function(req, res, next) {
	initiatives.find(function(err,initiatives){
		res.render('initiatives', {
			title: 'Initiative Data',
			initiatives:initiatives 
		})
	});
});

router.get('/schemes', function(req, res, next) {
	schemes.find(function(err,schemes){
		res.render('schemes', {
			title: 'Scheme Data',
			schemes:schemes 
		})
	});
});

router.get('/embbed',function(req,res,next){
	res.render('embbed',{title: 'Embbed Data'});
});

router.get('/admin', function(req, res, next) {
	res.render('admin', {
		title: 'Official Page'
	})
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login Data' });
});

router.get('/scheme_form', function(req, res, next) {
  res.render('scheme_form', { title: 'Filling of Scheme Data' });
});

router.get('/initiative_form', function(req, res, next) {
  res.render('initiative_form', { title: 'Filling of Initiative Data' });
});

router.get('/submit', function(req, res, next) {
  res.render('submit', { title: 'Submit Data' });
});

router.post('/scheme_form',function(req,res,next){
	var schemeid = req.body.id;
	var schemename = req.body.schemename;
	var subschemename = req.body.subschemename;
	var studentfunds = req.body.studentfunds;
	var universityfunds = req.body.universityfunds;
	db.collection("addschemes").insert({'Scheme_ID':schemeid, 'Scheme_Name': schemename, 'Sub_Scheme_Name': subschemename, 'Student_Funds': studentfunds, 'University_Funds': universityfunds},function(err,result){
		if(result){
			var cursor = db.collection('addschemes').find();
			cursor.each(function(err,doc){
				console.log(doc);
			})
			console.log('Inserted');
			res.render('admin')
		}
		else{
			console.log('Error with database');
		}
	});
	/*db.collection("Users").findOne({'username': username , 'password': password},function(err,result){
		if(result){
			req.session.result = username;
			console.log('USERNAME:' +username);
			console.log('PASSWORD:' +password);
			/*var cursor = db.collection('Users').find().limit(2);
			cursor.each(function(err,doc){
				console.log(doc);
			})
			res.render('admin');
		}
		else{
			console.log('error');
			res.render('login',{err: 'INVALID USERNAME OR PASSWORD!!!'});
		}
	});*/
});

//registration form for initiatives backend
router.post('/initiative_form',function(req,res,next){
	var initiativeid = req.body.id;
	var initiativename = req.body.initiativename;
	var subinitiativename = req.body.subinitiativename;
	var yearofcommencement = req.body.yearofcommencement;
	db.collection("addinitiatives").insert({'Initiative_ID':initiativeid, 'Initiative_Name': initiativename, 'Sub_Initiative_Name': subinitiativename, 'Year_of_Commencement': yearofcommencement},function(err,result){
		if(result){
			var cursor = db.collection('addinitiatives').find();
			cursor.each(function(err,doc){
				console.log(doc);
			})
			console.log('Inserted');
			res.render('admin')
		}
		else{
			console.log('Error with database');
		}
	});
	/*db.collection("Users").findOne({'username': username , 'password': password},function(err,result){
		if(result){
			req.session.result = username;
			console.log('USERNAME:' +username);
			console.log('PASSWORD:' +password);
			/*var cursor = db.collection('Users').find().limit(2);
			cursor.each(function(err,doc){
				console.log(doc);
			})
			res.render('admin');
		}
		else{
			console.log('error');
			res.render('login',{err: 'INVALID USERNAME OR PASSWORD!!!'});
		}
	});*/
});

// router.get('/home', function(req, res, next) {
//   res.render('home', { title: 'Home Page' });
// });

router.get('/', function(req,res,next){
	var session = require('client-sessions');
  	req.session.reset();
	res.render('home',);
});

router.post('/login',function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;
	/*db.collection("Users").insertOne({username:'username',password: 'password',department: 'Staff',designation: 'Scheme_Head'},function(err,inserted){
		if(inserted){
			var cursor = db.collection('Users').find();
			cursor.each(function(err,doc){
				console.log(doc);
			})
			console.log('Inserted');
		}
		else{
			console.log('Error with database');
		}
	});*/
	db.collection("Users").find({'username':username},{'email':1});
	db.collection("Users").findOne({'username': username , 'password': password},function(err,result){
		if(result){
			req.session.result = username;
			console.log('USERNAME:' +username);
			console.log('PASSWORD:' +password);
			/*var cursor = db.collection('Users').find().limit(2);
			cursor.each(function(err,doc){
				console.log(doc);
			})*/
			res.render('admin');
		}
		else{
			console.log('error');
			res.render('login',{err: 'INVALID USERNAME OR PASSWORD!!!'});
		}
	});      
});

//Defining Schema 
	
var InitiativeSchema = mongoose.Schema({
	Institute_Permanent_ID: String,
	Institute_Name: String,
	University: String,
	State: String,
	District: String,
	City: String,
	Initiative: String,
	Sub_Initiative: String,
	Date_of_Application: Date,
	Year_of_Commencement: Number,
	Status: String
});

var initiatives = mongoose.model('initiative',InitiativeSchema);

var SchemeSchema = mongoose.Schema({
	Institute_Permanent_ID: String,
	Institute_Name: String,
	University: String,
	State: String,
	District: String,
	City: String,
	Scheme: String,
	Sub_Scheme: String,
	Enrollments: Number,
	Start_Date: Date,
	End_Date: Date,
	Duration: Number,
	Status: String,
	Fund_Indicator: String,
	Funds_Given: Number,
	Total_Funds: Number
});

var schemes = mongoose.model('scheme',SchemeSchema);

var userSchema = mongoose.Schema({
	_id:{
		type: mongoose.Schema.Types.ObjectId,
	    ref: 'User',
	    required: true
	},
	username: {
		type: String,
    	required: true,
    	minlength: 6 
	},
	password: {
		type: String,
    	required: true,
    	minlength: 5,
    	maxlength: 8 
	},
	email: {
		type:String,
    	required: true
    	
	},
	Indicator: {
		type: Number
    	
	},
	department: String,
	designation: String
});


var schemes = mongoose.model('scheme',SchemeSchema);

var MahSchema = mongoose.Schema({
	Institute_Permanent_ID: String,
	Institute_Name: String,
	University: String,
	State: String,
	District: String,
	City: String,
	Scheme: String,
	Sub_Scheme: String,
	Enrollments: Number,
	Start_Date: Date,
	End_Date: Date
});



var mschemes = mongoose.model('mscheme',MahSchema);

var UpSchema = mongoose.Schema({
	Institute_Permanent_ID: String,
	Institute_Name: String,
	University: String,
	State: String,
	District: String,
	City: String,
	Scheme: String,
	Sub_Scheme: String,
	Enrollments: String,
	Start_Date: Date,
	End_Date: Date
});

var uschemes = mongoose.model('uscheme',UpSchema);

var TamSchema = mongoose.Schema({
	Institute_Permanent_ID: String,
	Institute_Name: String,
	University: String,
	State: String,
	District: String,
	City: String,
	Scheme: String,
	Sub_Scheme: String,
	Enrollments: String,
	Start_Date: Date,
	End_Date: Date
});

var tschemes = mongoose.model('tscheme',TamSchema);

router.get('/ddbmain', function(req, res, next) {
  res.render('ddbmainpage', { title: 'Login' });
});

router.post('/loggedin', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	db.collection("Users").findOne({'username': username , 'password': password},function(err,result){
		if(result){
			req.session.result = username;
			console.log('USERNAME:' +username);
			console.log('PASSWORD:' +password);
			res.render('ddbmainpage', { title: 'Insert Update Delete' });
		}
		else{
			console.log('error');
			res.render('ddbmainpage',{err: 'INVALID USERNAME OR PASSWORD!!!'});
		}
	});
});

router.get('/insert', function(req, res, next) {
	res.render('insert', { title: 'Insert Data' });
});

router.post('/inserted',function(req,res,next) {
	console.log('entering values');
	var instituteid = req.body.instituteid;
	var institutename = req.body.institutename;
	var university = req.body.university;
	var state = req.body.state;
	var district = req.body.district;
	var city = req.body.city;
	var schemename = req.body.schemename;
	var subschemename = req.body.subschemename;
	var enrollments = req.body.enrollments;
	var startdate = req.body.startdate;
	var enddate = req.body.enddate;
	console.log(state);
    if(state == "Maharashtra")
	{
		db.collection("mschemes").insert({'Institute_Permanent_ID':instituteid, 'Institute_Name': institutename, 'University': university, 'State': state, 'District': district,'City':city, 'Scheme_Name': schemename, 'Sub_Scheme_Name': subschemename, 'Enrollments': enrollments, 'Start_Date': startdate,'End_Date': enddate},function(err,result){
			if(result){
				console.log('Inserted');
				res.render('loggedin');
			}
			else{
				console.log('Error with database');
			}
		});
	}
	else if(state == "Tamil Nadu")
	{
		db.collection("tschemes").insert({'Institute_Permanent_ID':instituteid, 'Institute_Name': institutename, 'University': university, 'State': state, 'District': district,'City':city, 'Scheme_Name': schemename, 'Sub_Scheme_Name': subschemename, 'Enrollments': enrollments, 'Start_Date': startdate,'End_Date': enddate},function(err,result){
			if(result){
				console.log('Inserted');
				res.render('loggedin');
			}
			else{
				console.log('Error with database');
			}
		});
	}
	else if(state == "Uttar Pradesh")
	{
		db.collection("uschemes").insert({'Institute_Permanent_ID':instituteid, 'Institute_Name': institutename, 'University': university, 'State': state, 'District': district,'City':city, 'Scheme_Name': schemename, 'Sub_Scheme_Name': subschemename, 'Enrollments': enrollments, 'Start_Date': startdate,'End_Date': enddate},function(err,result){
			if(result){
				console.log('Inserted');
				res.render('loggedin');
			}
			else{
				console.log('Error with database');
			}
		});
	}
	else{
		console.log('Not checking');
	}
});
router.get('/update', function(req, res, next) {
  res.render('update', { title: 'Update Data' });
});

router.post('/updated',function(req,res,next){
	var state = req.body.state;
	var institute_id = req.body.institute_id;
	var scheme = req.body.scheme;
	var sub_scheme = req.body.sub_scheme;
	var enrollments = req.body.enrollments;
	if(state == "Maharashtra"){
		db.collection("mschemes").updateOne({Institute_Permanent_ID:institute_id ,Scheme_Name:scheme,Sub_Scheme_Name:sub_scheme},{$set:{Enrollments:enrollments}},function(err,result){
			if(result){
				console.log('Modified Values');
		        res.render('loggedin');	
			}
			else{
				console.log('could not update');
			}
		});
		
	}
	if(state == "Tamil Nadu"){
		db.collection("tschemes").updateOne({Institute_Permanent_ID:institute_id ,Scheme_Name:scheme,Sub_Scheme_Name:sub_scheme},{$set:{Enrollments:enrollments}},function(err,result){
			if(result){
				console.log('Modified Values');
		        res.render('loggedin');	
			}
			else{
				console.log('could not update');
			}
		});
		
	}
	if(state == "Uttar Pradesh"){
		db.collection("tschemes").updateOne({Institute_Permanent_ID:institute_id ,Scheme_Name:scheme,Sub_Scheme_Name:sub_scheme},{$set:{Enrollments:enrollments}},function(err,result){
			if(result){
				console.log('Modified Values');
		        res.render('loggedin');	
			}
			else{
				console.log('could not update');
			}
		});
		
	}
});

/*router.post('/updated',function(req,res,next) {
	var state = req.body.state;
	var institute_id = req.body.institute_id;
	var scheme = req.body.scheme;
	var sub_scheme = req.body.sscheme;
	var enrollments = req.body.enrollments;
	var myquery = { Institute_Permanent_ID:institute_id ,Scheme_Name:scheme,Sub_Scheme_Name:sub_scheme };
	var newvalues = { $set: {Enrollments: enrollments } };
	if(state == "Maharashtra")
	{
		db.collection("mschemes").updateOne(myquery,newvalues,function(err,result){
			if(result){
				console.log("1 document updated in Maharshtra Schema");
				db.close();
				res.render('loggedin');
		    }
			else if (err){
				console.log('could not update');
			} 
	  });
	}
	if(state == "Tamil Nadu")
	{
		db.collection("tschemes").updateOne(myquery,newvalues,function(err,res){
			if(result){
				console.log("1 document updated");
				db.close();
				res.render('loggedin');
		    }
			else if (err){
				console.log('could not update');
			} 
	  });
	}
	if(state == "Uttar Pradesh")
	{
		db.collection("uschemes").updateOne(myquery,newvalues,function(err,res){
			if(result){
				console.log("1 document updated");
				db.close();
				res.render('loggedin');
		    }
			else if (err){
				console.log('could not update');
			} 
	  });
	}
});
*/

router.get('/delete', function(req, res, next) {
  res.render('delete', { title: 'Delete Data' });
});

router.post('/deleted',function(req,res,next) {
	var state = req.body.state;
	var institute_id = req.body.institute_id;
	var scheme = req.body.scheme;
	var sub_scheme = req.body.sscheme;
	if(state=="Maharashtra")
	{
		db.collection("mschemes").deleteOne({ Institute_Permanent_ID:institute_id ,Scheme_Name:scheme,Sub_Scheme_Name:sub_scheme },function(err,result){
			if(result){
				console.log("1 document deleted");
				db.close();
				res.render('loggedin');
			}
			else if (err){
                console.log("did not delete");
			}

		});
	}
	else if(state=="Tamil Nadu")
	{
		db.collection("tschemes").deleteOne({ Institute_Permanent_ID:institute_id ,Scheme_Name:scheme,Sub_Scheme_Name:sub_scheme },function(err,result){
			if(result){
				console.log("1 document deleted");
				db.close();
				res.render('loggedin');
			}
			else if (err){
                console.log("did not delete");
			}

		});
	}
	else if(state=="Uttar Pradesh")
	{
		db.collection("uschemes").deleteOne({ Institute_Permanent_ID:institute_id ,Scheme_Name:scheme,Sub_Scheme_Name:sub_scheme },function(err,result){
			if(result){
				console.log("1 document deleted");
				db.close();
				res.render('loggedin');
			}
			else if (err){
                console.log("did not delete");
			}

		});
	}
});

router.get('/viewschemes', function(req, res, next) {
  res.render('viewschemes', { title: 'View Data' });
});

router.get('/viewmaharashtra', function(req, res, next) {
	console.log('entered route')
	mschemes.find(function(err,mschemes){
		if(mschemes){
			console.log('Searched DB');
			res.render('viewmaharashtra',{
				mschemes:mschemes
			})
		}
		else{
			console.log('could not find db');
		}    
	});
});


router.get('/viewtamilnadu', function(req, res, next) {
	console.log('entered route')
	tschemes.find(function(err,tschemes){
		if(tschemes){
			console.log('Searched DB');
			res.render('viewtamilnadu',{
				tschemes:tschemes
			})
		}
		else{
			console.log('could not find db');
		}    
	});
});

router.get('/viewuttarpradesh', function(req, res, next) {
	console.log('entered route')
	uschemes.find(function(err,uschemes){
		if(uschemes){
			console.log('Searched DB');
			res.render('viewuttarpradesh',{
				uschemes:uschemes
			})
		}
		else{
			console.log('could not find db');
		}    
	});
});


var Users = mongoose.model('User', userSchema);

var AddSchemeSchema = mongoose.Schema({
	_id:{
		type: mongoose.Schema.Types.ObjectId,
	    ref: 'AddScheme',
	    required: true
	},
	Scheme_ID: {
		type: String,
    	required: true,
    	maxlength: 7 
	},
	Scheme_Name: {
		type: String,
    	required: true
	},
	Sub_Scheme_Name: {
		type: String,
    	required: true
	},
	Student_Funds: {
		type: Number
    	
	},
	University_Funds: {
		type: Number
	}
});

var addschemes = mongoose.model('AddScheme', AddSchemeSchema);

var AddInitiativeSchema = mongoose.Schema({
	_id:{
		type: mongoose.Schema.Types.ObjectId,
	    ref: 'Addinitiative',
	    required: true
	},
	Initiative_ID: {
		type: String,
    	required: true,
    	maxlength: 7 
	},
	Initiative_Name: {
		type: String,
    	required: true
	},
	Sub_Initiative_Name: {
		type: String,
    	required: true
	},
	Year_of_Commencement: {
		type: Date,
    	required: true
	}
});

var addinitiatives = mongoose.model('Addinitiative', AddInitiativeSchema);


module.exports = router;



router.get('/embbeded', function(req, res, next) {
	res.render('embbeded', {
		title: 'Embbed Data'
	})
});

router.get('/scheme_form', function(req, res, next) {
	res.render('scheme_form', {
		title: 'Scheme Form'
	})
});

router.get('/initiatives_form', function(req, res, next) {
	res.render('initiatives_form', {
		title: 'Initatives Form'
	})
});

router.get('/captcha', function(req, res, next) {
	res.render('captcha', {
		title: 'captcha'
	})
});

router.get('/scheme_details', function(req, res, next) {
	res.render('scheme_details', {
		title: 'Scheme details'
	})
});
router.get('/initiative', function(req, res, next) {
	res.render('initiative', {
		title: 'initiative'
	})
});
router.get('/initiative_details', function(req, res, next) {
	res.render('initiative_details', {
		title: 'initiative details'
	})
});

router.get('/user_g', function(req, res, next) {
	res.render('user_g', {
		title: 'user guide'
	})
});

router.get('/user_guide', function(req, res, next) {
	res.render('user_guide', {
		title: 'user guide'
	})
});
