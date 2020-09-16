var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  
    return function( obj, callback ){
      if( !obj || obj.nodeType !== 1 ) return; // validation
  
      if( MutationObserver ){
        // define a new observer
        var obs = new MutationObserver(function(mutations, observer){
            callback(mutations);
        })
        // have the observer observe foo for changes in children
        obs.observe( obj, { childList:true, subtree:true });
      }
      
      else if( window.addEventListener ){
        obj.addEventListener('DOMNodeInserted', callback, false);
        obj.addEventListener('DOMNodeRemoved', callback, false);
      }
    }
  })();
  
  function eventFire(el, etype){
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }
    observed_element = document.querySelector('body');
    
    observeDOM( observed_element, function(m){

      if(!!document.getElementById("skip-button:z")){
        var container = document.getElementById("skip-button:z");
        var adbutton = container.getElementsByTagName("BUTTON")[0];
        eventFire(adbutton, 'click');
        console.log('you did it');
        
      }
      console.log('DOM change');
      });
console.log('funciona aqui');