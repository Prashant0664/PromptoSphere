import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 
export const PATCH = async( request,{params})=>{
    const { prompt } = await request.json();
    try {
        await connectToDB();
        const existingPrompt = await User.findById(params.id);

        if (!existingPrompt) {
            return new Response("User not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.desc = prompt;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
        
    } catch (error) {
        //console.log("error in patch in user")
        return new Response("Error Updating Prompt", { status: 500 });
    }
}