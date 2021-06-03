package com.project.blockfish.businesslogic.domain;

import lombok.*;
import org.apache.tomcat.jni.FileInfo;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "files")
public class FileInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private Long id;

    @NotBlank
    private String name;

    private String imageAddress;

    @NotBlank
    private String fileAddress;

    @NotBlank
    private String info;

    @NotBlank
    private String osType;

    private int downCount;

    @NotBlank
    private String blockChainAddress;

    private int StarRank;

    //List<Comment> comments

    //List<Category> category;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private Boolean fileLock = false;

    @Builder
    public FileInformation(String name, String imageAddress, String fileAddress, String info, String osType, Integer downCount, String blockChainAddress, Integer starRank, LocalDateTime createAt) {
        this.name = name;
        this.imageAddress = imageAddress;
        this.fileAddress = fileAddress;
        this.info = info;
        this.osType = osType;
        this.downCount = downCount;
        this.blockChainAddress = blockChainAddress;
        this.StarRank = starRank;
        this.createAt = createAt;
    }
}
