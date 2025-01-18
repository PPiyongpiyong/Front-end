import { CallChatBot } from "./CallChatBot";
import { useState } from "react";


const AIChat = () => {
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleClickAPICall = async () => {
        try{
            setIsLoading(true);
            const message = await CallChatBot();
            setData(message);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };

    return (
    <>
        <button onClick={handleClickAPICall}>AI ChatBox Service</button>
        <div>data : {data}</div>
        <div>isLoading: {isLoading ? "loading..." : "fin"}</div>    
    </>
    );
}

export default AIChat;