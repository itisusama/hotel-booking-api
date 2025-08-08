import User from '../models/User.js';
import { Webhook } from 'svix';

const clearkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature']
        }

        whook.verify(json.stringify(req.body), headers);

        const { type, data } = req.body;

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + ' ' + data.last_name,
            image: data.image_url,
        }

        switch (type) {
            case "user.created":{
                await User.create(userData);
                break;
            }            
            case "user.updated":{
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }            
            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }            
        
            default:
                break;
        }
        res.status(200).json({ message: "Webhook received successfully" });
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(400).json({ message: "Webhook processing failed", error: error.message });
    }
}

export default clearkWebhooks;