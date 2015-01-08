(function() {
  var modalHTML = '<div class="modal fade">\
      <div class="modal-dialog">\
        <div class="modal-content">\
          <div class="modal-body">\
            <div class="container-fluid">\
              <div class="row">\
                <div class="col-md-12">\
                  <textarea class="form-control" rows="15"></textarea>\
                </div>\
              </div>\
            </div>\
          </div>\
          <div class="modal-footer">\
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
            <button id="import-apply" type="button" class="btn btn-primary">Import</button>\
          </div>\
        </div>\
      </div>\
    </div>';

  $.getJSON('/components/', function(json) {
    var components = new EPD.Component(json);
    var contentDesigner = new EPD.ContentDesigner($('.content-designer'), components);
    var tableDesigner = new EPD.TableDesigner($('.table-designer'), components);
    var ad = new EPD.ActionDesigner($('.action-designer'));
    var toolbox = new EPD.Toolbox($('.toolbox'), components);

    var $modal = $(modalHTML).appendTo('body');
    var $textarea = $modal.find('textarea');

    $('#export-html').click(function() {
      var $exportEl = $(contentDesigner.html());
      $textarea.val(contentDesigner.html());
      $modal.find('.modal-footer').hide();
      $modal.modal('show');
    });
    $('#export').click(function() {
      $textarea.val(contentDesigner.export());
      $modal.find('.modal-footer').hide();
      $modal.modal('show');
    });
    $('#import').click(function() {
      $modal.find('.modal-footer').show();
      $modal.modal('show');
    });
    $('body').on('click', '#import-apply', function() {
      var str = $textarea.val();
      contentDesigner.import(str);
      $modal.modal('hide');
    });
  });
})();
