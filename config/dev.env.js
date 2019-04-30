'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API:'"https://www.easy-mock.com/mock/5cc7dec6a5261d4d07c6de05/oanew"',
  //API:'"http://192.168.0.178:9050"'
})
