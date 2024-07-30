const IORedis = require('ioredis')
const redisIOClient = new IORedis()
const exec = require('exec')
const Log = require('../log')
const runQuery = require('../db/runQuery')
const QueryBuilder = require('../db/query')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const pm2 = require('pm2')

const connectToPm2 = () => {
    return new Promise((resolve, reject) => {
      pm2.connect((err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }
  
  const listPm2Services = () => {
    return new Promise((resolve, reject) => {
      pm2.list((err, list) => {
        if (err) {
          return reject(err)
        }
        resolve(list)
      })
    })
  }
  const startPm2ServiceById = (id) => {
    const stringID = String(id)
    return new Promise((resolve, reject) => {
      pm2.start(stringID, (err, proc) => {
        if (err) {
          return reject(err)
        }
        resolve(proc)
      })
    })
  }
  const disconnectFromPm2 = () => {
    return new Promise((resolve, reject) => {
      pm2.disconnect((err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }
  const restartPm2ServiceById = (id) => {
    return new Promise((resolve, reject) => {
      pm2.restart(id, (err, proc) => {
        if (err) {
          return reject(err)
        }
        resolve(proc)
      })
    })
  }
  
  const getServicesList = async () => {
    try {
      await connectToPm2()
      const list = await listPm2Services()
      await disconnectFromPm2()
  
      const services = list.map(service => ({
        id: service.pm_id,
        name: service.name,
        status: service.pm2_env.status,
      }))
  
      return services
    } catch (err) {
      Log.error('Error fetching services:', err)
      return []
    }
  }

  const restartService = async (id) => {
    try {
      await connectToPm2()
      const result = await restartPm2ServiceById(id)
      await disconnectFromPm2()
      return result
    } catch (err) {
      Log.error('Error restarting service:', err)
      throw err
    }
  }

  const startService = async (id) => {
    try {
      await connectToPm2()
      const result = await startPm2ServiceById(id)
      await disconnectFromPm2()
      return result
    } catch (err) {
      Log.error('Error starting service:', err)
      throw err
    }
  }
  const stopPm2ServiceById = (id) => {
    return new Promise((resolve, reject) => {
      pm2.stop(id, (err, proc) => {
        if (err) {
          return reject(err)
        }
        resolve(proc)
      })
    })
  }

  const stopService = async (id) => {
    try {
      await connectToPm2()
      const result = await stopPm2ServiceById(id)
      await disconnectFromPm2()
      return result
    } catch (err) {
      Log.error('Error stopping service:', err)
      throw err
    }
  }

module.exports = { getServicesList, restartService, startService, stopService}