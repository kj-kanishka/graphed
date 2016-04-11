var routes = {
	'/': require('module/home'),
	"/connect": require('module/home/connect'),
	"/dashboard": require('module/dashboard'),
	"/graph": require('module/graph'),
	"/settings": require('module/settings'),
	"/logout": require('module/logout'),
	"/listwebsites": require('module/graph/websites'),
	"/company": require('module/company/company')

}


m.route(m.mainElement, "/", routes);