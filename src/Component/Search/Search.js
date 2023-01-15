import React, {useState,useEffect} from "react";
import './Search.css';
import Map from "../../map";
import data_e from './sales&rent.json';

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
    const [calcost,setCalCost]=useState("");
    const [calrent,setCalRent]=useState("");
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

    const onGetdata=(local_name,price,cost,rent,e)=>{
        console.log(local_name);
        console.log(price);
        setLocal(local_name);
        setPrice(price);
        setCalCost(cost);
        setCalRent(rent);
        {showPopup === false ? setShowPopup(true) :setShowPopup(false)}
    }
    const onClick=async()=>{
        data_value=Content(search,floor,business);
        data_value2=Content2(search,floor,business);

        var data_list=data_value.map((local) =>
        <div id="local_check" value='true' onClick={(e)=>{
            onGetdata(local.local_name,local.price,local.cost,local.rent,e)}} 
            key={local.id} local_name={local.local_name} price={local.price}>
                <div>{local.ranking}위 {local.local_name} {parseInt(local.price)}만원</div>
                <div id="info">추정매출액 : {parseInt(local.cost)}만원 , 추정임차료 : {parseInt(local.rent)}만원</div>
        </div>);

        var data_list2=data_value2.map((local) => 
        <div id="local_check" value='true' onClick={(e)=>{
            onGetdata(local.local_name,local.price,local.cost,local.rent,e)}} 
            key={local.id} local_name={local.local_name} price={local.price}>
                <div>{local.ranking}위 {local.local_name} {parseInt(local.price)}만원</div>
                <div id="info">추정매출액 : {parseInt(local.cost)}만원 , 추정임차료 : {parseInt(local.rent)}만원</div>
        </div>);

        setData(data_list);
        setData2(data_list2);
        setPaint(data_value);
    }

    const onCal=async()=>{
        
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
            <div className='title' >영업이익 분석 서비스</div>
            <div className='component_checkbox'>
                <div className='button'>
                    <button id={"btn"+(business==="음식점" ?"_acitve" :"")} value="음식점" onClick={onBusiness}>음식점</button>
                    <button id={"btn"+(business==="슈퍼마켓" ?"_acitve" :"")} value="슈퍼마켓" onClick={onBusiness}>슈퍼마켓</button>
                    <button id={"btn"+(business==="학원" ?"_acitve" :"")} value="학원" onClick={onBusiness}>학원</button>
                    <button id={"btn"+(business==="카페" ?"_acitve" :"")} value="카페" onClick={onBusiness}>카페</button>
                </div>
                <div className='button'>
                    <button id={"btn"+(floor==="B1" ?"_acitve" :"")} value="B1" onClick={onFloor}>B1</button>
                    <button id={"btn"+(floor==="1F" ?"_acitve" :"")} value="1F" onClick={onFloor}>1F</button>
                    <button id={"btn"+(floor==="2F" ?"_acitve" :"")} value="2F" onClick={onFloor}>2F</button>
                    <button id={"btn"+(floor==="3F" ?"_acitve" :"")} value="3F" onClick={onFloor}>3F</button>
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
                    <div className='price'>지역별 순위(추정매출액-추정임차료)</div>
                    <div style={{overflowY:'auto',height:'700px'}}>
                        <div className='orderlist'>내림차 순 &#9660;</div>
                        <div id='data'>{data_print}</div>
                        <div className='orderlist'>오름차 순 &#9660;</div>
                        <div id='data'>{data_print2}</div>
                    </div>

                </div>
        </div>
        </div>
        {showPopup?(
        <div className="sub_window">
            <div className='title'>영업이익 분석 서비스</div>
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
                placeholder="재료비"
                onChange={onChangeAdmin}
                />
            <button id="search_button" value='false' onClick={onCal}>계산하기</button>
            <hr></hr>
            {showTotal?(<div id='total_cal'>
                <div id='expression'>
                    <div id='cal_title3'>추정식</div>
                    <div id='cal_title2'> 영업이익 = 추정매출액 - 추정임차료 - 인건비 - 재료비</div>
                </div>
                <div id='cal_title'><span id="color">추정매출액 : {parseInt(calcost)} 만원</span></div>
                <div id='cal_title'><span id='color'>추정임차료 : {parseInt(calrent)} 만원</span></div>
                <div id='cal_title'><span id='color'>인건비 : {person_cost} 만원</span></div>
                <div id='cal_title'><span id='color'>재료비 :  {admin_cost} 만원</span></div>
                <div id='cal_title'><span id='color'>{local}</span>의 영업이익은</div>
                <p>
                    <span id='total_cost'>{parseInt(total_cost)}  만원</span>
                    <span id='cal_title'> 입니다</span>
                </p>
                <div></div>
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
            {id:1,ranking:1,local_name:"강남구 논현1동",price:'500',cost:'100',rent:'100'},
            {id:2,ranking:2,local_name:"은평구 응암1동",price:'300',cost:'100',rent:'100'},
            {id:3,ranking:3,local_name:"서대문구 홍제1동",price:'200',cost:'100',rent:'100'},
            {id:4,ranking:4,local_name:"중구 명동",price:'500',cost:'100',rent:'100'},
            {id:5,ranking:5,local_name:"용산구 남영동",price:'300',cost:'100',rent:'100'}
            ]
       
    },
    {
        area:100,
        value:[
            {id:1,ranking:1,local_name:"중구 명동",price:'500',cost:'100',rent:'100'},
            {id:2,ranking:2,local_name:"용산구 남영동",price:'300',cost:'100',rent:'100'},
            {id:3,ranking:3,local_name:"종로구 무악동",price:'200',cost:'100',rent:'100'},
            {id:4,ranking:4,local_name:"성북구 안암동",price:'500',cost:'100',rent:'100'},
            {id:5,ranking:5,local_name:"노원구 상계1동",price:'300',cost:'100',rent:'100'}
            ]
       
    },
    {
        area:60,
        value:[
            {id:1,ranking:'1',local_name:"성북구 안암동",price:'500',cost:'100',rent:'100'},
            {id:2,ranking:'2',local_name:"노원구 상계1동",price:'300',cost:'100',rent:'100'},
            {id:3,ranking:'3',local_name:"중랑구 상봉1동",price:'200',cost:'100',rent:'100'},
            {id:4,ranking:'4',local_name:"강남구 논현1동",price:'500',cost:'100',rent:'100'},
            {id:5,ranking:'5',local_name:"은평구 응암1동",price:'300',cost:'100',rent:'100'}
        ]
       
    }

]



function Content(search,floor,business){
    for(let i = 0; i < data.length ; i++){
        data[i].value = max_data(search,floor,business);

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
        data[i].value=min_data(search,floor,business);
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



function max_data(search,floor,business){

    let maxvalue = [];
    let endList = [];
    
    while(endList.length !== 3){
        let max = 0;
        let maxlocation = "";
        let sales=data_e.value;
        let maxcost="";
        let maxrent="";

        for(let i = 0; i < sales.length ; i++){
            if(business==sales[i].업종 && floor==sales[i].층+"F" && search==sales[i].전용면적)
            {
                let location = sales[i].구_x + " " + sales[i].동;
                if(!endList.includes(location)){
                    if(max <  sales[i].추정매출-sales[i].추정월세){
                        max = sales[i].추정매출-sales[i].추정월세;
                        maxlocation = location;
                        maxcost=sales[i].추정매출;
                        maxrent=sales[i].추정월세;
                    }
                }
            }
        }

        maxvalue.push({id:maxvalue.length + 1, ranking: maxvalue.length + 1, local_name: maxlocation, price: max,cost:maxcost,rent:maxrent});
        endList.push(maxlocation);
    }


    return maxvalue;
}


function min_data(search,floor,business){//하위 5개 data
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
        let mincost;
        let minrent;
        //for(let i = market.length-2; i >=0; i--){

        for(let i = 0; i<sales.length; i++){

            if(business==sales[i].업종 && floor==sales[i].층+'F' && search==sales[i].전용면적)
            {
                let location = sales[i].구_x + " " + sales[i].동;
    
                if(!endList.includes(location)){
                    if(min >  sales[i].추정매출-sales[i].추정월세){
                        if(sales[i].추정매출-sales[i].추정월세<100){continue;}
                        min = sales[i].추정매출-sales[i].추정월세;
                        minlocation = location;
                        mincost=sales[i].추정매출;
                        minrent=sales[i].추정월세;
                    }
    
                }
            }
        }
        
        minvalue.push({id:idNum, ranking:rankingNum, local_name: minlocation, price: min,cost:mincost,rent:minrent});
        endList.push(minlocation);

    }
    return minvalue;

}
