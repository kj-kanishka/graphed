var company = {}


var ctrl={}
company.controller = function(){


	//redirect if cookie doesnt exists.
	// if(!auth.gotSession()){
	// 	m.route('/connect');
	// 	return {}
	// }

	


	return ctrl;	
}

company.view = function(){
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
			          <h2>Add company</h2>
			          <div class="ui segment">
			          <form class="ui large form"  >
			      <div class="row">
			      
			      Company Name:
				  <input type="text" name="name" ></input>
				  </div>
				  <div class="row">
				  Description:
				  <input type="text" name="description" ></input>
				  </div>
				  <div class="row">
				  Website:
				  <input type="text" name="Website" ></input>
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

module.exports = company;