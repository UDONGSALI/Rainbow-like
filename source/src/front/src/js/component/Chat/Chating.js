import {useParams} from "react-router-dom";

function Chating(){
    const {memNum} = useParams();

    return(
        <div>
            <h1>{memNum} 실시간 채팅 전환</h1>
        </div>
    )
}

export default Chating;