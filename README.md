# DELIVERY-SHARE

[융소] 종합설계 캡스톤 프로젝트 Deliver-Share

- 배달음식 나눠먹기 플랫폼
- 2인 이상 한 주문에 대해 공동 주문하고 배달비/주문금액을 나눠서 지출할 수 있는 플랫폼 및 앱 구축 프로젝트

## Background

최근 1인 가구의 증가 그리고 코로나 상황으로 인해 배달 음식을 찾는 사람들이 더욱 많아졌다.

하지만 높은 배달팁과 혼자 시켜먹기에는 대부분 부담스러운 최소 주문 금액으로 인해 1인분 주문에 대한 장벽이 높다.

특히 배달 음식에 대한 수요가 많은 대학생, 사회초년생과 같은 1인 가구 중에는 이러한 불편을 겪는 경우가 많다.

![image](https://user-images.githubusercontent.com/48883344/122235274-85fb9200-cef8-11eb-9f27-1eb20a7b9277.png)

최소 주문금액으로 인해 1인분씩만 주문할 수 있는 가게는 많이 없을 뿐더러

있다 하더라도 배달팁이 많게는 5~6천원까지 올라가기 때문이다.

2인분 이상의 음식을 함께 주문하는 방법도 존재하겠지만 이 역시 남은 음식물 처리 등에 관하여 또 다른 문제를 발생한다.

이러한 배경으로 인해 최근 기존에 존재하는 배달앱들에 대한 여론 중에 대부분의 비판 여론은

배달팁이 너무 크다는 점이 많은 비중을 차지하고 있다.

![image](https://user-images.githubusercontent.com/48883344/122235383-9ca1e900-cef8-11eb-9261-d83f17aad98e.png)

이러한 문제점들을 완화하기 위해 가까이 사는 이웃들과 함께 배달을 나눠 시킬 수 있는 로컬 커뮤니티 기반

배달 음식 나눠 먹기 플랫폼 `DELIVERY-SHARE` 프로젝트를 기획 및 구현한다.

## System Diagram

![123](https://user-images.githubusercontent.com/48883344/122235533-bcd1a800-cef8-11eb-85a2-47888325b594.PNG)

## APP Basic Flow Demonstration

|                                                              시연                                                              |                Description                |
| :----------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------: |
| ![ezgif-4-e50369579b50](https://user-images.githubusercontent.com/48883344/122381059-79804380-cfa3-11eb-81f7-c6ea8cf47f67.gif) |      처음 콜을 요청하는 경우의 Flow       |
| ![ezgif-7-437083656891](https://user-images.githubusercontent.com/48883344/122380258-a849ea00-cfa2-11eb-9bbf-0f6aeb425ca6.gif) | 등록된 콜을 검색하고 참여하는 경우의 Flow |

## WEB Basic Flow Demonstation

|                                                           화면                                                           |                 Description                  |
| :----------------------------------------------------------------------------------------------------------------------: | :------------------------------------------: |
|   ![web_orders](https://user-images.githubusercontent.com/48883344/123054156-8d162900-d43f-11eb-83a8-5b55abe1e9e1.PNG)   |   주문접수 탭 - 실시간 유저 주문 정보 관리   |
|   ![web_menus](https://user-images.githubusercontent.com/48883344/123054147-8be4fc00-d43f-11eb-8ae8-f2061f8db154.PNG)    |    메뉴관리 탭 - 매장 판매메뉴 관련 설정     |
|  ![web_reviews](https://user-images.githubusercontent.com/48883344/123054182-930c0a00-d43f-11eb-8c49-071a7084d410.PNG)   | 리뷰관리 탭 - 매장에 등록되는 유저 리뷰 관리 |
| ![web_restaurant](https://user-images.githubusercontent.com/48883344/123054167-8f788300-d43f-11eb-87be-d178b6e2b6bb.PNG) |       식당정보 탭 - 식당 기본정보 관리       |

데모 페이지 : https://kangyeollee.github.io/delivery-share-project

- Github Pages를 이용해 배포
- 정적 웹 배포만 허용하는 관계로 백엔드와 API 통신 불가
- 따라서 더미데이터를 사용하고 있는 데모 버전의 웹 페이지

## Features

### APP

- `KakaoMap API`, `Expo-Location` 활용해 위치 정보 관리
- `Kakaopay` 연동하여 분할 결제 시스템 구현
- 주문 유저 간 소통을 위한 실시간 채팅 채널 구현
- 실시간 푸시 알림
- 유저 간 리뷰 및 평가 시스템 구축
- `나눠먹어요` 옵션 지원
- 식당 검색 기능 구현
- 장바구니 기능 구현
- 요청사항 양방향 관리 기능 구현

### WEB

- `long-polling` 방식으로 유저 주문 정보 실시간 관리
- 현재 매장 상황에 따라 주문을 `pending`, `canceled`, `complete` 3가지 상태로 관리
- 매장에 등록된 판매 메뉴 등록 및 수정 가능
- 유저 리뷰 답글 등록 기능

### BACK

- 근거리에 위치한 콜 계산: 하버사인(`Haversine`) 공식 이용해 좌표값으로 최단 경로 계산
- 시간 제한 경과 시 콜 자동 취소 처리
- `QraphQL`과 `Mysql`을 사용한 API 처리 (`query`, `mutation`, `subscription`)

## Skill Stack

### FRONTEND

- React-Native (for APP) Expo
- React CRA (for WEB)
- Javascript/Typescript
- apollo/client

### BACKEND

- Java Spring Boot
- Firebase: Cloud Messaging / Authentication
- GraphQL
- Mysql
- Naver Cloud (for Deployment)

## Contributors

|                      고재현                      |                     김수민                     |                          유동환                          |                       이강열                       |                          이동규                          |
| :----------------------------------------------: | :--------------------------------------------: | :------------------------------------------------------: | :------------------------------------------------: | :------------------------------------------------------: |
| [**@jaehyeon98**](https://github.com/jaehyeon98) | [**@KimSoomae**](https://github.com/KimSoomae) | [**@aroundthistime**](https://github.com/aroundthistime) | [**@KangyeolLee**](https://github.com/KangyeolLee) | [**@leedongkyu0407**](https://github.com/leedongkyu0407) |
|                DB설계/백엔드 개발                |        DB설계/서버 구축 및 백엔드 총괄         |                    앱 프론트엔드 총괄                    |       웹 프론트엔드 총괄/앱 프론트엔드 개발        |                       백엔드 개발                        |
