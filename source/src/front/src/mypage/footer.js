import footer_bottom_logo from '../layout/img/footer/footer_bottom_logo.png';
import '../footer/footer.css';
import '../layout/css/common.css';
import '../layout/css/font.css';

const Footer = () => {
    return (
        <footer id="footer" >
            <div className="layout">
                <div className="logo">
                    <a href='https://sj-equity.or.kr/' className='footer_logo'>
                        <img src={footer_bottom_logo} alt/>

                    </a>
                </div>
                <div className="information">
                    <ul className="other_list">
                        <li>
                            <a href='https://sj-equity.or.kr/sub0606'><span>개인정보처리방법</span></a>
                        </li>
                        <li>
                            <a href='https://sj-equity.or.kr/sub0607'><span>이용약관</span></a>
                        </li>
                        <li>
                            <a href='https://sj-equity.or.kr/sub0608'><span>이메일무단수집거부</span></a>
                        </li>
                    </ul>
                    <div className="address">
                        <p>30151 세종특별자치시 새롬로 14 새롬종합복지센터 4층(새롬동)</p>
                        <p>대표전화 (044) 863-0380 / 대표메일 sjwomenplaza@gmail.com</p>
                        <p className="copr">Copyrightⓒ 세종특별자치시. all Rights Reserved.</p>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer;