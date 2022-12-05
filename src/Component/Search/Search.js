import React, {useState,useEffect} from "react";
import './Search.css';
import Map from "../../map";

const SearchBar=()=>{
    const [search,setSearch]=useState(""); 
    const [data_print,setData]=useState("");
    const [business,setBusiness]=useState("");
    const [floor,setFloor]=useState("");
    const [paint,setPaint]=useState("");
    
    var data_value="";

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
    const onClick=async()=>{
        data_value=Content(search);
        var data_list=data_value.map((local) => 
        <Print key={local.id} ranking={local.ranking} local_name={local.local_name} price={local.price}></Print>);
        
        setData(data_list);
        setPaint(data_value);
    }

    
    return(
        <>
        <Map local_to_paint={paint}></Map>
        <div id='window'>
            <div className='title'>상권분석</div>
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
                    <div className='price'>지역 별 순위....</div>
                    <div id='data'>{data_print}</div>
                </div>
        </div>
        </div>

        </>
    )
}
export default SearchBar;

let data=[//test값
    {
        area:25,
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

function Print({ranking,local_name,price}){
    let local_price=ranking+"위 "+local_name+" "+price
    const [showPopup,setShowPopup]=useState("");
    const onGetdata=(e)=>{
        const {value}=e.target;
        console.log(typeof(value));
        if(showPopup!=e.target.value)
        {
            
            setShowPopup(e.target.value);
        }
        else{
            setShowPopup("");
        }
        console.log(showPopup);
        // console.log(typeof(showPopup));
    }
   return(
    <>
        <div id="local_check" onClick={onGetdata} value='false'>{local_price}</div>
        {showPopup?(
            <div className="sub_window">hi</div>
        ):null}
    </>
   )
}

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