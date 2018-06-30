/**
 *
 * @description 嘉薪员工端APP通用方法
 * @author YX
 * @data 2018-06-27
* */


var commonJx={

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
        if(mui.os.plus) {

            mui.openWindow(

                {

                    url: url,
                    
                    id: url

                }

            )

        }

        else{

            window.location.href=url;

        }

    },

    /**
     * @description 一个ajax请求，通用方法封装
     *
     * @param {string} url 需要跳转的url地址
     *
     * @author YX
     * @data 2018-06-29
     */

    ajax(){

        

    }


}