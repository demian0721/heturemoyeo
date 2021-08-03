/* global kakao */
// LIBRARY
import React, { useEffect, useState, useRef } from 'react'
import _ from "lodash";
import { Transition } from '@headlessui/react'
import { geolocated, geoPropTypes } from 'react-geolocated'
import { useSelector } from 'react-redux';

// COMMON
import socket from '../common/socket'

// COMPONENTS
import Header from '../components/Header';
import UserOverlay from '../components/UserOverlay';
import Footer from '../components/Footer';

// ELEMENTS
import { Grid, Button, Input } from '../elements/index';

// MATERIAL-UI
import MyLocationIcon from '@material-ui/icons/MyLocation';

const Main = (props) => {
    const [geolocationMarker, setGeolocationMarker] = useState(false)
    const [markers, setMarkers] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userData, setUserData] = useState({})
    const debounce = _.debounce((value, setValue) => setValue(value), 300)
    const ref = useRef()
    const useOutsideClick = (ref, handler) => {
        useEffect(() => {
            const listener = (event) => {
                if (!ref?.current || (ref && ref?.current?.contains?.(event.target)))
                    return; handler(event);
            };
            document.addEventListener('mousedown', listener);
            return () => { document.removeEventListener('mousedown', listener) }
        }, [ref, handler])
    }
    useOutsideClick(ref, () => setIsOpen(false))

    const exampleData = {
        nickname: 'example, nickname',
        rating: 100,
        statusMessage: 'example, statusMessage',
        hashTags: ['example, hashTags'],
        profileImage: 'https://spartacodingclub.kr/static/v5/images/rtan/rtan_thumb_20-min.png',
        scheduleTitle: 'example, scheduleTitle',
        scheduleCount: 3,
        isFriend: false,
    }

    const markerEventListener = (userId) => {
        if (!isOpen) {
            setIsOpen(true)
            setUserId(userId)
            setUserData(exampleData)
        } else setIsOpen(false)
    }

    // 마커 생성 및 클릭이벤트 부여하기 (오버레이 보이기/숨기기)
    const addMarker = (map, markerUserId, position) => {
        const marker = new kakao.maps.Marker({ position })
        marker.setMap(map)
        marker.userId = markerUserId
        marker.position = position
        kakao.maps.event.addListener(marker, 'click', () => markerEventListener(markerUserId))
        markers.push(marker)
        return marker
    }

    // My Location 버튼 (내위치 찾기)
    const panTo = (lat, lng) => {
        console.log(`Reset viewPoint to My Location (Latitude: ${lat} & Longitude: ${lng})`)
        global?.map?.panTo(new kakao.maps.LatLng(lat, lng))
        // global?.map?.setLevel(3, { animate: { duration: 500 } })
    }

    // 로그인 하면 내 위치를 소켓으로 전송하는 부분?
    const sendUserLocation = (userId, lat, lng) => {
        console.log(`Send UserLocation: ${userId}, ${lat}, ${lng}`)
        socket.emit('latlng', { userId, lat, lng })
    }

    // 인풋박스에서 임의의 마커 추가해보기. (소켓통신)
    const submitAddMarker = () => {
        const userId = document.getElementById('input__userId')
        const locationLat = document.getElementById('input__location--lat')
        const locationLng = document.getElementById('input__location--lng')
        if (!userId?.value || !locationLat?.value || !locationLng?.value) return alert('모든 데이터를 입력해 주세요')
        if (markers.filter(el => el.markerUserId === Number(userId?.value)).length >= 1) return alert(`중복되는 아이디가 있습니다. (중복되는 아이디: ${userId?.value})`)
        addMarker(global.map, userId?.value, new kakao.maps.LatLng(Number(locationLat?.value), Number(locationLng?.value)))
        sendUserLocation(Number(userId.value), Number(locationLat.value), Number(locationLng.value))
        alert(`마커가 생성되었습니다. (생성된 마커 아이디: ${userId?.value})`)
        userId.value = ''
        locationLat.value = ''
        locationLng.value = ''
    }

    // 로그인 후, 유저 데이터
    const getUserData = useSelector(state => state.user)

    // 카카오맵 생성하기
    useEffect(() => {
        const container = document.getElementById('map')
        const options = { center: new kakao.maps.LatLng(props?.coords?.latitude, props?.coords?.longitude), level: 3 }
        global.map = new kakao.maps.Map(container, options)
        return () => {
            console.log('clearing markers click events...')
            markers.map(marker => kakao.maps.event.removeListener(marker, 'click', () => markerEventListener()))
        }
    }, [props])

    if (!props.isGeolocationAvailable) alert('해당 기기는 GeoLocation을 지원하지 않습니다!')
    if (!props.isGeolocationEnabled) alert('해당 기기에서 GeoLocation이 활성화 되어있지 않습니다!')
    if (props.isGeolocationAvailable && props.isGeolocationEnabled && props?.coords && !!getUserData?.userId && !geolocationMarker) {
        setGeolocationMarker(true)
        sendUserLocation(getUserData.userId, props.coords.latitude, props.coords.longitude)
    }

    const userLocationListener = (data) => {
        console.log(markers)
        console.log(markers.map(el => ({ userId: el.userId, position: el.position })))
        markers.map(el => el.setMap(null))
        markers.splice(0, markers.length)
        setMarkers([])
        for (const key in data) {
            if (key !== null) {
                addMarker(global.map, key, new kakao.maps.LatLng(data[key].lat, data[key].lng))
            }
        }
    }

    useEffect(() => {
        socket.on('userLocation', userLocationListener)
        return () => {
            console.log('clearing socket.io events...')
            socket.removeEventListener('userLocation', userLocationListener)
            socket.off('userLocation', userLocationListener)
        }
    }, [])

    return (
        <>
            {
                sessionStorage.token && <>
                    <Grid><Header /></Grid>
                    <div className='container'> {/* 맵 영역 생성 */}
                        <div className='absolute left-0 right-0 inline-flex' style={{ zIndex: 20 }}>
                            <Input id='input__userId' placeholder='userId' />
                            <Input id='input__location--lat' placeholder='Lat' />
                            <Input id='input__location--lng' placeholder='Lng' />
                            <div onClick={() => submitAddMarker()} className='bg-blue-500 hover:bg-blue-700 transition text-white rounded-lg text-center px-4 py-2 cursor-pointer'>
                                Add Marker
                            </div>
                        </div>
                        <div
                            id='map'
                            className='h-auto w-auto'
                            style={{
                                minWidth: '100vw',
                                maxWidth: '100vw',
                                minHeight: '93vh',
                                maxHeight: '94vh'
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
                            style={{ zIndex: 3 }}
                        >
                            <div ref={ref} className='container mx-auto px-4'>
                                <div id='overlay--author__status' className='block'>
                                    <UserOverlay
                                        isOpen={isOpen}
                                        username={userData?.nickname}
                                        userStatus={userData?.statusMessage}
                                        userHashTag={userData?.hashTags}
                                        userSchedule={userData?.scheduleTitle}
                                        profileImage={userData?.profileImage}
                                        scheduleCount={userData?.scheduleCount}
                                        userRating={userData?.rating}
                                    />
                                </div>
                            </div>
                        </Transition>
                    </div>
                    <Grid
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
                            clickEvent={() => panTo(props?.coords?.latitude, props?.coords?.longitude)}
                        >
                            <MyLocationIcon />
                        </Button>
                    </Grid>
                    <Grid><Footer /></Grid>
                </>
            }
        </>
    )
}

Main.propTypes = { ...Main.propTypes, ...geoPropTypes }

export default geolocated({ positionOptions: { enableHighAccuracy: false }, userDecisionTimeout: 500 })(Main)