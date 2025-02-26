
import {sendEmail} from "@/app/components/mailder/mail-sender";

export const SendThisShit = async(value) =>{
    console.log("This shit is send !"
        ,value)
    sendEmail(value).then(console.log("Helll")).catch(e=>console.log(e));
}