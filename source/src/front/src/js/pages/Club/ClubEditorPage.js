import ClubEditor from "../../component/Club/ClubEditor";
import {useParams} from "react-router-dom";

function ClubEditorPage(props){
    const {memId} = props;


    return(
        <div>
            <ClubEditor memId = {memId} />
        </div>


);
}

export default ClubEditorPage;