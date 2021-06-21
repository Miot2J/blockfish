package com.project.blockfish.businesslogic.service;

import com.project.blockfish.businesslogic.domain.FileInformation;
import javassist.NotFoundException;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.NoSuchAlgorithmException;

@Service
public interface FileInformationService {
    void saveFileInfo(FileInformation files);
    FileInformation findByFileId(Long fileId) throws NotFoundException;
}
