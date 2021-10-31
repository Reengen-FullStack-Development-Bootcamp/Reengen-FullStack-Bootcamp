export default {
    install(Vue){
        Vue.prototype.$italicHTML = function (text) {
            return '<i>' + text + '</i>';
        },
        Vue.prototype.$numberSum =  (number) => {
            let res = 0
            for (let i = 0; i <= number; i++) {
                res += i
            }
            return res;
        }
    }
}

