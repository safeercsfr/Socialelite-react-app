import nodemailer from 'nodemailer'

export const sendEmail = async(email, subject, text) => {
    try{
        const trasporter = nodemailer.createTransport({
            host:process.env.HOST,
            service: process.env.SERVICE,
            post:Number(process.env.EMAIL_PORT),
            secure:Boolean(process.env.SECURE),
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        })

        await trasporter.sendMail({
            from:process.env.USER,
            to:email,
            subject:subject,
            text:text
        })
        console.log("Email send successfully");
    }catch(error){
        console.log('Email not send');
        console.log(error);
    }
}

export default sendEmail