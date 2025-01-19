import {useState} from 'react';
import { Button, Input } from 'antd';
const { TextArea } = Input;

// loading 상태를 알아야 하므로 부모 컴포넌트로부터 props 받아오기
const AIInput = ({ isLoading, onSubmit }) => {
    const [userInput, setUserInput] = useState("");

    // 사용자의 입력을 받아 상위 컴포넌트로 데이터를 전달해 줄 것임

    // Loading 상태 = 사용자가 제출버튼을 못 누르도록 처리
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    }

    const handleClick = () => {
        onSubmit(userInput);
    }



    return (
        <>
            <TextArea value={userInput} onChange={handleUserInput} placeholder='물어보세요'/>
            <Button loading={isLoading} onClick={handleClick}>답변ㄱㄱ</Button>
        </>
    );
};

export default AIInput;