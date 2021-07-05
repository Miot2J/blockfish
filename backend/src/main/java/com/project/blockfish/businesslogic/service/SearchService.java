package com.project.blockfish.businesslogic.service;

import com.project.blockfish.domainmodel.SearchedFileDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SearchService {
    Page<SearchedFileDto> searchAll(Pageable pageable);

    Page<SearchedFileDto> searchByOs(String osType, Pageable pageable);

    Page<SearchedFileDto> searchByKeyWord(String keyWard, Pageable pageable);

    Page<SearchedFileDto> searchByCategory(String osType, String category, Pageable pageable);
}
