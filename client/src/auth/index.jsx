

var Auth = {};

Auth.UserData = m.prop(false);
//Auth.data = m.prop({});
//CTRL
Auth.controller = function(){
	
}

Auth.setSession = function(token){
	m.cookie.set("session",token);
}

Auth.clearSession = function(){
	m.cookie.remove("session");
}

Auth.PingServer = function(cookie){
	if(!this.UserData() && cookie){

		var transport = m.prop();
		m
	    .request({
	    	method:"GET",
	    	url:m.urls('ping'),
	    	config: transport,
	    	background:true,
	    	json:true
	    })
	    .then(Auth.UserData);
	    transport().onreadystatechange = function() {
	    	if (transport().readyState == XMLHttpRequest.DONE) {
		        if(transport().status == 401){
		        	Auth.clearSession();
		        	m.route('/connect')
		        } else{
		        	json=JSON.parse(transport().response);
		        	Auth.UserData = m.prop(json.data.user);
			        if(Auth.UserData())
			        {
			        	this.session_exists = m.prop(true);
			        }

			        	
			    	m.redraw(true);    
		        }
		        

		    }
		}
		return true;

	}
	else
		return false;
}

Auth.session_exists = m.prop(false);

//just check cookie and set authorization
Auth.gotSession = function(){
	var cookie = m.cookie.get("session");

	if(cookie){

		if(!this.session_exists())
		{	
			m.removeGlobalHeader('Authorization')
			m.addGlobalHeader('Authorization', 'Bearer '+cookie);
		}
		return m.cookie.get("session");
	}
	return false;
}

//PING server and get user data.
Auth.isLoggedIn = m.prop(function(){
	console.log(Auth.gotSession()?true:false);

	var cookie = Auth.gotSession();

	if(!cookie){
		return false;
	}	
	return Auth.PingServer(cookie);
})

Auth.user = function(cb){
	var Data=m.prop({});
	var cookie = Auth.gotSession();
	m
	    .request({
	    	method:"GET",
	    	url:m.urls('ping'),
	    	
	    }).then(function(data){
			cb(data)
		})
		
		
}


Auth.company = function(cb){
	var Data=m.prop({});
	var cookie = Auth.gotSession();
	m
	    .request({
	    	method:"GET",
	    	url:m.urls('company'),
	    	
	    }).then(function(data){
			cb(data)
		})
		
		
}



Auth.projects = function(cb){
	var Data=m.prop({});
	var cookie = Auth.gotSession();
	m
	    .request({
	    	method:"GET",
	    	url:m.urls('company','website'),
	    	
	    }).then(function(data){
			cb(data)
		})
		
		
}



module.exports = Auth;