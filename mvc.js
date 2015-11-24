//headers with route options
//body showing results as table data

var request = {
  apiUrl: "http://app-store-mongoid.herokuapp.com/rankings/20150508/apps?",
  data: null,
  reqHeader: function(xhr){
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8000");
  },
  getData: function(query){
    var opts = {method: "GET", url: (request.apiUrl)+query, config: request.reqHeader};
    m.request(opts).then(function(pageData){
      request.data = pageData
      // m.redraw();
    })
  }
}

var Menu = {
  view: function(){
    return[
      btn("Paid", "/paid", "type=paid&limit=40&sort=downloads"),
      btn("Free", "/free", "type=free&limit=40&sort=downloads"),
      btn("Top Grossing", "/top-grossing", "type=all&limit=40&sort=revenue")
    ];

    function btn(name, route, query){
      var isCurrent = (m.route() === route);
      var click = function(){
        request.getData(query)

        // (pageObj[route]).controller.getData()
        m.route(route);
      };
      return m("button"+(isCurrent ? ".success" : ""), {onclick: click}, name);
    }
  }
};

function PageView(){
  this.view = function(){
    var data = request.data
    if (data){
      console.log(data)
      return [ Menu.view(), m("hr"), m("div", data.map(function(app){
        return m("h3", app.name);
      }))]
    } else {
      return [Menu.view(), m("hr"), m("h4", "Problem retrieving data")]
    }
  }
}

// var Paid = new PageView("/paid", "type=paid&limit=40&sort=downloads")
// var Free = new PageView("/free", "type=free&limit=40&sort=downloads")
// var TopGrossing = new PageView("/top-grossing", "type=all&limit=40&sort=revenue")
// var pageObj = {
//   "/paid": Paid,
//   "/free": Free,
//   "/top-grossing": TopGrossing
// }

var Paid = new PageView()
var Free = new PageView()
var TopGrossing = new PageView()

m.route(document.getElementById("divvy"), "/paid", {
  "/paid": Paid,
  "/free": Free,
  "/top-grossing": TopGrossing
});