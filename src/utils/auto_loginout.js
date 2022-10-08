import router from '../Router'
import {ElMessageBox} from "element-plus";

export default function () {
    //定时器
    let setInterval = null;
    // 设置超时时间: 10 * 60 * 1000 秒钟
    let timeOut = 10 * 60 * 1000

    // 初次向sessionStorage存入操作时间
    // console.log("开始", new Date().getTime())
    window.sessionStorage.setItem('lastTime', new Date().getTime())
    // 每次操作页面，更新sessionStorage存入的操作时间
    window.onload = function () {
        window.document.onmousedown = function () {
            window.sessionStorage.setItem('lastTime', new Date().getTime())
        }
    }

    function dialog() {
        ElMessageBox.confirm(
            '时间过长，请重新登录',
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        )
            .then(() => {
                router.push("/")
                window.location.reload()
            })
            .catch(() => {
                router.push("/")
                window.location.reload()
            })
    }

    function checkTimeout() {
        // 当前时间
        let currentTime = new Date().getTime()
        //上次操作的时间
        let lastTime = window.sessionStorage.getItem("lastTime")
        // 判断是否超时
        if (currentTime - lastTime >= timeOut) {
            console.log("结束", new Date().getTime())
            // 清除定时器
            window.clearInterval(setInterval);
            // 清除sessionStorage
            window.sessionStorage.clear('lastTime')
            // 跳到登陆页
            dialog();
        }
    }

    /* 定时器 间隔2秒检测是否长时间未操作页面 */
    setInterval = window.setInterval(checkTimeout, 2000)
}
