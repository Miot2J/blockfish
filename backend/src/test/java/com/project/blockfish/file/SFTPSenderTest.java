package com.project.blockfish.file;

import com.jcraft.jsch.*;
import com.project.blockfish.util.Converter;

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

    @DisplayName("????????? ?????? ?????? ????????? ?????? ??? ?????????.")
    @Test
    void getSessionTest() {
        final JSch jsch = new JSch();

        assertDoesNotThrow(() -> jsch.getSession(name, host, port));
    }

    @DisplayName("???????????? ?????? ??? ????????? ?????? ??? ?????????")
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

    @DisplayName("????????? ????????? ?????? ????????? ????????? ????????? ???????????????.")
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

    @DisplayName("?????????????????? ?????????????????? ???????????? ???????????? ?????? ??? ????????? ????????????.")
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

        // ????????????
        sftpChannel.cd(remoteDirectoryPath);

        InputStream inputStream = sftpChannel.get("Test.md");
        File file = Converter.convertInputStreamToFile(inputStream);

        assertAll(
                ()->assertThat(file.isFile()).isEqualTo(true),
                ()->assertThat(file.canRead()).isEqualTo(true)
        );
    }

    @DisplayName("???????????? MD5 ???????????? ?????? ??? ??????")
    @Test
    void makeHashTest() throws IOException, NoSuchAlgorithmException {
        File file = Converter.convertInputStreamToFile(testFile.getInputStream());

        assertThat(makeMD5Hash(file)).isEqualTo("1451071b61d519c19511a1bc1fb1c81b01791041c6114184");
    }

    @DisplayName("?????????????????? ?????????????????? ???????????? ???????????? ?????? ??? ????????? ????????????.")
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

        // ??????????????? ?????? ??????
        File downloadedFile = File.createTempFile("Test", ".md");
        downloadedFile.deleteOnExit();
        FileUtils.copyInputStreamToFile(inputStream, downloadedFile);

        // ????????? ?????? ????????????
        File uploadedFile = Converter.convertInputStreamToFile(testFile.getInputStream());

        assertThat(makeMD5Hash(downloadedFile)).isEqualTo(makeMD5Hash(uploadedFile));
    }
}
