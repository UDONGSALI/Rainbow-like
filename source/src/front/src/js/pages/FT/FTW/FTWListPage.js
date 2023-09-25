import FTWList from "../../../component/FT/FTW/FTWList";
import styles from '../../../../css/pages/Club/ClubDtlPage.module.css';

function FTWListPage(){
    return(
        <div className={styles.postDetailPage}>
            <FTWList />
        </div>
    );
}

export default FTWListPage;