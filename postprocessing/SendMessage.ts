import { SmsQueue } from "../messagequeue/SmsQueue"


export const SendMessage = async (form: any) => {
    const message = "Form successfully submitted!"

    await SmsQueue(message)
}