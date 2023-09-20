import ClubDetail from "../../component/Club/ClubDetail";
import Comment from "../../component/Comment/Comment";
// import styles from '../../../css/component/Club/ClubDetail.module.css';


function ClubDtlPage(){


    return(
        <div className="ex">

            <ClubDetail />
            <div className="comment">
                <Comment   />
            </div>
        </div>


);
}

export default ClubDtlPage;