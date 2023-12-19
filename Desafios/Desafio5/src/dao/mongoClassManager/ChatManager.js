import { modelChat } from "../models/chat.model";

export class chatManager{
    async saveMessages(){
        try {
            return await modelChat.create();
        } catch (error) {
            return error;
        }
    }

    async getMessages(){
        try {
            return await modelChat.find();
        } catch (error) {
            return error;
        }
    }
}