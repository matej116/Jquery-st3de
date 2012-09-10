
if (parent == window && $.browser.webkit) {

var opts = {
  hrefSelector: ':not([href^="http://"])',
  exclude: '.colorBox'
}

$(document).ready(function() {
    
    var first = 1;
    
    var active = 1;
    
    $('head *').remove();
    $('head').append('<link rel="stylesheet" href="/jquery.st3de.css" type="text/css"/>');
    $('body').html('<div class="full"><iframe id="first" class="active" src="'+document.location.href+'"></iframe><iframe id="second" class="inactive"></iframe></div>').addClass('full');

    var switchSite = function(href,fromA) {  
      
      if (fromA) {   
        history.pushState(null,'',href);  
      } else {
      }   
      
      $('iframe#'+(active?'first':'second')).removeClass('active').addClass('inactive');
      $('iframe#'+(active?'second':'first')).removeClass('inactive').addClass('active')[0].contentWindow.location.replace(href);              
            
          
      active = !active;           
    }

    $('body iframe').load(function() {
        var $contents = $('body iframe').contents();
        $contents.find('a:not('+opts.hrefSelector+')').attr('target','_parent');
        $contents.find('a'+opts.hrefSelector).attr('target',active?'second':'first');
        $contents.find('body').on({
          click: function() {      
            switchSite($(this).attr('href'),true);
            return false;
          }
        },'a'+opts.hrefSelector+':not('+opts.exclude+'):not([href^="#"])');
    });
    
    window.onpopstate = function(event) {
      if (first) {first = 0; return; }
      switchSite(document.location,false);
    }

});

}

