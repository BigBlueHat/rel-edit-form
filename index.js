var self = require('sdk/self');
var tabs = require('sdk/tabs');
var urlbarButton = require('urlbarbutton');

// key is page URL; value is edit-form URL
var urlsWithEdit = {};

var urlButton = urlbarButton({
  id : 'rel-edit-form-button',
  image : self.data.url('images/browser-icon-inactive.png'),
  onClick : function() {
    // this needs to happen on load (not on click)
    tabs.activeTab.url = urlsWithEdit[tabs.activeTab.url];
  }
});

function buttonOn() {
  urlButton.setAttribute('image', self.data.url('images/browser-icon-active.png'));
  urlButton.setAttribute('disabled', false);
}

function buttonOff() {
  urlButton.setAttribute('image', self.data.url('images/browser-icon-inactive.png'));
  urlButton.setAttribute('disabled', true);
}

tabs.on('pageshow', function(tab) {
  buttonOff();
  var worker = tab.attach({
    contentScriptFile: self.data.url('edit-form-url.js')
  });
  worker.port.on('hasEditForm', function(url) {
    if (url) {
      urlsWithEdit[tab.url] = url;
      buttonOn();
    } else {
      buttonOff();
    }
  });
  worker.port.emit('checkForEditFormUrl');
});
