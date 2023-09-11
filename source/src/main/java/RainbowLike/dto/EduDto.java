package RainbowLike.dto;

import RainbowLike.constant.EduType;
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
    private String eduname;

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
    private String recuMethod;

    @NotBlank
    private String tel;

    static public ArrayList<EduDto> createEdu() {
        ArrayList<EduDto> eduList = new ArrayList<EduDto>();

        EduDto Edu1 = new EduDto();
        Edu1.setEduname("직장맘토요프로그램 4탄(꽃으로 내마음을 치유하는 플라워테라피)");
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
        Edu1.setEduAddr("세종여성플라자 내");
        Edu1.setRecuStdt(LocalDate.of(2023,9,11));
        Edu1.setRecuEddt(LocalDate.of(2023,9,20));
        Edu1.setEduAddr("세종여성플라자 내");
        Edu1.setEduAddr("세종여성플라자 내");
        eduList.add(Edu1);

        return eduList;
    }
}
