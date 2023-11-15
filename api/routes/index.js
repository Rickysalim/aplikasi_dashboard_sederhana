module.exports = app => {
    const Middleware = require('../utils/middleware');
    const router = require('express').Router();
    const clothes = require('./clothes');
    const types = require('./types');
    const users = require('./users');
    const variants = require('./variants');
    const me = require('./me')
    const transactions = require('./transaction')
    const middleware = new Middleware
    
    // without check token
    router.use(users)

    // with check token
    router.use(middleware.checkToken)
    router.use(transactions)
    router.use(me)
    router.use(clothes)
    router.use(types)
    router.use(variants)
    
    app.use('/api/v1', router)
}