package RainbowLike.dto;

import RainbowLike.constant.EduType;
import RainbowLike.constant.RecuMethod;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
public class EduDto {


    @NotBlank
    private EduType type;

    @NotBlank
    private String eduName;

    @NotBlank
    private String content;

    @NotNull
    private LocalDateTime eduStdt;

    @NotNull
    private LocalDateTime eduEddt;

    @NotBlank
    private String eduAddr;

    @NotBlank
    private String target;

    @NotNull
    private LocalDate recuStdt;

    @NotNull
    private LocalDate recuEddt;

    @NotNull
    private int capacity;

    @NotNull
    private int recuPerson;

    @NotBlank
    private RecuMethod recuMethod;

    @NotBlank
    private String tel;

    static public ArrayList<EduDto> createDefaultEdu() {
        ArrayList<EduDto> eduList = new ArrayList<EduDto>();

        EduDto Edu1 = new EduDto();
        Edu1.setEduName("직장맘토요프로그램 4탄(꽃으로 내마음을 치유하는 플라워테라피)");
        Edu1.setType(EduType.EDU);
        Edu1.setContent("꽃으로 내마음을 치유하는 플라워테라피\n" +
                "\n" +
                " \n" +
                "\n" +
                "1.일시:  23.9.23.(토) 13:00:~15:00\n" +
                "\n" +
                "2.장소:  세종여성플라자 혜윰(세종시 새롬로 14, 새롬종합복지센터 4층)\n" +
                "3.대상:  세종시거주 직장맘 선착순 15명 ,  동반자녀(만 4~9세)\n" +
                "\n" +
                "136 자녀동반시 별도의 강의실에서 돌봄프로그램 운영\n" +
                "\n" +
                "⇒ 흙놀이: 흙그림, 나뭇잎찍기, 허수아비놀이 등\n" +
                "\n" +
                "※정원초과될 경우 신규신청자에게 먼저 기회가 제공됨을 알려드립니다.\n" +
                "\n" +
                "4.신청기간:  23.9.11(화)~9.20(수)\n" +
                "\n" +
                "5.신청방법\n" +
                "\n" +
                "첫번째! 홈페이지 회원가입 후 교육신청 \n" +
                "\n" +
                "두번째! 직장맘토요프로그램 신청서(HWP 파일 다운로드)를  작성하여 업로드(하단에 있어요~)\n" +
                "\n" +
                "세번째! 신청서 확인후 참여확정\n" +
                "\n" +
                " \n" +
                "\n" +
                "6.발표: 선정자분께는 9.20일 이후 개별로 문자를 드려요~!");
        Edu1.setEduStdt(LocalDateTime.of(2023,9,23,15,00,00,000));
        Edu1.setEduEddt(LocalDateTime.of(2023,9,23,17,00,00,000));
        Edu1.setEduAddr("세종여성플라자 내");
        Edu1.setTarget("하단 내용을 자세히 보시고 신청해주세요.");
        Edu1.setRecuStdt(LocalDate.of(2023,9,11));
        Edu1.setRecuEddt(LocalDate.of(2023,9,20));
        Edu1.setCapacity(15);
        Edu1.setRecuPerson(0);
        Edu1.setRecuMethod(RecuMethod.ADMIN_APPROVAL);
        Edu1.setTel("044) 866-0179");
        eduList.add(Edu1);

        EduDto Edu2 = new EduDto();
        Edu2.setType(EduType.EDU);
        Edu2.setEduName("새로운 도전을 꿈꾸는 당신을 위한 브런치 특강 '여성의 잠재력에 주목합니다'");
        Edu2.setContent("※ 많은 관심으로  접수 인원을 70명으로 증원했습니다. 접수 시 참고 부탁드립니다.\n" +
                " \n" +
                "새로운 도전을 꿈꾸는 당신을 위한 '브런치 특강'  참여자 모집\n" +
                "\"여성의 잠재력에 주목합니다\"\n" +
                " \n" +
                "- 경력보유여성의 마인드 셋업과 실질적인  정보 제공 -\n" +
                " \n" +
                "□ 교육일: 2023. 10. 6.(금) 10:30~13:00\n" +
                " \n" +
                "- 신청기간: 2023. 9. 4.(월) ~ 9. 25.(월)\n" +
                "- 신청대상: 세종 지역 여성 누구나 70명(선착순, 무료) \n" +
                "- 교육장소: 세종여성플라자 혜윰(새롬로 14, 새롬종합복지센터 4층)*\n" +
                "  ※ 신청 인원수 고려하여, 새롬종합복지센터 강의실(2층)로 장소 변경 예정\n" +
                "- 교육내용\n" +
                " \n" +
                "\n" +
                "일시\n" +
                "\n" +
                "내용\n" +
                "\n" +
                "강사\n" +
                "\n" +
                "10:30~12:00\n" +
                "\n" +
                "여성의 삶과 일의 의미\n" +
                "\n" +
                "김수영 강사\n" +
                "\n" +
                "‘엄마의 두 번째 명함’ 저자\n" +
                "\n" +
                "12:00~13:00\n" +
                "\n" +
                "재무설계의 기본에 대한 이해\n" +
                "\n" +
                "국민연금공단 연계\n" +
                "\n" +
                " \n" +
                "\n" +
                "★ 브런치 제공\n" +
                "- 신청방법: 세종여성플라자 홈페이지 로그인 후 신청\n" +
                "- 문의 : 세종여성플라자 기획운영팀 ☎044-850-8179");
        Edu2.setEduStdt(LocalDateTime.of(2023,10,6,10,30,00,000));
        Edu2.setEduEddt(LocalDateTime.of(2023,10,6,15,00,00,000));
        Edu2.setEduAddr("세종여성플라자 혜윰");
        Edu2.setTarget("세종 지역 여성 누구나 70명");
        Edu2.setRecuStdt(LocalDate.of(2023,9,4));
        Edu2.setRecuEddt(LocalDate.of(2023,9,25));
        Edu2.setCapacity(70);
        Edu2.setRecuPerson(0);
        Edu2.setRecuMethod(RecuMethod.FIRST_COME);
        Edu2.setTel("044-850-8179");
        eduList.add(Edu2);

        EduDto Edu3 = new EduDto();
        Edu3.setType(EduType.BUSINESS);
        Edu3.setEduName("2023 세종여성플라자 시민포럼, 직장맘 여성잇수다'");
        Edu3.setContent("[2023 세종여성플라자 시민포럼]\n" +
                "직장맘 여성잇수다\n" +
                " \n" +
                " \n" +
                "'여성잇수다'는 '여성이 있다(being), 여성을 잇는다, 여성들이 함께 모여 먹으며(eat) 수다를 나눈다'라는 의미로 육아 퇴근한 저녁, 직장맘들의 솔직한 이야기를 나눌 수 있는 시간입니다.\n" +
                "직장맘의 어려움과 필요한 지원에 대해 여러분의 목소리를  들려주세요. \n" +
                " \n" +
                "직장맘 여성잇수다에 함께할 분들을 모집합니다.\n" +
                " \n" +
                " \n" +
                "○ 일시: 2023. 9. 1.(금) 18:30 ~ 20:30\n" +
                "○ 장소: 세종여성플라자 카페테리아(이음)\n" +
                "○ 모집대상 및 인원: 세종시 직장맘 30명 내외\n" +
                " \n" +
                "○ 신청\n" +
                "- 신청기간: 8. 18.(금) ~ 선착순\n" +
                "- 신청방법: 세종여성플라자 홈페이지 로그인 후 신청 \n" +
                " \n" +
                "○ 주요내용\n" +
                "- 1부 저녁 식사 및 환담\n" +
                "- 2부 직장맘이 말하고 세종이 듣는다\n" +
                "*최민호 세종시장님이 참석하실 예정입니다  \n" +
                "*행사 시간 동안 자녀 돌봄 프로그램이 운영됩니다  \n" +
                " \n" +
                "※ 참가자 혜택 :  저녁 식사, 기념품 제공, 직장맘토요힐링프로그램 우선 참가 기회 제공 \n" +
                " \n" +
                "○ 문의: 세종여성플라자 044-863-0380\n" +
                " \n" +
                " \n" +
                " ※ 접수 마감되었습니다 ");
        Edu3.setEduStdt(LocalDateTime.of(2023,9,1,18,30,00,000));
        Edu3.setEduEddt(LocalDateTime.of(2023,9,1,20,30,00,000));
        Edu3.setEduAddr("세종여성플라자 카페테리아(이음)");
        Edu3.setTarget("세종시 직장맘 30명 내외");
        Edu3.setRecuStdt(LocalDate.of(2023,8,18));
        Edu3.setRecuEddt(LocalDate.of(2023,8,28));
        Edu3.setCapacity(30);
        Edu3.setRecuPerson(0);
        Edu3.setRecuMethod(RecuMethod.FIRST_COME);
        Edu3.setTel("044-863-0380");
        eduList.add(Edu3);

        EduDto Edu4 = new EduDto();
        Edu4.setType(EduType.EDU);
        Edu4.setEduName("노동법 특강 [직장맘의 당연한 권리 찾기]");
        Edu4.setContent(" 세종시직장맘지원센터\n" +
                "\n" +
                "직장맘의 당연한 권리찾기 [노동법 특강]\n" +
                "\n" +
                "점심시간 잠깐 샌드위치 먹으며 노동법을 알아볼까요?  \n" +
                "\n" +
                "*샌드위치 무료제공\n" +
                "\n" +
                "1. 일시: 2023.9.15.(금) 11:30~13:30\n" +
                "\n" +
                "2. 장소: 새롬종합복지센터(새롬로 14) 2층, 강의실 1\n" +
                "\n" +
                "3. 대상: 직장맘⦁직장대디, 사업주 및 인사담당자 (선착순 50명-선정문자 안내드림)\n" +
                "\n" +
                "4. 내용: 임신기 근로자 모성보호, 출산전후휴가, 육아휴직 및 육아기 근로시간 단축 등, 일·가정양립지원제도\n" +
                "\n" +
                "5. 문의: 044-866-0179\n" +
                "\n" +
                " \n" +
                "\n" +
                "교육신청은 꼭!!! 아래 URL에 접속하시어 신청바랍니다.\n" +
                "\n" +
                "https://forms.gle/GQ5uj19pw4uEfyEKA");
        Edu4.setEduStdt(LocalDateTime.of(2023,9,15,11,30,00,000));
        Edu4.setEduEddt(LocalDateTime.of(2023,9,15,13,30,00,000));
        Edu4.setEduAddr("새롬종합복지센터 2층 강의실 1");
        Edu4.setTarget("직장맘, 예비직장맘, 사업주 및 인사담당자");
        Edu4.setRecuStdt(LocalDate.of(2023,8,10));
        Edu4.setRecuEddt(LocalDate.of(2023,9,13));
        Edu4.setCapacity(50);
        Edu4.setRecuPerson(0);
        Edu4.setRecuMethod(RecuMethod.FIRST_COME);
        Edu4.setTel("세종시직장맘지원센터 044) 866-0179");
        eduList.add(Edu4);

        return eduList;
    }
}
