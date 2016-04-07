
var Menu = require('module/partials/menu');
var Header = {};


//CTRL
Header.controller = function(){
}

Header.config = function(ctrl){

	return function(element,isInit){
	}
};

var slideout;

Header.sidebarIcon =  function(element,isInit){

	slideout = new Slideout({
	    'panel': element,
	    'menu': Menu.Elements.sidebar,
	    'padding': 120,
	    'tolerance': 20
	});
	element.onclick = function(e){
		e.preventDefault(); 
		slideout.toggle();
	}
}

Header.view = function(){
	return (
			<div>
				<br/>
				<div class="ui secondary menu">
			    	<div class="ui compact menu">
					    <a class="item">
					      <i class="icon announcement"></i> Milestones
					    </a>
					    <a class="item" href="/" config={m.fadesOutPage}>
						    <i class="icon mail"></i> Conversation
						    <div class="floating ui red label">22</div>
						</a>

					</div>
				    
				    <div class="right menu">
					  
					  <a class="item" href="/settings" config={m.fadesOutPage}>
				        Settings
				      </a>
				      <a class="item" href="/logout" config={m.fadesOutPage}>
				        Logout
				      </a>
					</div>
			  	</div>
		  	</div>
		 )


}


module.exports = Header;