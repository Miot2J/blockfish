package com.project.blockfish.file.service;

import com.project.blockfish.file.FileInformation;
import javassist.NotFoundException;
import org.springframework.stereotype.Service;

@Service
public interface FileInformationService {
    void saveFileInfo(FileInformation files);
    FileInformation findByFileId(Long fileId) throws NotFoundException;
}
