if (typeof(EPD) == 'undefined') EPD = {};
(function(scope) {
  function Component(components) {
    this._components = components;
  }

  Component.prototype.find = function(cid) {
    this._components.forEach(function(c) {
      if (c.cid === cid) component = c;
    });
    return component;
  }
  Component.prototype.all = function() {
    return JSON.parse(JSON.stringify(this._components));
  }

  scope.Component = Component;
})(EPD);
