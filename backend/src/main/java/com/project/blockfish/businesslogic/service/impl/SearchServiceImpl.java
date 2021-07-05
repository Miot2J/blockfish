package com.project.blockfish.businesslogic.service.impl;

import com.project.blockfish.businesslogic.domain.Category;
import com.project.blockfish.businesslogic.domain.FileInformation;
import com.project.blockfish.businesslogic.domain.FileInformationRepository;
import com.project.blockfish.businesslogic.service.SearchService;
import com.project.blockfish.domainmodel.SearchedFileDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {
    private final FileInformationRepository fileInformationRepository;


    @Override
    public Page<SearchedFileDto> searchAll(Pageable pageable) {
        Page<FileInformation> fileInformationByOs = fileInformationRepository.findAll(pageable);

        Page<SearchedFileDto> searchedFilesDto =
                fileInformationByOs.map(
                        fileInformation -> new SearchedFileDto(
                                fileInformation.getId(),
                                fileInformation.getName(),
                                fileInformation.getImageAddress(),
                                fileInformation.getInfo(),
                                fileInformation.getOsType(),
                                fileInformation.getDownCount(),
                                fileInformation.getStarRankAverage(),
                                Category.findNameByCode(fileInformation.getCategoryCode()),
                                fileInformation.getComments(),
                                fileInformation.getUpdateAt()
                        ));

        return searchedFilesDto;
    }

    @Override
    public Page<SearchedFileDto> searchByOs(String osType, Pageable pageable) {
        Page<FileInformation> fileInformationByOs = fileInformationRepository.findByOs(osType, pageable);

        Page<SearchedFileDto> searchedFilesDto =
                fileInformationByOs.map(
                        fileInformation -> new SearchedFileDto(
                                fileInformation.getId(),
                                fileInformation.getName(),
                                fileInformation.getImageAddress(),
                                fileInformation.getInfo(),
                                fileInformation.getOsType(),
                                fileInformation.getDownCount(),
                                fileInformation.getStarRankAverage(),
                                Category.findNameByCode(fileInformation.getCategoryCode()),
                                fileInformation.getComments(),
                                fileInformation.getUpdateAt()
                        ));

        return searchedFilesDto;
    }

    @Override
    public Page<SearchedFileDto> searchByKeyWord(String keyWard, Pageable pageable) {
        Page<FileInformation> fileInformationByOs = fileInformationRepository.findByKeyword(keyWard, pageable);

        Page<SearchedFileDto> searchedFilesDto =
                fileInformationByOs.map(
                        fileInformation -> new SearchedFileDto(
                                fileInformation.getId(),
                                fileInformation.getName(),
                                fileInformation.getImageAddress(),
                                fileInformation.getInfo(),
                                fileInformation.getOsType(),
                                fileInformation.getDownCount(),
                                fileInformation.getStarRankAverage(),
                                Category.findNameByCode(fileInformation.getCategoryCode()),
                                fileInformation.getComments(),
                                fileInformation.getUpdateAt()
                        ));

        return searchedFilesDto;
    }

    @Override
    public Page<SearchedFileDto> searchByCategory(String osType, String category, Pageable pageable) {
        Page<FileInformation> fileInformationByOs = fileInformationRepository.findByCategory(osType, category, pageable);

        Page<SearchedFileDto> searchedFilesDto =
                fileInformationByOs.map(
                        fileInformation -> new SearchedFileDto(
                                fileInformation.getId(),
                                fileInformation.getName(),
                                fileInformation.getImageAddress(),
                                fileInformation.getInfo(),
                                fileInformation.getOsType(),
                                fileInformation.getDownCount(),
                                fileInformation.getStarRankAverage(),
                                Category.findNameByCode(fileInformation.getCategoryCode()),
                                fileInformation.getComments(),
                                fileInformation.getUpdateAt()
                        ));

        return searchedFilesDto;
    }
}