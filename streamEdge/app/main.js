var ffmpeg = require('fluent-ffmpeg')
require('hls-server')

// host, port and path to the RTMP stream
var host = 'localhost'
var port = '1935'
var path = '/live/monoxane'

function callback() { console.log("DONE") }

ffmpeg('rtmp://'+host+':'+port+path, { timeout: 432000 }).addOptions([
    '-c:v libx264',
    '-c:a aac',
    '-ac 1',
    '-strict -2',
    '-crf 18',
    '-profile:v baseline',
    '-maxrate 400k',
    '-bufsize 1835k',
    '-pix_fmt yuv420p',
    '-hls_time 10',
    '-hls_list_size 6',
    '-hls_wrap 10',
    '-start_number 1'
  ]).output('public/videos/output.m3u8').on('end', callback).run()

  var HLSServer = require('hls-server')
  var http = require('http')

  var server = http.createServer()
  var hls = new HLSServer(server, {
    path: '/streams',     // Base URI to output HLS streams
    dir: 'public/videos'  // Directory that input files are stored
  })
  server.listen(8000)
