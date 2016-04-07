

var Auth = {};

Auth.UserData = m.prop(false);

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
	    	url:m.urls('secure'),
	    	config: transport,
	    	background:true
	    })
	    .then(Auth.UserData);

	    transport().onreadystatechange = function() {
	    	if (transport().readyState == XMLHttpRequest.DONE) {
		        
		        if(transport().status == 401){
		        	Auth.clearSession();
		        	m.route('/connect')
		        } else{
		        	Auth.UserData = m.prop(JSON.parse(transport().responseText));

			        if(Auth.UserData().logged_in)
			        	this.session_exists = m.prop(true);
			    	m.redraw(true);    
		        }
		        

		    }
		}

	}
	else
		return true;
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
	return Auth.UserData()? Auth.UserData() : Auth.PingServer(cookie);
})

module.exports = Auth;