package RainbowLike.dto;

import RainbowLike.constant.DelYN;
import RainbowLike.constant.LicenseYN;
import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.print.DocFlavor;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
public class FtwDto {

    private Long memNum;
    @JsonIgnore
    private Member member;
    private String speField;
    private LicenseYN licenseYN;
    private String licenseDtl;
    private String ftDtl;
    private String ftStatus;
    private String statusDtl;
    private DelYN delYN;
    private LocalDateTime writeDate;
    private LocalDateTime editDate;


    public FtwDto(){

    }

    public FtwDto(Long memNum, String speField, LicenseYN licenseYN, String licenseDtl, String ftDtl, String ftStatus, String StatusDtl,
                  DelYN delYN, LocalDateTime writeDate, LocalDateTime editDate){
        this.memNum = memNum;
        this.speField = speField;
        this.licenseYN = licenseYN;
        this.licenseDtl = licenseDtl;
        this.ftDtl = ftDtl;
        this.ftStatus = ftStatus;
        this.delYN = delYN;
        this.writeDate = writeDate;
        this.editDate = editDate;
    }

    static public ArrayList<FtwDto> createTestFtw() {
        ArrayList<FtwDto> ftwList = new ArrayList<>();


        Member member1 = new Member();
        Member member2 = new Member();
        Member member3 = new Member();
        Member member4 = new Member();
        member1.setMemNum(1L);
        member2.setMemNum(2L);
        member3.setMemNum(3L);
        member4.setMemNum(4L);

        FtwDto ftw1 = new FtwDto();
        ftw1.setMember(member1);
        ftw1.setSpeField("IT");
        ftw1.setLicenseYN(LicenseYN.Y);
        ftw1.setLicenseDtl("정보처리기사");
        ftw1.setFtDtl("웹개발 가능합니다. java, spring, springboot를 사용할 수 있습니다.");
        ftw1.setFtStatus("승인");
        ftw1.setDelYN(DelYN.N);

        ftwList.add(ftw1);


        FtwDto ftw2 = new FtwDto();
        ftw2.setMember(member2);
        ftw2.setSpeField("디자인");
        ftw2.setLicenseYN(LicenseYN.Y);
        ftw2.setLicenseDtl("영상관련 자격증, 영상관련 자격증");
        ftw2.setFtDtl("영상촬영 및 프리미어/애프터이펙트 이용한 영상편집 전반");
        ftw2.setFtStatus("승인");
        ftw2.setDelYN(DelYN.N);

        ftwList.add(ftw2);


        FtwDto ftw3 = new FtwDto();
        ftw3.setMember(member3);
        ftw3.setSpeField("디자인");
        ftw3.setLicenseYN(LicenseYN.N);
        ftw3.setFtDtl("일러스트 작업 / 명함 디자인 등 맡겨만 주시면 뭐든 그립니다.");
        ftw3.setFtStatus("승인대기");
        ftw3.setDelYN(DelYN.N);

        ftwList.add(ftw3);


        FtwDto ftw4 = new FtwDto();
        ftw4.setMember(member4);
        ftw4.setSpeField("기타");
        ftw4.setLicenseYN(LicenseYN.N);
        ftw4.setFtDtl("신기해서 신청해봅니다ㅎ ");
        ftw4.setFtStatus("거부");
        ftw4.setStatusDtl("부적절한 신청입니다.");
        ftw4.setDelYN(DelYN.N);

        ftwList.add(ftw4);


        FtwDto ftw5 = new FtwDto();
        ftw5.setMember(member4);
        ftw5.setSpeField("IT");
        ftw5.setLicenseYN(LicenseYN.Y);
        ftw5.setLicenseDtl("정보처리기능사");
        ftw5.setFtDtl("js, react, next.js 등 프론트를 할 줄 압니다");
        ftw5.setFtStatus("승인");
        ftw5.setDelYN(DelYN.Y);

        ftwList.add(ftw5);




        return ftwList;
    }

}