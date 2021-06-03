package com.project.blockfish.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.jcraft.jsch.JSchException;
import com.project.blockfish.businesslogic.response.Response;
import com.project.blockfish.businesslogic.service.SFTPSender;
import com.project.blockfish.domainmodel.FileInformationDto;
import com.project.blockfish.domainmodel.KlayDto;
import com.project.blockfish.businesslogic.service.FileInformationService;
import com.project.blockfish.businesslogic.service.JwtUtil;
import com.project.blockfish.businesslogic.service.klay.KlayService;
import com.project.blockfish.businesslogic.domain.FileInformation;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class FileController {
    private static final String UPLOAD_DIRECTORY = "http://sonjuhy.iptime.org/home/disk1/blockfish/uploads/";
    private static final String UPLOAD_DIRECTORY2 = "/websites/ssl/www/blockfish/uploads";

    private final FileInformationService fileService;
    private final KlayService klayService;
    private final JwtUtil jwtUtil;
    private final SFTPSender sftpSender;

    @GetMapping("/sftpConnect")
    public void sftpConnectTest() throws JSchException {
        sftpSender.sftpConnect();
    }

    @PostMapping("/upload")
    public KlayDto uploadSingle(@RequestParam("files") MultipartFile file, @RequestHeader(value = "accessToken") String accessToken,
                                @RequestHeader(value = "refreshToken") String refreshToken) throws Exception {
        File targetFile = new File(UPLOAD_DIRECTORY + file.getOriginalFilename());
        String userId = jwtUtil.getUserId(accessToken);
        System.out.println("userId = " + userId);
        System.out.println("targetFile = " + targetFile);
        try {
            InputStream fileStream = file.getInputStream();
            FileUtils.copyInputStreamToFile(fileStream, targetFile);
        } catch (IOException e) {
            FileUtils.deleteQuietly(targetFile);
            e.printStackTrace();
        }
        System.out.println("upload test");
        String filePath = UPLOAD_DIRECTORY + file.getOriginalFilename();
        String fileHash = fileService.getHash(filePath);
        KlayDto klayDto = klayService.sendHashToKlay(fileHash, userId);

        return klayDto;
    }
    //    디비에서 파일 이름을 아이디로 불러오기
    @GetMapping("/getFile")
    public String getFile(@RequestBody Long fileId) throws NotFoundException {
        FileInformation file = fileService.findByFileId(fileId);
        System.out.println("file.getName() = " + file.getName());

        return file.getName();
    }
    //    서버에 파일이 업로드 되는지 테스트
    @PostMapping("/uploadTest")
    public void uploadTest(@RequestParam("files") MultipartFile file) throws JSchException {
        sftpSender.sftpConnect();
        sftpSender.upload(file,UPLOAD_DIRECTORY2);
    }

    //    로컬에 파일이 업로드 되는지 테스트
    @PostMapping("/uploadLocalTest")
    public Response uploadLocalTest(@RequestParam(value = "files") MultipartFile file,
                                    @RequestParam(value = "FileInformationDto")String  fileInformationString) throws IOException, NoSuchAlgorithmException {
        System.out.println("----upload test-----");

        String absolutePath = System.getProperty("user.dir");
        String savedPath = absolutePath + "/backend/src/main/java/testuploads/" + file.getOriginalFilename();

        File targetFile = new File(savedPath);
        System.out.println("targetFile = " + targetFile);

        try {
            InputStream fileStream = file.getInputStream();
            FileUtils.copyInputStreamToFile(fileStream, targetFile);
        } catch (IOException e) {
            FileUtils.deleteQuietly(targetFile);
            e.printStackTrace();
        }
        // LocalDateTime 생성
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime ldt = LocalDateTime.of(now.getYear(),
                now.getMonth(), now.getDayOfMonth(), now.getHour(),  now.getMinute(), 0);
        // klayDto생성
        System.out.println("klay test");
        String fileHash = fileService.getHash(savedPath);
        KlayDto klayDto = klayService.sendHashToKlay(fileHash, "test");


        FileInformationDto fileInformationDto = new ObjectMapper().readValue(fileInformationString,FileInformationDto.class);
        FileInformation fileInformation = new FileInformation(
                fileInformationDto.getName(),
                fileInformationDto.getImageAddress(),
                savedPath,
                fileInformationDto.getInfo(),
                fileInformationDto.getOsType(),
                0,
//                클레이튼 컨트랙트 생성시 발생하는 가스 비용때문에 임시 주소 입력
//                klayDto.getContractAddress(),
                "클레이튼 임시주소",
                0,
                ldt);
        Response response = new Response();

        try{
            fileService.saveFileInfo(fileInformation);
            response.setResponse("success");
            response.setMessage("파일 업로드가 성공적으로 완료했습니다.");
        } catch(Exception e){
            response.setResponse("fail");
            response.setMessage("파일 업로드 중 오류가 발생했습니다.");
            response.setData(e.toString());
        }

        System.out.println("파일이 저장된 위치/ 파일명 = " + savedPath);

        return response;
    }
}