import FTWList from "../../../component/FT/FTW/FTWList";
import styles from '../../../../css/pages/Club/ClubDtlPage.module.css';

function FTWListPage(props){
    const {memId} = props;

    return(
        <div className={styles.postDetailPage}>
            <FTWList memId={memId} />
        </div>
    );
}

export default FTWListPage;