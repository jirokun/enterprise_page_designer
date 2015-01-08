if (typeof(EPD) == 'undefined') EPD = {};
(function(scope) {
  var TEMPLATE = '\
<div class="input-group">\
  <span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span>\
  <input type="text" class="form-control filter-input" placeholder="Search">\
</div>\
<table class="table table-condensed table-hover component-table">\
  <thead>\
    <tr>\
      <th>Name</th>\
      <th>Columns</th>\
    </tr>\
  </thead>\
  <tbody class="component-tbody"></tbody>\
</table>';

  var Toolbox = function(el, components) {
    var _this = this;
    this._components = components;
    this.$el = $(el);
    this.render();
    this._initEvents();
  }
  Toolbox.prototype._initEvents = function() {
    var _this = this;
    var $tbody = this.$el.find('.component-tbody');
    $tbody.find('tr').draggable({
      helper: function() {
        var cid = $(this).data('cid');;
        var c = _this._components.find(cid);
        return $('<div/>').text(c.name);
      }
    });
    this.$el.on('keyup', 'input.filter-input', function(e) {
      var value = $(this).val().toLowerCase();
      var $trList = _this.$el.find('tbody > tr');
      $trList.each(function(i, tr) {
        var text = $(tr).text().toLowerCase();
        if (text.indexOf(value) != -1) $(tr).show(); 
        else $(tr).hide(); 
      });
    });

  }
  Toolbox.prototype.render = function() {
    this.$el.html(TEMPLATE);
    var $tbody = this.$el.find('tbody');
    this._components.all().forEach(function(c) {
      if (c.cid === 'EMPTY') return;
      var $tr = $('<tr></tr>').addClass('component').attr('data-cid', c.cid).appendTo($tbody);
      $('<td/>').text(c.name).appendTo($tr);
      $('<td/>').text(c.columns).appendTo($tr);
    });
  }

  scope.Toolbox = Toolbox;
})(EPD);
