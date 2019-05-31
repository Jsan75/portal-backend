const express = require('express');
const router = express.Router();
const Group = require('../models/Groups');
const { ensureAuthenticated } = require('../config/auth');


router.get('/',ensureAuthenticated, function(req, res, next) {
    var perPage = 9;
    var page = req.query.page || 1;

    Group
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, groups) {
            Group.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('groupList', {
                    groups: groups,
                    current: page,
                    docType: 'groups',
                    pages: Math.ceil(count / perPage)
                });
            });
        });
});

module.exports = router;