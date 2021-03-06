define('pages/itb/exhibitors/old_index.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var api_1 = require("ts/util/api.ts");
  var utils_1 = require("ts/util/utils.ts");
  var Languages_1 = require("ts/util/Languages.ts");
  api_1.api({});
  var lpg = Languages_1.Languages.package;
  var clng = 'en';
  if (localStorage.getItem("lngPkg") != null || localStorage.getItem("lngPkg") != undefined) {
      var currentlng = localStorage.getItem("lngPkg");
      clng = currentlng.replace(/["""]/g, "");
  }
  template.defaults.imports.request = utils_1.request;
  var html = template('tpl', { request: utils_1.request, lng: Languages_1.Languages.package });
  document.getElementById('sec').innerHTML = html;
  document.getElementById('btnSearch').addEventListener('click', function (evt) {
      var val = document.getElementById('iptKeyword').value;
      if (val) {
          //location.href = './exh3.html?by=search'+ (request['from']?'&from='+request['from']: '') +  (request['info']?'&info='+request['info']: '') +'&keyword=' + val;
          location.href = './index.html?by=search' + (utils_1.request['from'] ? '&from=' + utils_1.request['from'] : '') + (utils_1.request['info'] ? '&info=' + utils_1.request['info'] : '') + '&keyword=' + val;
      }
  }, false);
  $("#iptKeyword").attr('placeholder', lpg.searchtips);
  //# sourceMappingURL=/itb-dist/pc/pages/itb/exhibitors/old_index.js.map?__=1552033897847
  

});
