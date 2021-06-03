package com.project.blockfish.businesslogic.service;

import com.jcraft.jsch.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource("classpath:SftpConnection.properties")
public class SFTPSender {

    @Value("${sftp.name}")
    private String name;

    @Value("${sftp.host}")
    private String host;

    @Value("${sftp.password}")
    private String password;

    @Value("${sftp.port}")
    private int port;

    public void sftpConnect() throws JSchException {
        System.out.println("---");
        System.out.println("name = " + name);
        System.out.println("host = " + host);
        System.out.println("port = " + port);
        System.out.println("password = " + password);

        System.out.println("connecting...");
        // 1. JSch 객체를 생성한다.
        JSch jsch = new JSch();
        // 2. 세션 객체를 생성한다(사용자 이름, 접속할 호스트, 포트를 프로퍼티에서 불러와 인자로 전달한다.)
        Session session = jsch.getSession(name, host, port);
        // 3. 패스워드를 설정한다.
        session.setPassword(password);
        // 4. 세션과 관련된 정보를 설정한다.(서버키와 로컬키 인증 안함)
        session.setConfig("StrictHostKeyChecking", "no");
        // 5. 접속한다.
        System.out.println("세션 접속 시도");
        session.connect();

        System.out.println("세션 접속 완료");

        // 6. sftp 채널을 연다.
        Channel channel = session.openChannel("sftp");
        // 7. 채널에 연결한다.
        channel.connect();
        // 8. 채널을 SFTP용 채널 객체로 캐스팅한다.
        ChannelSftp sftpChannel = (ChannelSftp) channel;
    }
}
