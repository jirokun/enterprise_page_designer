if (typeof(EPD) == 'undefined') EPD = {};
(function(scope) {
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
  scope.ActionDesigner = ActionDesigner;
})(EPD);
