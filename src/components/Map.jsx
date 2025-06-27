"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const center = { lat: 20.345943, lng: 85.835029 };

export default function Map({
  width = "100%",
  height = "400px",
  className = "",
  frameBorder,
  title,
  marginHeight,
  marginWidth,
  scrolling,
  style = {},
}) {
  const containerStyle = {
    width,
    height,
    ...style,
  };

  return (
    <div
      className={className}
      title={title}
      style={containerStyle}
      frameBorder={frameBorder}
      marginHeight={marginHeight}
      marginWidth={marginWidth}
      scrolling={scrolling}
    >
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={center} zoom={10}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
