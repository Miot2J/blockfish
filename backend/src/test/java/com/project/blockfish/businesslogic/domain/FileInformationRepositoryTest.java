package com.project.blockfish.businesslogic.domain;

import com.project.blockfish.businesslogic.service.FileInformationService;
import org.junit.After;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FileInformationRepositoryTest {
    @Autowired
    FileInformationRepository fileInformationRepository;

    @After
    public void cleanup() {
        fileInformationRepository.deleteAll();
    }

    @Test
    @Transactional
    public void 파일저장_불러오기() {
        //given
        String name = "테스트 파일";
        String imageAddress = "imageAddress";
        String fileAddress = "테스트주소";
        String info = "임시 파일 정보";
        String osType = "MAC";
        String categoryCode = Category.findCodeByName("기타");
        int downCount = 0;
        String blockChainAddress = "0xAxabcx3ctest";
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime createAt = LocalDateTime.of(now.getYear(),
                now.getMonth(), now.getDayOfMonth(), now.getHour(), now.getMinute(), 0);

        FileInformation file = new FileInformation(name, imageAddress, fileAddress, info, osType, categoryCode, downCount, blockChainAddress, createAt);
        fileInformationRepository.save(file);

        //when
        List<FileInformation> files = fileInformationRepository.findAll();

        //then
        FileInformation getFile = files.get(0);
        assertAll(
                ()->  assertThat(getFile.getName()).isEqualTo(name),
                ()-> assertThat(files.size()).isEqualTo(1)
        );

    }
}


