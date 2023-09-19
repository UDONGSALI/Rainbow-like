package RainbowLike.service;

import RainbowLike.repository.EduRepository;
import RainbowLike.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    private final EduRepository eduRepository;

    public void deleteFilesByEduNum(Long eduNum) {
        System.out.println("동작 확인");
        fileRepository.deleteAllByEdu(eduRepository.findByEduNum(eduNum));
    }

}
