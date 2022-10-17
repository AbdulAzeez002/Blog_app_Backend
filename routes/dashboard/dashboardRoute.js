const express=require('express')
const dashbaordRoute=express.Router()
const {dashboardItems}=require('../../controllers/dashboard/dashboardCtrl')



dashbaordRoute.get('/',dashboardItems)


module.exports = dashbaordRoute;
