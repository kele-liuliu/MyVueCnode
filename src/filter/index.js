// 制作一个全局过滤器,用于置顶和精华两个小标签的使用
import Vue from "vue";
import moment from 'moment'

//传入数组中的一个对象元素，对象下的good属性为true就显示精华，对象下的top属性为true就显示置顶，其他情况则显示普通的tab，因为是tab = share这样的类型，所以将其转换成中文
Vue.filter('getPostChineseTab',(ele) =>{
    return ele.good ? "精华":ele.top ? "置顶" :ele.tab === 'share'?"分享": ele.tab === 'ask'?"问答":ele.tab ==='job'?"招聘":ele.tab ='dev'?"客户端测试":""
}),

// 做一个相对时间过滤器
Vue.filter('fromNowTime',(date) =>{
    moment.locale("zh-cn")
    return moment(date).fromNow()
})