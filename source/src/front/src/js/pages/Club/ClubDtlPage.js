import ClubDetail from "../../component/Club/ClubDetail";
import Comment from "../../component/Comment/Comment";
import styles from '../../../css/pages/Club/ClubDtlPage.module.css';


function ClubDtlPage(){


    return(
        <div className={styles.postDetailPage}>

            <ClubDetail />
            <div className="comment">
                <Comment   />
            </div>
        </div>


);
}

export default ClubDtlPage;