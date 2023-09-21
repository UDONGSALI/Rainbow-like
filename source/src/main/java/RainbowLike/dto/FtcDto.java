package RainbowLike.dto;

import RainbowLike.constant.DelYN;
import RainbowLike.constant.FtmYN;
import RainbowLike.constant.LicenseYN;
import RainbowLike.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
public class FtcDto {

    private Long memNum;
    @JsonIgnore
    private Member member;
    private String speField;
    private String applyContent;
    private String statusDtl;
    private FtmYN ftmYN;
    private LocalDateTime writeDate;
    private LocalDateTime editDate;


    public FtcDto(){

    }

    public FtcDto(Long memNum, String speField, String applyContent, String statusDtl, FtmYN ftmYN, LocalDateTime writeDate, LocalDateTime editDate){
        this.memNum = memNum;
        this.speField = speField;
        this.applyContent = applyContent;
        this.statusDtl = statusDtl;
        this.ftmYN = ftmYN;
        this.writeDate = writeDate;
        this.editDate = editDate;
    }

    static public ArrayList<FtcDto> createTestFtc() {
        ArrayList<FtcDto> ftcList = new ArrayList<>();


        Member member1 = new Member();
        Member member2 = new Member();
        Member member3 = new Member();
        Member member4 = new Member();
        member1.setMemNum(1L);
        member2.setMemNum(2L);
        member3.setMemNum(3L);
        member4.setMemNum(4L);

        FtcDto ftc1 = new FtcDto();
        ftc1.setMember(member1);
        ftc1.setSpeField("디자인");
        ftc1.setApplyContent("카페 마스코트 캐릭터를 그려줄 수 있는 인재가 필요합니다. 포트폴리오를 확인하고 싶어요.");
        ftc1.setFtmYN(FtmYN.N);

        ftcList.add(ftc1);


        FtcDto ftc2 = new FtcDto();
        ftc2.setMember(member2);
        ftc2.setSpeField("디자인");
        ftc2.setApplyContent("자격증 있는 사람이 필요합니다. 업체 홍보용 영상을 제작해야 하고, 이미 촬영분이 있어 편집만 가능하면 됩니다.");
        ftc2.setFtmYN(FtmYN.N);

        ftcList.add(ftc2);


        FtcDto ftc3 = new FtcDto();
        ftc3.setMember(member3);
        ftc3.setSpeField("IT");
        ftc3.setApplyContent("학원 홍보를 위한 간단한 웹사이트 개발 인재 요망 <br/> 자격증 유무 상관 없으나 간단한 유지보수 필요");
        ftc3.setFtmYN(FtmYN.N);

        ftcList.add(ftc3);


        FtcDto ftc4 = new FtcDto();
        ftc4.setMember(member4);
        ftc4.setSpeField("기타");
        ftc4.setApplyContent("10월 10일부터 20일까지 유치원 아이 하원 도우미를 찾고 있습니다.");
        ftc4.setFtmYN(FtmYN.N);

        ftcList.add(ftc4);


        FtcDto ftc5 = new FtcDto();
        ftc5.setMember(member4);
        ftc5.setSpeField("기타");
        ftc5.setApplyContent("벌레 좀 잡아주세요ㅠ");
        ftc5.setStatusDtl("매칭거부 : 부적절한 요청입니다.");
        ftc5.setFtmYN(FtmYN.N);

        ftcList.add(ftc5);


        FtcDto ftc6 = new FtcDto();
        ftc6.setMember(member2);
        ftc6.setSpeField("IT");
        ftc6.setApplyContent("도박 사이트 개발자 구합니다 ^^ 수익은 무조건 7:3");
        ftc6.setStatusDtl("매칭거부 : 적절하지 않은 요청입니다.");
        ftc6.setFtmYN(FtmYN.N);

        ftcList.add(ftc6);


        FtcDto ftc7 = new FtcDto();
        ftc7.setMember(member1);
        ftc7.setSpeField("기타");
        ftc7.setApplyContent("사진촬영 가능하신 분을 찾습니다.");
        ftc7.setStatusDtl("매칭불가 : 여성인재풀 DB에 아직 부합한 인재가 등록되지 않았습니다.");
        ftc7.setFtmYN(FtmYN.N);

        ftcList.add(ftc7);


        return ftcList;
    }

}