var express = require('express');
var router = express.Router();

var components = [
  {
    cid: 'EMPTY',
    name: 'Empty Cell',
    columns: 1,
    viewHtml: '<div class="col-md-1 editable empty"></div>'
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

/* GET home page. */
router.get('/', function(req, res) {
  res.json(components);
});

module.exports = router;
