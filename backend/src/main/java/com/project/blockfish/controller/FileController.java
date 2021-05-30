package com.project.blockfish.controller;

import com.project.blockfish.businesslogic.domain.Member;
import com.project.blockfish.businesslogic.response.Response;
import com.project.blockfish.businesslogic.service.impl.FileUploadService;
import com.project.blockfish.domainmodel.KlayDto;
import com.project.blockfish.businesslogic.service.FileService;
import com.project.blockfish.businesslogic.service.JwtUtil;
import com.project.blockfish.businesslogic.service.klay.KlayService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;
    private final KlayService klayService;
    private final FileUploadService fileUploadService;
    private final JwtUtil jwtUtil;
    private static final String UPLOAD_DIRECTORY = "/Users/j/Downloads/upload/";
//    "/Users/minho/Downloads/upload/"


    @PostMapping("/fileupload")
    public Response dbUpload(@RequestBody com.project.blockfish.businesslogic.domain.File file) {
        Response response = new Response();
        System.out.println("fio");
        System.out.println(file);
        try{
            fileUploadService.saveFileToDB(file);
            response.setResponse("success");
            response.setMessage("DB애 업로드를 성공적으로 완료했습니다.");
        } catch(Exception e){
            response.setResponse("fail");
            response.setMessage("DB 업로드 중 오류가 발생했습니다.");
            response.setData(e.toString());
        }
        return response;
    }

    @PostMapping("/upload")
    public KlayDto uploadSingle(@RequestParam("files") MultipartFile file, @RequestHeader(value="accessToken") String accessToken,
                                @RequestHeader(value="refreshToken") String refreshToken) throws Exception {
        File targetFile = new File( UPLOAD_DIRECTORY + file.getOriginalFilename());
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
}
