/* global kakao */
// LIBRARY
import React, { useEffect, useState, useCallback } from 'react'
import { css } from 'styled-components';

// ELEMENTS
import { Grid, Button, AddButton } from '../elements/index';

const Main = () => {
    const [markers, setMarkers] = useState([])

    const addMarker = useCallback((map, position) => {
        const marker = new kakao.maps.Marker({ position })
        marker.setMap(map)
        markers.push(marker)
        console.log('added marker')
        return marker
    }, [])

    useEffect(() => {
        const container = document.getElementById('map')
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        }
        const map = new kakao.maps.Map(container, options)
        const iwContent = 'Space'
        const iwRemoveable = true
        const infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable
        })
        
        addMarker(map, new kakao.maps.LatLng(33.450701, 126.570667))
        addMarker(map, new kakao.maps.LatLng(33.447701, 126.570667))
        addMarker(map, new kakao.maps.LatLng(33.450701, 126.573667))
        addMarker(map, new kakao.maps.LatLng(33.453701, 126.573667))
        console.log(markers)
    }, [])

    return (
        <>
            <Grid id="map" minWidth="360px" maxWidth="560px" height="800px">
                {/* <AddButton clickEvent={() => setMarker(null)} /> */}
                <Button
                    style={{ zIndex: '99', display: 'block', position: 'fixed' }}
                    onClick={() => {
                        if (markers.length === 0) return alert('empty list!')
                        console.log('removed markers')
                        markers.map(el => el.setMap(null))
                        setMarkers([])
                        console.log(markers)
                    }}
                >
                    클릭
                </Button>
            </Grid>
        </>
    )
}

export default Main
