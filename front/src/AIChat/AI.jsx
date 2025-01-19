import { useState } from "react";
import { CallGPT } from "./gpt";
import AIInput from "./AIInput";

const dummyData = `{
    "title": "왼쪽 팔이 골절되었음을 확인했습니다.",
    "emergency_detail": "1. 상황 평가: 환자의 상태를 확인하고, 주변이 안전한지 점검합니다.\\n   - 환자가 의식이 있는지 확인합니다.\\n   - 출혈 여부와 통증 정도를 평가합니다.\\n\\n2. 부상 부위 보호: 골절된 팔을 부드럽게 고정합니다.\\n   - 가능하다면, 부목이나 단단한 물체(예: 신문지, 나무 조각)를 사용하여 팔을 고정합니다.\\n   - 부목이 없는 경우, 팔을 몸에 붙이고 움직이지 않도록 합니다.\\n\\n3. 통증 관리: 통증이 심할 경우, 환자에게 편안한 자세를 취하도록 유도합니다.\\n   - 얼음팩이나 찬 물수건을 사용하여 부상 부위를 차갑게 해 통증을 줄일 수 있습니다.\\n\\n4. 의료 도움 요청: 119에 신속하게 신고하여 전문적인 치료를 받을 수 있도록 합니다.\\n   - 환자의 상태를 간단하게 설명하고, 위치를 알려줍니다.\\n   - 구급대원이 도착할 때까지 환자의 상태를 주의 깊게 관찰합니다.\\n\\n5. 추가적인 주의사항: 환자가 자가진단하지 않도록 주의하고, 움직이지 않도록 합니다.\\n   - 가능하면 환자가 편안하게 쉴 수 있도록 환경을 조성합니다."
}`;

function AI() {
    const [data, setData] = useState(JSON.parse(dummyData));
    const [isLoading, setIsLoading] = useState(false);

    const handleClickAPICall = async (userInput) => {
        try {
            setIsLoading(true);
            const result = await CallGPT({ prompt: userInput });
            setData(result);
        } catch (error) {
            console.error("데이터 로드 에러: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (userInput) => {
        console.log("입력 받은 값: ", userInput);
        handleClickAPICall(userInput);
    };

    return (
        <>
            <AIInput isLoading={isLoading} onSubmit={handleSubmit} />
            <div>
                <h2>{data.title}</h2>
                <p>
                    {data.emergency_detail
                        .replace(/\\n/g, "\n") // '\\n'을 실제 개행 문자 '\n'으로 변환
                        .split("\n") // '\n'을 기준으로 줄 나누기
                        .map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}
                </p>
            </div>
        </>
    );
}

export default AI;
