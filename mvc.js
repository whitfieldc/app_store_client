//headers with route options
//body showing results as table data

var Menu = {
  view: function(){
    return[
      btn("Paid", "/paid"),
      btn("Free", "/free"),
      btn("Top Grossing", "/top-grossing")
    ];

    function btn(name, route){
      var isCurrent = (m.route() === route);
      var click = function(){ m.route(route); };
      return m("button"+(isCurrent ? ".success" : ""), {onclick: click}, name);
    }
  }
};

function Page(content){
  this.view = function(){
    return [ Menu.view(), m("hr"), m("p", content)]
  }
}

var Paid = new Page("Most downloaded paid apps")
var Free = new Page("Most downloaded free apps")
var TopGrossing = new Page("Top-grossing apps")

m.route(document.getElementById("divvy"), "/paid", {
  "/paid": Paid,
  "/free": Free,
  "/top-grossing": TopGrossing
});