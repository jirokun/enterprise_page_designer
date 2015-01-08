if (typeof(EPD) == 'undefined') EPD = {};
(function(scope) {
  function ContentDesigner(el, components) {
    var _this = this;
    this._components = components;
    this.$el = $(el);
    this._data = [];
    this._sequence = 0;
    this._addRow(0);
    this._initEvents();
    this.render();
  }
  ContentDesigner.prototype._initEvents = function() {
    var _this = this;
    this.$el.on('click', '.delete-row-button', function(e) {
      var rowIndex = $(this).data('rowindex');
      _this._data.splice(rowIndex, 1);
      if (_this._data.length === 0) _this._addRow(0);
      _this.render();
    });
    this.$el.on('click', '.insert-row-button', function(e) {
      var rowIndex = $(this).data('rowindex');
      _this._addRow(rowIndex);
      _this.render();
    });
    this.$el.on('click', '.add-row-button', function(e) {
      var rowIndex = $(this).data('rowindex');
      _this._addRow(rowIndex);
      _this.render();
    });
    this.$el.on('click', '.delete-cell-button', function(e) {
      var selectedId = $(this).data('dataid');
      _this._deleteCell(selectedId);
      _this.render();
    });
  }
  ContentDesigner.prototype._deleteCell = function(dataId) {
    var selectedIndex = this._findIndex(dataId);
    var row = this._data[selectedIndex.rowIndex];
    var cell = row[selectedIndex.cellIndex];
    var component = this._components.find(cell.cid);
    row.splice(selectedIndex.cellIndex, 1);
    for (var i = 0; i < component.columns; i++) {
      row.splice(selectedIndex.cellIndex, 0, {id: this._nextSequence(), cid: 'EMPTY', state: 'view'});
    }
  }
  ContentDesigner.prototype._findIndex = function(dataId) {
    var _this = this;
    var target = null;
    this._data.forEach(function(row, rowIndex) {
      row.forEach(function(cell, cellIndex) {
        if (cell.id === dataId) target = {rowIndex: rowIndex, cellIndex: cellIndex};
      })
    });
    return target;
  }
  ContentDesigner.prototype._isReplaceable = function(component, cellIndex) {
    for (var i = 0; i < component.columns; i++) {
      var cell = this._data[cellIndex.rowIndex][cellIndex.cellIndex + i];
      if (!cell || cell.cid !== 'EMPTY') return false;
    }
    return true;
  }
  ContentDesigner.prototype._replaceContent = function(component, dataId, state) {
    var cellIndex = this._findIndex(dataId);
    var row = this._data[cellIndex.rowIndex];
    for (var i = 0; i < component.columns; i++) {
      row.splice(cellIndex.cellIndex, 1);
    }
    row.splice(cellIndex.cellIndex, 0, { id: this._nextSequence(), cid: component.cid, state: state });
    this.render()
  }
  ContentDesigner.prototype._nextSequence = function() {
    return ++this._sequence;
  }
  ContentDesigner.prototype._addRow = function(index) {
    var row = [];
    for (var i = 0; i < 12; i++) row.push({id: this._nextSequence(), cid: 'EMPTY', state: 'view'});
    this._data.splice(index, 0, row);
  }
  ContentDesigner.prototype.import = function(str) {
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
  ContentDesigner.prototype.export = function() {
    return JSON.stringify(this._data);
  }
  ContentDesigner.prototype.html = function() {
    var $exportEl = $('<div/>').html(this.$el.html());
    $exportEl.find('.control').remove();
    $exportEl.find('*[data-dataid]').removeAttr('data-dataid');
    return html_beautify($exportEl.html());
  }
  ContentDesigner.prototype.render = function() {
    var _this = this;
    this.$el.empty();
    this._data.forEach(function(rowData, rowIndex) {
      var $row = $('<div class="row"></div>').appendTo(_this.$el);
      rowData.forEach(function(cellData) {
        var template;
        var component = _this._components.find(cellData.cid);
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
      $('<span class="alert-danger delete-row-button control">Delete Row</span>').appendTo($row).attr('data-rowindex', rowIndex);
      $('<span class="alert-info glyphicon glyphicon-plus insert-row-button control"></span>').appendTo($row).attr('data-rowindex', rowIndex);
    });
    $('<span class="alert-info glyphicon glyphicon-plus add-row-button control"></span>').appendTo(this.$el.find('.row').last()).attr('data-rowindex', this._data.length);
    this.$el.find('.empty').droppable({
      accept: function(draggable) {
        var cid = draggable.data('cid');
        if (!cid) return false;
        var dataId = $(this).data('dataid');
        var c = _this._components.find(cid);
        var cellIndex = _this._findIndex(dataId);
        if (cellIndex === null) return false;
        return _this._isReplaceable(c, cellIndex);
      },
      hoverClass: 'hover',
      drop: function(event, ui) {
        var cid = ui.draggable.data('cid');
        var dataId = $(this).data('dataid');
        var c = _this._components.find(cid);
        _this._replaceContent(c, dataId, 'edit');
      }
    });
  }
  scope.ContentDesigner = ContentDesigner;
})(EPD);
