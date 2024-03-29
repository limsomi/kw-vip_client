import axios from "axios";
import { useState, useEffect } from 'react';
import geojson from './HangJeongDong_ver20220701';
const { kakao } = window;


const Map = (props) => {
  useEffect(() => {

    let data = geojson.features;
    let coordinates = []; //좌표 저장 배열
    let name = ''; //행정구 이름
    

    const header = {
      "Content-Type": `application/json`,
    };

    let polygons = [];

    const mapContainer = document.getElementById('pollution-map'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(37.559819, 126.8600), // 지도의 중심좌표
      level: 8, // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const customOverlay = new kakao.maps.CustomOverlay({});
    
    
    const displayArea = (coordinates, name) => {
      let path = [];
      let points = [];

      coordinates[0][0].forEach((coordinate) => {
        let point = {};
        point.x = coordinate[1];
        point.y = coordinate[0];
        points.push(point);
        path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
      });

      let polygon = new kakao.maps.Polygon({
        map: map,
        path: path, // 그려질 다각형의 좌표 배열입니다
        strokeWeight: 2, // 선의 두께입니다
        strokeColor: '#004c80', // 선의 색깔입니다
        strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid', // 선의 스타일입니다
        fillColor: '#fff', // 채우기 색깔입니다
        fillOpacity: 0.7, // 채우기 불투명도 입니다
      });
      
      polygons.push(polygon);
    

    // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
    // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
    kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
      polygon.setOptions({ fillColor: '#09f' });

      
      customOverlay.setContent('<div class="area">' + name + '</div>');

      customOverlay.setPosition(mouseEvent.latLng);
      customOverlay.setMap(map);
    });

    // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
    kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
      customOverlay.setPosition(mouseEvent.latLng);
    });

    // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
    // 커스텀 오버레이를 지도에서 제거합니다
    kakao.maps.event.addListener(polygon, 'mouseout', function () {
      polygon.setOptions({ fillColor: '#fff' });
      customOverlay.setMap(null);
    });


  };
    data.forEach((val) => {
      coordinates = val.geometry.coordinates;
      name = val.properties.adm_nm;
      name = name.substring(5); //서울특별시 자르기  

      displayArea(coordinates, name);
    });


    const paint=(ranking,local_name,coordinates)=>{
      if(set[ranking] === 0){
        let path=[];
        let points=[];
        
        coordinates[0][0].forEach((coordinate) => {
          let point = {};
          point.x = coordinate[1];
          point.y = coordinate[0];
          points.push(point);
          path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
        });

        let polygon = new kakao.maps.Polygon({
          map: map,
          path: path, // 그려질 다각형의 좌표 배열입니다
          strokeWeight: 2, // 선의 두께입니다
          strokeColor: '#004c80', // 선의 색깔입니다
          strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid', // 선의 스타일입니다
          fillColor: '#004c80', // 채우기 색깔입니다
          fillOpacity: 0.7, // 채우기 불투명도 입니다
        });
        
        polygon.setMap(map);
        var x=coordinates[0][0][7][1];
        var y=coordinates[0][0][7][0];
        
    
        const infowindow = new kakao.maps.CustomOverlay({ removable: true });
        var iwPosition=new kakao.maps.LatLng(x,y);

        const content='<div style="border-radius:6px; padding:0px 5px 0px 5px; display:block; text-align:center; background:#fff; font-size:20px;"><p><b>'+ranking+'위<b></p></div>';
        
         // '<p><b>' + local_name +"<b></p></div>";
        infowindow.setContent(content);
        infowindow.setPosition(iwPosition);
        infowindow.setMap(map);
        set[ranking] = 1;
      }
    };

    

    let geo_data = geojson.features;
    let p_coordinates=[];
    let local_name='';
    let p_polygons=[];
    let set = {1:0, 2:0, 3:0};
    
    try{
      let local1='서울특별시 '+props.local_to_paint['0']['local_name'];
      let local2='서울특별시 '+props.local_to_paint['1']['local_name'];
      let local3='서울특별시 '+props.local_to_paint['2']['local_name'];
      
      let count = 0;
      geo_data.forEach((val)=>{
      p_coordinates=val.geometry.coordinates;
      local_name=val.properties.adm_nm;

      
      count += 1;
      if(local_name.slice(0, local1.length - 1) === local1.slice(0, -1))
      {
       
       paint('1',props.local_to_paint['0']['local_name'],p_coordinates);
        

      }
      else if(local_name.slice(0, local2.length - 1) === local2.slice(0, -1))
      {
        
        paint('2',props.local_to_paint['1']['local_name'],p_coordinates);
        
      }
      else if(local_name.slice(0, local3.length - 1) === local3.slice(0, -1))
      {
        paint('3',props.local_to_paint['2']['local_name'],p_coordinates);
        

      }

      
      }) 
    }catch(e)  
    {
      
    }


    
    
  }, [props]);

  return (
    <>
      <div id="pollution-map" style={{ width: "100%", height: "100%",position:"absolute" }}></div>
    </>
  );
};


export default Map;