// js
var r = new XMLHttpRequest();
r.open("POST", "people/", true);
r.onreadystatechange = function () {
  if (r.readyState != 4 || r.status != 200) return;
  document.querySelector('.person').innerHTML = r.responseText
};
r.send("name=Freeman");

// jquery
$.ajax({
  type: 'POST',
  url: "people/",
  data: {name: "Freeman"},
  success: function (data) {
    $('.person').html(data);
  },
});

//
var Person = Backbone.Model.extends({
  baseUrl: '/people',
});
var freeman = new Person({name: "Freeman"});
freeman.save();

// Backbone
var PersonView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, "change", this.render)
  },
  template: _.template('Say hello to <%= person.get("name") %>!')
  render: function() {
    var rendered_html = this.template({person: this.model});
    this.$el.html(rendered_html);
    return this;
  }
});
var freemanView = new PersonView({
  model: freeman,
  el: '.person'
});

// React
PersonView = React.createClass({
  render: function(){
    return React.DOM.div({},
      "Say hello to "+
      this.props.person.get('name')
    )
  }
});

React.render(
  React.createFactory(PersonView)({person: freeman}),
  document.querySelector('.person')
)