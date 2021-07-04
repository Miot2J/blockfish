package com.project.blockfish.businesslogic.domain;

import java.util.Arrays;

public enum Category {
    PC_MANAGEMENT("PC 관리/보안", "A000"),
    VACCINE("백신", "A001"),
    FILE_COMPRESSION("파일 압축", "A002"),
    SYSTEM_MANAGEMENT("시스템 관리", "A003"),

    VIDEO("동영상", "B000"),
    VIDEO_RECORDING("동영상 녹화", "B001"),
    VIDEO_PLAYER("동영상 플레이어", "B002"),
    VIDEO_EDITING("동영상 편집", "B003"),
    VIDEO_CODEC("동영상 코덱", "B004"),

    INTERNET_NETWORK("인터넷/네트워크", "C000"),
    INTERNET_BROWSER("브라우저", "C001"),
    INTERNET_MESSENGER("메신저", "C002"),
    INTERNET_FILE_SEND("파일 전송", "C003"),

    DOCUMENTS_OFFICES("문서/사무", "D000"),
    DOCUMENTS_VIEWER("문서 뷰어", "D001"),
    DOCUMENTS_EDITING("문서 편집", "D002"),

    ETC("기타", "000");


    private final String categoryName;
    private final String categoryCode;

    Category(String categoryName, String categoryCode) {
        this.categoryName = categoryName;
        this.categoryCode = categoryCode;
    }

    public static String findNameByCode(String categoryCode) {
        return Arrays.stream(values())
                .filter(category -> categoryCode.equals(category.categoryCode))
                .findAny()
                .get()
                .categoryName
                ;
    }

    public static String findCodeByName(String categoryName) {
        return Arrays.stream(values())
                .filter(category -> categoryName.equals(category.categoryName))
                .findAny()
                .get()
                .categoryCode
                ;
    }

    private String getCategoryName() {
        return categoryName;
    }

    private String getCategoryCode() {
        return categoryCode;
    }
}
