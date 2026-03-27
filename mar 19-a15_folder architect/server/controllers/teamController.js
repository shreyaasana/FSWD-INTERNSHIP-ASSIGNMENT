const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '..', 'data', 'team.json')

function getAllMembers(callback) {
  fs.readFile(dataPath, 'utf-8', function (err, data) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, JSON.parse(data))
    }
  })
}

function getMemberById(id, callback) {
  fs.readFile(dataPath, 'utf-8', function (err, data) {
    if (err) {
      callback(err, null)
    } else {
      let members = JSON.parse(data)
      let member = members.find(function (m) { return m.id === id })
      callback(null, member || null)
    }
  })
}

module.exports = { getAllMembers, getMemberById }
