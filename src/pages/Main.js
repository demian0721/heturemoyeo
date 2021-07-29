/* global kakao */
// LIBRARY
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { css } from 'styled-components';
import { Transition } from '@headlessui/react'

// COMPONENTS
import UserOverlay from '../components/UserOverlay';
import Footer from '../components/Footer';
import MyLocation from '../components/MyLocation';

// ELEMENTS
import { Grid, Button, Title, Text } from '../elements/index';
import { map } from 'lodash';

// MATERIAL-UI
import MyLocationIcon from '@material-ui/icons/MyLocation';

const Main = () => {
    const [markers] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef()

    const position = {
        x: 37.5668998,
        y: 126.9345105
    }

    const addMarker = useCallback((map, position) => {
        const marker = new kakao.maps.Marker({ position })
        marker.setMap(map)
        markers.push(marker)
        kakao.maps.event.addListener(marker, 'click', () => {
            if (!isOpen) setIsOpen(true)
            else setIsOpen(false)
        })
        return marker
    }, [])

    useEffect(() => {
        const container = document.getElementById('map')
        const options = {
            center: new kakao.maps.LatLng(position.x, position.y),
            level: 1
        }
        const map = new kakao.maps.Map(container, options)
        addMarker(map, new kakao.maps.LatLng(position.x, position.y))
    }, [])

    useEffect(() => {
        const handleClickedOutSide = (event) => {
            if (ref && !ref?.current?.contains(event.target) && isOpen) setIsOpen(!isOpen)
        }
        document.addEventListener('mousedown', handleClickedOutSide)
        return () => {
            document.removeEventListener('mousedown', handleClickedOutSide)
        }
    }, [ref, isOpen])

    // const panTo = (x, y) => {
    //     const moveLatLon = new kakao.maps.LatLng(x, y)
    //     map.panTo(moveLatLon)
    // }

    return (
        <>
            <div className='container'> {/* 맵 영역 생성 */}
                <div
                    id='map'
                    className='h-auto w-auto'
                    style={{
                        minWidth: '100vw',
                        maxWidth: '100vw',
                        minHeight: '100vh',
                        maxHeight: '100vh'
                    }}
                />
                {/* 오버레이 */}
                <Transition
                    show={isOpen}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0'
                    enterTo='transform opacity-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100'
                    leaveTo='transform opacity-0'
                    className='absolute left-0 right-0 bottom-0 border border-gray-300 rounded-t-lg bg-white py-4 topDropShadow'
                    style={{ zIndex: 2 }}
                >
                    <div ref={ref} className='container mx-auto px-4'>
                        <div id='overlay--author__status' className='block'>
                            <UserOverlay
                                isOpen={isOpen}
                                username='마왕'
                                userStatus='아 배고프다...'
                                userHashTag='#코딩 #배고파 #^_^'
                                userSchedule='Visual Studio Code 참여중'
                                userRating={66}
                            />
                        </div>
                    </div>
                </Transition>
                <MyLocation/>
                <Footer />
            </div>
            {/* <Grid
                style={{ position: 'fixed', top: '10%', left: '3%', zIndex: 99 }}
                width="auto"
                height="auto"
                overflow="visible"
            >
                <Button
                    shadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;"
                    padding="12px"
                    margin="0 0 10px"
                    radius="100%"
                    clickEvent={() =>
                        window.location.reload(),
                        console.log('내 위치 찾기!')}
                >
                    <MyLocationIcon />
                </Button>
            </Grid> */}
        </>
    )
}

export default Main

export function test() {
    const markers = []
    const setMarkers = () => { }
    return (
        <>
            <Grid id="map" Width="100vw" minWidth="320px" maxwidth="560px" height="100vh" minHeight="640px" maxHeight="1440px">
                {/* <AddButton clickEvent={() => setMarker(null)} /> */}
                <Button padding="12px"
                    style={{ zIndex: '99', display: 'block', position: 'fixed' }}
                    clickEvent={() => {
                        if (markers.length === 0) return alert('empty list!')
                        console.log('removed markers')
                        markers.map(el => el.setMap(null))
                        setMarkers([])
                    }}
                >
                    마커 삭제
                </Button>
                <Footer />
            </Grid>
        </>
    )
}
