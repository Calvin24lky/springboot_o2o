$(function() {
    // 用于从后台获取店铺类别以及区域列表的初始化
    var initUrl = '/o2o/shopadmin/getshopinitinfo';
    var registerShopUrl = '/o2o/shopadmin/registshop';

    var shopId = getQueryString("shopId");
    var isEdit = shopId ? true : false;

    var shopInfoUrl = '/o2o/shopadmin/getshopbyid?shopId=' + shopId;

    var modifyShopUrl = '/o2o/shopadmin/modifyshop';



    if (!isEdit) {
        getShopInitInfo();
    }
    else {
        getShopInfo(shopId);
    }

    function getShopInitInfo() {
        // 后台以json形式返回
        $.getJSON(initUrl, function (data) {
            if (data.success) {
                var tempHtml = '';
                var tempAreaHtml = '';
                // 填充店铺类别列表
                data.shopCategoryList.map(function (item, index) {
                    tempHtml += '<option data-id="' + item.shopCategoryId + '">'
                        + item.shopCategoryName + '</option>';
                });
                // 填充区域列表
                data.areaList.map(function (item, index) {
                    tempAreaHtml += '<option data-id="' + item.areaId + '">'
                        + item.areaName + '</option>';
                });
                $('#shop-category').html(tempHtml);
                $('#area').html(tempAreaHtml);
            }
        });
    }

    function getShopInfo(shopId) {
        $.getJSON(shopInfoUrl, function(data) {
            if (data.success) {
                var shop = data.shop;
                $('#headline').html("店铺信息");
                $('#shop-name').val(shop.shopName);
                $('#shop-addr').val(shop.shopAddr);
                $('#shop-phone').val(shop.phone);
                $('#shop-desc').val(shop.shopDesc);
                var shopCategory = '<option data-id="'
                    + shop.shopCategory.shopCategoryId + '" selected>'
                    + shop.shopCategory.shopCategoryName + '</option>';
                var tempAreaHtml = '';
                data.areaList.map(function(item, index) {
                    tempAreaHtml += '<option data-id="' + item.areaId + '">'
                        + item.areaName + '</option>';
                });

                $('#shop-category').html(shopCategory);
                $('#shop-category').attr('disabled','disabled');
                $('#area').html(tempAreaHtml);
                //$('#area').attr('data-id',shop.areaId);
                $("#area option[data-id='"+shop.area.areaId+"']").attr("selected","selected");
            }
        });
    }

    $('#submit').click(function() {
        // 创建shop对象
        var shop = {};

        if(isEdit) {
            shop.shopId = shopId;
        }
        // 获取表单里的数据并填充进对应的店铺属性中
        shop.shopName = $('#shop-name').val();
        shop.shopAddr = $('#shop-addr').val();
        shop.phone = $('#shop-phone').val();
        shop.shopDesc = $('#shop-desc').val();
        // 获取多选框中选定好的店铺类别
        shop.shopCategory = {
            shopCategoryId : $('#shop-category').find('option').not(function() {
                return !this.selected;
            }).data('id')
        };
        // 获取多选框中选定好的区域信息
        shop.area = {
            areaId : $('#area').find('option').not(function() {
                return !this.selected;
            }).data('id')
        };
        // 获取上传的图片文件流
        var shopImg = $('#shop-img')[0].files[0];
        // 生成表单对象，用于接收参数并传递给后台
        var formData = new FormData();
        // 添加图片流进表单对象里
        formData.append('shopImg', shopImg);
        // 将shop json对象转成字符流保存至表单对象key为shopStr的的键值对里
        formData.append('shopStr', JSON.stringify(shop));
        // 获取表单里输入的验证码
        var verifyCodeReceived = $('#j_captcha-img').val();
        if (!verifyCodeReceived) {
            $.toast('请输入验证码！');
            return;
        }

        formData.append('verifyCodeReceived', verifyCodeReceived);
        // $.toast(verifyCodeReceived);

        // 将数据提交至后台处理相关操作
        $.ajax({
            //url : registerShopUrl,
            url : isEdit ? modifyShopUrl : registerShopUrl,
            type : 'POST',
            data : formData,
            contentType : false,  // 既有文件又有文字
            processData : false,
            cache : false,
            success : function(data) {
                if (data.success) {
                    $.toast('提交成功！'); // 弹出信息
                } else {
                    $.toast('提交失败！' + data.errMsg);
                }
                // 提交后都要更换验证码
                $('#captcha_img').click();
            }
        });
    });

});