// Retrieve current url parameters

    function getParameter(theParameter) {
        var params = window.location.search.substr(1).split('&');
        for (var i = 0; i < params.length; i++) {
            var p=params[i].split('=');
            if (p[0] == theParameter) {
                return decodeURIComponent(p[1]);
            }
        }
        return false;
    }
    url_src = getParameter('utm_source');
    url_mdm = getParameter('utm_medium');
    url_cpn = getParameter('utm_campaign');

// Retrieve data from cookie (if it exists) and create an object

    var pepites = new Object();
    var pate_cookie = Cookies.get('cookie_utms');

// If at least one URL parameter exist AND the cookie doesn't exist

    if((url_src!== false || url_mdm!==false || url_cpn!==false) && (pate_cookie == null || pate_cookie == "" )) {
        if(url_src!== false){ 
            pepites["source"] = url_src; 
        }
        if(url_mdm!==false){
            pepites["medium"] = url_mdm; 
        }
        if (url_cpn!==false) {
            pepites["campaign"] = url_cpn;
        }
        Cookies.set('cookie_utms', pepites, { expires: 120 } );
    }

// Else if we get at least URL parameter AND the cookie exist

    else if((url_src!== false || url_mdm!==false || url_cpn!==false) && (pate_cookie != null || pate_cookie != "")) {
        pate_cookie_choco = JSON.parse(pate_cookie);
        if(pate_cookie_choco["source"] != undefined) {
            if(url_src!== false && pate_cookie_choco["source"].indexOf(url_src) != -1 ){
                pepites["source"] = pate_cookie_choco["source"]; 
            }
            else if(url_src!== false){
                pepites["source"] = pate_cookie_choco["source"]+"-"+url_src; 
            }
            else if ( url_src == false && pate_cookie_choco["source"] != undefined) { 
                pepites["source"] = pate_cookie_choco["source"]; 
            }
        }                            
        else if ( url_src!== false ) { 
            pepites["source"] = url_src; 
        }
        if(pate_cookie_choco["medium"] != undefined) {
            if(url_mdm!== false && pate_cookie_choco["medium"].indexOf(url_mdm) != -1 ){
                pepites["medium"] = pate_cookie_choco["medium"];
            }
            else if(url_mdm!== false ) { 
                pepites["medium"] = pate_cookie_choco["medium"]+"-"+url_mdm; 
            }
            else if(url_mdm == false){
                pepites["medium"] = pate_cookie_choco["medium"]; 
            }
        }
        else if(url_mdm!== false){
            pepites["medium"] = url_mdm; 
        }
        if(pate_cookie_choco["campaign"] != undefined) {
            if(url_cpn!== false && pate_cookie_choco["campaign"].indexOf(url_cpn) != -1 ){
                pepites["campaign"] = pate_cookie_choco["campaign"];
            }
            else if(url_cpn!== false) { 
                pepites["campaign"] = pate_cookie_choco["campaign"]+"-"+url_cpn; 
            }  
            else if(url_cpn == false){
                pepites["campaign"] = pate_cookie_choco["campaign"]; 
            } 
        }
        else if(url_cpn!== false){
            pepites["campaign"] = url_cpn; 
        }
        Cookies.set('cookie_utms', pepites, { expires: 120 } );
    }

// Retrieve data from the cookie and use it

    var cookie = Cookies.get('cookie_utms');
    if(cookie != undefined){
        cookie_choco = JSON.parse(cookie);
        cookie_src = cookie_choco["source"];
        cookie_mdm = cookie_choco["medium"];
        cookie_cpn = cookie_choco["campaign"];
    } 