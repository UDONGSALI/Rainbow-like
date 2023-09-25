import Footer from "../../layout/Footer/footer";
import MyActivePost from "../../component/My/Active/MyActivePost";
import MyActiveComment from "../../component/My/Active/MyActiveComment";


const MyActivePage = () => {
    return (
        <main>
            <div id="container">
                <h2>활동 내역</h2>
                <MyActivePost/>
                <MyActiveComment/>
                <Footer/>
            </div>
        </main>
    );
}

export default MyActivePage;