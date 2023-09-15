<<<<<<<< HEAD:source/src/front/src/js/layouts/footer.js
import footer_bottom_logo from '../../img/layouts/footer_bottom_logo.png';
import '../../css/layouts/footer.css';
import '../../css/pages/mypage/common.css';
========
import footer_bottom_logo from '../../img/layout/footer/footer_bottom_logo.png';
import '../../css/layout/footer.css';
import '../../css/layout/common.css';
>>>>>>>> e1c2fa4cefa80d3884e1c2dab03cd89e0b65e8c4:source/src/front/src/js/layout/footer.js
import '../../css/font.css';

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