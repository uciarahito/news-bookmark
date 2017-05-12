var CronJob = require('cron')
    .CronJob
var kue = require('kue'),
    queue = kue.createQueue()
require('dotenv')
    .config();

var api_key = 'key-6aab643244a2637700fc44611921ff8b';
var domain = 'sandboxf2f161861e7f4ba284b4a8e8917160dc.mailgun.org';
var mailgun = require('mailgun-js')({
    apiKey: api_key,
    domain: domain
});

module.exports = {
    buatCron: function(dataKirim) {
        new CronJob(dataKirim.date, function() {
            var data = {
                from: 'Ilham <photon628@gmail.com>',
                to: dataKirim.email,
                subject: 'Hello',
                text: dataKirim.text
            };
            var job = queue.create('email', data)
                .save(function(err) {
                    if (!err) console.log(job.id);
                });
        }, null, true, 'Asia/Jakarta');

        queue.process('email', function(job, done) {
            sendEmail(job.data, done);
        });
    }
}

function sendEmail(dataemail, done) {
    mailgun.messages()
        .send(dataemail, function(error, body) {
            console.log(body);
        });
    done()
}