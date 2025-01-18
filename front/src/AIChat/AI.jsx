import {useState} from 'react';
import {CallGPT} from "./gpt";


const dummyData = JSON.parse(`{
    "title": "코딩의 시련과 성장",
    "thumbnail": "https://source.unsplash.com/1600x900/?coding",
    "summary": "코딩 강의를 듣고 버그로 어려움을 겪었으며, 결국 GPT를 통해 문제를 해결했다.",
    "emotional_content": "오늘 코딩 강의를 듣고 나서, 프로젝트에서 많은 버그를 마주하게 되었다. 스택오버플로에서 해결책을 찾아보았지만, 기껏해야 문제를 더 복잡하게 만들 뿐이었다. 결국 GPT의 도움을 받아 문제를 해결했지만, 이렇게 쉽게 해결하게 되는 것이 내 개발 실력에 도움이 될지 불안한 마음이 든다. 나는 진정으로 성장하고 있는 것일까?",
    "emotional_result": "이런 경험은 나의 불안과 자신감 부족을 드러낸다. 문제를 스스로 해결하지 못했다는 생각이 나의 능력에 대한 의구심을 키우고 있다.",
    "analysis": "이 상황은 당신이 느끼는 불안과 자기 의심의 감정을 반영합니다. '성장하는 것은 고통을 동반한다'는 말처럼, 도전과 실패는 성장을 위한 중요한 과정입니다. 문제를 스스로 해결하지 못했다고 생각할 수 있지만, 도움을 요청하는 것도 중요한 능력입니다. 스스로의 한계를 인정하고 필요한 도움을 받는 것이 진정한 성장의 일부입니다.",
    "action_list": [
        "문제를 해결할 수 있을 때까지 끈기 있게 시도하기",
        "도움을 요청하는 것을 두려워하지 않기",
        "주기적으로 자신의 개발 과정을 돌아보고 성장 점검하기"
    ]
}`);




function AI() {
    const [data, setData] = useState(dummyData);
    const [isLoading, setIsLoading] = useState(false);

    const handleClickAPICall = async()=> {
        try{
            setIsLoading(true);
            const message = await CallGPT({
                prompt:`
                코딩 강의를 들었다. 프로젝트에 버그가 많이 나왔음. 스택오버플로에서 검색했지만 해결 안되었어.
                역시 gpt를 통해서 해결했다. 근데 이렇게 해결하는게 개발실력에 도움 될까..?
                `,
            });
            setData(JSON.parse(message));
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };

    console.log(">>>>>>>>data  ", data);

    return (
        <>
            <button onClick={handleClickAPICall}>GPT</button>
            <div>data : {data?.title}</div>
            {/* <div>isLoading: {isLoading ? "loading..." : "fin"}</div>   */}
        </>
    );
}

export default AI;