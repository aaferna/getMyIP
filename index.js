const   path = require('path'),
        nodemailer = require('nodemailer'),
        axios = require('axios');

    if(process.argv.slice(1)[1] === "dev"){
        args = require("./config.json")
    } else {
        args = require(process.argv.slice(1)[0])
    }

const enviaMail = (ip) => { 

    let transporter = nodemailer.createTransport(args.email);
  
    let mailOptions = {
        from: args.email.auth.user,
        to: args.to,
        subject: 'Nueva IP Local',
        text: ip
    };
  
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });

}

let lastip = 0

setInterval(() => {


    axios({
        method: 'get',
        url: 'http://ipinfo.io/ip'
    })
    .then((response) => { 

        if (lastip == response.data){}
        else {
            lastip = response.data
            console.log('last ip', lastip)
            enviaMail(lastip)
        }


    })
    
}, args.timer);