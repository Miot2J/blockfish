package com.project.blockfish.config;

import com.project.blockfish.member.Member;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

public class SecurityMember extends User {
    private static final long serialVersionUiD = 1L;

    public SecurityMember(Member member){
        super(member.getUserId(),"{noop}"+ member.getPassword(), AuthorityUtils.createAuthorityList(member.getRole().toString()));
    }
}
