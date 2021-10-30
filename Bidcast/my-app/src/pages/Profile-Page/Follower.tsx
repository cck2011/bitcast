import { useDispatch, useSelector } from "react-redux";
import { Image, Card } from "react-bootstrap";
import { RootState } from "../../store";
import "./FollowingFollower.scss";
import Login from "../../component/LiveStream/Login";
import { useEffect, useState } from "react";
import { fetchSubscribe, fetchUserCardInfo } from "../../redux/user/actions";

interface ProfilePageProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Follower(props: ProfilePageProps) {
    const dispatch = useDispatch();
    const [loadState, setLoadState] = useState<number>(0);
    const isAuthenticate = useSelector(
        (state: RootState) => state.user.isAuthenticate
    );
    const followerList = useSelector(
        (state: RootState) => state.follower.userId
    );
    const followerDetails = useSelector(
        (state: RootState) => state.follower.userDetails
    );
    useEffect(() => {
        if (loadState === 0) {
            props.setIsLoading(true);
        }
    }, [loadState, props]);
    useEffect(() => {
        dispatch(fetchSubscribe(true));
    }, [dispatch]);
    useEffect(() => {
        if (followerList.length > 0) {
            dispatch(
                fetchUserCardInfo(
                    followerList,
                    "follower",
                    props.setIsLoading,
                    setLoadState
                )
            );
        }
    }, [dispatch, followerList, props]);

    return (
        <div className="follower w-100 me-3 mb-3">
            {!isAuthenticate ? (
                <Login message={"請先登入"} />
            ) : (
                <div className="row">
                    {followerDetails.length !== 0 &&
                        followerDetails.map((item) => (
                            <div
                                className="col-lg-3 col-md-4 col-sm-6 col-12"
                                key={item.username}
                            >
                                <Card className="card_body">
                                    <div className="card_bg_color">
                                        {item.propic !== undefined && (
                                            <div className="card_absolute_layer d-flex justify-content-center">
                                                <Image
                                                    src={`${
                                                        item.propic.search(
                                                            /(https:\/\/)|(http:\/\/)/i
                                                        ) < 0
                                                            ? process.env
                                                                  .REACT_APP_BACKEND_URL +
                                                              "/" +
                                                              item.propic
                                                            : item.propic
                                                    }`}
                                                    width="80"
                                                    height="80"
                                                    roundedCircle
                                                    className="profile_logo"
                                                    alt="propic"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{item.username}</Card.Title>
                                        {/* <Card.Text >{item.phone_number}</Card.Text> */}
                                        {/* <Card.Text>{item.email}</Card.Text> */}
                                        <Card.Text className={"name_card_vice"}>
                                            {item.telegramAcct
                                                ? `${item.telegramAcct}`
                                                : "此用戶並未登記 Telegram 帳號"}
                                        </Card.Text>
                                        <Card.Text>
                                            {item.description
                                                ? `「 ${item.description} 」`
                                                : `「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」「 大家好~我是${item.username} 」`}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}