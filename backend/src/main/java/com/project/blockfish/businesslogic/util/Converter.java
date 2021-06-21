package com.project.blockfish.businesslogic.util;

import java.io.*;

public class Converter {

    protected Converter() {

    }

    public static File convertInputStreamToFile(InputStream inputStream) throws IOException {
        //  임시 파일 생성
        File tempFile = File.createTempFile(String.valueOf(inputStream.hashCode()), ".tmp");
        // JVM 종료시 지워지도록 설정
        tempFile.deleteOnExit();
        copyInputStreamToFile(inputStream, tempFile);

        return tempFile;
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
}
