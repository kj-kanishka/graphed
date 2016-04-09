
var auth = require('module/auth');
var Login = {};





//CTRL
Login.controller = function(){
	if(auth.isLoggedIn()()){
		m.route("/dashboard");
	}
	var ctrl = {};
	

	ctrl.googleTokens = m.prop(false);
	ctrl.GoogleClick = m.prop();
	ctrl.ErrorMsg = m.prop("Error msg here");
	ctrl.newUser = {firstname:m.prop(""),lastname:m.prop(""),password:m.prop(""),email_id:m.prop("")};
	ctrl.new=m.prop({});

	ctrl.LoadGOne = function(element){
		var elem = jQuery(element);
		var button = (elem.find("button.google.plus"));


		var script = document.createElement('script');
			script.src = "https://plus.google.com/js/client:plusone.js";
			script.onload = function () {

				gapi.load('auth2', function(){
					gapi.auth2.init({
						client_id: '905249695279-seq2aus8mnd40i3a9bo21truglfgktpk.apps.googleusercontent.com',
				        cookiepolicy: 'single_host_origin',
				        fetch_basic_profile: false,
				        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.login'
				    }).then(function (){		        
				    	 
				    	console.log("Google + init")
			            
			            auth2 = gapi.auth2.getAuthInstance();

			            ctrl.GoogleClick = function(){

			            	ctrl.ErrorMsg = m.prop();

			            	button.addClass('loading');
			            	
			            	auth2
			            	.signIn()
			            	.then(function(googleUser){

			            		button.removeClass('loading');

			            		ctrl.googleLogin();
			            		
			            		ctrl.googleTokens = m.prop(googleUser);
			            		
			            		m.redraw(true);

			            	},function(error){
			            		elem.addClass('error');
			            		ctrl.ErrorMsg = m.prop("Something wrong happened! Try again, perhaps?");
			            		button.removeClass('loading');
			            		m.redraw(true);
			            		console.log(error);
			            	});

			            };
			            
			            //right after auth initiated
			            auth2.then(function() {
			            	//redraw for onclick
			            	m.redraw(true);   
			            	
			            	button.removeClass('loading');
			                
			            });

			        });
			  	});
			};

			document.head.appendChild(script);
	}

	ctrl.googleLogin = function(){
		
		m
		.request({
			method: "POST",
			url: m.urls("user"),
			data: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
		})
		.then(function(data){
			auth.setSession(data.token);
			m.route("/dashboard");
		});

	};

	ctrl.signup = function(){
		console.log("######");
		ctrl.new().firstname=ctrl.newUser.firstname();
		ctrl.new().lastname=ctrl.newUser.lastname();
		ctrl.new().password=ctrl.newUser.password();
		ctrl.new().email_id=ctrl.newUser.email_id();
		
		m
		.request({
			method: "POST",
			url: m.urls("user"),
			data: ctrl.new(),//new Object({"test":"test"})
		})
		.then(function(data){
			console.log("3333333",data.data.token)
			auth.setSession(data.data.token);
			m.route("/company");
		});

	}
	ctrl.sign_in = function(){
		
		ctrl.new().password=ctrl.newUser.password();
		ctrl.new().email_id=ctrl.newUser.email_id();
		
		m
		.request({
			method: "POST",
			url: m.urls("user","session"),
			data: ctrl.new(),//new Object({"test":"test"})
		})
		.then(function(data){
			console.log("3333333",data.data.token)
			auth.setSession(data.data.token);
			m.route("/company");
		});

	}
	return ctrl;
}



Login.form = function (ctrl) {
	return (
		<div class="ui middle aligned center aligned grid login">
			  <div class="column">
			    <h2 class="ui teal image header">
			      <div class="content">
			        Connect your account
			      </div>
			    </h2>
			    <div class="row">
			    <form class="ui large form" config={ctrl.LoadGOne} >
			      <div class="ui stacked segment">
			      <div class="row">
			      <h1> signup </h1>
			      First name:
				  <input type="text" name="firstname" oninput={m.withAttr("value",ctrl.newUser.firstname)} value={ctrl.newUser.firstname()}></input>
				  Last name:
				  <input type="text" name="lastname" oninput={m.withAttr("value",ctrl.newUser.lastname)} value={ctrl.newUser.lastname()}></input>
				  </div>
				  <div class="row">
				  Email id:
				  <input type="text" name="email_id" oninput={m.withAttr("value",ctrl.newUser.email_id)} value={ctrl.newUser.email_id()}></input>
				  </div>
				  <div class="row">
				  password
				  <input type="password" name="password" oninput={m.withAttr("value",ctrl.newUser.password)} value={ctrl.newUser.password()}></input>
				  </div>
				  <div class="row">
			        <button type="button" class="submit" onclick={ctrl.signup}>
			        	
			        	Submit
			        </button>
			       </div>
				  <div class="row">
			        <button type="button" class="ui google plus loading button" onclick={ctrl.GoogleClick}>
			        	<i class="google plus icon"></i>
			        	Login with Google Plus
			        </button>
			       </div>

			      </div>

			      <div class="ui error message">{ctrl.ErrorMsg()}</div>
			    
			    </form>
			    </div>
			    <div class= "row">
			    <form class="ui large form" config={ctrl.LoadGOne} >
			    <h1>  Login </h1>

			    <div class="row">
				  Email id:
				  <input type="text" name="email_id" oninput={m.withAttr("value",ctrl.newUser.email_id)} value={ctrl.newUser.email_id()}></input>
				  </div>
				  <div class="row">
				  password
				  <input type="password" name="password" oninput={m.withAttr("value",ctrl.newUser.password)} value={ctrl.newUser.password()}></input>
				  </div>
				  <div class="row">
			        <button type="button" class="submit" onclick={ctrl.sign_in}>
			        	
			        	Submit
			        </button>
			       </div>

			    

			    

			    </form>

			    </div>

			    <div class="ui message">
			      Connect your Google account and get going!
			    </div>
			  </div>
		</div>

	)
}

Login.view = function(ctrl){

	return !ctrl.googleTokens() ? Login.form(ctrl) : require('module/loader')
}



module.exports = Login;