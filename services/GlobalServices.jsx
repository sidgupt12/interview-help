import axios from "axios";
import OpenAI from "openai";
import { CoachingOptions } from "./Options";

export const getToken = async () => {
    console.log('getToken() called');
    try {
        const result = await axios.get('/api/getToken');
        console.log('Token response:', result);
        console.log('Token received:', result.data.token);
        return result.data.token;
    } catch (error) {
        console.error('Error fetching token:', error.response?.data || error.message);
        throw error;
    }
};

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
});

export const AIModel= async(topic,coachingOption,message)=>{

    const option = CoachingOptions.find((item)=>item.name==coachingOption)
    const prompt = (option.prompt).replace("{users_topic}",topic)


    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {role:"assistant",content:prompt},
            ...message
        ],
    });
    console.log(response.choices[0].message);
    return response.choices[0].message;
}