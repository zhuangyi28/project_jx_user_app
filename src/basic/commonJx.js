/**
 *
 * @description 嘉薪员工端APP通用方法
 * @author YX
 * @data 2018-06-27
 * */


var commonJx = {

    /**
     * @description 普通跳转打开新webview，将跳转方法封装起来，区分app环境和h5环境
     *
     * @param {string} url 需要跳转的url地址
     *
     * @author YX
     * @data 2018-06-27
     */
    skipTo(url) {

        //判断app环境 true是app环境
        if (mui.os.plus) {

            mui.openWindow(
                {

                    url: url,

                    id: url

                }
            )

        }

        else {

            window.location.href = url;

        }

    },

    /**
     * @description 一个ajax请求，通用方法封装
     *
     * @param {string} opt.url 请求的url地址
     * @param {object} opt.data 请求的参数，格式为对象
     * @param {string} opt.dataType 服务器返回json格式数据
     * @param {string} opt.type HTTP请求类型
     * @param {object} opt.headers HTTP请求头
     * @param {int} opt.timeout 超时时间
     * @param {function} opt.success ajax发送并接受成功调用的回调函数
     * @param {function} opt.fail ajax发送并接受失败调用的回调函数
     *
     * @author YX
     * @data 2018-06-29
     */

    ajax(opt) {

        opt = opt || {};

        opt.url = opt.url || '';

        opt.data = opt.data || null;

        opt.dataType = opt.dataType || 'json';

        opt.type = opt.type.toUpperCase() || 'GET';

        opt.timeout=opt.timeout||10000;

        opt.headers = opt.headers || {'Content-Type': 'application/json'};

        opt.success = opt.success || function () {

        };

        opt.fail = opt.fail || function () {

        }


        mui.ajax(

            opt.url,

            {
                data:opt.data,


                dataType: opt.dataType,//服务器返回json格式数据


                type: opt.type,//HTTP请求类型


                timeout: opt.timeout,//超时时间设置为10秒；


                headers: opt.headers,

                success(data) {
                    //服务器返回响应，根据响应结果，分析是否登录成功；

                    opt.success(data)

                },

                error(xhr, type, errorThrown) {
                    //异常处理；

                    opt.fail(type);

                }

            });


    }


}