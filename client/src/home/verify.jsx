var verify = {}


var ctrl={}
verify.controller = function(){


	//redirect if cookie doesnt exists.
	// if(!auth.gotSession()){
	// 	m.route('/connect');
	// 	return {}
	// }

	

	return ctrl;	
}

verify.view = function(){
	return (
		<div class="ui container" config={ctrl.viewConfig}>
			{require('module/partials/header')}
		  <div class="ui divider"></div>
		  <br/>
		  <div class="ui grid">
		    <div class="four wide column">
		    	{require('module/partials/menu')}
		    </div>
		    <div class="twelve wide column" >
		    	<div class="ui column grid">
			      <div class="column">
			        <div class="ui raised segment">
			          <h2>Verify your account</h2>
			          <div class="ui segment">
			          <form class="ui large form"  >
			      
				  <div class="row">
				  Please Enter unique code:
				  <input type="text" name="verify" ></input>
				  </div>
				  <div class="row">
			        <button type="button" class="submit" >
			        	
			        	Submit
			        </button>
			       </div>
				  

			      

			      <div class="ui error message"></div>
			    
			    </form>
			          </div>
			        </div>
			      </div>
			    </div>
		    </div>
		  </div>
		</div>
	)
}

module.exports = verify;