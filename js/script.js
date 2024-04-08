var app = $.spapp({
    defaultView  : "#home",
    templateDir  : "./scss/",
    pageNotFound : "error_404"
  });
  
  app.route({
    view : "home",
    load : "home.html",
    onCreate: function() {  },
    onReady: function() {  }
  });
  
  app.run();