const http = require('http')
const handleTeamRoutes = require('./routes/teamRoutes')

const PORT = 4000

const server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.url === '/' || req.url === '') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      message: 'Folder Architect API — Team Dashboard',
      endpoints: [
        'GET /api/team — All team members',
        'GET /api/team/:id — Single member by ID'
      ]
    }))
    return
  }

  let handled = handleTeamRoutes(req, res)

  if (!handled) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Route not found' }))
  }
})

server.listen(PORT, function () {
  console.log('Server running at http://localhost:' + PORT)
})
