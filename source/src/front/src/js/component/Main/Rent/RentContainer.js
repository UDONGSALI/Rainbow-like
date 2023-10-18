import styles from '../../../../css/component/Main/Rent/RentContainer.module.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const textData = [
    "멀티미디어실",
    "강의실",
    "다목적 활동실",
    "공유 오피스",
    "상담실"
];

const imgData = [
    {
        name: '하람',
        type: '멀티미디어실',
        maxPerson: '20명',
        fee: '20,000원',
        use: '컴퓨터 관련 강의실',
        fileUrl: 'https://storage.googleapis.com/rainbow_like/space/8/space8.jpg'
    },
    {
        name: '혜윰',
        type: '강의실',
        maxPerson: '24명',
        fee: '5,000원',
        use: '강의실',
        fileUrl: 'https://storage.googleapis.com/rainbow_like/space/6/space6.jpg'
    },
    {
        name: '라온',
        type: '다목적 활동실',
        maxPerson: '20명',
        fee: '5,000원',
        use: '예술활동 및 운동 등',
        fileUrl: 'https://storage.googleapis.com/rainbow_like/space/7/space7.jpg'
    },
    {
        name: '활짝',
        type: '공유 오피스',
        maxPerson: '8명',
        fee: '무료',
        use: '개인, 단체 사무',
        fileUrl: 'https://storage.googleapis.com/rainbow_like/space/3/space3.jpg'
    },
    {
        name: '폴짝',
        type: '공유 오피스',
        maxPerson: '6명',
        fee: '무료',
        use: '소모임',
        fileUrl: 'https://storage.googleapis.com/rainbow_like/space/1/space1.jpg'
    },
    {
        name: '반짝',
        type: '공유 오피스',
        maxPerson: '6명',
        fee: '무료',
        use: '소모임',
        fileUrl: 'https://storage.googleapis.com/rainbow_like/space/2/space2.jpg'
    },
    {
        name: '꼼지락',
        type: '상담실',
        maxPerson: '4명',
        fee: '무료',
        use: '상담실,소모임',
        fileUrl: 'https://storage.googleapis.com/rainbow_like/space/4/space4.jpg'
    },
    {
        name: '어슬렁',
        type: '상담실',
        maxPerson: '4명',
        fee: '무료',
        use: '상담실,소모임',
        fileUrl: 'https://storage.googleapis.com/rainbow_like/space/5/space5.jpg'
    },
];

function RentContainer() {
    const [selectedType, setSelectedType] = useState("멀티미디어실");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const navigate = useNavigate();

    const filteredImages = imgData.filter(data => data.type === selectedType);

    const handleTypeSelection = (type) => {
        setSelectedType(type);
        setSelectedImageIndex(0); // 선택할 때마다 이미지 인덱스를 0으로 초기화
    };

    const handleImageNameClick = (index) => {
        setSelectedImageIndex(index);
    };

    const handleRentButtonClick = () => {
        navigate('/rent/status');
    };


    return (
        <div className={styles.RentContainer}>
            <div className={styles.TextComponent}>
                <div>
                    <p style={{fontSize: '50px'}}><strong>공간 대관</strong></p>
                    <h5 style={{marginTop: '15px'}}>부담 없이 모일 장소가 필요하세요?</h5>
                    <h5>세종여성플라자의 문이 활짝 열려 있습니다.</h5>
                </div>
                <div style={{height: '65%', display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    {textData.map((text, index) => (
                        <div
                            key={index}
                            className={`${styles.LinkComponent} ${selectedType === text ? styles.SelectedLink : ''}`}
                            onClick={() => handleTypeSelection(text)}
                        >
                            {text}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.ImageComponent}>
                {filteredImages.length > 0 && (
                    <div>
                        <img
                            src={filteredImages[selectedImageIndex].fileUrl}
                            alt={filteredImages[selectedImageIndex].name}
                            className={selectedType === '상담실' ? styles.ImageConsult : styles.ImageOther} // 조건부 클래스 이름 적용
                        />
                        <div style={{position: 'absolute', top: '30px', right: '30px'}}>
                            {filteredImages.map((imageData, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleImageNameClick(index)}
                                    className={index === selectedImageIndex ? styles.SelectedButton : ''}
                                >
                                    {imageData.name}
                                </button>
                            ))}
                        </div>
                        <div style={{position: 'absolute', bottom: '50px', left: '40px', color: "white"}}>
                            <span style={{fontSize: '28px', fontWeight: "bold"}}>
                                {filteredImages[selectedImageIndex].name}
                            </span>ㅤ
                            <span style={{fontSize: '20px', fontWeight: "bold"}}>
                               {filteredImages[selectedImageIndex].type}
                            </span>
                            <br/>
                            <span style={{fontSize: '18px', fontWeight: "bold"}}>#
                                {filteredImages[selectedImageIndex].use}
                            </span>ㅤ
                            <span style={{fontSize: '18px', fontWeight: "bold"}}>#
                                {filteredImages[selectedImageIndex].maxPerson}
                            </span>ㅤ
                            <span style={{fontSize: '18px', fontWeight: "bold"}}>#
                                {filteredImages[selectedImageIndex].fee}
                            </span>
                        </div>
                        <div className={styles.rentButton} onClick={handleRentButtonClick}>
    <span>
        대관 신청하기ㅤ
    </span>
                            <div className={styles.plusIcon}>✛</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RentContainer;