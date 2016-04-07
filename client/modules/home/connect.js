
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
	//ctrl.newUser = m.prop({'first_name':"",'last_name':""});

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
			m.route("/dashboard");
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
		{tag: "div", attrs: {class:"ui middle aligned center aligned grid login"}, children: [
			  {tag: "div", attrs: {class:"column"}, children: [
			    {tag: "h2", attrs: {class:"ui teal image header"}, children: [
			      {tag: "div", attrs: {class:"content"}, children: [
			        "Connect your account"
			      ]}
			    ]}, 
			    {tag: "div", attrs: {class:"row"}, children: [
			    {tag: "form", attrs: {class:"ui large form", config:ctrl.LoadGOne}, children: [
			      {tag: "div", attrs: {class:"ui stacked segment"}, children: [
			      {tag: "div", attrs: {class:"row"}, children: [
			      {tag: "h1", attrs: {}, children: [" signup "]}, 
			      "First name:", 
				  {tag: "input", attrs: {type:"text", name:"firstname", oninput:m.withAttr("value",ctrl.newUser.firstname), value:ctrl.newUser.firstname()}}, 
				  "Last name:", 
				  {tag: "input", attrs: {type:"text", name:"lastname", oninput:m.withAttr("value",ctrl.newUser.lastname), value:ctrl.newUser.lastname()}}
				  ]}, 
				  {tag: "div", attrs: {class:"row"}, children: [
				  "Email id:", 
				  {tag: "input", attrs: {type:"text", name:"email_id", oninput:m.withAttr("value",ctrl.newUser.email_id), value:ctrl.newUser.email_id()}}
				  ]}, 
				  {tag: "div", attrs: {class:"row"}, children: [
				  "password", 
				  {tag: "input", attrs: {type:"password", name:"password", oninput:m.withAttr("value",ctrl.newUser.password), value:ctrl.newUser.password()}}
				  ]}, 
				  {tag: "div", attrs: {class:"row"}, children: [
			        {tag: "button", attrs: {type:"button", class:"submit", onclick:ctrl.signup}, children: [
			        	
			        	"Submit"
			        ]}
			       ]}, 
				  {tag: "div", attrs: {class:"row"}, children: [
			        {tag: "button", attrs: {type:"button", class:"ui google plus loading button", onclick:ctrl.GoogleClick}, children: [
			        	{tag: "i", attrs: {class:"google plus icon"}}, 
			        	"Login with Google Plus"
			        ]}
			       ]}

			      ]}, 

			      {tag: "div", attrs: {class:"ui error message"}, children: [ctrl.ErrorMsg()]}
			    
			    ]}
			    ]}, 
			    {tag: "div", attrs: {class:"row"}, children: [
			    {tag: "form", attrs: {class:"ui large form", config:ctrl.LoadGOne}, children: [
			    {tag: "h1", attrs: {}, children: ["  Login "]}, 

			    {tag: "div", attrs: {class:"row"}, children: [
				  "Email id:", 
				  {tag: "input", attrs: {type:"text", name:"email_id", oninput:m.withAttr("value",ctrl.newUser.email_id), value:ctrl.newUser.email_id()}}
				  ]}, 
				  {tag: "div", attrs: {class:"row"}, children: [
				  "password", 
				  {tag: "input", attrs: {type:"password", name:"password", oninput:m.withAttr("value",ctrl.newUser.password), value:ctrl.newUser.password()}}
				  ]}, 
				  {tag: "div", attrs: {class:"row"}, children: [
			        {tag: "button", attrs: {type:"button", class:"submit", onclick:ctrl.sign_in}, children: [
			        	
			        	"Submit"
			        ]}
			       ]}

			    

			    

			    ]}

			    ]}, 

			    {tag: "div", attrs: {class:"ui message"}, children: [
			      "Connect your Google account and get going!"
			    ]}
			  ]}
		]}

	)
}

Login.view = function(ctrl){

	return !ctrl.googleTokens() ? Login.form(ctrl) : require('module/loader')
}



module.exports = Login;