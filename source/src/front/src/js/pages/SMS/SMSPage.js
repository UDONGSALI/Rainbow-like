import SMSForm from "../../component/SMS/SMSForm";
import SMSList from "../../component/SMS/SMSList";

function SMSPage(){

    return(
        <div>
            <h1>
                sms 페이지
            </h1>
                <SMSForm />
                <SMSList />
        </div>
    )
}

export default SMSPage;