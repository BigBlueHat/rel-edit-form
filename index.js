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
    if (tabs.activeTab.url in urlsWithEdit) {
      tabs.activeTab.url = urlsWithEdit[tabs.activeTab.url];
    }
  }
});
// disable by default (not currently a config option for urlButton)
urlButton.setAttribute('disabled', false);

function buttonOn() {
  urlButton.setAttribute('image', self.data.url('images/browser-icon-active.png'));
  urlButton.setAttribute('disabled', false);
}

function buttonOff() {
  urlButton.setAttribute('image', self.data.url('images/browser-icon-inactive.png'));
  urlButton.setAttribute('disabled', true);
}

function checkPage(tab) {
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
}

tabs.on('pageshow', function(tab) {
  checkPage(tab);
});

// handle post-install state; button on all tabs, but no DOM ready triggered
tabs.on('activate', function(tab) {
  // if the URL is loaded elsewhere and somehow we've recorded it, enable!
  if (tab.url in urlsWithEdit) {
    buttonOn();
  }
  checkPage();
});
