const ShortLink = require('../models/shortLink');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const DataStatusEnums = require('../datadict/enums/DataStatusEnums');
const ErrorNoEnums = require('../datadict/enums/errorNoEnums');
const validUrl = require('valid-url');
const murmurhash = require('murmurhash')
const {string10to62} = require('../utils/numberUtils')
exports.parse = async (req, res) => {
    const short_url = req.query.short_url;
    await ShortLink.findOne({where: {short_url: short_url}}).then(shorLink => {
        logger.info('short link: %s', JSON.stringify(shorLink));
        if (shorLink && shorLink.status !== DataStatusEnums.INACTIVE) {
            res.redirect(shorLink.origin_url);
        } else {
            res.statusCode(404);
        }
    }).catch(error => {
        logger.error('query user failed %s', error.message);
        res.statusCode(500);
    });

};

exports.queryList = async (req, res) => {
    const {page, pageSize } = req.query
    await ShortLink.findAll({
        where: {
            user_id:  req.auth.userId
        },
        offset: (page - 1) * pageSize,
        limit: parseInt(pageSize),
    }).then(shorLinks => {
        logger.info('short link: %s', JSON.stringify(shorLinks));
        res.json({
            ...ErrorNoEnums.SUCCESS,
            data: {
                list: shorLinks,
                total: shorLinks.length
            }
        });
    }).catch(error => {
        logger.error('query user failed %s', error.message);
        res.statusCode(500);
    });

};

exports.generate = async (req, res) => {
    const {originUrl, shortDomain} = req.body;
    const userId = req.auth.userId;
    if (validUrl.isUri(originUrl)) {
        try {
            let shortLink = await ShortLink.findOne({where: {origin_url: originUrl}});
            if (shortLink && shortLink.status !== DataStatusEnums.FREEZE) {
                res.json({
                    ...ErrorNoEnums.SUCCESS,
                    data: {
                        shortUrl: shortLink.short_url
                    }
                });
            } else {
                const hasNum = murmurhash.v3(originUrl);
                const shortUrl = string10to62(hasNum)
                logger.info("shortUrl hash: %s", shortUrl)
                await ShortLink.create({
                    short_url: shortDomain === '' ? process.env.SHORT_LINK_BASE_URL + "/" + shortUrl : shortDomain + "/" + shortUrl,
                    origin_url: originUrl,
                    user_id: userId.id,
                    status: DataStatusEnums.ACTIVE
                })
                res.json({
                    ...ErrorNoEnums.SUCCESS,
                    data: {
                        shortUrl: shortDomain === '' ? process.env.SHORT_LINK_BASE_URL + "/" + shortUrl : shortDomain + "/" + shortUrl
                    }
                });
            }
        } catch (error) {
            res.json(ErrorNoEnums.SERVER_INTERNAL_ERROR);
        }
    } else {
        res.json(ErrorNoEnums.INVALID_URL);
    }
};
exports.operate = async (req, res) => {
    console.log(req)
}