package com.example.o2o.entity;

import lombok.Data;
import java.util.Date;

@Data
public class WechatAuth {
    // 主键id
    private Long wechatAuthId;
    // 用户id
    private Long userId;
    // 微信获取用户信息的凭证，对于某个公众号具有唯一性
    private String openId;
    // 创建时间
    private Date createTime;
    // 用户信息
    private PersonInfo personInfo;
}
