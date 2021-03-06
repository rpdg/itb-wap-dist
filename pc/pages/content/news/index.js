define('pages/content/news/index.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var opg_ts_1 = require("ts/opg.ts");
  var Combo_1 = require("ts/ui/Combo.ts");
  var Languages_1 = require("ts/util/Languages.ts");
  var store_1 = require("ts/util/store.ts");
  var utils_1 = require("ts/util/utils.ts");
  var store_2 = require("ts/util/store.ts");
  var cache = store_2.Cache.getInstance();
  console.log('Languages:', Languages_1.Languages);
  var infoPage = '/itb-dist/pc/pages/content/news/add.html?__=974f516';
  opg_ts_1.default.api({
      'list!post': 'Information/QueryInformations',
      setStick: 'Information/SetInformationStick',
      cancelStick: 'Information/CancelInformationStick',
      'setStatus!post': 'Information/EnableOrDisableInformationById',
  });
  var lpg = Languages_1.Languages.package;
  var moduleName = lpg.news;
  var panel = opg_ts_1.default.wrapPanel('#tbSearch', {
      title: "" + moduleName + lpg.search,
      btnSearchText: "<i class=\"ico-find\"></i> " + lpg.search,
      btnSearchClick: function () {
          var param = $('#tbSearch').fieldsToJson();
          if (param.beginDate && param.beginDate.indexOf(' ') < 0) {
              param.beginDate += ' 00:00:00';
          }
          if (param.endDate && param.endDate.indexOf(' ') < 0) {
              param.endDate += ' 23:59:59';
          }
          //console.log(panel.jq, param);
          tb.update(param);
      },
  });
  jQuery.datetimepicker.setLocale(Languages_1.Languages.current);
  Combo_1.Combo.makeClearableInput($('#beginDate').datetimepicker({
      timepicker: false,
      closeOnDateSelect: true,
      format: 'Y-m-d',
  }), $({}));
  Combo_1.Combo.makeClearableInput($('#endDate').datetimepicker({
      timepicker: false,
      closeOnDateSelect: true,
      format: 'Y-m-d',
  }), $({}));
  var permission = store_1.store.get('permission');
  var tbButtons = [];
  if (permission) {
      if (permission['NewsManagement']) {
          tbButtons.push({ id: 'btnAdd', className: 'btn-create', html: "<i class=\"ico ico-create\"></i> " + lpg.add });
      }
  }
  var tb = opg_ts_1.default('#tb').table({
      api: opg_ts_1.default.api.list,
      param: { informationType: 0 },
      fixFooter: true,
      titleBar: {
          title: "" + moduleName + lpg.list,
          buttons: tbButtons,
      },
      columns: [
          {
              text: 'ID',
              src: 'id',
              width: 50
          },
          {
              text: "" + lpg.newsTitle,
              src: 'title',
              width: 350
          },
          {
              text: lpg.publisher,
              src: 'from',
              width: 150
          },
          {
              text: lpg.stick,
              src: 'stick',
              width: 60,
              render: function (v) { return v ? lpg.yes : lpg.no; },
          },
          {
              text: lpg.status,
              src: 'status',
              width: 100,
              render: function (v) { return v ? lpg.online : lpg.offline; },
          },
          {
              text: lpg.process,
              src: 'id',
              width: 180,
              align: 'left',
              render: function (id, index, row) {
                  var html = "<button data-id=\"" + id + "\" data-index=\"" + row[':index'] + "\" class=\"btn-mini btn-info btnEdit\">" + lpg.edit + "</button> ";
                  if (!row.stick) {
                      html += "<button data-id=\"" + id + "\" class=\"btn-mini btn-success btnSetStick\">" + lpg.stick + "</button> ";
                  }
                  else {
                      html += "<button data-id=\"" + id + "\" class=\"btn-mini btn-warning btnCancelStick\">" + lpg.cancelStick + "</button> ";
                  }
                  if (row.status) {
                      html += "<button data-id=\"" + id + "\" class=\"btn-mini btn-danger btnOffline\">" + lpg.offline + "</button>";
                  }
                  else {
                      html += "<button data-id=\"" + id + "\" class=\"btn-mini btn-success btnOnline\">" + lpg.online + "</button>";
                  }
                  return html;
              },
          },
      ],
      pagination: true,
  });
  //edit
  tb.tbody.on('click', '.btnEdit', function () {
      var btn = $(this), id = btn.data('id'), index = btn.data('index');
      var row = tb.data[index];
      row.enableStick = row.stick ? 1 : 0;
      cache.set('row', row);
      var src = utils_1.url.setParam(infoPage, { id: id });
      var pop = opg_ts_1.default.popTop("<iframe src=\"" + src + "\" />", {
          title: lpg.edit + ": " + row.title,
          btnMax: true,
          width: 800,
          height: 550,
          onClose: function () {
              cache.remove('row');
              tb.update();
          },
      });
  });
  //offline
  tb.tbody.on('click', '.btnOffline', function () {
      var btn = $(this), id = btn.data('id');
      opg_ts_1.default.api.setStatus({ id: id, status: 0 }, function () { return tb.update(); });
  });
  //online
  tb.tbody.on('click', '.btnOnline', function () {
      var btn = $(this), id = btn.data('id');
      opg_ts_1.default.api.setStatus({ id: id, status: 1 }, function () { return tb.update(); });
  });
  //stick
  tb.tbody.on('click', '.btnSetStick', function () {
      var btn = $(this), informationId = btn.data('id');
      opg_ts_1.default.api.setStick({ informationId: informationId }, function () { return tb.update(); });
  });
  //stick
  tb.tbody.on('click', '.btnCancelStick', function () {
      var btn = $(this), informationId = btn.data('id');
      opg_ts_1.default.api.cancelStick({ informationId: informationId }, function () { return tb.update(); });
  });
  //Add
  $('#btnAdd').click(function () {
      var pop = opg_ts_1.default.popTop("<iframe src=\"" + infoPage + "\" />", {
          title: "" + lpg.add + moduleName,
          btnMax: true,
          width: 800,
          height: 400,
          onClose: function () {
              tb.update();
          },
      });
  });
  //# sourceMappingURL=/itb-dist/pc/pages/content/news/index.js.map?__=1552033897847
  

});
