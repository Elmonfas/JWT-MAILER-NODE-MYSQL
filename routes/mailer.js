const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "monfasbusiness@gmail.com",
      pass: "llrr ggmn bnra keyk",
    },
});

async function main(url,res,email) {
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <monfasbusiness@gmail.com>', // sender address
      to: `${email}`,
      subject: "Hello ✔", // Subject line
      html: `<b>Para recuperar contraseña accede a esta URL :</b> <a href="${url}" >${url}</a>` , 
    });


res.render('wait')
}

module.exports = { transporter, main };
