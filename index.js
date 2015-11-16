'use strict';
var path       = require('path');
var resolve    = require('resolve');
var Funnel     = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-polyfill-for-tests',

  included: function(app) {
    this._super.included.apply(this, arguments);

    if (this.shouldIncludePolyfill()) {
      this.app.import(path.join(this.treePaths.vendor, 'ember-polyfill-for-tests', 'browser-polyfill.js'), { prepend: true });
    }
  },

  shouldIncludePolyfill: function() {
    var babelOptions = getBabelOptions(this);
    if (this.app.env === 'test' && babelOptions.includePolyfill !== true) {
      return true;
    }
  },

  treeForVendor: function(vendorTree) {
    if (!this.shouldIncludePolyfill()) { return vendorTree; }

    var babelCoreDir = path.dirname(resolve.sync('babel-core'));

    var babelPolyfillTree = new Funnel(babelCoreDir, {
      destDir: 'ember-polyfill-for-tests',
      files: ['browser-polyfill.js']
    });

    if (vendorTree) {
      return new MergeTress([vendorTree, babelPolyfillTree]);
    } else {
      return babelPolyfillTree;
    }
  }

};

function getBabelOptions(addonContext) {
  var baseOptions = (addonContext.parent && addonContext.parent.options) || (addonContext.app && addonContext.app.options);
  return baseOptions && baseOptions.babel || {};
}
