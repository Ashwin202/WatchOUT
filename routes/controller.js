const Log = require('../log')
const sendHTTPResponse = require('../lib/sendHTTPResponse')
const runQuery = require('../db/runQuery')
const Fn = require('./functions')
const axios = require('axios')
const getServicesController = async (request, response) => {
    try{
        const servicesList = await Fn.getServicesList()
        sendHTTPResponse.success(response, `Fetched Services`, servicesList)
    }catch(error){
        sendHTTPResponse.error(response, 'Error while adding domain name', error)
    } 
}

const restartServiceController = async (req, res) => {
    const { id } = req.params// Extract ID from the URL parameter
  
    try {
      const result = await Fn.restartService(Number(id))// Convert ID to a number if necessary
      sendHTTPResponse.success(res, 'Service restarted successfully', result);
    } catch (error) {
      sendHTTPResponse.error(res, 'Error while restarting service', error);
    }
  };
const startServiceController = async (req, res) => {
    const { id } = req.params// Extract ID from the URL parameter
  
    try {
      const result = await Fn.startService(Number(id))
      sendHTTPResponse.success(res, 'Service started successfully', result);
    } catch (error) {
      sendHTTPResponse.error(res, 'Error while starting service', error);
    }
  };
const stopServiceController = async (req, res) => {
    const { id } = req.params// Extract ID from the URL parameter
  
    try {
      const result = await Fn.stopService(Number(id))
      sendHTTPResponse.success(res, 'Service started successfully', result);
    } catch (error) {
      sendHTTPResponse.error(res, 'Error while starting service', error);
    }
  };

module.exports = { getServicesController, restartServiceController, startServiceController, stopServiceController }