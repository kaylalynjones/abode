'use strict';

var Page = require('../models/page'),
    mp    = require('multiparty');

exports.show = function(req, res){
  Page.findAllByUserId(req.user._id, function(err, pages){
    res.send({pages:pages});
  });
};

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){

    fields.photo = files.photo[0];

    Page.create(fields, req.user._id, function(err, response){
      res.send({response:response});
    });
  });
};

