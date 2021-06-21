package com.project.blockfish.businesslogic.service;

import com.jcraft.jsch.*;
import com.project.blockfish.businesslogic.util.Converter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Vector;

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

    public void sftpConnect() throws JSchException {
        System.out.println("---");
        System.out.println("name = " + name);
        System.out.println("host = " + host);
        System.out.println("port = " + port);
        System.out.println("password = " + password);

        System.out.println("connecting...");

        // 2. 세션 객체에 세션을 할당한다(사용자 이름, 접속할 호스트, 포트를 프로퍼티에서 불러와 인자로 전달한다.)
        session = jsch.getSession(name, host, port);
        // 3. 패스워드를 설정한다.
        session.setPassword(password);
        // 4. 세션과 관련된 정보를 설정한다.(서버키와 로컬키 인증 안함)
        session.setConfig("StrictHostKeyChecking", "no");
        // 5. 접속한다.
        System.out.println("세션 접속 시도");
        session.connect();

        System.out.print(session.getHost());
        System.out.println(" <--세션 접속 완료");
    }

    public void upload(MultipartFile file) throws JSchException {
        // 접속 메서드를 사용해 접속한다.
        sftpConnect();
        // 6. sftp 채널을 연다.
        channel = session.openChannel("sftp");
        // 7. 채널에 연결한다.
        channel.connect();
        // 8. 채널을 SFTP용 채널 객체로 캐스팅한다.
        sftpChannel = (ChannelSftp) channel;

        try {
            // Change to output directory
            sftpChannel.cd(remoteDirectoryPath);

            // 입력 파일을 가져온다.
            InputStream fileStream = file.getInputStream();

            // 파일을 업로드한다.
            System.out.println(file.getOriginalFilename()+"가 업로드 됩니다.");

            sftpChannel.put(fileStream, file.getOriginalFilename());

            fileStream.close();
            System.out.println("File uploaded successfully - " + file.getOriginalFilename());

        } catch (Exception e) {
            e.printStackTrace();
        }
        sftpDisconnect();
    }

    public File download(String fileName) throws JSchException {
        sftpConnect();
        System.out.println("fileName = " + fileName);

        channel = session.openChannel("sftp");
        channel.connect();
        sftpChannel = (ChannelSftp) channel;

        try {
            // 경로변경
            sftpChannel.cd(remoteDirectoryPath);

            Vector<ChannelSftp.LsEntry> flist = sftpChannel.ls(remoteDirectoryPath);

            for(ChannelSftp.LsEntry entry : flist){
                System.out.println("entry = " + entry);
            }
            InputStream inputStream = sftpChannel.get(fileName);

            File file = Converter.convertInputStreamToFile(inputStream);
            System.out.println(file.getName()+"가 다운로드 됩니다.");

            sftpDisconnect();
            return file;

        } catch (Exception e) {
            e.printStackTrace();
            sftpDisconnect();
            return null;
        }
    }

    public FileInputStream getFileInputStream(String fileName) throws JSchException{
        sftpConnect();

        System.out.println("fileNameInput = " + fileName);
        // 채널 열기
        channel = session.openChannel("sftp");
        channel.connect();
        sftpChannel = (ChannelSftp) channel;

        try {
            // 경로변경
            sftpChannel.cd(remoteDirectoryPath);
            //파일 이름으로 스트림 불러오기
            InputStream inputStream = sftpChannel.get(fileName);

            File file = Converter.convertInputStreamToFile(inputStream);

            sftpDisconnect();
            return new FileInputStream(file);

        } catch (Exception e) {
            e.printStackTrace();
            sftpDisconnect();
            return null;
        }
    }

    private void sftpDisconnect() {
        if (session.isConnected()) {
            System.out.println("disconnecting...");
            sftpChannel.disconnect();
            channel.disconnect();
            session.disconnect();
        }
    }
}
