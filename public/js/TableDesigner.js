if (typeof(EPD) == 'undefined') EPD = {};
(function(scope) {
  function TableDesigner(el, components) {
    var _this = this;
    this._components = components;
    this.$el = $(el);
    this._data = [];
    this._sequence = 0;
    //this._addRow(0);
    this._initEvents();
    this.render();
  }
  TableDesigner.prototype._initEvents = function() {
    var _this = this;
  }
  TableDesigner.prototype._deleteCell = function(dataId) {
    var selectedIndex = this._findIndex(dataId);
    var row = this._data[selectedIndex.rowIndex];
    var cell = row[selectedIndex.cellIndex];
    var component = this._findComponent(cell.cid);
    row.splice(selectedIndex.cellIndex, 1);
    for (var i = 0; i < component.columns; i++) {
      row.splice(selectedIndex.cellIndex, 0, {id: this._nextSequence(), cid: 'EMPTY', state: 'view'});
    }
  }
  TableDesigner.prototype._findIndex = function(dataId) {
    var _this = this;
    var target = null;
    this._data.forEach(function(row, rowIndex) {
      row.forEach(function(cell, cellIndex) {
        if (cell.id === dataId) target = {rowIndex: rowIndex, cellIndex: cellIndex};
      })
    });
    return target;
  }
  TableDesigner.prototype._isReplaceable = function(component, selectedIndex) {
    for (var i = 0; i < component.columns; i++) {
      var cell = this._data[selectedIndex.rowIndex][selectedIndex.cellIndex + i];
      if (!cell || cell.cid !== 'EMPTY') return false;
    }
    return true;
  }
  TableDesigner.prototype._replaceTable = function(component, state) {
    var selectedIndex = this._findIndex(this._selectedId);
    if (!this._isReplaceable(component, selectedIndex)) {
      alert('配置するだけのスペースがありません');
      return;
    }
    var row = this._data[selectedIndex.rowIndex];
    for (var i = 0; i < component.columns; i++) {
      row.splice(selectedIndex.cellIndex, 1);
    }
    row.splice(selectedIndex.cellIndex, 0, { id: this._nextSequence(), cid: component.cid, state: state });
    this.render()
  }
  TableDesigner.prototype._findComponent = function(cid) {
    var component = null;
    this._components.forEach(function(c) {
      if (c.cid === cid) component = c;
    });
    return component;
  }
  TableDesigner.prototype._nextSequence = function() {
    return ++this._sequence;
  }
  TableDesigner.prototype._addRow = function(index) {
    var row = [];
    for (var i = 0; i < 12; i++) row.push({id: this._nextSequence(), cid: 'EMPTY', state: 'view'});
    this._data.splice(index, 0, row);
  }
  TableDesigner.prototype.import = function(str) {
    var data = JSON.parse(str);
    var maxId = 0;
    data.forEach(function(row) {
      row.forEach(function(cell) {
        maxId = Math.max(maxId, cell.id);
      });
    });
    this._selectedId = maxId;
    this._data = data;
    this.render();
  }
  TableDesigner.prototype.export = function() {
    return JSON.stringify(this._data);
  }
  TableDesigner.prototype.html = function() {
    var $exportEl = $('<div/>').html(this.$el.html());
    $exportEl.find('.control').remove();
    $exportEl.find('*[data-dataid]').removeAttr('data-dataid');
    return html_beautify($exportEl.html());
  }
  TableDesigner.prototype.render = function() {
    var _this = this;
    this.$el.empty();
    var $table = $('\
<table class="table table-bordered">\
  <thead>\
  </thead>\
  <tbody>\
  </tbody>\
</table>').appendTo(this.$el);
    var $thead = $table.find('thead');
    var $tbody = $table.find('tbody');
    console.log(this._data.length);
    if (this._data.length === 0) {
      $('<th>&nbsp;</th>').appendTo($thead);
    } else {
      this._data.forEach(function(rowData, rowIndex) {
        var $row = $('<div class="row"></div>').appendTo(_this.$el);
        rowData.forEach(function(cellData) {
          var template;
          var component = _this._findComponent(cellData.cid);
          if (cellData.state === 'edit') {
            template = $.templates(component.editHtml);
          } else {
            template = $.templates(component.viewHtml);
          }
          var html = template.render({value: '><HOG>EHOGE\nkaigyo'});
          var $firstCell = $(html).appendTo($row).first();
          $firstCell.attr('data-dataid', cellData.id);
          if (component.cid !== 'EMPTY') {
            $('<span class="alert-danger glyphicon glyphicon-remove delete-cell-button control"></span>').appendTo($firstCell).attr('data-dataid', cellData.id);
          }
        });
      });
    }
  }
  scope.TableDesigner = TableDesigner;
})(EPD);
