package com.project.blockfish.file;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "fileInformations")
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

    @NotBlank
    private String categoryCode;

    private int downCount;

    @NotBlank
    private String blockChainAddress;

    private int starRankAverage;

    private int starRankSum;

    private int starRankCount;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private List<Comment> comments = new ArrayList<>();

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private Boolean fileLock = false;

    @Builder
    public FileInformation(String name, String imageAddress, String fileAddress, String info, String osType, String categoryCode, int downCount, String blockChainAddress, LocalDateTime createAt) {
        this.name = name;
        this.imageAddress = imageAddress;
        this.fileAddress = fileAddress;
        this.info = info;
        this.osType = osType;
        this.categoryCode = categoryCode;
        this.downCount = downCount;
        this.blockChainAddress = blockChainAddress;
        this.createAt = createAt;
        this.updateAt = createAt;
    }

    public int addStarRank(int starRank) {
        this.starRankCount += 1;
        this.starRankSum += starRank;
        this.starRankAverage = this.getStarRankSum() / this.getStarRankAverage();

        return this.starRankAverage;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }
}
