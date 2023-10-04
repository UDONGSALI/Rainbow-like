package RainbowLike.controller;


import RainbowLike.constant.Status;
import RainbowLike.entity.RentHist;
import RainbowLike.service.RentHistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rent")
public class RentHistController {

    private final RentHistService rentHistService;

    @GetMapping
    public List<RentHist> getAllRentHist() {
        return rentHistService.getAllRentHists();
    }

    @GetMapping("/search/{option}/{value}/{memId}")
    public ResponseEntity<Iterable<RentHist>> searchRentHist(@PathVariable String option, @PathVariable String value, @PathVariable String memId) {
        Iterable<RentHist> results = rentHistService.searchRentHist(option, value, memId);
        return ResponseEntity.ok(results);
    }

    @PatchMapping("/{rentHistNum}")
    public ResponseEntity<?> updateRentHistStatus(@PathVariable Long rentHistNum, @RequestBody Map<String, String> body) {
        try {
            Status status = Status.valueOf(body.get("status").toUpperCase());
            Optional<RentHist> updatedRentHist = rentHistService.updateRentHistStatus(rentHistNum, status);
            if (updatedRentHist.isPresent()) {
                return ResponseEntity.ok(updatedRentHist.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status value");
        }
    }

    @DeleteMapping("/{rentHistNum}")
    public ResponseEntity<Void> deleteRentHist(@PathVariable Long rentHistNum) {
        rentHistService.cancelRentHist(rentHistNum);
        return ResponseEntity.noContent().build();
    }

}
