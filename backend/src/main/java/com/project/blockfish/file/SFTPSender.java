package com.project.blockfish.file;

import com.jcraft.jsch.*;
import com.project.blockfish.util.Converter;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Component
@PropertySource("classpath:SftpConnection.properties")
public class SFTPSender {
    // 1. JSch 객체를 생성한다.
    private static JSch jsch = new JSch();
    // 2. 세션 객체를 생성한다(사용자 이름, 접속할 호스트, 포트를 프로퍼티에서 불러와 인자로 전달한다.)
    private static Session session;
    private static Channel channel;
    private static ChannelSftp sftpChannel;

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

    public void sftpConnect() {
        System.out.println("---");
        System.out.println("name = " + name);
        System.out.println("host = " + host);
        System.out.println("port = " + port);
        System.out.println("password = " + password);

        System.out.println("connecting...");
        try {
            // 세션 객체에 세션을 할당한다(사용자 이름, 접속할 호스트, 포트를 프로퍼티에서 불러와 인자로 전달한다.)
            session = jsch.getSession(name, host, port);
            //  패스워드를 설정한다.
            session.setPassword(password);
            // 세션과 관련된 정보를 설정한다.(서버키와 로컬키 인증 안함)
            session.setConfig("StrictHostKeyChecking", "no");
            //  접속한다.
            System.out.println("세션 접속 시도");
            session.connect();

            System.out.print(session.getHost());
            System.out.println(" <--세션 접속 완료");
        } catch (JSchException e) {
            e.printStackTrace();
        }
    }

    public void upload(MultipartFile file) {

        try {
//            sftpConnect();

            channel = session.openChannel("sftp");
            channel.connect();
            sftpChannel = (ChannelSftp) channel;
            // 경로변경
            sftpChannel.cd(remoteDirectoryPath);
            // 입력 파일을 가져온다.
            InputStream fileStream = file.getInputStream();
            // 파일을 업로드한다.
            System.out.println(file.getOriginalFilename() + "가 업로드 됩니다.");

            sftpChannel.put(fileStream, file.getOriginalFilename());
            fileStream.close();

            System.out.println("File uploaded successfully - " + file.getOriginalFilename());

        } catch (JSchException | SftpException | IOException e) {
            e.printStackTrace();
        }
//        sftpDisconnect();
    }

    public File download(String fileName) {

        try {
//            sftpConnect();

            channel = session.openChannel("sftp");
            channel.connect();
            sftpChannel = (ChannelSftp) channel;
            // 경로변경
            sftpChannel.cd(remoteDirectoryPath);

            InputStream inputStream = sftpChannel.get(fileName);

            //테스트 코드(SFTPSenderTest#downloadTest())에선 돌아감
//             InputStream inputStream = sftpChannel.get("Test.md");

            File file = Converter.convertInputStreamToFile(inputStream);
            file.deleteOnExit();

//            sftpDisconnect();
            return file;

        } catch (JSchException | SftpException e) {
            e.printStackTrace();
//            sftpDisconnect();
            return null;
        }
    }

    public String getHash(String fileName) {
        try {
//            sftpConnect();

            channel = session.openChannel("sftp");
            channel.connect();
            sftpChannel = (ChannelSftp) channel;
            sftpChannel.cd(remoteDirectoryPath);

            InputStream inputStream = sftpChannel.get(fileName);
//            InputStream inputStream = sftpChannel.get("Test.md");

            File file = File.createTempFile("tmp", "");
            file.deleteOnExit();
            FileUtils.copyInputStreamToFile(inputStream, file);
            sftpDisconnect();

            return makeMD5Hash(file);
        } catch (JSchException | SftpException | IOException | NoSuchAlgorithmException e) {
            e.printStackTrace();
//            sftpDisconnect();

            return null;
        }

    }

    public FileInputStream getFileInputStream(String fileName) {
        try {
//            sftpConnect();

            channel = session.openChannel("sftp");
            channel.connect();
            sftpChannel = (ChannelSftp) channel;
            sftpChannel.cd(remoteDirectoryPath);
            //파일 이름으로 스트림 불러오기
            InputStream inputStream = sftpChannel.get(fileName);

            File file = Converter.convertInputStreamToFile(inputStream);

            sftpDisconnect();
            return new FileInputStream(file);

        } catch (JSchException | FileNotFoundException | SftpException e) {
            e.printStackTrace();
//            sftpDisconnect();
            return null;
        }
    }

    public void sftpDisconnect() {
        if (session.isConnected()) {
            System.out.println("disconnecting...");
            sftpChannel.disconnect();
            channel.disconnect();
            session.disconnect();
        }
    }

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
}