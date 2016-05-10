self.port.on('checkForEditFormUrl', function() {
  var url = false;
  var link = document.querySelector('[rel=edit-form]');
  if (null !== link) {
    url = link.href;
  }
  self.port.emit('hasEditForm', url);
});
