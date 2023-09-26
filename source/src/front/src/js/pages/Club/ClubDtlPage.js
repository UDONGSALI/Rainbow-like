import ClubDetail from "../../component/Club/ClubDetail";
import Comment from "../../component/Comment/Comment";
import styles from '../../../css/pages/Club/ClubDtlPage.module.css';


function ClubDtlPage(props){
    const {memId} = props;


    return(
        <div className={styles.postDetailPage}>

            <ClubDetail memId = {memId} />
            <div className="comment">
                <Comment memId = {memId}  />
            </div>
        </div>


);
}

export default ClubDtlPage;