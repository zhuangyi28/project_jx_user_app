const url = 'http://jxtest.99payroll.cn/jx-user';//登录环境

const signUrl = '/jx/action/login';//登录的url


function json2Form(json) {
    var str = [];
    for (var p in json) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }


    return str.join("&");


}


new Vue({

    el: '#app',

    data: {

        num: '',

        password: ""

    },

    methods: {

        demo() {

            var _this = this;

            //commonJx.skipTo('http://www.taobao.com');

            commonJx.ajax({

                url: url + signUrl,

                data: json2Form({

                    mobile: _this.num,

                    password: hex_md5(_this.password)

                }),

                dataType: 'json',//服务器返回json格式数据

                type: 'post',//HTTP请求类型

                timeout: 10000,//超时时间设置为10秒；

                headers: {

                    'content-type': 'application/x-www-form-urlencoded' // post请求

                },
                success: function (res) {
                    //服务器返回响应，根据响应结果，分析是否登录成功；
                    console.log(res)

                },

                fail: function (res) {
                    //异常处理；
                    console.log(res);
                }

            });


        }


    }
});
