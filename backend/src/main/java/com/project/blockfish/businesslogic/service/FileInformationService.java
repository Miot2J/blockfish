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
    String getHash(FileInputStream fileInputStream) throws IOException, NoSuchAlgorithmException;
    String getHash2(String path) throws IOException, NoSuchAlgorithmException;
    FileInformation findByFileId(Long fileId) throws NotFoundException;
}
