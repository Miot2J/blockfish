package com.project.blockfish.businesslogic.service.impl;

import com.project.blockfish.businesslogic.domain.FileInformation;
import com.project.blockfish.businesslogic.domain.FileInformationRepository;
import com.project.blockfish.businesslogic.service.FileInformationService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
@RequiredArgsConstructor
public class FileInformationServiceImpl implements FileInformationService {
    private final FileInformationRepository fileRepository;

    @Override
    public void saveFileInfo(FileInformation files) {
        System.out.println("files = " + files);
        fileRepository.save(files);
    }

    @Override
    public String getHash(FileInputStream fileInputStream) throws IOException, NoSuchAlgorithmException {
        MessageDigest messageDigest = MessageDigest.getInstance("MD5");
//        FileInputStream fileInputStream = new FileInputStream(file);
        byte[] dataBytes = new byte[1024];
        Integer nRead ;
        while ((nRead = fileInputStream.read(dataBytes)) != -1) {
            messageDigest.update(dataBytes, 0, nRead);
        }
        byte[] mdBytes = messageDigest.digest();
        StringBuffer stringBuffer = new StringBuffer();
        for (Integer i = 0; i < mdBytes.length; i++) {
            stringBuffer.append(Integer.toString((mdBytes[i] & 0xff) + 0x100, 16)).substring(1);
        }
        return stringBuffer.toString();
    }

    //로컬 테스트용 메서드
    @Override
    public String getHash2(String path) throws IOException, NoSuchAlgorithmException {
        MessageDigest messageDigest = MessageDigest.getInstance("MD5");
        File file = new File(path);
        FileInputStream fileInputStream = new FileInputStream(file);
        byte[] dataBytes = new byte[1024];
        Integer nRead ;
        while ((nRead = fileInputStream.read(dataBytes)) != -1) {
            messageDigest.update(dataBytes, 0, nRead);
        }
        byte[] mdBytes = messageDigest.digest();
        StringBuffer stringBuffer = new StringBuffer();
        for (Integer i = 0; i < mdBytes.length; i++) {
            stringBuffer.append(Integer.toString((mdBytes[i] & 0xff) + 0x100, 16)).substring(1);
        }
        return stringBuffer.toString();
    }

    @Override
    public FileInformation findByFileId(Long fileId) throws NotFoundException {
        FileInformation file = fileRepository.getOne(fileId);
        if (file == null) throw new NotFoundException("파일이 존재 하지않음");
        return file;
    }
}
