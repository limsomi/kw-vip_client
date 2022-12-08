import React, {useState,useEffect} from "react";
import './Search.css';
import Map from "../../map";
<<<<<<< HEAD
=======
import data_e from './sales&rent.json';
>>>>>>> main

const SearchBar=()=>{
    const [search,setSearch]=useState(""); 
    const [data_print,setData]=useState("");
    const[data_print2,setData2]=useState("");
    const [business,setBusiness]=useState("");
    const [floor,setFloor]=useState("");
    const [paint,setPaint]=useState("");
    const [person_cost,setPerson]=useState("");
    const [admin_cost,setAdmin]=useState("");
    const [local,setLocal]=useState("");
    const [price,setPrice]=useState("");
    const [rent,setRent]=useState("");
    const [total_cost,setTotal]=useState("");
    const [showPopup,setShowPopup]=useState(false);
    const [showTotal,setShowTotal]=useState(false);
    var data_value="";
var data_value2="";
    const onBusiness=(e)=>{
        const{value}=e.target;
        console.log(value);
        if(business!==e.target.value)
        {
            setBusiness(e.target.value);
        }
        else{
            setBusiness("")
        }        
    }
    const onFloor=(e)=>{
        const{value}=e.target;
        console.log(value);
        if(floor!==e.target.value)
        {
            setFloor(e.target.value);
        }
        else{
            setFloor("")
        }        
    }
    const onChangeSearch=event=>{
        event.preventDefault();
        setSearch(event.target.value);
    }

    const onGetdata=(local_name,price,e)=>{
        console.log(local_name);
        console.log(price);
        setLocal(local_name);
        setPrice(price);
        {showPopup === false ? setShowPopup(true) :setShowPopup(false)}
    }
    const onClick=async()=>{
        data_value=Content(search,floor,business);
        data_value2=Content2(search,floor,business);

        var data_list=data_value.map((local) =>
        <div id="local_check" value='true' onClick={(e)=>{onGetdata(local.local_name,local.price,e)}} key={local.id} local_name={local.local_name} price={local.price}>{local.ranking}위 {local.local_name} {parseInt(local.price)}만원</div>);

        var data_list2=data_value2.map((local) => 
        <div id="local_check" value='true' onClick={(e)=>{onGetdata(local.local_name,local.price,e)}} key={local.id} local_name={local.local_name} price={local.price}>{local.ranking}위 {local.local_name} {parseInt(local.price)}만원</div>);

        setData(data_list);
        setData2(data_list2);
        setPaint(data_value);
    }

    const onCal=async()=>{
        
        // let rent_e=data_e.value;
        // for(let i = 0; i <rent_e.length ; i++){
        //     let location=rent_e[i].구_x+" "+rent_e[i].동
        //     if(local==location)
        //     {
        //         setRent(parseInt(rent_e[i].추정월세));
        //         break;
        //     }
        // }
        const total_cost=Number(price)-Number(admin_cost)-Number(person_cost);
        console.log(price);
        setTotal(total_cost);
        console.log(total_cost);
        {showTotal===false?setShowTotal(true):setShowTotal(false)}
        
    }

    const onChangePerson=event=>{
        event.preventDefault();
        setPerson(event.target.value);
    }
    const onChangeAdmin=event=>{
        event.preventDefault();
        setAdmin(event.target.value);
    }

    return(
        <>
        <Map local_to_paint={paint}></Map>
        <div id='window'>
            <div className='title' >상권분석</div>
            <div className='component_checkbox'>
                <div className='button'>
                    <button id={"btn"+(floor==="B1" ?"_acitve" :"")} value="B1" onClick={onFloor}>B1</button>
                    <button id={"btn"+(floor==="1F" ?"_acitve" :"")} value="1F" onClick={onFloor}>1F</button>
                    <button id={"btn"+(floor==="2F" ?"_acitve" :"")} value="2F" onClick={onFloor}>2F</button>
                    <button id={"btn"+(floor==="3F" ?"_acitve" :"")} value="3F" onClick={onFloor}>3F</button>
                </div>
                <div className='button'>
                    <button id={"btn"+(business==="음식점" ?"_acitve" :"")} value="음식점" onClick={onBusiness}>음식점</button>
                    <button id={"btn"+(business==="슈퍼마켓" ?"_acitve" :"")} value="슈퍼마켓" onClick={onBusiness}>슈퍼마켓</button>
                    <button id={"btn"+(business==="학원" ?"_acitve" :"")} value="학원" onClick={onBusiness}>학원</button>
                    <button id={"btn"+(business==="카페" ?"_acitve" :"")} value="카페" onClick={onBusiness}>카페</button>
                </div>
                <div className='search'>
                    <input id="inputbox"
                    type="search"
                    value={search}
                    placeholder="   원하시는 평수를 입력하세요..."
                    onChange={onChangeSearch}
                    />
                    <button id="search_button" onClick={onClick}>검색</button>
                </div>
                <div className="component_price">
                    <hr></hr>
                    <div className='price'>지역 별 순위</div>
                    <div className='orderlist'>내림차 순 &#9660;</div>
                    <div id='data'>{data_print}</div>
                    <div className='orderlist'>오름차 순 &#9660;</div>
                    <div id='data'>{data_print2}</div>

                </div>
        </div>
        </div>
        {showPopup?(
        <div className="sub_window">
            <div className='title'>상권분석</div>
            <button id="btn_back" onClick={onGetdata}>뒤로가기</button>
            <input id="inputbox2"
                type="search"
                value={person_cost}
                placeholder="인건비"
                onChange={onChangePerson}
                />
            <input id="inputbox2"
                type="search"
                value={admin_cost}
                placeholder="관리비"
                onChange={onChangeAdmin}
                />
            <button id="search_button" value='false' onClick={onCal}>계산하기</button>
            <hr></hr>
            {showTotal?(<div id='total_cal'>
                <div id='cal_title'>인건비가 {person_cost} 만원이고 </div>
                <div id='cal_title'>관리비가 {admin_cost} 만원 일 때</div>
                {/* <div id='cal_title'>월세가 {rent} 일 때</div> */}
                <div id='cal_title'>{local}의 상권 최대 이익은 </div>
                <p>
                    <span id='total_cost'>{parseInt(total_cost)}</span>
                    <span id='cal_title'>만원 입니다</span>
                </p>
            </div>):null}
        </div>
        )
        :null}
        </>
    )
}
export default SearchBar;

let data=[//test값
    {
        area:50,
        value:[
            {id:1,ranking:1,local_name:"강남구 논현1동",price:'500'},
            {id:2,ranking:2,local_name:"은평구 응암1동",price:'300'},
            {id:3,ranking:3,local_name:"서대문구 홍제1동",price:'200'},
            {id:4,ranking:4,local_name:"중구 명동",price:'500'},
            {id:5,ranking:5,local_name:"용산구 남영동",price:'300'}
            ]
       
    },
    {
        area:30,
        value:[
            {id:1,ranking:1,local_name:"중구 명동",price:'500'},
            {id:2,ranking:2,local_name:"용산구 남영동",price:'300'},
            {id:3,ranking:3,local_name:"종로구 무악동",price:'200'},
            {id:4,ranking:4,local_name:"성북구 안암동",price:'500'},
            {id:5,ranking:5,local_name:"노원구 상계1동",price:'300'}
            ]
       
    },
    {
        area:15,
        value:[
            {id:1,ranking:'1',local_name:"성북구 안암동",price:'500'},
            {id:2,ranking:'2',local_name:"노원구 상계1동",price:'300'},
            {id:3,ranking:'3',local_name:"중랑구 상봉1동",price:'200'},
            {id:4,ranking:'4',local_name:"강남구 논현1동",price:'500'},
            {id:5,ranking:'5',local_name:"은평구 응암1동",price:'300'}
        ]
       
    }

]

<<<<<<< HEAD
const market = [
    {"구": "서대문구", "동": "북가좌동", "추정월세": 142.41},
    {"구": "송파구", "동": "풍납동", "추정월세": 148.86},
    {"구": "송파구", "동": "오금동", "추정월세": 148.86},
    {"구": "서대문구", "동": "홍은동", "추정월세": 151.66},
    {"구": "서대문구", "동": "천연동", "추정월세": 158.04},
    {"구": "서대문구", "동": "북아현동", "추정월세": 166.82},
    {"구": "서대문구", "동": "홍제동", "추정월세": 180.35},
    {"구": "광진구", "동": "구의동", "추정월세": 182.87},
    {"구": "서대문구", "동": "냉천동", "추정월세": 184.16},
    {"구": "서대문구", "동": "남가좌동", "추정월세": 184.16},
    {"구": "서대문구", "동": "영천동", "추정월세": 185.600},
    {"구": "송파구", "동": "석촌동", "추정월세": 191.32},
    {"구": "송파구", "동": "방이동", "추정월세": 191.32},
    {"구": "송파구", "동": "문정동", "추정월세": 192.52},
    {"구": "송파구", "동": "거여동", "추정월세": 193.38},
    {"구": "광진구", "동": "광장동", "추정월세": 195.60},
    {"구": "광진구", "동": "중곡동", "추정월세": 197.93},
    {"구": "송파구", "동": "마천동", "추정월세": 199.53},
    {"구": "광진구", "동": "군자동", "추정월세": 201.07},
    {"구": "강남구", "동": "개포동", "추정월세": 203.31},
    {"구": "서대문구", "동": "충정로2가", "추정월세": 210.63},
    {"구": "서대문구", "동": "옥천동", "추정월세": 210.63},
    {"구": "강남구", "동": "자곡동", "추정월세": 210.87},
    {"구": "강남구", "동": "율현동", "추정월세": 210.87},
    {"구": "서대문구", "동": "창천동", "추정월세": 213.55},
    {"구": "송파구", "동": "장지동", "추정월세": 215.81},
    {"구": "서대문구", "동": "연희동", "추정월세": 218.20},
    {"구": "광진구", "동": "자양동", "추정월세": 225.32},
    {"구": "서대문구", "동": "미근동", "추정월세": 225.73},
    {"구": "강남구", "동": "대치동", "추정월세": 226.57},
    {"구": "서대문구", "동": "충정로3가", "추정월세": 228.54},
    {"구": "광진구", "동": "화양동", "추정월세": 231.30},
    {"구": "강남구", "동": "도곡동", "추정월세": 240.37},
    {"구": "송파구", "동": "가락동", "추정월세": 242.27},
    {"구": "서대문구", "동": "대현동", "추정월세": 244.76},
    {"구": "송파구", "동": "삼전동", "추정월세": 255.42},
    {"구": "송파구", "동": "송파동", "추정월세": 262.05},
    {"구": "광진구", "동": "능동", "추정월세": 268.56},
    {"구": "송파구", "동": "잠실동", "추정월세": 282.66},
    {"구": "강남구", "동": "논현동", "추정월세": 285.10},
    {"구": "강남구", "동": "세곡동", "추정월세": 290.24},
    {"구": "강남구", "동": "청담동", "추정월세": 300.44},
    {"구": "강남구", "동": "역삼동", "추정월세": 301.457},
    {"구": "강남구", "동": "일원동", "추정월세": 303.33},
    {"구": "서대문구", "동": "합동", "추정월세": 314.24},
    {"구": "송파구", "동": "신천동", "추정월세": 320.31},
    {"구": "강남구", "동": "삼성동", "추정월세": 320.76},
    {"구": "강남구", "동": "수서동", "추정월세": 329.5},
    {"구": "강남구", "동": "신사동", "추정월세": 350.16},
];

function Content(search){
    for(let i = 0; i < data.length ; i++){
        data[i].value = max_data();
        console.log(data[i]);
=======


function Content(search,floor,business){
    for(let i = 0; i < data.length ; i++){
        data[i].value = max_data(business);

>>>>>>> main
    }
    var data_value="";
    for(var i in data){
        if(data[i]['area']== search)
        {
            data_value=data[i]['value'];
            break;
        }
    }

    if(data_value===""){return("Not found data")}
    return(
       data_value
    )

}

function Content2(search,floor,business){
    for(let i = 0; i < data.length ; i++){
        //data[i].value = max_data();
        data[i].value=min_data(business);
    }

    var data_value="";
    for(var i in data){
        if(data[i]['area']== search)
        {
            data_value=data[i]['value'];
            break;
        }
    }

    if(data_value===""){return("Not found data")}
    
    return(
       data_value

    )

}



function max_data(business){
    let maxvalue = [];
    let endList = [];
    
    while(endList.length !== 3){
        let max = 0;
        let maxlocation = "";
        let sales=data_e.value;
        
        for(let i = 0; i < sales.length ; i++){
            if(business==sales[i].업종)
            {
                let location = sales[i].구_x + " " + sales[i].동;
                if(!endList.includes(location)){
                    if(max <  sales[i].추정매출-sales[i].추정월세){
                        max = sales[i].추정매출-sales[i].추정월세;
                        maxlocation = location;
                    }
                }
            }
        }

        maxvalue.push({id:maxvalue.length + 1, ranking: maxvalue.length + 1, local_name: maxlocation, price: max});
        endList.push(maxlocation);
    }


    return maxvalue;
}

<<<<<<< HEAD
function max_data(){
    let maxvalue = [];
    let endList = [];

    while(endList.length !== 5){
        let max = 0;
        let maxlocation = "";
        for(let i = 0; i < market.length ; i++){
            let location = market[i].구 + " " + market[i].동;

            if(!endList.includes(location)){
                if(max <  market[i].추정월세){
                    max = market[i].추정월세;
                    maxlocation = location;
                }
            }
        }

        maxvalue.push({id:maxvalue.length + 1, ranking: maxvalue.length + 1, local_name: maxlocation, price: max});
        endList.push(maxlocation);
    }

    return maxvalue;
}

function min_data(){
    let minvalue = [];
    let endList = [];

    while(minvalue.length !== 5){
        let min = 0;
        let minlocation = "";
        for(let i = 0; i < market.length ; i++){
            let location = market[i].구 + " " + market[i].동;

            if(!endList.includes(location)){
                if(min >  market[i].추정월세){
                    min = market[i].추정월세;
                    minlocation = location;
                }
            }
        }

        minvalue.push({id:minvalue.length + 1, ranking: minvalue.length + 1, local_name: minlocation, price: min});
    }
}
=======

function min_data(business){//하위 5개 data
    let minvalue = [];
    let endList = [];
    
    let sales=data_e.value;
    while(endList.length <= 2){
        //let rankingNum=0;
        //let min=market[market.length].추정월세;
        let min=10000;
        let minlocation = "";
        let idNum=sales.length-endList.length;
        let rankingNum=sales.length-endList.length;
    
        //for(let i = market.length-2; i >=0; i--){

        for(let i = 0; i<sales.length; i++){

            if(business==sales[i].업종)
            {
                let location = sales[i].구_x + " " + sales[i].동;
                //min = market[market.length-1].추정월세;
    
                if(!endList.includes(location)){
                    if(min >  sales[i].추정매출-sales[i].추정월세){
                        min = sales[i].추정매출-sales[i].추정월세;
                        minlocation = location;
                        //idNum++;
                        //rankingNum--;
                    }
    
                }
            }
        }
        //minvalue.push({id: market.length-minvalue.length , ranking:market.length-minvalue.length, local_name: minlocation, price: min});
        minvalue.push({id:idNum, ranking:rankingNum, local_name: minlocation, price: min});
        endList.push(minlocation);

    }
    return minvalue;

}
>>>>>>> main
