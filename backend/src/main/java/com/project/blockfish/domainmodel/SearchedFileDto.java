package com.project.blockfish.domainmodel;

import com.project.blockfish.businesslogic.domain.Comment;

import java.time.LocalDateTime;
import java.util.List;

public class SearchedFileDto {
    private Long id;

    private String name;

    private String imageAddress;

    private String info;

    private String osType;

    private int downCount;

    private int starRank;

    private String categoryName;

    List<Comment> comments;

    public SearchedFileDto(Long id, String name, String imageAddress, String info, String osType, int downCount, int starRank, String categoryName, List<Comment> comments, LocalDateTime updateAt) {
        this.id = id;
        this.name = name;
        this.imageAddress = imageAddress;
        this.info = info;
        this.osType = osType;
        this.downCount = downCount;
        this.starRank = starRank;
        this.categoryName = categoryName;
        this.comments = comments;
        this.updateAt = updateAt;
    }

    private LocalDateTime updateAt;

    public SearchedFileDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageAddress() {
        return imageAddress;
    }

    public void setImageAddress(String imageAddress) {
        this.imageAddress = imageAddress;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getOsType() {
        return osType;
    }

    public void setOsType(String osType) {
        this.osType = osType;
    }

    public int getDownCount() {
        return downCount;
    }

    public void setDownCount(int downCount) {
        this.downCount = downCount;
    }

    public int getStarRank() {
        return starRank;
    }

    public void setStarRank(int starRank) {
        this.starRank = starRank;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public LocalDateTime getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(LocalDateTime updateAt) {
        this.updateAt = updateAt;
    }
}
