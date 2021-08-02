/* global kakao */
// LIBRARY
import React, { useEffect, useState, useCallback, useRef } from 'react'
import _ from "lodash";
import { Transition } from '@headlessui/react'

// COMMON
import socket from '../common/socket'

// COMPONENTS
import Header from '../components/Header';
import UserOverlay from '../components/UserOverlay';
import Footer from '../components/Footer';

// ELEMENTS
import { Grid, Button, Input, Title, Text } from '../elements/index';

// MATERIAL-UI
import MyLocationIcon from '@material-ui/icons/MyLocation';

const Main = () => {
    // const [markers] = useState([])
    const markers = []
    const [isOpen, setIsOpen] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userData, setUserData] = useState({})
    const debounce = _.debounce((value, setValue) => setValue(value), 300)
    const ref = useRef()
    const useOutsideClick = (ref, handler) => { useEffect(() => { const listener = (event) => { if (!ref?.current || (ref && ref?.current?.contains?.(event.target))) return; handler(event); }; document.addEventListener('mousedown', listener); return () => { document.removeEventListener('mousedown', listener) } }, [ref, handler]) }
    useOutsideClick(ref, () => setIsOpen(false))

    // friendship - 0: no friend | 1: friend | 2: same schedule
    const data = [
        { id: 1, location: { lat: 37.5671461, lng: 126.9309533 }, type: 0, rating: 55, statusMessage: '익명의 사람인데요', profileImage: 'https://cdn.discordapp.com/attachments/869177664479567903/871045228159705088/profileBlank.png' },
        { id: 2, nickname: '충우아파트경비원', location: { lat: 37.5679144, lng: 126.9344071 }, type: 1, rating: 75, statusMessage: '야간 순찰중입니다.', hashTags: ['#아파트_경비원', '#인생_소주한잔'], profileImage: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2017/12/web-20171215051153631398.png' },
        { id: 3, nickname: '벧엘선교사님', location: { lat: 37.5663129, lng: 126.9316755 }, type: 2, rating: 15, statusMessage: '하나님 아버지 ...', hashTags: ['#오직예수', '#하나님을_믿으세요'], profileImage: 'https://i.pinimg.com/originals/81/2c/49/812c497a82c6074d5e172b2a5b3e624a.png', scheduleTitle: '교회에 모여, 같이 성경 읽어요.', scheduleCount: 3, isFriend: true },
        { id: 4, nickname: '르탄이', location: { lat: 37.566903, lng: 126.934458 }, type: 2, rating: 100, statusMessage: '코딩 노예', hashTags: ['#배고파', '#VisualStudioCode'], profileImage: 'https://spartacodingclub.kr/static/v5/images/rtan/rtan_thumb_20-min.png', scheduleTitle: '같이 코딩하실 분', scheduleCount: 3, isFriend: false, me: true }
    ]

    const exampleData = { id: 4, nickname: 'example, nickname', location: { lat: 37.566903, lng: 126.934458 }, type: 2, rating: 100, statusMessage: 'example, statusMessage', hashTags: ['example, hashTags'], profileImage: 'https://spartacodingclub.kr/static/v5/images/rtan/rtan_thumb_20-min.png', scheduleTitle: 'example, scheduleTitle', scheduleCount: 3, isFriend: false, }

    const location = { lat: 37.566903, lng: 126.934458 }
    const addMarker = useCallback((map, markerUserId, position) => {
        const marker = new kakao.maps.Marker({ position })
        marker.setMap(map)
        Object.assign(marker, { markerUserId })
        markers.push(marker)
        kakao.maps.event.addListener(marker, 'click', () => {
            if (!isOpen) {
                setIsOpen(true)
                setUserId(markerUserId)
                setUserData(data.filter(el => el.id === markerUserId)?.[0] ?? exampleData)
            } else setIsOpen(false)
        })
        return marker
    }, [])

    const sendUserLocation = (userId, lat, lng) => {
        console.log(`Send UserLocation: ${userId}, ${lat}, ${lng}`)
        socket.emit('latlng', { userId, lat, lng })
    }

    const panTo = () => {
        console.log('Reset viewPoint to center')
        global?.map?.panTo(new kakao.maps.LatLng(location.lat, location.lng))
    }

    const submitAddMarker = () => {
        const userId = document.getElementById('input__userId')
        const locationLat = document.getElementById('input__location--lat')
        const locationLng = document.getElementById('input__location--lng')
        if (!userId?.value || !locationLat?.value || !locationLng?.value) return alert('모든 데이터를 입력해 주세요')
        if (data.filter(el => el.id === Number(userId?.value)).length >= 1) return alert(`중복되는 아이디가 있습니다. (중복되는 아이디: ${userId?.value})`)
        addMarker(global.map, userId?.value, new kakao.maps.LatLng(Number(locationLat?.value), Number(locationLng?.value)))
        sendUserLocation(Number(userId.value), Number(locationLat.value), Number(locationLng.value))
        alert(`마커가 생성되었습니다. (생성된 마커 아이디: ${userId?.value})`)
        userId.value = ''
        locationLat.value = ''
        locationLng.value = ''
    }

    useEffect(() => {
        const container = document.getElementById('map')
        const options = { center: new kakao.maps.LatLng(location.lat, location.lng), level: 3 }
        global.map = new kakao.maps.Map(container, options)
        for (const userData of data) {
            sendUserLocation(userData.id, userData.location.lat, userData.location.lng)
            addMarker(global.map, userData.id, new kakao.maps.LatLng(userData.location.lat, userData.location.lng))
        }
        // sendUserLocation(data[3].id, data[3].location.lat, data[3].location.lng)
    }, [])

    setTimeout(() => {
        socket.on('userLocation', async (data) => {
            // for (const key in data) {
            //     const isExistMarker = markers.filter(el => el.markerUserId === Number(key))
            //     const locationData = data[key]
            //     const position = isExistMarker[0]?.getPosition()
            //     if (isExistMarker.length >= 1 && position.getLat() === location.lat && position.getLng() === locationData.lng) {
            //         console.log('same location position!')
            //         return true
            //     }
            //     // console.log(`removing marker via markerId: ${key}`)
            //     // isExistMarker[0]?.setMap(null)
            //     // console.log(`adding marker via markerId: ${key}`)
            //     // addMarker(global.map, key, new kakao.maps.LatLng(locationData.lat, locationData.lng))
            // }
        })
    }, 1500)

    return (
        <>
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
                    clickEvent={() => panTo()}
                >
                    <MyLocationIcon />
                </Button>
            </Grid>
            <Grid><Footer /></Grid>
        </>
    )
}

export default Main