const { getAllMembers, getMemberById } = require('../controllers/teamController')

function handleTeamRoutes(req, res) {
  let url = req.url

  if (url === '/api/team') {
    getAllMembers(function (err, members) {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Could not read data' }))
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(members))
      }
    })
    return true
  }

  let match = url.match(/^\/api\/team\/(\d+)$/)
  if (match) {
    let id = Number(match[1])
    getMemberById(id, function (err, member) {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Could not read data' }))
      } else if (!member) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Member not found' }))
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(member))
      }
    })
    return true
  }

  return false
}

module.exports = handleTeamRoutes
