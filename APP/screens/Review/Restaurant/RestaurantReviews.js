import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Loader from "../../../components/Loader";
import constants from "../../../constants";
import { useRestaurant } from "../../../Contexts/RestaurantContext";
import styles from "../../../styles";
import { formatDateYYMMDD } from "../../../utils";
import ImageSlider from "../../../components/ImageSlider";
import RateStars from "../../../components/RateStars";
import { useQuery } from "@apollo/client";
import { GET_RESTAURANT_REVIEWS } from "../../../queries/RestaurantQueries";

const RATE_DETAIL_BAR_HEIGHT = 5;

const SORTING_METHODS_LIST = ["최신순", "별점높은순", "별점낮은순"];

const USER_IMAGE_SIZE = 40;

const REPLY_BG_COLOR = "#edeaea";

const Section = styled.View`
    padding-left : 15;
    padding-right : 15;
    padding-top : 20;
    padding-bottom : 20;
    margin-bottom : 10;
    background-color : white;
`

const ReviewsBrief = styled.View`
    align-items : center;
    justify-content : center;
    width : ${(constants.width - 55) * 3 / 8};
    margin-right : 20;
`

const ReviewsRate = styled.Text`
    font-size : 25;
    margin-bottom : 10;
`

const ReviewsCount = styled.Text`
    font-size : 14.5;
`

const ReviewRateDetails = styled.View`
    width : ${(constants.width - 55) * 5 / 9};
`

const RateDetailRow = styled.View`
    flex-direction : row;
    align-items : center;
    justify-content : space-between;
    width : 170;
`

const GageBarBg = styled.View`
    position : absolute;
    top : 0;
    left : 0;
    width : 90;
    height : ${RATE_DETAIL_BAR_HEIGHT};
    background-color : #f2efef;
`

const GageBarFilled = styled.View`
    position : absolute;
    top : 0;
    left : 0;
    height : ${RATE_DETAIL_BAR_HEIGHT};
    background-color : ${styles.yellowColor};
`

const RateDetail = ({ point, count, total }) => (
    <RateDetailRow>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <FontAwesome name="star" size={12} color={styles.yellowColor} />
            <Text style={{ marginLeft: 5, opacity: 0.55, fontSize: 13 }}>{point}</Text>
        </View>
        <View style={{ height: RATE_DETAIL_BAR_HEIGHT, width: 90, marginHorizontal: 10 }}>
            <GageBarBg />
            <GageBarFilled style={{ width: 90 * count / total }} />
        </View>
        <Text style={{ opacity: 0.55, fontSize: 13, width: 30 }}>{count}</Text>
    </RateDetailRow>
)

const SortingMethod = ({ text, isSelected, onPress }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text style={{ opacity: isSelected ? 1 : 0.45, marginLeft: 15, fontWeight: "bold" }}>{text}</Text>
    </TouchableOpacity>
)

const ReviewItem = styled.View`
    margin-bottom : 30;
`

const ReviewHeader = styled.View`
    flex-direction : row;
    margin-bottom : 10;
`

const ReviewUserImage = ({ uri, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Image source={{ uri }} style={{ width: USER_IMAGE_SIZE, height: USER_IMAGE_SIZE, borderRadius: USER_IMAGE_SIZE / 2, marginRight: 10 }} />
    </TouchableOpacity>
)

const ReviewUserName = ({ onPress, name }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={{ fontSize: 15.5, fontWeight: "bold", marginRight: 5 }}>{name}</Text>
    </TouchableOpacity>
)

const ReviewDate = styled.Text`
    opacity : 0.45;
    font-size : 12.5;
`

const ReviewReply = styled.View`
    margin-top : 25;
    padding-left : 10;
    padding-right : 10;
    padding-bottom : 10;
    padding-right : 10;
`

const SpeechBubbleEdge = styled.View`
    position : absolute;
    width : 0;
    height : 0;
    top : -23;
    left : 20;
    border-width : 15;
    border-style : solid;
    border-bottom-color : ${REPLY_BG_COLOR};
    border-top-color : transparent;
    border-left-color : transparent;
    border-right-color : transparent;
`

const ReplyText = styled.View`
    padding-left : 10;
    padding-right : 10;
    padding-top : 10;
    padding-bottom : 10;
    background-color : ${REPLY_BG_COLOR};
    border-radius : 5;
`

const NoReview = styled.View`
    margin-top : 5;
    height : ${constants.width};
    background-color : white;
    justify-content : center;
    align-items : center;
`

const NoReviewImage = () => (
    <View style={{ padding: 30, justifyContent: "center", alignItems: "center" }}>
        <Ionicons name="document-text-outline" size={100} color="#afafaf" />
        <Ionicons name="chatbox-ellipses-outline" size={50} color="#afafaf"
            style={{ position: "absolute", top: 0, right: 20 }}
        />
    </View>
)

const NoReviewMessage = styled.Text`
    font-size : 17;
    color : #545151;
`

export default ({ navigation }) => {
    const [sorting, setSorting] = useState("최신순");
    const restaurant = useRestaurant();
    const { loading, data, error } = useQuery(GET_RESTAURANT_REVIEWS, {
        variables: {
            resseq: restaurant.seq,
            sortingmethod: sorting
        }
    })
    const reviewsCount = restaurant.rate1count
        + restaurant.rate2count
        + restaurant.rate3count
        + restaurant.rate4count
        + restaurant.rate5count;
    const renderReviewItem = ({ item: review }) => (
        <ReviewItem>
            <ReviewHeader>
                <ReviewUserImage uri={review.user.thumbnail}
                    onPress={() => navigation.navigate("UserReviews", { userId: review.user.seq })}
                />
                <View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 1 }}>
                        <ReviewUserName name={review.user.name} onPress={() => navigation.navigate("UserReviews", { userId: review.user.seq })} />
                        <ReviewDate>{formatDateYYMMDD(review.createdAt)}</ReviewDate>
                    </View>
                    <RateStars rate={review.rate} />
                </View>
            </ReviewHeader>
            {review.images.length > 0 && (
                <View style={{ marginBottom: 10 }}>
                    <ImageSlider images={review.images.map(imageObj => imageObj.image)} width={constants.width - 40} height={constants.width - 40} />
                </View>
            )}
            <Text>{review.content}</Text>
            {review.reply && (
                <ReviewReply>
                    <SpeechBubbleEdge />
                    <ReplyText>
                        <Text style={{ fontSize: 15.2, fontWeight: "bold", marginBottom: 10 }}>사장님 댓글</Text>
                        <Text>{review.reply.content}</Text>
                    </ReplyText>
                </ReviewReply>
            )}
        </ReviewItem>
    )
    return <>
        {!loading && data && data.getResReviews ? (
            <View style={{ marginBottom: restaurant.isopen ? 0 : 45 }}>
                {
                    data.getResReviews.length > 0 ? (
                        <View>
                            <Section style={{ flexDirection: "row", justifyContent: "center", marginBottom: 5 }}>
                                <ReviewsBrief>
                                    <ReviewsRate><FontAwesome name="star" size={23} color={styles.yellowColor} /> {restaurant.rate}</ReviewsRate>
                                    <ReviewsCount>(총 {reviewsCount}개 리뷰)</ReviewsCount>
                                </ReviewsBrief>
                                <ReviewRateDetails>
                                    <RateDetail point={1} count={restaurant.rate1count} total={reviewsCount} />
                                    <RateDetail point={2} count={restaurant.rate2count} total={reviewsCount} />
                                    <RateDetail point={3} count={restaurant.rate3count} total={reviewsCount} />
                                    <RateDetail point={4} count={restaurant.rate4count} total={reviewsCount} />
                                    <RateDetail point={5} count={restaurant.rate5count} total={reviewsCount} />
                                </ReviewRateDetails>
                            </Section>
                            <Section>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    borderBottomColor: "#e0d5d5",
                                    borderBottomWidth: 0.45,
                                    paddingBottom: 5,
                                }}>
                                    {SORTING_METHODS_LIST.map(method => (
                                        <SortingMethod
                                            text={method}
                                            isSelected={sorting === method}
                                            onPress={() => setSorting(method)}
                                        />
                                    ))}
                                </View>
                                <FlatList
                                    data={data.getResReviews}
                                    renderItem={renderReviewItem}
                                    style={{ paddingTop: 20 }}
                                />
                            </Section>
                        </View>
                    ) : (
                        <NoReview>
                            <NoReviewImage />
                            <NoReviewMessage>리뷰가 존재하지 않습니다.</NoReviewMessage>
                        </NoReview>
                    )
                }
            </View>
        ) : (
            <View style={{ height: 200, backgroundColor: styles.bgColor, justifyContent: "center", alignItems: "center" }}>
                <Loader />
            </View>

        )}
    </>
}