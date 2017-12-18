define('pages/content/notice/addSubject.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var opg_ts_1 = require("ts/opg.ts");
  var Languages_1 = require("ts/util/Languages.ts");
  var lpg = Languages_1.Languages.package;
  console.log('Languages:', Languages_1.Languages);
  opg_ts_1.default.api({
      'addSubject!post': 'Information/AddInformationSubContent',
      'upload!UPLOAD': 'upload/files',
  });
  var informationId = opg_ts_1.default.request['id'];
  var imgUrl;
  var editor;
  var editorWrap = $("<script type=\"text/plain\" id=\"myEditor1\"></script>");
  var format = {
      0: lpg.pureText,
      1: lpg.picture,
      2: lpg.link,
      3: lpg.richText,
  };
  var formatType;
  var panel = $('#panel');
  var selType = $('#selType').on('change', function () {
      if (editor) {
          editor.destroy();
          editor = null;
          location.reload(true);
      }
      formatType = ~~selType.val();
      switch (formatType) {
          case 0:
              panel.html("<textarea style=\"width: 460px; height: 230px;\"></textarea>");
              break;
          case 2:
              panel.html("<form>\n\t\t\t\t\t\t<input name=\"text\" type=\"text\" placeholder=\"" + lpg.linkText + "\" style=\"width: 100%;\"/>\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\t<input name=\"url\" type=\"text\" placeholder=\"" + lpg.linkHref + "\" style=\"width: 100%;margin-top: 0.5em;\"/>\n\t\t\t\t</form>");
              break;
          default:
              panel.empty();
      }
  });
  window['doSave'] = function (pop, ulSubjects) {
      var content;
      switch (formatType) {
          case 0:
              content = panel.find('textarea').eq(0).val();
              break;
          case 1:
              content = imgUrl;
              break;
          case 2:
              var txt_1, url_1;
              panel.find('input').each(function (i, ele) {
                  var val = ele.value;
                  if (!val) {
                      return opg_ts_1.default.warn(lpg.nullInputWarn);
                  }
                  if (i === 0)
                      txt_1 = val;
                  else
                      url_1 = val;
              });
              content = "<a href=\"" + url_1 + "\">" + txt_1 + "</a>";
              break;
          default:
              opg_ts_1.default.warn(lpg.plsSelect);
              return;
      }
      if (!content) {
          opg_ts_1.default.warn(lpg.nullInputWarn);
      }
      else {
          opg_ts_1.default.api.addSubject({ formatType: formatType, informationId: informationId, content: content }, function (data) {
              ulSubjects.append("<li>[" + format[formatType] + "]: " + content + "</li>");
              pop.close();
          });
      }
      return true;
  };
  //# sourceMappingURL=/itb-dist/pc/pages/content/notice/addSubject.js.map?__=
  

});
