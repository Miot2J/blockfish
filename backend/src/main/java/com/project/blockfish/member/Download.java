package com.project.blockfish.member;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "downloads")
public class Download {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "download_id")
    private Long id;

    @OneToOne(mappedBy = "download")
    private Member member;

//    @OneToMany
//    @JoinColumn(name = "file_id")
//    private List<FileInformation> downloads;
}
