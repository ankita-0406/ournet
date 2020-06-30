import { withGoogleMap , GoogleMap, Marker, Circle, Polygon } from 'react-google-maps';
import React, { Component } from 'react';

const GoogleMapComponent = withGoogleMap((props) =>{

   const {latitude , longitude , radius } = props ;
   return(
    <GoogleMap
    id="articleMap"
    defaultZoom={9}
    center={{ lat: latitude, lng: longitude}}  >
    <Circle center ={{ lat: latitude, lng: longitude}} radius={radius * 1609.344}/>    
    {<Marker position={{ lat: latitude, lng: longitude}} />}
   </GoogleMap>)

}  
  
)




// class GoogleMapComponent extends React.Component{


//     render(){
//         return(
//             <GoogleMap 
//                     ref="myMap"
//                     defaultZoom= {8}
//                     center="{lat:55,lng:-8}">
//                 <Marker position="{lat:55,lng:-8}"/>
//                 <Circle  center="{lat:55,lng:-8}"
//                         radius= {5 * 1609.344}/>
//                 <Polygon
//                         paths= {"[]"}
//                         options="{{
//                                 strokeColor: '#0034cc',
//                                 strokeOpacity: 0.8,
//                                 strokeWeight: 3,
//                                 fillColor: '#0034cc',
//                                 fillOpacity: 0.35}}"/>
//             </GoogleMap>
//         )
//     }

// }

 export default GoogleMapComponent ;

