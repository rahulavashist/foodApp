const express = require("express")
const hbs = require("hbs")
const path = require("path")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: "rahulavahist@gmail.com",
        pass: "pkgltgbpggpovuhb"
    }
})


const app = express()

app.set("view engine", "hbs")
hbs.registerPartials(path.join(__dirname + '/views/partials'))
app.use(express.static(path.join(__dirname, "/views/public")))

const urlEncoder = bodyParser.urlencoded()

app.get("/", (req, res) => {
    return res.render("index")
})

app.get("/faq", (req, res) => {
    return res.render("faq")
})


app.get("/foodgallery", (req, res) => {
    return res.render("foodgallery")
})

app.get("/contact", (req, res) => {
    return res.render("contact", { show: false })
})
app.post("/contact", urlEncoder, (req, res) => {
    let mailOption = {
        from: "rahulavashist2gmail.com",
        to: req.body.email,
        subject: "Your Query Received!!! : Team Foodies",
        text: "Thanks to Share Your Feedback with Us!!!\nOur team Will Contact Your Soon\n"
    }
    transporter.sendMail(mailOption, (error, data) => {
        if (error)
            console.log(error);
    })
    mailOption = {
        from: "rahulavashist2gmail.com",
        to: "rahulavashist2gmail.com",
        subject: "Query Received!!! : Team Foodies",
        text: `
            Name :  ${req.body.name}
            Email :  ${req.body.email}
            Phone :  ${req.body.phone}
            Message :  ${req.body.message}
        `
    }
    transporter.sendMail(mailOption, (error, data) => {
        if (error)
            console.log(error);
    })
    return res.render("contact", { show: true })
})


app.listen(80, () => console.log("Server is Running at Port http://localhost:80"))










// const express = require("express")
// const hbs = require("hbs")
// const path = require("path")

// const app = express()

// app.set("view engine", "hbs")
// hbs.registerPartials(path.join(__dirname + '/views/partials'));
// app.use(express.static(path.join(__dirname, "/views/public")))


// app.get("/", (req, res) => {
//     return res.render("index")
// })
// app.get("/foodgallery", (req, res) => {
//     return res.render("foodgallery")
// })
// app.get("/faq", (req, res) => {
//     return res.render("faq")
// })
// app.get("/contact", (req, res) => {
//     return res.render("contact")
// })


// app.listen(80, () => console.log("Server is Running on Port 80"))