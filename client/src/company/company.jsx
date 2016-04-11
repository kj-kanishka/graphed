var auth = require('module/auth');
var company={};


company.controller = function(){


	console.log("djhfgdjhf");
	
	auth.user(function(data){
		console.log("callback",data)
	});
if(auth.isLoggedIn()())
{

	//console.log("dcdc",auth.data())
}

}





module.exports = company;
/*<div class="ui negative message">
  <i class="close icon"></i>
  <div class="header">
    We're sorry we can't apply that discount
  </div>
  <p>That offer has expired
</p></div>*/