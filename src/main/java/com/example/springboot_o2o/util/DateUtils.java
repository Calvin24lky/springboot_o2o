package com.example.springboot_o2o.util;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Date;

/**
 * @author kylin
 */
public class DateUtils {
    public static void main(String[] args) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        LocalDateTime now = LocalDateTime.now();
        Instant instant = Instant.now();
        System.out.println(new Date());
        System.out.println(now);
        System.out.println(instant.toEpochMilli());
        System.out.println(System.currentTimeMillis());
        System.out.println(Instant.now().getEpochSecond());
        System.out.println(LocalDateTime.now().toEpochSecond(ZoneOffset.ofHours(8)));
        System.out.println(now.format(dateTimeFormatter));
    }
}
