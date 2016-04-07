var m = require('mithril');
//var popup = require('popup');
//var Bullet = require('bullet');

var Login = {};





//CTRL
Login.controller = function(){

	var ctrl = {};

	ctrl.googleTokens = m.prop(false);
	ctrl.GoogleClick = m.prop();
	ctrl.test = m.prop(false);


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

		            auth2 = gapi.auth2.getAuthInstance();

		            ctrl.GoogleClick = function(){
		            	

		            	ctrl.googleTokens = m.prop(false);
		            	auth2
		            	.signIn()
		            	.then(function(googleUser){

		            		ctrl.googleLogin()
		            		
		            		ctrl.googleTokens = m.prop(googleUser);
		            		
		            		m.redraw(true);

		            	},function(error){
		            		console.log(error);
		            	});

		            };

		            
		            //right after auth initiated
		            auth2.then(function() {
		                var isAuthedCallback = function () {
		                  onSignInCallback(auth2.currentUser.get().getAuthResponse())
		                }
		                
		                // m
		                // .request({
		                // 	method:"GET",
		                // 	url:"http://localhost:8888/"
		                // })
		                // .then(function(data){
		                // 	//isAuthedCallback()
		                // })
		            });
		        });
		  	});
		};

		document.head.appendChild(script);


	ctrl.googleLogin = function(){
		
		m
		.request({
			method: "POST",
			url: m.urls("login"),
			data: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
		})
		.then(function(){
			m.route("/dashboard");
		});

	};

	//ctrl.inline_data = m.prop("Login with phone number or email address.");
	
	

	// ctrl.inline_help = function(element) {
	// 	elem = jQuery(element);

	// 	elem
	// 	  .popup({
	// 	    on: 'focus',
	// 	    content:ctrl.inline_data()
	// 	})

		
	// }

	return ctrl;
}



Login.form = function (ctrl) {
	return (
		{tag: "div", attrs: {class:"ui middle aligned center aligned grid login"}, children: [
			  {tag: "div", attrs: {class:"column"}, children: [
			    {tag: "h2", attrs: {class:"ui teal image header"}, children: [
			      {tag: "div", attrs: {class:"content"}, children: [
			        "Connect your account"
			      ]}
			    ]}, 
			    {tag: "form", attrs: {class:"ui large form"}, children: [
			      {tag: "div", attrs: {class:"ui stacked segment"}, children: [
			        {tag: "button", attrs: {type:"button", class:"ui google plus button", onclick:ctrl.GoogleClick}, children: [
			        	{tag: "i", attrs: {class:"google plus icon"}}, 
			        	"Login with Google Plus"
			        ]}

			      ]}, 

			      {tag: "div", attrs: {class:"ui error message"}}

			    ]}, 

			    {tag: "div", attrs: {class:"ui message"}, children: [
			      "Connect your Google account and get going!"
			    ]}
			  ]}
		]}

	)
}

Login.view = function(ctrl){
	var auth = require('module/auth');
	console.log(auth.checkCookie());
	return !ctrl.googleTokens() ? Login.form(ctrl) : require('module/loader').view(ctrl.googleLogin)
}


module.exports = Login;