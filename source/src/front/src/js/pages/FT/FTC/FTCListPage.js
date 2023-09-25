import FTCList from "../../../component/FT/FTC/FTCList";
import styles from '../../../../css/pages/Club/ClubDtlPage.module.css';

function FTCListPage(){
    return(
        <div className={styles.postDetailPage}>
            <FTCList />
        </div>
    );
}

export default FTCListPage;