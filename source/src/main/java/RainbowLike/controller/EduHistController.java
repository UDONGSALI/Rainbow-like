package RainbowLike.controller;


import RainbowLike.constant.Status;
import RainbowLike.constant.Type;
import RainbowLike.dto.EduHistDto;
import RainbowLike.entity.EduHist;
import RainbowLike.repository.EduHistRepository;
import RainbowLike.repository.EduRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.EduService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/eduHist")
public class EduHistController {

    private final EduHistRepository eduHistRepository;
    private final ModelMapper mapper;
    private final MemberRepository memberRepository;
    private final EduRepository eduRepository;
    private final EduService eduService;
    private final FileController fileController;

    @GetMapping
    public Iterable<EduHist> getEduHists() {
        return eduHistRepository.findAll();
    }

    @GetMapping("/memid/{memId}")
    public Iterable<EduHist> getEduHistByMemId(@PathVariable String memId) {
        return eduHistRepository.findByMember(memberRepository.findByMemId(memId));
    }

    @GetMapping("/search/{option}/{value}/{memId}")
    private Iterable<EduHist> searchEduHist(@PathVariable String option, @PathVariable String value, @PathVariable String memId) {
        Iterable<EduHist> result;
        switch (option) {
            case "eduName":
                result = eduHistRepository.findByEduIn(eduRepository.findByEduNameContaining(value));
                break;
            case "memId":
                result = eduHistRepository.findByMemberIn(memberRepository.findByMemIdContaining(value));
                break;
            case "status":
                Status status = Status.valueOf(value);
                result = eduHistRepository.findByStatus(status);
                break;
            default:
                result = new ArrayList<>();
        }
        // 어드민이 아니면 결과에서 memId로 필터링
        if (!isAdmin(memId)) {
            List<EduHist> filteredList = new ArrayList<>();
            for (EduHist eduHist : result) {
                if (eduHist.getMember().getMemId().equals(memId)) {
                    filteredList.add(eduHist);
                }
            }
            result = filteredList;
        }
        return result;
    }

    private boolean isAdmin(String memId) {
        if (memberRepository.findByMemId(memId).getType() == Type.ADMIN) {
            return true;
        } else {
            return false;
        }

    }

    @GetMapping("/check/{memNum}/{eduNum}")
    public boolean eduHistCheck(@PathVariable Long memNum, @PathVariable Long eduNum) {
        List<EduHist> eduHists = eduHistRepository.findByMemberAndEdu(memberRepository.findByMemNum(memNum), eduRepository.findByEduNum(eduNum));
        if (eduHists.size() >= 1) {
            return true;
        } else {
            return false;
        }
    }


    @PutMapping("/{id}")
    private ResponseEntity<?> updateEduHistStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Optional<EduHist> optionalEduHist = eduHistRepository.findById(id);

        if (optionalEduHist.isPresent()) {
            EduHist eduHist = optionalEduHist.get();
            try {
                Status status = Status.valueOf(body.get("status").toUpperCase()); // 문자열을 Status Enum으로 변환합니다.
                eduHist.setStatus(status); // 변환된 Enum 값을 사용해 status 필드를 업데이트합니다.
                EduHist updatedEduHist = eduHistRepository.save(eduHist);
//                에듀 히스트에서 에듀를 찾고, 에뉴넘을 찾아 updateRecuPerson, 즉, 모집인원을 카운트 합니다.
                eduService.updateRecuPerson(eduHist.getEdu().getEduNum());
                return ResponseEntity.ok(updatedEduHist);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Invalid status value");
            }
        } else {
            return ResponseEntity.notFound().build(); // 해당 ID의 EduHist가 존재하지 않으면 404 Not Found 응답을 반환합니다.
        }
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteEduHist(@PathVariable Long id) {
        if (eduHistRepository.existsById(id)) {
            eduHistRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    private ResponseEntity<EduHist> saveEduHist(@RequestBody EduHistDto eduHistDto) {
        System.out.println("확인" + eduHistDto.toString());

        eduHistDto.setMember(memberRepository.findByMemNum(eduHistDto.getMemNum()));
        eduHistDto.setEdu(eduRepository.findByEduNum(eduHistDto.getEduNum()));

        EduHist eduHist = mapper.map(eduHistDto, EduHist.class);
        EduHist savedEduHist = eduHistRepository.save(eduHist);

        // EduHist가 저장된 직후에 updateRecuPerson 메서드 호출
        eduService.updateRecuPerson(eduHistDto.getEduNum());

        return ResponseEntity.ok(savedEduHist);
    }

    @PostMapping("/andfile")
    @Transactional
    public ResponseEntity<String> saveEduHistAndFile(
            @RequestParam("eduHistData") String eduHistDataJson, // JSON 문자열 받기
            @RequestParam(name = "file", required = false) List<MultipartFile> files, @RequestParam(name = "tableName", required = false) String tableName, @RequestParam(name = "number", required = false) Long number) {

        EduHistDto eduHistDto;
        try {
            eduHistDto = new ObjectMapper().readValue(eduHistDataJson, EduHistDto.class); // JSON 문자열을 DTO 객체로 변환
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("교육 정보에 문제가 생겼습니다!"); // 적절한 오류 응답 반환
        }

        try {
            saveEduHist(eduHistDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("교육 정보에 문제가 생겼습니다!");
        }

        if (files != null && !files.isEmpty()) {
            try {
                fileController.uploadFiles(files, tableName, number);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body("파일에 문제가 생겼습니다!");
            }
        }

        return ResponseEntity.ok("신청이 완료 되었습니다!");
    }


    public void createDefaultEduHists() {
        List<EduHistDto> eduHistDtos = EduHistDto.creatDefaultEduHist();
        for (EduHistDto eduHistDto : eduHistDtos) {
            saveEduHist(eduHistDto);
        }
    }
}
