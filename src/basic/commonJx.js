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
     * @param {string} opt.url 需要跳转的url地址
     * @param {int} opt.type 跳转页面的类型，1为原生导航，2为全屏，3为沉浸式页面
     *
     * @author YX
     * @data 2018-06-27
     */
    skipTo(opt) {



            opt.type = opt.type || 1;

            //判断app环境 true是app环境
            if (mui.os.plus) {

                let webviewStyle = {

                    url: opt.url,

                    id: opt.url

                };

                if(opt.type==0){




                }

                else if(opt.type==1){

                    console.log('type1')

                    webviewStyle.styles={

                        titleNView: {

                            backgroundColor:"#ea5e26",

                        }


                    }

                }


                mui.openWindow(
                    webviewStyle
                )

            }

            else {

                window.location.href = opt.url;

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


    },

    /**
     * @description 存变量进入缓存区
     *
     * @param {string} key 缓存键
     * @param {string} value 键值

     *
     * @author YX
     * @data 2018-07-02
     */
    setStorage(key,value){

        //判断app环境 true是app环境
        if (mui.os.plus) {

            plus.storage.setItem(key.toString(),value.toString());

        }

        else {

            localStorage.setItem(key.toString(), value.toString());

        }

    },

    /**
     * @description 从缓存区取变量
     *
     * @param {string} key 缓存键
     * @author YX
     * @data 2018-07-02
     */
    getStorage(key){

        if (mui.os.plus) {

            return plus.storage.getItem(key.toString())

        }

        else{

            return localStorage.getItem(key.toString())

        }

    },


    /**
     * @description 消息提示框
     *
     * @param {string} message 消息提示内容
     * @param {string,int} duration 消息提示持续时间
     * @author YX
     * @data 2018-07-02
     */
    toast(message,duration){

        message=message||null;

        duration=duration||'long'

        mui.toast(

            message.toString(),

            {

                duration:duration,

            }
        )


    },


    /**
     * @description 警告框
     *
     * @param {string} opt.message 提示对话框上显示的内容
     * @param {string} opt.title 提示对话框上显示的标题
     * @param {string} opt.btnValue 提示对话框上按钮显示的内容
     * @param {string} opt.callback 提示对话框上关闭后的回调函数
     *
     * @author YX
     * @data 2018-07-02
     */
    alert(opt){

        opt=opt||{};

        opt.message=opt.message||'信息为空';

        opt.title=top.title||'提示';

        opt.btnValue=opt.btnValue||'确认';

        opt.callback=opt.callback||function () {

            };

        mui.alert(

            opt.message.toString(),

            opt.title.toString(),

            opt.btnValue.toString(),

            opt.callback

        )


    },


    /**
     * @description 确认框
     *
     * @param {string} opt.message 提示对话框上显示的内容
     * @param {string} opt.title 提示对话框上显示的标题
     * @param {Array} opt.btnValue 提示对话框上按钮显示的内容，数组形式
     * @param {string} opt.callback 提示对话框上关闭后的回调函数
     *
     * @author YX
     * @data 2018-07-02
     */
    confirm(opt){

        opt=opt||{};

        opt.message=opt.message||'信息为空';

        opt.title=top.title||'提示';

        opt.btnValue=opt.btnValue||['取消','确认'];

        opt.callback=opt.callback||function () {

            };

        mui.confirm(

            opt.message.toString(),

            opt.title.toString(),

            opt.btnValue,

            opt.callback

        )


    }


}