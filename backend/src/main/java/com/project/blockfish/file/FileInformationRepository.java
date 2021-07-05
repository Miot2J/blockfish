package com.project.blockfish.file;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

// 엔티티와 엔티티 리포지토리는 항상 같은 곳에 위치해야한다.
// JPA에선 단순히 인터페이스 생성 후 JpaRepository 를 상속하면 기본적인 crud 생성
// 상속시 파라미터로 <엔티티클래스,Pk타입>을 지정
public interface FileInformationRepository extends JpaRepository<FileInformation, Long> {
    @Query(
            value = "SELECT * FROM file_informations WHERE os_type LIKE :osType",
            countQuery = "SELECT COUNT(file_id) FROM file_informations WHERE os_type LIKE :osType", nativeQuery = true
    )
    Page<FileInformation> findByOs(String osType, Pageable pageable);

    @Query(
            value = "SELECT * FROM file_informations WHERE name LIKE %:keyword% OR info LIKE %:keyword%",
            countQuery = "SELECT COUNT(file_id) FROM file_informations WHERE name LIKE %:keyword% OR info LIKE %:keyword%", nativeQuery = true
    )
    Page<FileInformation> findByKeyword(String keyword, Pageable pageable);

    @Query(
            value = "SELECT * FROM file_informations WHERE os_type LIKE :osType AND category_code LIKE :category",
            countQuery = "SELECT COUNT(file_id) FROM file_informations WHERE os_type LIKE :osType AND category_code LIKE :category", nativeQuery = true
    )
    Page<FileInformation> findByCategory(String osType, String category, Pageable pageable);
}

