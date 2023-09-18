package RainbowLike.service;


import RainbowLike.dto.EduDto;
import RainbowLike.entity.Edu;
import RainbowLike.repository.EduRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
@RequiredArgsConstructor
public class EduService {

    private final ModelMapper mapper;

    private final EduRepository eduRepository;

    public void createDefaultEdus(ArrayList<EduDto> eduDtoList) {

        for (EduDto eduDto : eduDtoList) {

            Edu edu = mapper.map(eduDto, Edu.class);

            eduRepository.save(edu);
        }
    }
}
