package com.project.blockfish.businesslogic.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

// 엔티티와 엔티티 리포지토리는 항상 같은 곳에 위치해야한다.
// JPA에선 단순히 인터페이스 생성 후 JpaRepository 를 상속하면 기본적인 crud 생성
// 상속시 파라미터로 <엔티티클래스,Pk타입>을 지정
public interface FileInformationRepository extends JpaRepository<FileInformation, Long> {
    Page<FileInformation> findAll(Pageable pageable);

    @Query(
            value = "SELECT FileInformation FROM FileInformation FileInformation WHERE FileInformation.osType LIKE :osType",
            countQuery = "SELECT COUNT(FileInformation.id) FROM FileInformation WHERE FileInformation.osType LIKE :osType"
    )
    Page<FileInformation> finByOs(String osType);

    @Query(
            value = "SELECT FileInformation FROM FileInformation FileInformation WHERE FileInformation.name LIKE %:keyword% OR FileInformation.info LIKE %:keyword%",
            countQuery = "SELECT COUNT(FileInformation.id) FROM FileInformation WHERE FileInformation.name LIKE %:keyword% OR FileInformation.info LIKE %:keyword%"
    )
    Page<FileInformation> finByKeyword(String keyword);

    @Query(
            value = "SELECT FileInformation FROM FileInformation FileInformation WHERE FileInformation.osType LIKE :osType AND FileInformation.categoryCode LIKE :category",
            countQuery = "SELECT COUNT(FileInformation.id) FROM FileInformation WHERE FileInformation.osType LIKE :osType AND FileInformation.categoryCode LIKE :category"
    )
    Page<FileInformation> finByCategory(String osType, String category);
}

