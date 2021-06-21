package com.project.blockfish.businesslogic.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.*;

public class Converter {

    protected Converter() {

    }

    public static File convertInputStreamToFile(InputStream inputStream ){
        try {
            //  임시 파일 생성
            File tempFile = File.createTempFile(String.valueOf(inputStream.hashCode()), ".tmp");
            // JVM 종료시 지워지도록 설정
            tempFile.deleteOnExit();
            copyInputStreamToFile(inputStream, tempFile);

            return tempFile;

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    //inputStream 에서 데이터를 읽어 로컬 파일시스템에 임시파일로 저장
    private static void copyInputStreamToFile(InputStream inputStream, File file) {

        try (FileOutputStream outputStream = new FileOutputStream(file)) {
            int read;
            byte[] bytes = new byte[1024];

            while ((read = inputStream.read(bytes)) != -1) {
                outputStream.write(bytes, 0, read);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static File multiPartFileToFile(MultipartFile multipartFile) throws IOException,IllegalStateException {
        File file = new File(multipartFile.getOriginalFilename());
        multipartFile.transferTo(file);
        return file;
    }
}
