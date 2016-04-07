
var Signup = {};


Signup.loaded = m.prop(false);

//CTRL
Signup.controller = function(){

	var ctrl = {};

	ctrl.loaded = m.prop(false);

	ctrl.transport = m.prop();

	ctrl.user = m.prop({});

	ctrl.init = function(element, isInitialized, context){
		//height of init loader
		jQuery(element).height(jQuery("body").height());

		var self = this;
		this.user = m.prop([]);

		//first request
		m
		.request({
			method: "GET",
			url: "http://localhost:8888/",
			config: ctrl.transport
		})
		.then(ctrl.user);


		ctrl.transport().onprogress = function(evt){
		
		    if (evt.lengthComputable) 
			   {  
			     var percentComplete = (evt.loaded / evt.total)*100;  
			     ctrl.loaded(true);
			   }
		}

		return this;
	}

	return ctrl;
	
}

Signup.load = function(ctrl){

	return require('module/loader').view(ctrl.init);
} 

Signup.form = function(ctrl){

	return (
		<div class="ui middle aligned center aligned grid login">
		  <div class="column">
		    <h2 class="ui teal image header">
		      <div class="content">
		        Sign up
		      </div>
		    </h2>
		    <form class="ui large form">
		      <div class="ui stacked segment">
		        <div class="field">
		          <div class="ui left icon input">
		            <i class="user icon"></i>
		            <input type="text" name="email" placeholder="E-mail address" />
		          </div>
		        </div>
		        <div class="field">
		          <div class="ui left icon input">
		            <i class="lock icon"></i>
		            <input type="password" name="password" placeholder="Password" />
		          </div>
		        </div>
		        <div class="ui fluid large teal submit button">Sign up {console.log(ctrl.transport().abort())}</div>
		      </div>

		      <div class="ui error message"></div>

		    </form>

		    <div class="ui message">
		      New to us? <a config={m.fadesOutPage} href="/login">Log In</a>
		    </div>
		  </div>
		</div>
		)
}

Signup.view = function(ctrl){
	
	return !ctrl.loaded()?  Signup.load(ctrl) : Signup.form(ctrl)
}


module.exports = Signup;