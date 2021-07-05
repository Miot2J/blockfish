package com.project.blockfish.businesslogic.service.impl;

import com.project.blockfish.businesslogic.domain.FileInformation;
import com.project.blockfish.businesslogic.domain.FileInformationRepository;
import com.project.blockfish.businesslogic.service.FileInformationService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FileInformationServiceImpl implements FileInformationService {
    private final FileInformationRepository fileInformationRepository;

    @Override
    public void saveFileInfo(FileInformation files) {
        System.out.println("files = " + files);
        fileInformationRepository.save(files);
    }

    @Override
    public FileInformation findByFileId(Long fileId) throws NotFoundException {
        FileInformation file = fileInformationRepository.getOne(fileId);
        if (file == null) throw new NotFoundException("파일이 존재 하지않음");
        return file;
    }
}
