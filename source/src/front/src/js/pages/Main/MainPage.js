import Main from "../../component/Main/Main";
import QuickMenu from "../../layout/QuickMenu/QuickMenu";

function MainPage() {
    return (
        <div>
            <QuickMenu useChat={true} useScrollTop={true}/>
            <Main/>
        </div>
    )
}

export default MainPage;