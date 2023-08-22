import { SmsQueue } from "../messagequeue/SmsQueue"
import { FormModel } from "../models";


export const SendMessage = async (form: FormModel) => {
    
    const message = `\nForm successfully submitted!\nTitle: ${form.title}\nForm id: ${form.id}\nCreated by: ${form.created_by}\n\nThank you for using Atlan services🚀`;

    await SmsQueue(message)
}