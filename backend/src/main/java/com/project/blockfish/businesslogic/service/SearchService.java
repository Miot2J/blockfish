package com.project.blockfish.businesslogic.service;

import com.project.blockfish.domainmodel.SearchedFileDto;

import java.util.List;

public interface SearchService {
    List<SearchedFileDto> searchByOs(String osType);
    List<SearchedFileDto> searchByKeyWard(String keyWard);
    List<SearchedFileDto> searchByCategory(String category);
}
