// 用来获取视图显示分页信息
// page,当前页  totalPage,总页数200  pageSize,每页显示的个数
function getPages(page,totalPage){
    var pages = [page];//[1]
    var left = page - 1;//0 4
    var right = page + 1;//2->3 6
    while(pages.length < 10 && (left >= 1||right <= totalPage)){
        if(left >= 1){ //4>=1
            pages.unshift(left--);//前面加一个
        }
        if(pages.length < 10 && right <= totalPage){
            // right++先试用后++
            pages.push(right++);//[1,2,...,10]
        }
    }
    return pages;
}
module.exports = getPages;