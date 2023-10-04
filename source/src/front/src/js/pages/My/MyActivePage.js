
import MyActivePost from "../../component/My/Active/MyActivePost";
import MyActiveComment from "../../component/My/Active/MyActiveComment";
import styles from '../../../css/pages/mypage/MyActivePage.module.css';


const MyActivePage = () => {
    return (

            <div id={styles.container}>
                <h2>활동 내역</h2>
                <MyActivePost/>
                <MyActiveComment/>

            </div>

    );
}

export default MyActivePage;