package RainbowLike.service;

import RainbowLike.dto.OrganizationDto;
import RainbowLike.entity.Organization;
import RainbowLike.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final ModelMapper mapper;

    @Transactional
    public Organization saveOrg(OrganizationDto organizationDto) {
        Organization org = mapper.map(organizationDto, Organization.class);
        return organizationRepository.save(org);
    }

    @PostConstruct
    public void createDefaultOrganization() {
        List<OrganizationDto> organizationDtos = OrganizationDto.creatDefaultOrg();
        for (OrganizationDto organizationDto : organizationDtos) {
            saveOrg(organizationDto);
        }
    }

}
