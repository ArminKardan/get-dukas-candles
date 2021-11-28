
var cluster = require("cluster");
const numCPUs = require('os').cpus().length;
const fs = require("fs");
const https = require('https');
const url = require('url'),
zlib = require("zlib");


async function StartSending()
{
    return new Promise(async (resolve)=>{
        var options = {
            host:"freeserv.dukascopy.com",
            path: '/2.0/index.php?path=chart%2Fjson3&instrument=XAU%2FUSD&offer_side=B&interval=10SEC&last_update=1636549161294&splits=true&stocks=true&jsonp=_callbacks____5urkvtj4q3e',
            method:"GET",
            port: 443,
            rejectUnauthorized: false, 
            agent:new https.Agent(),
            headers: {
                // 'Cookie':"FXCOMM1=23acddf54ceef63eb2e3e4ee18275ce5; _gcl_au=1.1.1130751604.1636224563; _ga=GA1.2.171042827.1636224563; refpro=3f3bcac5a9bf82d0503ff177be45965cb87d37d4; _ga=GA1.3.171042827.1636224563; _vwo_uuid_v2=D1EA3F4EC593CEDF1FE5BC65F6972EDA0|a8b46b16bb53712ec4e6a78415fc23ff; _vis_opt_s=1%7C; _vis_opt_test_cookie=1; _hjid=adf9f078-1b1e-4098-a9ba-3d18fb43ba2d",

                // 'Accept':'*/*',
                'Accept-Encoding':'gzip, deflate, br',
                'Connection':'keep-alive',
                'Referer':"https://freeserv.dukascopy.com/",
                'Host':"freeserv.dukascopy.com",

            
            }
        }
    

        var buffer = [];

        //zlib.gzip(xbody,(err, gzipOrder)=>{
        //   options.headers["Content-Length"] = gzipOrder.length;
          options.headers["Content-Encoding"] = "gzip";

          const reqx = https.request(options, (res) => {
            var gunzip = zlib.createGunzip();

            res.pipe(gunzip);

            gunzip.on('data', function(data) {
                buffer.push(data.toString())
      
              }).on("end", function() {
                  let data = buffer.join("")
                  console.log(data)
              }).on("error", function(e) {
                  console.log(e)
              })
          });

          reqx.on('error',(err)=>{console.log("err...:"+err)});
          //reqx.write(gzipOrder)
          reqx.end()

       // })

    })
}


StartSending();