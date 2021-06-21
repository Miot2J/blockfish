package com.project.blockfish.businesslogic.domain;

import com.jcraft.jsch.*;
import com.project.blockfish.businesslogic.util.Converter;
import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@TestPropertySource(locations = "classpath:SftpConnection_test.properties")
@SpringBootTest

public class SFTPSenderTest {

    public String makeMD5Hash(File file) throws IOException, NoSuchAlgorithmException {
        MessageDigest messageDigest = MessageDigest.getInstance("MD5");
        FileInputStream fileInputStream = new FileInputStream(file);
        byte[] dataBytes = new byte[1024];
        Integer nRead;

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

    MultipartFile testFile;

    {
        try {
            testFile = new MockMultipartFile("Test.md", new FileInputStream(
                    new File(System.getProperty("user.dir") + "/src/main/java/testuploads/Test.md")));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Value("${sftp.name}")
    private String name;

    @Value("${sftp.host}")
    private String host;

    @Value("${sftp.password}")
    private String password;

    @Value("${sftp.filePath}")
    private String remoteDirectoryPath;

    @Value("${sftp.port}")
    private int port;

    @DisplayName("지정된 파일 서버 세션을 생성 할 수있다.")
    @Test
    void getSessionTest() {
        final JSch jsch = new JSch();

        assertDoesNotThrow(() -> jsch.getSession(name, host, port));
    }

    @DisplayName("패스워드 설정 후 세션에 접속 할 수잇다")
    @Test
    void sftpConnectTest() throws JSchException {
        final JSch jsch = new JSch();
        Session session = jsch.getSession(name, host, port);

        session.setPassword(password);
        session.setConfig("StrictHostKeyChecking", "no");

        assertAll(
                () -> assertDoesNotThrow(() -> session.connect()),
                () -> assertThat(session.getHost()).isEqualTo(host)
        );
    }

    @DisplayName("테스트 파일이 파일 서버로 업로드 되는지 테스트한다.")
    @Test
    void sftpUploadTest() throws JSchException, SftpException, IOException {
        final JSch jsch = new JSch();
        Session session = jsch.getSession(name, host, port);

        session.setPassword(password);
        session.setConfig("StrictHostKeyChecking", "no");
        session.connect();

        Channel channel;
        ChannelSftp sftpChannel;

        channel = session.openChannel("sftp");
        channel.connect();
        sftpChannel = (ChannelSftp) channel;

        sftpChannel.cd(remoteDirectoryPath);

        InputStream fileStream = testFile.getInputStream();
        assertDoesNotThrow(() -> sftpChannel.put(fileStream, testFile.getName()));
        fileStream.close();
    }

    @DisplayName("파일서버에서 인풋스트림을 가져오고 임시파일 생성 후 해쉬값 비교한다.")
    @Test
    void downloadTest() throws JSchException, SftpException {
        final JSch jsch = new JSch();
        Session session = jsch.getSession(name, host, port);

        session.setPassword(password);
        session.setConfig("StrictHostKeyChecking", "no");
        session.connect();

        Channel channel;
        ChannelSftp sftpChannel;
        channel = session.openChannel("sftp");
        channel.connect();
        sftpChannel = (ChannelSftp) channel;

        // 경로변경
        sftpChannel.cd(remoteDirectoryPath);

        InputStream inputStream = sftpChannel.get("Test.md");
        File file = Converter.convertInputStreamToFile(inputStream);

        assertAll(
                ()->assertThat(file.isFile()).isEqualTo(true),
                ()->assertThat(file.canRead()).isEqualTo(true)
        );
    }

    @DisplayName("파일에서 MD5 해시값을 만들 수 잇다")
    @Test
    void makeHashTest() throws IOException, NoSuchAlgorithmException {
        File file = Converter.convertInputStreamToFile(testFile.getInputStream());

        assertThat(makeMD5Hash(file)).isEqualTo("1451071b61d519c19511a1bc1fb1c81b01791041c6114184");
    }

    @DisplayName("파일서버에서 인풋스트림을 가져오고 임시파일 생성 후 해쉬값 비교한다.")
    @Test
    void hashCompareTest() throws JSchException, SftpException, IOException, NoSuchAlgorithmException {
        final JSch jsch = new JSch();
        Session session = jsch.getSession(name, host, port);
        session.setPassword(password);
        session.setConfig("StrictHostKeyChecking", "no");
        session.connect();

        Channel channel;
        ChannelSftp sftpChannel;
        channel = session.openChannel("sftp");
        channel.connect();

        sftpChannel = (ChannelSftp) channel;
        sftpChannel.cd(remoteDirectoryPath);
        InputStream inputStream = sftpChannel.get(testFile.getName());

        // 다운로드한 파일 생성
        File downloadedFile = File.createTempFile("Test", ".md");
        downloadedFile.deleteOnExit();
        FileUtils.copyInputStreamToFile(inputStream, downloadedFile);

        // 업로드 했던 파일생성
        File uploadedFile = Converter.convertInputStreamToFile(testFile.getInputStream());

        assertThat(makeMD5Hash(downloadedFile)).isEqualTo(makeMD5Hash(uploadedFile));
    }
}
