$(function() {
  var components = [
    {
      cid: 'EMPTY',
      name: 'Empty Cell',
      columns: 1,
      viewHtml: '<div class="col-md-1 editable"></div>'
    },
    {
      cid: 'TEXT',
      name: 'Text',
      columns: 4,
      viewHtml: '<label class="col-md-2 control-label">Email</label>\
    <div class="col-md-2">\
      <p class="form-control-static">{{>value}}</p>\
    </div>',
      editHtml: '<label class="col-md-2 control-label">Email</label>\
    <div class="col-md-2">\
      <input type="email" class="form-control" placeholder="Email" value="{{>value}}">\
    </div>'
    },
    {
      cid: 'PASSWORD',
      name: 'Password',
      columns: 4,
      viewHtml: '<label class="col-md-2 control-label">Password</label>\
    <div class="col-md-2">\
      <p class="form-control-static">{{>value}}</p>\
    </div>',
      editHtml: '<label class="col-md-2 control-label">Password</label>\
    <div class="col-md-2">\
      <input type="password" class="form-control" placeholder="Password">\
    </div>'
    },
    {
      cid: 'SELECT',
      name: 'Select',
      columns: 4,
      viewHtml: '<label class="col-md-2 control-label">Select</label>\
    <div class="col-md-2">\
      <p class="form-control-static">{{>value}}</p>\
    </div>',
      editHtml: '<label class="col-md-2 control-label">Select</label>\
    <div class="col-md-2">\
      <select class="form-control" placeholder="Select">\
        <option value=""></option>\
        <option value="1">Select 1</option>\
        <option value="2">Select 2</option>\
        <option value="3">Select 3</option>\
      </select>\
    </div>'
    },
    {
      cid: 'HORIZONTAL_RADIO',
      name: 'Horizontal Radio',
      columns: 6,
      viewHtml: '<label class="col-md-2 control-label">Horizontal </label>\
    <div class="col-md-4">\
      <p class="form-control-static">{{>value}}</p>\
    </div>',
      editHtml: '<label class="col-md-2 control-label">Horizontal Radio</label>\
    <div class="col-md-4">\
      <label class="radio-inline">\
        <input type="radio" name="horizontalRadio" value="1">\
        Radio 1\
      </label>\
      <label class="radio-inline">\
        <input type="radio" name="horizontalRadio" value="2">\
        Radio 2\
      </label>\
    </div>'
    },
    {
      cid: 'VERTICAL_RADIO',
      name: 'Vertical Radio',
      columns: 6,
      viewHtml: '<label class="col-md-2 control-label">Vertical Radio</label>\
    <div class="col-md-4">\
      <p class="form-control-static">{{>value}}</p>\
    </div>',
      editHtml: '<label class="col-md-2 control-label">Vertical Radio</label>\
    <div class="col-md-4">\
      <div class="radio">\
        <label>\
          <input type="radio" name="verticalRadio" value="1">\
          Radio 1\
        </label>\
      </div>\
      <div class="radio">\
        <label>\
          <input type="radio" name="verticalRadio" value="2">\
          Radio 2\
        </label>\
      </div>\
    </div>'
    },
    {
      cid: 'HORIZONTAL_CHECKBOX',
      name: 'Horizontal Checkbox',
      columns: 6,
      viewHtml: '<label class="col-md-2 control-label">Horizontal Checkbox</label>\
    <div class="col-md-4">\
      <p class="form-control-static">{{>value}}</p>\
    </div>',
      editHtml: '<label class="col-md-2 control-label">Horizontal Checkbox</label>\
    <div class="col-md-4">\
      <label class="checkbox-inline">\
        <input type="checkbox" name="horizontalCheckbox" value="1">\
        Checkbox 1\
      </label>\
      <label class="checkbox-inline">\
        <input type="checkbox" name="horizontalCheckbox" value="2">\
        Checkbox 2\
      </label>\
    </div>'
    },
    {
      cid: 'VERTICAL_CHECKBOX',
      name: 'Vertical Checkbox',
      columns: 6,
      viewHtml: '<label class="col-md-2 control-label">Vertical Checkbox</label>\
    <div class="col-md-4">\
      <p class="form-control-static">{{>value}}</p>\
    </div>',
      editHtml: '<label class="col-md-2 control-label">Vertical Checkbox</label>\
    <div class="col-md-4">\
      <div class="checkbox">\
        <label>\
          <input type="checkbox" name="verticalCheckbox" value="1">\
          Checkbox 1\
        </label>\
      </div>\
      <div class="checkbox">\
        <label>\
          <input type="checkbox" name="verticalCheckbox" value="2">\
          Checkbox 2\
        </label>\
      </div>\
    </div>'
    },
    {
      cid: 'TEXTAREA',
      name: 'Textarea',
      columns: 6,
      viewHtml: '<label class="col-md-2 control-label">Textarea</label>\
    <div class="col-md-4">\
      <p class="form-control-static">{{>value}}</p>\
    </div>',
      editHtml: '<label class="col-md-2 control-label">Textarea</label>\
    <div class="col-md-4">\
      <textarea class="form-control" placeholder="textarea"></textarea>\
      </select>\
    </div>'
    }
  ];
  var componentChooserHTML = '<div class="modal fade">\
      <div class="modal-dialog">\
        <div class="modal-content">\
          <div class="modal-header">\
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\
            <h4 class="modal-title">Component Chooser</h4>\
          </div>\
          <div class="modal-body">\
            <div class="input-group">\
              <span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span>\
              <input type="text" class="form-control" placeholder="Search">\
            </div>\
            <table class="table table-condensed component-table">\
              <thead>\
                <tr>\
                  <th>ID</th>\
                  <th>Name</th>\
                  <th>Columns</th>\
                  <th>State</th>\
                  <th></th>\
                </tr>\
              </thead>\
              <tbody></tbody>\
            </table>\
          </div>\
        </div>\
      </div>\
    </div>';

  function ContentDesigner(el) {
    var _this = this;
    this.$el = $(el);
    this._data = [];
    this._sequence = 0;
    this._addRow(0);
    this._buildComponentChooser();
    this._initEvents();
    this.render();
  }
  ContentDesigner.prototype._buildComponentChooser = function() {
    var _this = this;
    this._$modal = $(componentChooserHTML).appendTo('body');
    var tbody = this._$modal.find('.component-table tbody');
    components.forEach(function(c) {
      if (c.cid === 'EMPTY') return;
      var $tr = $('<tr></tr>').attr('data-cid', c.cid).appendTo(tbody);
      $('<td/>').text(c.cid).appendTo($tr);
      $('<td/>').text(c.name).appendTo($tr);
      $('<td/>').text(c.columns).appendTo($tr);
      var $checkboxTd = $('<td/>').appendTo($tr);
      if (c.editHtml) {
        $('<label><input type="radio" name="' + c.cid + '" value="edit"/> Edit</label>').appendTo($checkboxTd);
        $('<span>&nbsp;</span>').appendTo($checkboxTd);
      }
      if (c.viewHtml) $('<label><input type="radio" name="' + c.cid + '" value="view"/> View</label>').appendTo($checkboxTd);
      $checkboxTd.find('input[type="radio"]')[0].checked = true;
      $('<td><a href="javascript:void(0)" data-cid="' + c.cid + '" class="component-choose-button">Select</a></td>').appendTo($tr);
    });
    this._$modal.on('click', '.component-choose-button', function(e) {
      _this._$modal.modal('hide');
      var cid = $(this).data('cid');
      var state = $(this).parents('tr').find('input[type="radio"]:checked').val();
      var component = _this._findComponent(cid);
      _this._replaceContent(component, state);
    });
    this._$modal.on('keyup', 'input', function(e) {
      var value = $(this).val().toLowerCase();
      var $trList = _this._$modal.find('tr');
      $trList.each(function(i, tr) {
        var text = $(tr).text().toLowerCase();
        if (text.indexOf(value) != -1) $(tr).show(); 
        else $(tr).hide(); 
      });
    });
  }
  ContentDesigner.prototype._initEvents = function() {
    var _this = this;
    this.$el.on('click', '.editable', function(e) {
      _this._$modal.modal('show');
      _this._$modal.find('input[type="text"]').val('');
      _this._$modal.find('tr').show();
      _this._selectedId = $(this).data('dataid');
    });
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
    this.$el.on('dragenter', function(e) {
      e.preventDefault();
      e.stopPropagation();
      _this.$el.addClass('dragging-file');
    });
    this.$el.on('dragover', function(e) {
      e.preventDefault();
      e.stopPropagation();
      _this.$el.addClass('dragging-file');
    });
    this.$el.on('dragleave', function(e) {
      e.preventDefault();
      e.stopPropagation();
      _this.$el.removeClass('dragging-file');
    });
    this.$el.on('drop', function(e) {
      e.preventDefault();
      e.stopPropagation();
      _this.$el.removeClass('dragging-file');
      var file = e.originalEvent.dataTransfer.files[0];
      var fileReader = new FileReader();
      fileReader.onload = function(event) {
        contentDesigner.import(event.target.result);
      }
      fileReader.readAsText(file);
    });
  }
  ContentDesigner.prototype._deleteCell = function(dataId) {
    var selectedIndex = this._findIndex(dataId);
    var row = this._data[selectedIndex.rowIndex];
    var cell = row[selectedIndex.cellIndex];
    var component = this._findComponent(cell.cid);
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
  ContentDesigner.prototype._isReplaceable = function(component, selectedIndex) {
    for (var i = 0; i < component.columns; i++) {
      var cell = this._data[selectedIndex.rowIndex][selectedIndex.cellIndex + i];
      if (!cell || cell.cid !== 'EMPTY') return false;
    }
    return true;
  }
  ContentDesigner.prototype._replaceContent = function(component, state) {
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
  ContentDesigner.prototype._findComponent = function(cid) {
    var component = null;
    components.forEach(function(c) {
      if (c.cid === cid) component = c;
    });
    return component;
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
      $('<span class="alert-danger delete-row-button control">Delete Row</span>').appendTo($row).attr('data-rowindex', rowIndex);
      $('<span class="alert-info glyphicon glyphicon-plus insert-row-button control"></span>').appendTo($row).attr('data-rowindex', rowIndex);
    });
    $('<span class="alert-info glyphicon glyphicon-plus add-row-button control"></span>').appendTo(this.$el.find('.row').last()).attr('data-rowindex', this._data.length);
  }
  var contentDesigner = new ContentDesigner($('.content-designer'));
  $('#export-html').click(function() {
    var $exportEl = $(contentDesigner.html());
    $('#data').val(contentDesigner.html());
  });
  $('#export').click(function() {
    $('#data').val(contentDesigner.export());
  });
  $('#import').click(function() {
    var str = $('#data').val();
    contentDesigner.import(str);
  });
});

(function() {
  var buttons = [
    {
      cid: 'DETAIL',
      position: 'left',
      type: 'link',
      style: 'btn-default',
      label: 'Detail'
    },
    {
      cid: 'LIST',
      position: 'left',
      type: 'link',
      style: 'btn-default',
      label: 'List'
    },
    {
      cid: 'DELETE',
      position: 'right',
      type: 'button',
      style: 'btn-danger',
      label: 'Delete'
    },
    {
      cid: 'EXCEL_UL',
      position: 'right',
      type: 'button',
      style: 'btn-success',
      label: 'Excel UL'
    },
    {
      cid: 'EXCEL_DL',
      position: 'right',
      type: 'link',
      style: 'btn-success',
      label: 'Excel DL'
    },
    {
      cid: 'SAVE',
      position: 'right',
      type: 'button',
      style: 'btn-primary',
      label: 'Save'
    }
  ];
  var componentChooserHTML = '<div class="modal fade">\
      <div class="modal-dialog">\
        <div class="modal-content">\
          <div class="modal-header">\
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\
            <h4 class="modal-title">Button Chooser</h4>\
          </div>\
          <div class="modal-body">\
            <table class="table table-condensed table-hover component-table">\
              <thead>\
                <tr>\
                  <th></th>\
                  <th>ID</th>\
                  <th>Label</th>\
                  <th>Style</th>\
                  <th>Position</th>\
                  <th>URL</th>\
                </tr>\
              </thead>\
              <tbody></tbody>\
            </table>\
          </div>\
        </div>\
      </div>\
    </div>';

  function ActionDesigner(el) {
    var _this = this;
    this.$el = $(el);
    this._data = [];
    this._buildComponentChooser();
    this._initEvents();
    this.render();
  }
  ActionDesigner.prototype._buildComponentChooser = function() {
    var _this = this;
    this._$modal = $(componentChooserHTML).appendTo('body');
    var tbody = this._$modal.find('.component-table tbody');
    buttons.forEach(function(c) {
      var $tr = $('<tr class="button-row"/>').appendTo(tbody);
      $('<td><input type="checkbox" value="' + c.cid + '"></td>').appendTo($tr);
      $('<td/>').text(c.cid).appendTo($tr);
      $('<td/>').text(c.label).appendTo($tr);
      $('<td/>').text(c.style).appendTo($tr);
      $('<td/>').text(c.position).appendTo($tr);
      var $urlInputContainer = $('<td/>').appendTo($tr);
      if (c.type === 'link') {
        $('<input type="text" class="url"/>').appendTo($urlInputContainer);
      }
    });
    this._$modal.on('click', 'tr.button-row', function(e) {
      if (e.target.tagName.toLowerCase() === 'input') return;
      var checkboxEl = $(this).find('input[type="checkbox"]')[0];
      checkboxEl.checked = !checkboxEl.checked;
      _this._refreshButtons();
    });
    this._$modal.on('change', 'input', function(e) {
      _this._refreshButtons();
    });
  }
  ActionDesigner.prototype._refreshButtons = function() {
    var _this = this;
    var selectedActions = [];
    this._$modal.find('tbody tr').each(function(i, el) {
      var value = {};
      var $checkbox = $(el).find('input[type="checkbox"]')
      value.cid = $checkbox.val();
      value.url = $(el).find('input[type="text"].url').val();
      if ($checkbox[0].checked) selectedActions.push(value);
    });
    this._data = selectedActions;
    this.render();
  }
  ActionDesigner.prototype._initEvents = function() {
    var _this = this;
    this.$el.on('click', '.edit-button', function(e) {
      _this._$modal.modal('show');
    });
  }
  ActionDesigner.prototype._findComponent = function(cid) {
    var component = null;
    buttons.forEach(function(c) {
      if (c.cid === cid) component = c;
    });
    return component;
  }

  ActionDesigner.prototype.render = function() {
    var _this = this;
    this.$el.empty();
    $('<button class="btn btn-default edit-button">Edit</button>').appendTo(this.$el);
    var $container = $('<div/>').addClass('action-container').appendTo(this.$el);
    var $leftContainer = $('<div class="left-actions"/>').appendTo($container);
    var $rightContainer = $('<div class="right-actions"/>').appendTo($container);

    this._data.forEach(function(action) {
      var $button;
      var component = _this._findComponent(action.cid);
      if (component.type === 'link') {
        $button = $('<a class="btn"/>').addClass(component.style).text(component.label);
        $button.attr('href', action.url);
      } else if (component.type === 'button') {
        $button = $('<button class="btn"/>').addClass(component.style).text(component.label);
      }
      if (component.position === 'left') {
        $leftContainer.append($button);
      } else if (component.position === 'right') {
        $rightContainer.append($button);
      }
    });
  }
  var ad = new ActionDesigner($('.action-designer'));
})();
