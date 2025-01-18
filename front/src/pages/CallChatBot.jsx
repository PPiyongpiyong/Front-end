import axios from "axios";

export const CallChatBot = async () => {
    console.log("CallChatBot");

    const token = "eyJ0eXBlIjoicmVmcmVzaCIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiIxIiwicm9sZXMiOltdLCJpYXQiOjE3MzY2NDQ4ODMsImV4cCI6MTczNzI0OTY4M30.jngj_llUSCuD0ee4a1UuvkWfLSS-KWMkyPOXyr-_eEQ";

    try {
        console.log("요청 시작");
        const response = await axios.post(
            "/api2/api/ai/chat",
            { input: "안녕하세요" },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("응답 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("API 호출 중 에러 발생:", {
            요청: {
                url: "/api2/api/ai/chat",
                data: { input: "안녕하세요" },
                headers: { Authorization: `Bearer ${token}` },
            },
            응답: error.response ? error.response.data : null,
            상태코드: error.response ? error.response.status : null,
            메시지: error.message,
        });
        throw error;
    }
    
};
