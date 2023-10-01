package RainbowLike.controller;

import RainbowLike.dto.OrganizationDto;
import RainbowLike.entity.Organization;
import RainbowLike.service.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/org")
public class OrganizationController {

    private final OrganizationService organizationService;
    @PostMapping
    public ResponseEntity<Organization> saveOrg(@RequestBody OrganizationDto organizationDto) {
        Organization savedOrg = organizationService.saveOrg(organizationDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrg);
    }
}
