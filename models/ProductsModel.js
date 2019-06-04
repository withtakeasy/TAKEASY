var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var { autoIncrement } = require('mongoose-plugin-autoinc');

//생성될 필드명을 정한다.
var ProductsSchema = new Schema({
    name : { //제품명
        type : String,
        required: [true, '제목은 입력해주세요']
    },
    thumbnail : String, //이미지 파일명
    url : String, //url
    description : String, //설명
    category : String,// 카테고리 구분
    startDate : {
        type : Date
    },
    endDate : {
        type : Date
    },
    created_at : { //작성일
        type : Date,
        default : Date.now()
    },
    username : String  //작성자추가
});

//virtual 변수는 호출되면 실행하는 함수
// Object create 의 get과 set과 비슷함
//set은 변수의 값을 바꾸거나 셋팅하면 호출
// get은 getDate변수를 호출하는 순간 날짜 월일이 찍힌다.
ProductsSchema.virtual('getDate').get(function(){
    let date = new Date(this.created_at);
    return {
        year : date.getFullYear(),
        month : date.getMonth()+1,
        day : date.getDate()
    };
});
ProductsSchema.virtual('getStartDate').get(function(){
    let date = new Date(this.startDate);
    return {
        year : date.getFullYear(),
        month : date.getMonth()+1,
        day : date.getDate()
    };
});
ProductsSchema.virtual('getEndDate').get(function(){
    let date = new Date(this.endDate);
    return {
        year : date.getFullYear(),
        month : date.getMonth()+1,
        day : date.getDate()
    };
});

// 1씩 증가하는 primary Key를 만든다
// model : 생성할 document 이름
// field : primary key , startAt : 1부터 시작
ProductsSchema.plugin( autoIncrement , { model : 'products' , field : 'id' , startAt : 1 });
module.exports = mongoose.model('products', ProductsSchema);