

var routes = {
    '/'          : require('module/home'),
    "/connect": require('module/home/connect'),
    "/dashboard": require('module/dashboard'),
    "/settings":require('module/settings'),
    "/logout":require('module/logout')
}


m.route(m.mainElement, "/",routes);
