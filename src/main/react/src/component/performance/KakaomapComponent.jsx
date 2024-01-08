import { useEffect, useState } from "react";
import MapMarker from "../../images/MapMarker.png";
import AxiosApi from "../../axios/PerformanceAxios";

const { kakao } = window;

const KakaomapComponent = ({ performanceList, selectedVenue }) => {
  const [map, setMap] = useState(null);
  useEffect(() => {
    const Container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = { // 지도 기본값 설정
     center: new kakao.maps.LatLng(37.498712, 127.031904), //지도의 중심좌표.
     level: 5 //지도의 레벨(확대, 축소 정도)
     
  };
  const map = new kakao.maps.Map(Container, options); //지도 생성 및 객체 리턴

  // 카카오맵 스카이뷰, 일반지도 전환 및 지도레벨조정 컨트롤러
  const mapTypeControl = new kakao.maps.MapTypeControl();
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOP); // 지도 타입 컨트롤을 지도 상단중앙에 표시
  const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT); // 지도 확대 축소 컨트롤을 지도 우측상단에 표시



  // 마커 이미지 및 표시위치 설정
  const imageSrc = MapMarker,
        imageSize = new kakao.maps.Size(40),
        imageOption = { offset: new kakao.maps.Point(20, 48.94) };

  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
  const markerPosition = options.center;

  // Geocoder 객체 생성, 주소 -> 좌표 변환 객체
  const geocoder = new window.kakao.maps.services.Geocoder();

    // 각 데이터 주소에 따라 지도 위에 마커를 표시합니다
    performanceList.forEach(performance => {
      geocoder.addressSearch(performance.venue, function(result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          // 마커를 생성하고 지도에 표시합니다
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
            image: markerImage 
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map); 
          map.setCenter(coords); // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        }
      });
    });
    setMap(map); // map 상태를 업데이트합니다.
  }, [performanceList]); // performanceList가 변경될 때마다 useEffect를 실행합니다.

  useEffect(() => {
    // selectedVenue가 변경될 때마다 실행됩니다.
    if (map && selectedVenue) { 
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(selectedVenue, function(result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          map.setCenter(coords); // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        }
      });
    }
  }, [map, selectedVenue]);

return (
  <>
    <div id="map" style={{
      width: "100%",
      height: "100%",
      
    }}
    > 
    </div>
  </>
  )
  }

export default KakaomapComponent;

